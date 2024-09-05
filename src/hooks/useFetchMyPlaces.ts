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

import db from '@/app/db';
import { PlaceDetailProps } from '@/types/place';

export const useFetchMyPlaces = (contentsPerPage: number, uid?: string) => {
  const [places, setPlaces] = useState<PlaceDetailProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
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

      if (page > 1 && pageDocs[page - 1]) {
        placeQuery = query(placeQuery, startAfter(pageDocs[page - 1]));
      }

      const querySnapshot = await getDocs(placeQuery);
      const newPlaces = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as PlaceDetailProps)
      );

      if (page > 1 && newPlaces.length === 0) {
        setCurrentPage((page) => Math.max(page - 1, 1));
      }

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

  const moveToNextPage = (totalPage: number) =>
    setCurrentPage((page) => (page < totalPage ? page + 1 : page));
  const moveToPrevPage = () =>
    setCurrentPage((page) => (page > 1 ? page - 1 : page));

  return {
    places,
    error,
    currentPage,
    moveToNextPage,
    moveToPrevPage,
    fetchMyPlaces,
  };
};
