'use client';

import { useEffect, useState, useContext } from 'react';
import { format } from 'date-fns';
import {
  collection,
  setDoc,
  query,
  where,
  doc,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

import db from '@/app/db';
import { Review } from '@/types/review';
import { AuthContext } from '@/app/AuthContext';

const addReview = async (review: Omit<Review, 'id'>) => {
  const newReviewRef = doc(collection(db, 'reviews'));
  await setDoc(newReviewRef, { ...review, id: newReviewRef.id });
};

const ReviewArea = ({ placeId }: { placeId: string }) => {
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const reviewsQuery = query(
      collection(db, 'reviews'),
      where('place_id', '==', placeId),
      orderBy('date', 'asc')
    );
    const unsubscribe = onSnapshot(reviewsQuery, (querySnapshot) => {
      const reviewData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Review[];
      setReviews(reviewData);
    });

    return () => unsubscribe();
  }, [placeId]);

  const handleAddReview = async () => {
    if (newReview.trim() === '') return;

    const review = {
      description: newReview,
      writer: user?.displayName ?? '비회원',
      date: Date.now(),
      place_id: placeId,
    };

    await addReview(review);
    setNewReview('');
  };

  return (
    <section className="w-9/12 mx-auto  bg-gray-300 p-3 rounded-md mb-10">
      <h2 className="text-xl font-extrabold mb-5">리뷰</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          const date = new Date(review.date);
          const formattedDate = format(date, 'yyyy.MM.dd');

          return (
            <div
              key={review.id}
              className="mb-5 border p-3 rounded-md bg-white"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-bold">작성자: {review.writer}</h3>
                {/* <p className="font-semibold mb-1">
                  별점: <span className="text-amber-400">{review.score}</span>
                </p> */}
              </div>
              <p className="mb-1">{review.description}</p>
              <p className="font-semibold text-zinc-300">
                작성일: {formattedDate}
              </p>
            </div>
          );
        })
      ) : (
        <p className="mb-5 border p-2 rounded-md bg-white">리뷰가 없습니다.</p>
      )}
      <input
        type="text"
        placeholder="리뷰를 작성해주세요."
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        className="w-full border p-2 rounded-md h-[100px]"
      />
      <button
        onClick={handleAddReview}
        className="w-full bg-blue-500 text-white p-2 rounded-md mt-3"
      >
        등록
      </button>
    </section>
  );
};

export default ReviewArea;
