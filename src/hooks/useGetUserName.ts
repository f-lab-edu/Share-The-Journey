'use client';

import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';

import db from '@/libs/db';

const useGetUserName = (userId: string) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nameError, setNameError] = useState<'error' | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      if (!userId || !isLoading) return;

      setIsLoading(true);
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setUserName(userDoc.data().nickname);
        }
      } catch (e) {
        setNameError('error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserName();
  }, [userId]);

  return { userName, nameError };
};

export { useGetUserName };
