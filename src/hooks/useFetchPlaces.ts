'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  getDocs,
  orderBy,
  query,
  startAfter,
  limit,
  QueryDocumentSnapshot,
  getCountFromServer,
  where,
} from 'firebase/firestore';
import db from '@/app/db';
import { PlaceDetailProps } from '@/types/place';

export const useFetchPlaces = (
  contentsPerPage: number,
  searchQuery: string = ''
) => {
  const [places, setPlaces] = useState<PlaceDetailProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [totalPlaceCount, setTotalPlaceCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTotalPlacesCount = useCallback(async () => {
    try {
      let countQuery = query(collection(db, 'places'));

      if (searchQuery) {
        countQuery = query(
          collection(db, 'places'),
          where('name', '>=', searchQuery),
          where('name', '<=', searchQuery + '\uf8ff')
        );
      }

      const snapshot = await getCountFromServer(countQuery);
      setTotalPlaceCount(snapshot.data().count);
    } catch (e) {
      console.error('Error getting documents: ', e);
    }
  }, [searchQuery]);

  const fetchPlaces = useCallback(
    async (page: number) => {
      if (isLoading) return;

      setIsLoading(true);

      try {
        let q = query(
          collection(db, 'places'),
          orderBy('score', 'desc'),
          limit(contentsPerPage)
        );

        if (searchQuery) {
          q = query(
            collection(db, 'places'),
            where('name', '>=', searchQuery),
            where('name', '<=', searchQuery + '\uf8ff'),
            orderBy('score', 'desc'),
            limit(contentsPerPage)
          );
        }

        if (lastDoc && page > 1) {
          q = query(
            collection(db, 'places'),
            orderBy('score', 'desc'),
            startAfter(lastDoc),
            limit(contentsPerPage)
          );
        }

        if (searchQuery) {
          q = query(
            collection(db, 'places'),
            where('name', '>=', searchQuery),
            where('name', '<=', searchQuery + '\uf8ff'),
            orderBy('score', 'desc'),
            startAfter(lastDoc),
            limit(contentsPerPage)
          );
        }

        const querySnapshot = await getDocs(q);
        const placeData: PlaceDetailProps[] = [];

        querySnapshot.forEach((doc) => {
          placeData.push({ id: doc.id, ...doc.data() } as PlaceDetailProps);
        });

        setPlaces(placeData);

        if (querySnapshot.docs.length < contentsPerPage) {
          setLastDoc(null);
        } else {
          setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
      } catch (e) {
        console.error('Error getting documents: ', e);
      } finally {
        setIsLoading(false);
      }
    },
    [lastDoc, contentsPerPage, searchQuery, isLoading]
  );

  useEffect(() => {
    fetchTotalPlacesCount();
  }, [fetchTotalPlacesCount]);

  useEffect(() => {
    fetchPlaces(currentPage);
  }, [currentPage]);

  const paginate = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  return { places, totalPlaceCount, currentPage, paginate };
};
