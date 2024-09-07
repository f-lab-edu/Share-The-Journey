'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import db from '@/app/db';
import { Review } from '@/types/review';

// COM: useFetchMyPlaces와 거의 동일한 피드백을 할 수 있을듯. 거기 참고하기.
// 근데 그뜻은, 뭔가 중복되는 부분이 있다는 것일수도 있지 않을까?
export const useFetchReviews = (placeId: string, contentPerPage: number) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastDocs, setLastDocs] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async (page: number) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      let reviewsQuery = query(
        collection(db, 'reviews'),
        where('place_id', '==', placeId),
        orderBy('date', 'asc'),
        limit(contentPerPage)
      );

      if (page > 1 && lastDocs[page - 2]) {
        reviewsQuery = query(
          reviewsQuery,
          startAfter(lastDocs[page - 2]),
          limit(contentPerPage)
        );
      }

      const querySnapshot = await getDocs(reviewsQuery);
      const reviewData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Review[];

      setReviews(reviewData);

      const newLastDocs = [...lastDocs];
      newLastDocs[page - 1] = querySnapshot.docs[querySnapshot.docs.length - 1];

      setLastDocs(newLastDocs);
    } catch (error) {
      setError('리뷰 정보를 가져오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  const moveToNextPage = (totalPage: number) =>
    setCurrentPage(page => (page < totalPage ? page + 1 : page));
  const moveToPrevPage = () =>
    setCurrentPage(page => (page > 1 ? page - 1 : page));

  return {
    reviews,
    currentPage,
    error,
    moveToNextPage,
    moveToPrevPage,
    fetchReviews,
  };
};
