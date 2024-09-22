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
import db from '@/libs/db';
import { Review } from '@/types/review';

export const useFetchReviews = (
  placeId: string,
  contentPerPage: number,
  currentPage: number
) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageDocs, setPageDocs] = useState<
    Record<number, QueryDocumentSnapshot<DocumentData> | null>
  >({});
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

      if (page > 1 && pageDocs[page - 1]) {
        reviewsQuery = query(
          reviewsQuery,
          startAfter(pageDocs[page - 1]),
          limit(contentPerPage)
        );
      }

      const querySnapshot = await getDocs(reviewsQuery);
      const reviewData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Review[];

      setReviews(reviewData);

      setPageDocs((prev) => ({
        ...prev,
        [page]: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
      }));
    } catch (error) {
      setError('리뷰 정보를 가져오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  return {
    reviews,
    error,
    fetchReviews,
  };
};
