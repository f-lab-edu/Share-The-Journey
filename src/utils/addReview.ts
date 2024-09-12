import { collection, setDoc, doc } from 'firebase/firestore';

import db from '@/libs/db';
import { Review } from '@/types/review';

export const addReview = async (review: Omit<Review, 'id'>) => {
  const newReviewRef = doc(collection(db, 'reviews'));
  await setDoc(newReviewRef, { ...review, id: newReviewRef.id });
};
