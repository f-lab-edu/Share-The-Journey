'use client';

import { useState, useContext, useEffect } from 'react';
import { Button, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import MyPlaceCard from '@/components/MyPlaceCard';
import PaginationBar from '@/components/Pagination';
import { useFetchMyPlaces } from '@/hooks/useFetchMyPlaces';
import { useDeletePlace } from '@/hooks/useDeletePlace';
import { useGetMyPlacesCount } from '@/hooks/useGetMyPlacesCount';
import { AuthContext } from '@/contexts/AuthContext';
import { PER_PAGE } from '@/constants/perPage';

const Page = () => {
  const { user } = useContext(AuthContext);
  const [uid, setUid] = useState<string | null>(null);
  const router = useRouter();
  const { deletePlace, isLoading, deleteError } = useDeletePlace();

  const handleDeletePlace = async (id: string) => {
    await deletePlace(id).then(() => {
      if (!error) {
        fetchMyPlaces(currentPage, uid || '');
        getCount(uid);
      }
    });
  };

  useEffect(() => {
    if (user?.uid) {
      setUid(user.uid);
    }
  }, [user]);

  const {
    places,
    error,
    currentPage,
    moveToNextPage,
    moveToPrevPage,
    fetchMyPlaces,
  } = useFetchMyPlaces(PER_PAGE.MY_JOURNEY, uid || '');
  const { totalContentCount, getCount } = useGetMyPlacesCount(uid);

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner color="default" />
      </div>
    );

  if (error || deleteError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-red-600 text-xl font-bold">
          {error ? error : deleteError}
        </h1>
        <Button
          className="mt-3"
          color="danger"
          onClick={() => {
            router.push('/');
          }}
        >
          홈으로
        </Button>
      </div>
    );
  }

  if (totalContentCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="font-semibold text-lg mb-4">
          아직 등록된 여정이 없어요. 여정을 등록해주세요.
        </p>
        <Button
          type="button"
          color="primary"
          onClick={() => {
            router.push('/upload');
          }}
          className="font-semibold"
        >
          등록하러 가기
        </Button>
      </div>
    );
  }

  return (
    <div className="w-8/12 mx-auto pl-3">
      <h1 className="text-xl font-semibold mt-10 text-start mb-5">
        내가 경험한 {totalContentCount}개의 여정
      </h1>
      <div className="grid grid-cols-3 gap-10 mb-10">
        {places.map((place) => (
          <div key={place.id}>
            <MyPlaceCard
              {...place}
              onDelete={handleDeletePlace}
              isLoading={isLoading}
            />
          </div>
        ))}
      </div>
      <PaginationBar
        currentPage={currentPage}
        totalContents={totalContentCount}
        contentsPerPage={PER_PAGE.MY_JOURNEY}
        moveToNextPage={moveToNextPage}
        moveToPrevPage={moveToPrevPage}
      />
    </div>
  );
};

export default Page;
