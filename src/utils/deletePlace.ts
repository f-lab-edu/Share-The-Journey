import { doc, deleteDoc } from 'firebase/firestore';
import db from '@/libs/db';

export const deletePlace = async (placeId: string) => {
  const placeRef = doc(db, 'places', placeId);
  await deleteDoc(placeRef);
};
