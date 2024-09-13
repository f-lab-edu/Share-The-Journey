import { doc, updateDoc } from 'firebase/firestore';

import db from '@/libs/db';
import { NewPlaceForm } from '@/types/place';

export const updatePlace = async (
  placeId: string,
  placeData: Partial<NewPlaceForm>
) => {
  const placeRef = doc(db, 'places', placeId);

  await updateDoc(placeRef, placeData);
};
