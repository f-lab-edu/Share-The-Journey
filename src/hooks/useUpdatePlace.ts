import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

import db from '@/app/db';
import { NewPlaceForm } from '@/types/place';

const useUpdatePlace = () => {
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const updatePlace = async (
    placeId: string,
    placeData: Partial<NewPlaceForm>
  ) => {
    if (isUploading) return;

    setIsUploading(true);
    setError(null);
    try {
      const placeRef = doc(db, 'places', placeId);

      await updateDoc(placeRef, placeData);
      router.push(`/detail/${placeId}`);
    } catch (error) {
      setError('업데이트에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
    }

    return;
  };

  return { updatePlace, error };
};

export { useUpdatePlace };
