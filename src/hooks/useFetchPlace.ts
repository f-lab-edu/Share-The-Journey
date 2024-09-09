'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import db from '@/libs/db';
import { PlaceDetailProps } from '@/types/place';

const useFetchPlace = (id: string) => {
  const [placeData, setPlaceData] = useState<PlaceDetailProps | null>(null);
  const [placeError, setPlaceError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPlace = async () => {
      setIsLoading(true);

      try {
        const docRef = doc(db, 'places', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPlaceData(data as PlaceDetailProps);
        } else {
          setPlaceError('해당 장소가 존재하지 않습니다.');
        }
      } catch (error) {
        setPlaceError('장소 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  return { placeData, placeError, isLoading };
};

export { useFetchPlace };
