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
import db from '@/libs/db';
import { PlaceDetailProps } from '@/types/place';

export const useFetchPlaces = (
  contentsPerPage: number,
  currentPage: number
) => {
  const [places, setPlaces] = useState<PlaceDetailProps[]>([]);
  const [pageDocs, setPageDocs] = useState<
    Record<number, QueryDocumentSnapshot<DocumentData> | null>
  >({});
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

      if (page > 1 && pageDocs[currentPage - 1]) {
        placesQuery = query(
          placesQuery,
          startAfter(pageDocs[currentPage - 1]),
          limit(contentsPerPage)
        );
      }

      const querySnapshot = await getDocs(placesQuery);
      let fetchedPlaces = querySnapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as PlaceDetailProps)
      );

      setPlaces(fetchedPlaces);
      setPageDocs((prev) => ({
        ...prev,
        [page]: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
      }));
    } catch (e) {
      setError('장소 정보를 가져오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces(currentPage);
  }, [currentPage]);

  return {
    places,
    error,
    isLoading,
  };
};
