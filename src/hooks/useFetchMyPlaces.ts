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
  where,
} from 'firebase/firestore';

import db from '@/libs/db';
import { PlaceDetailProps } from '@/types/place';

export const useFetchMyPlaces = (
  currentPage: number,
  contentsPerPage: number,
  uid?: string
) => {
  const [places, setPlaces] = useState<PlaceDetailProps[]>([]);
  const [pageDocs, setPageDocs] = useState<
    Record<number, QueryDocumentSnapshot<DocumentData> | null>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMyPlaces = async (page: number, userId?: string) => {
    if (isLoading || !userId) return;

    setIsLoading(true);

    try {
      let placeQuery = query(
        collection(db, 'places'),
        where('registrant', '==', userId),
        orderBy('score', 'desc'),
        limit(contentsPerPage)
      );

      if (currentPage > 1 && pageDocs[currentPage - 1]) {
        placeQuery = query(placeQuery, startAfter(pageDocs[currentPage - 1]));
      }

      const querySnapshot = await getDocs(placeQuery);
      const newPlaces = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as PlaceDetailProps)
      );

      setPlaces(newPlaces);
      setPageDocs((prev) => ({
        ...prev,
        [page]: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
      }));
    } catch (error) {
      console.error(error);
      setError('장소를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPlaces(currentPage, uid);
  }, [currentPage, uid]);

  return {
    places,
    error,
    fetchMyPlaces,
    isLoading,
  };
};
