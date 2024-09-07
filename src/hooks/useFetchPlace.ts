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

  // COM: 여기서 호출결과를 직접 반환하는 이유는? 이 구조는 어떤 단점이 있을까?
  return await fetchPlace();
};

export { useFetchPlace };
