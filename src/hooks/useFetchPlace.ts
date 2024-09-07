import { doc, getDoc } from 'firebase/firestore';

import db from '@/app/db';
import { PlaceDetailProps } from '@/types/place';

const useFetchPlace = async (id: string): Promise<PlaceDetailProps | null> => {
  const fetchPlace = async () => {
    const docRef = doc(db, 'places', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as PlaceDetailProps;
    }

    return null;
  };

  return await fetchPlace();
};

export { useFetchPlace };
