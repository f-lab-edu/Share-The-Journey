'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  orderBy,
  query,
  startAfter,
  limit,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import db from '@/app/db';
import { PlaceDetailProps } from '@/types/place';

export const useFetchPlaces = (contentsPerPage: number) => {
  const [places, setPlaces] = useState<PlaceDetailProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastDocs, setLastDocs] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaces = async (page: number) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      let placesQuery = query(
        collection(db, 'places'),
        orderBy('score', 'desc'),
        limit(contentsPerPage)
      );

      if (page > 1 && lastDocs[page - 2]) {
        placesQuery = query(
          placesQuery,
          startAfter(lastDocs[page - 2]),
          limit(contentsPerPage)
        );
      }

      const querySnapshot = await getDocs(placesQuery);
      let fetchedPlaces = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as PlaceDetailProps[];

      setPlaces(fetchedPlaces);

      const newLastDocs = [...lastDocs];
      newLastDocs[page - 1] = querySnapshot.docs[querySnapshot.docs.length - 1];

      setLastDocs(newLastDocs);
    } catch (e) {
      setError('장소 정보를 가져오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces(currentPage);
  }, [currentPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return { places, currentPage, paginate, error };
};
