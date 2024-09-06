'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getCountFromServer,
} from 'firebase/firestore';
import db from '@/app/db';

export const useGetMyPlacesCount = (uid: string | null) => {
  const [totalContentCount, setTotalContentCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const getCount = async (uid?: string | null) => {
    try {
      let countQuery = query(
        collection(db, 'places'),
        where('registrant', '==', uid)
      );
      const snapshot = await getCountFromServer(countQuery);

      setTotalContentCount(snapshot.data().count);
    } catch (e) {
      setError('총 컨텐츠 수를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (uid) getCount(uid);
  }, [uid]);

  return { totalContentCount, error, getCount };
};
