import { addDoc, collection } from 'firebase/firestore';

import db from '@/libs/db';
import { NewPlaceForm } from '@/types/place';

export const uploadPlace = async (newPlaceData: NewPlaceForm) => {
  await addDoc(collection(db, 'places'), newPlaceData);
};
