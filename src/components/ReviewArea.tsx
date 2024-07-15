'use client';

import { useEffect, useState } from 'react';
import { format, parse } from 'date-fns';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';

import db from '@/app/db';
import { Review } from '@/types/review';

const addReview = async (placeId: string, review: Omit<Review, 'place_id'>) => {
  const reviewRef = collection(db, 'reviews');
  await addDoc(reviewRef, { ...review, place_id: placeId });
};

const ReviewArea = ({ placeId }: { placeId: string }) => {
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const reviewsQuery = query(
      collection(db, 'reviews'),
      where('place_id', '==', placeId)
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
      writer: '사용자',
      date: new Date().toISOString().split('T')[0],
      place_id: placeId,
      id: '',
    };

    await addReview(placeId, review);
    setNewReview('');
  };

  return (
    <section className="w-9/12 mx-auto  bg-gray-300 p-3 rounded-md mb-10">
      <h2 className="text-xl font-extrabold mb-5">리뷰</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          const parsedDate = parse(review.date, 'yyyy-MM-dd', new Date());
          const formattedDate = format(parsedDate, 'yyyy.MM.dd');

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
