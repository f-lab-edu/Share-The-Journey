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
        doc =>
          ({
            id: doc.id,
            ...doc.data(),
          } as PlaceDetailProps)
      );

      if (page > 1 && newPlaces.length === 0) {
        setCurrentPage(page => Math.max(page - 1, 1));
      }

      setPlaces(newPlaces);
      setPageDocs(prev => ({
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

  // COM: fetchMyPlaces가 fetchMyPlaces만 하는 게 아니라 페이지도 세팅하는 것 같다. 근데 의존성 배열에 currentPage가 있다. 디버깅하기 어려울 수 있을 것 같다. 함수가 하나의 일만 하도록 하는 게 좋을 것 같다.
  useEffect(() => {
    fetchMyPlaces(currentPage, uid);
  }, [currentPage, uid]);

  const moveToNextPage = (totalPage: number) =>
    setCurrentPage(page => (page < totalPage ? page + 1 : page));
  const moveToPrevPage = () =>
    setCurrentPage(page => (page > 1 ? page - 1 : page));

  return {
    places,
    error,
    currentPage,
    moveToNextPage,
    moveToPrevPage,
    fetchMyPlaces, // COM: 지난번 같이 논의했던 내용으로 기억하는데, 그때는 context가 더 적어서 구체적인 피드백을 못한 것 같다. fetchMyPlaces를 export 하는 것보다 refetch라는 이름으로 export 하는 게 더 직관적일 것 같다. 왜 그럴끼? react-query의 hook return을 참고할 수 있겠다.
  };
};
