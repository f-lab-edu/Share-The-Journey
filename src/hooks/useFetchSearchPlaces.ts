'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
  QueryDocumentSnapshot,
  getCountFromServer,
} from 'firebase/firestore';

import db from '@/app/db';
import { PlaceCardProps } from '@/types/place';

export const useFetchSearchPlaces = (
  contentsPerPage: number,
  queryText: string | null
) => {
  const [searchResults, setSearchResults] = useState<PlaceCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPlaceCount, setTotalPlaceCount] = useState(0);

  const fetchTotalResultsCount = useCallback(async () => {
    if (!queryText) return;

    try {
      const countQuery = query(
        collection(db, 'places'),
        where('name', '>=', queryText),
        where('name', '<=', queryText + '\uf8ff')
      );

      const snapshot = await getCountFromServer(countQuery);
      setTotalPlaceCount(snapshot.data().count);
    } catch (e) {
      console.error('Error getting total count:', e);
      setError('총 결과 수를 가져오는 중 오류가 발생했습니다.');
    }
  }, [queryText]);

  const fetchSearchPlaces = useCallback(
    async (page: number) => {
      if (!queryText || isLoading) return;

      setIsLoading(true);

      try {
        let q = query(
          collection(db, 'places'),
          where('name', '>=', queryText),
          where('name', '<=', queryText + '\uf8ff'),
          orderBy('score', 'desc'),
          limit(contentsPerPage)
        );

        if (lastDoc && page > 1) {
          q = query(
            collection(db, 'places'),
            where('name', '>=', queryText),
            where('name', '<=', queryText + '\uf8ff'),
            orderBy('score', 'desc'),
            startAfter(lastDoc),
            limit(contentsPerPage)
          );
        }

        const querySnapshot = await getDocs(q);
        const resultsPlaceData: PlaceCardProps[] = querySnapshot.docs.map(
          (doc) => {
            return { id: doc.id, ...doc.data() } as PlaceCardProps;
          }
        );

        setSearchResults(resultsPlaceData);

        if (querySnapshot.docs.length < contentsPerPage) {
          setLastDoc(null);
        } else {
          setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
      } catch (error) {
        setError('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [queryText, contentsPerPage, lastDoc, isLoading]
  );

  useEffect(() => {
    setLastDoc(null);
    fetchTotalResultsCount();
    fetchSearchPlaces(1);
  }, [queryText]);

  const paginate = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      fetchSearchPlaces(pageNumber);
    }
  };

  return { searchResults, error, currentPage, paginate, totalPlaceCount };
};
