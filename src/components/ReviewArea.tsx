'use client';

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { Button, Spinner } from '@nextui-org/react';

import db from '@/libs/db';
import { Review } from '@/types/review';
import { AuthContext } from '@/contexts/AuthContext';
import { useFetchReviews } from '@/hooks/useFetchReviews';
import { useGetContentCount } from '@/hooks/useGetContentCount';
import { PER_PAGE } from '@/constants/perPage';
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
    if (review.writer === 'unknown') {
      setUsername('unknown');
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
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    reviews,
    currentPage,
    error,
    moveToNextPage,
    moveToPrevPage,
    fetchReviews,
  } = useFetchReviews(placeId, PER_PAGE.MAIN_REVIEW_SEARCH);
  const { totalContentCount, getCount } = useGetContentCount(
    'reviews',
    null,
    placeId
  );

  const handleAddReview = async () => {
    if (newReview.trim() === '' || isLoading) return;

    const review = {
      description: newReview,
      writer: user?.uid ?? 'unknown',
      date: Date.now(),
      place_id: placeId,
    };

    setIsLoading(true);

    try {
      await addReview(review);
      setNewReview('');
      fetchReviews(currentPage);
      getCount();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-red-500 font-bold p-3 rounded-md w-3/5 mx-auto">
        <h2 className="text-xl font-extrabold mb-3 ml-2 text-slate-600">
          댓글
        </h2>
        {error}
      </div>
    );
  }

  return (
    <section className="w-3/5 mx-auto mb-10">
      <h2 className="text-xl font-extrabold mb-3 ml-2 text-slate-600">댓글</h2>
      <div>
        {reviews.length > 0 ? (
          reviews.map((review, index) => {
            return <ReviewCard key={index} review={review} />;
          })
        ) : (
          <p className="mb-5 p-2 text-slate-400">
            댓글이 없습니다. 의견을 공유해주세요.
          </p>
        )}
      </div>
      <PaginationBar
        currentPage={currentPage}
        totalContents={totalContentCount}
        contentsPerPage={PER_PAGE.MAIN_REVIEW_SEARCH}
        moveToNextPage={moveToNextPage}
        moveToPrevPage={moveToPrevPage}
      />
      <input
        type="text"
        placeholder={
          user ? '댓글을 남겨주세요.' : '로그인 후 댓글을 남겨주세요.'
        }
        value={newReview}
        disabled={!user}
        onChange={(e) => setNewReview(e.target.value)}
        className="w-full h-[100px] border p-3 rounded-lg mb-2 text-sm focus:outline-none"
      />

      <Button
        onClick={handleAddReview}
        color={newReview.trim() === '' ? 'default' : 'success'}
        variant="flat"
        isDisabled={!user || isLoading || newReview.trim() === ''}
        className="w-full text-green-600 font-semibold p-2 mt-1"
      >
        {isLoading ? <Spinner size="sm" color="success" /> : '등록'}
      </Button>
    </section>
  );
};

export default ReviewArea;
