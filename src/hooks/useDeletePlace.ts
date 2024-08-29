import { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import db from '@/app/db';

export const useDeletePlace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deletePlace = async (placeId: string) => {
    if (!placeId || isLoading) return;

    setIsLoading(true);

    try {
      const placeRef = doc(db, 'places', placeId);
      await deleteDoc(placeRef);
    } catch (error) {
      setDeleteError('장소를 삭제하는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { deletePlace, isLoading, deleteError };
};
