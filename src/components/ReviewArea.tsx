'use client';

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  collection,
  setDoc,
  query,
  where,
  doc,
  onSnapshot,
  orderBy,
  getDoc,
} from 'firebase/firestore';
import { Button } from '@nextui-org/react';

import db from '@/app/db';
import { Review } from '@/types/review';
import { AuthContext } from '@/app/AuthContext';
import PaginationBar from './Pagination';

const addReview = async (review: Omit<Review, 'id'>) => {
  const newReviewRef = doc(collection(db, 'reviews'));
  await setDoc(newReviewRef, { ...review, id: newReviewRef.id });
};

const ReviewCard = (props: { review: Review }) => {
  const { review } = props;
  const formattedDate = format(new Date(review.date), 'yyyy.MM.dd');
  const router = useRouter();

  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (review.writer === '비회원') {
      setUsername('비회원');
      return;
    }

    const getUserName = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', review.writer));
        if (userDoc.exists()) {
          setUsername(userDoc.data().nickname);
        }
      } catch (error) {
        setError('리뷰 정보를 가져오는데 실패했습니다. 다시 시도해주세요.');
      }
    };

    getUserName();
  }, [review.writer, router]);

  if (username === null) {
    return <div>Loading...</div>;
  } else if (error) {
    return (
      <div className="mb-5 text-red-500 font-bold bg-white p-3 rounded-md">
        {error}
      </div>
    );
  }
  return (
    <div key={review.id} className="my-3 p-3 border-b-1 last:border-0">
      <div className="flex justify-between">
        <h3 className="font-bold text-slate-700">{username}</h3>
      </div>
      <p className="mb-1 text-sm">{review.description}</p>
      <p className="font-semibold text-zinc-300">{formattedDate}</p>
    </div>
  );
};

const ReviewArea = ({ placeId }: { placeId: string }) => {
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(AuthContext);
  const contentsPerPage = 5;

  useEffect(() => {
    const reviewsQuery = query(
      collection(db, 'reviews'),
      where('place_id', '==', placeId),
      orderBy('date', 'asc')
    );

    const unsubscribe = onSnapshot(reviewsQuery, async (querySnapshot) => {
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
      writer: user?.uid ?? '비회원',
      date: Date.now(),
      place_id: placeId,
    };

    await addReview(review);
    setNewReview('');
  };

  const indexOfLastContent = currentPage * contentsPerPage;
  const indexOfFirstContent = indexOfLastContent - contentsPerPage;
  const currentContents = reviews.slice(
    indexOfFirstContent,
    indexOfLastContent
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="w-3/5 mx-auto mb-10">
      <h2 className="text-xl font-extrabold mb-3 ml-2 text-slate-600">댓글</h2>
      <div>
        {reviews.length > 0 ? (
          currentContents.map((review, index) => {
            return <ReviewCard key={index} review={review} />;
          })
        ) : (
          <p className="mb-5 p-2 text-slate-400">
            댓글이 없습니다. 의견을 공유해주세요.
          </p>
        )}
      </div>
      <PaginationBar
        size="sm"
        isCompact={true}
        currentPage={currentPage}
        totalContents={reviews.length}
        contentsPerPage={contentsPerPage}
        paginate={paginate}
      />
      <input
        type="text"
        placeholder={
          user ? '댓글을 남겨주세요.' : '로그인 후 댓글을 남겨주세요.'
        }
        value={newReview}
        disabled={user ? false : true}
        onChange={(e) => setNewReview(e.target.value)}
        className="w-full h-[100px] border p-3 rounded-lg mb-2 text-sm focus:outline-none"
      />
      {newReview.length > 0 ? (
        <Button
          onClick={handleAddReview}
          color="success"
          variant="flat"
          className="w-full text-green-600 font-semibold p-2 mt-1"
        >
          등록
        </Button>
      ) : (
        <Button isDisabled className="w-full p-2">
          등록
        </Button>
      )}
    </section>
  );
};

export default ReviewArea;
