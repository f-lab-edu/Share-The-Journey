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
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMyPlaces = async (page: number, userId?: string) => {
    if (isLoading || !userId) return;

    setIsLoading(true);

    try {
      const placeQuery = query(
        collection(db, 'places'),
        where('registrant', '==', userId),
        orderBy('score', 'desc'),
        limit(contentsPerPage)
      );

      const finalQuery = lastDoc
        ? query(placeQuery, startAfter(lastDoc))
        : placeQuery;
      const querySnapshot = await getDocs(finalQuery);
      const newPlaces = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as PlaceDetailProps)
      );

      setPlaces(newPlaces);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
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
