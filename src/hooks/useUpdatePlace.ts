import { doc, updateDoc } from 'firebase/firestore';

import db from '@/app/db';
import { NewPlaceForm } from '@/types/place';

const useUpdatePlace = () => {
  const updatePlace = async (
    placeId: string,
    placeData: Partial<NewPlaceForm>
  ) => {
    const placeRef = doc(db, 'places', placeId);

    await updateDoc(placeRef, placeData);
  };

  return { updatePlace };
};

export { useUpdatePlace };
