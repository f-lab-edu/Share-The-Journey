import { addDoc, collection } from 'firebase/firestore';

import db from '@/libs/db';
import { NewPlaceForm } from '@/types/place';

const useUploadPlace = () => {
  const uploadPlace = async (newPlaceData: NewPlaceForm) => {
    await addDoc(collection(db, 'places'), newPlaceData);
  };

  return { uploadPlace };
};

export { useUploadPlace };
