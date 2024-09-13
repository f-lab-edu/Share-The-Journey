'use client';

import { useContext, useState } from 'react';
import { Button, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import MyPlaceCard from '@/components/Card/MyPlaceCard';
import PaginationBar from '@/components/Pagination';
import { useFetchMyPlaces } from '@/hooks/useFetchMyPlaces';
import { deletePlace } from '@/utils/places';
import { useGetMyPlacesCount } from '@/hooks/useGetMyPlacesCount';
import { AuthContext } from '@/contexts/AuthContext';
import { PER_PAGE } from '@/constants/perPage';
import { usePagination } from '@/hooks/usePagination';

const Page = () => {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useContext(AuthContext);
  const uid = user?.uid || '';
  const router = useRouter();

  const { totalContentCount, getCount } = useGetMyPlacesCount(uid);
  const { currentPage, moveToNextPage, moveToPrevPage, setPage } =
    usePagination(1, Math.ceil(totalContentCount! / PER_PAGE.MY_JOURNEY));
  const { places, error, fetchMyPlaces, isLoading } = useFetchMyPlaces(
    currentPage,
    PER_PAGE.MY_JOURNEY,
    uid
  );

  const handleDeletePlace = async (id: string) => {
    if (isDeleting) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deletePlace(id);
      fetchMyPlaces(currentPage, uid || '');
      getCount(uid);
    } catch (error) {
      setDeleteError('장소를 삭제하는 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user || totalContentCount === null || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner color="default" />
      </div>
    );
  }

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
      {places.length === 0 && currentPage > 1 ? (
        // 임시 처리
        <div className="flex-col">
          <p className="text-center text-lg font-semibold">
            해당 페이지에 등록된 여정이 없습니다.
          </p>
          <Button
            color="warning"
            size="lg"
            onClick={() => setPage(currentPage - 1)}
          >
            이전 페이지로
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-10 mb-10">
            {places.map((place) => (
              <div key={place.id}>
                <MyPlaceCard
                  {...place}
                  onDelete={handleDeletePlace}
                  isLoading={isDeleting}
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
        </>
      )}
    </div>
  );
};

export default Page;
