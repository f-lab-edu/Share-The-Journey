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
import { Review } from '@/types/review';

export const useFetchReviews = (placeId: string, contentPerPage: number) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalReviewsCount, setTotalReviewsCount] = useState<number>(0);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTotalReviewsCount = useCallback(async () => {
    try {
      const countQuery = query(
        collection(db, 'reviews'),
        where('place_id', '==', placeId)
      );
      const snapshot = await getCountFromServer(countQuery);
      setTotalReviewsCount(snapshot.data().count);
    } catch (error) {
      setError('댓글 정보를 가져오는데 실패했습니다. 다시 시도해주세요.');
    }
  }, [placeId]);

  const fetchReviews = useCallback(
    async (page: number) => {
      if (isLoading) return;

      setIsLoading(true);

      try {
        let reviewsQuery = query(
          collection(db, 'reviews'),
          where('place_id', '==', placeId),
          orderBy('date', 'asc'),
          limit(contentPerPage)
        );

        if (lastDoc && page > 1) {
          reviewsQuery = query(
            collection(db, 'reviews'),
            where('place_id', '==', placeId),
            orderBy('date', 'asc'),
            startAfter(lastDoc),
            limit(contentPerPage)
          );
        }

        const querySnapshot = await getDocs(reviewsQuery);
        const reviewData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Review[];

        setReviews(reviewData);

        if (querySnapshot.docs.length < contentPerPage) {
          setLastDoc(null);
        } else {
          setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
      } catch (error) {
        setError('리뷰 정보를 가져오는데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    },
    [placeId, contentPerPage, lastDoc, isLoading]
  );

  useEffect(() => {
    fetchTotalReviewsCount();
  }, [fetchTotalReviewsCount]);

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  const paginate = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  return { reviews, totalReviewsCount, currentPage, paginate, error };
};
