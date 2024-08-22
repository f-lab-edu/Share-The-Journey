'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  query,
  where,
  getCountFromServer,
  getDocs,
} from 'firebase/firestore';
import db from '@/app/db';

export const useGetContentCount = (
  category: 'places' | 'reviews',
  searchQuery?: string | null,
  placeId?: string | null
) => {
  const [totalContentCount, setTotalContentCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const getCount = useCallback(async () => {
    try {
      let countQuery = query(collection(db, category));

      if (searchQuery) {
        const snapshot = await getDocs(countQuery);
        const filteredSnapshot = snapshot.docs.filter((doc) =>
          doc.data().name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setTotalContentCount(filteredSnapshot.length);
        return;
      } else if (placeId) {
        countQuery = query(countQuery, where('place_id', '==', placeId));
      }

      const snapshot = await getCountFromServer(countQuery);
      setTotalContentCount(snapshot.data().count);
    } catch (e) {
      setError('총 컨텐츠 수를 가져오는 중 오류가 발생했습니다.');
    }
  }, [category, searchQuery, placeId]);

  useEffect(() => {
    getCount();
  }, [getCount]);

  return { totalContentCount, error };
};
