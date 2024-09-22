'use client';

import { Spinner } from '@nextui-org/react';

import SearchBar from '@/components/Search/SearchBar';
import HomePlaceCard from '@/components/Card/HomePlaceCard';
import PaginationBar from '@/components/Pagination';
import { useFetchPlaces } from '@/hooks/useFetchPlaces';
import { useGetContentCount } from '@/hooks/useGetContentCount';
import { usePagination } from '@/hooks/usePagination';
import { PER_PAGE } from '@/constants/perPage';

export default function Home() {
  const { totalContentCount } = useGetContentCount('places');
  const { currentPage, moveToNextPage, moveToPrevPage } = usePagination(
    1,
    Math.ceil(totalContentCount / PER_PAGE.MAIN_REVIEW_SEARCH)
  );
  const { places, isLoading, error } = useFetchPlaces(
    PER_PAGE.MAIN_REVIEW_SEARCH,
    currentPage
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-red-600 text-xl font-bold">{error}</h1>
        <p className="text-gray-500">다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div>
      <section className="flex justify-center mt-10">
        <div className="mb-6">
          <h1 className="font-bold text-xl">
            나만의 여행지를 공유하고, 가고싶은 여행지를 찾아보세요.
          </h1>
        </div>
      </section>
      <SearchBar />
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner color="default" />
        </div>
      ) : (
        <section className="mt-10 w-8/12 mx-auto">
          {places.map((place) => (
            <HomePlaceCard
              imgUrls={place.imgUrls}
              name={place.name}
              location={place.location}
              price={place.price}
              score={place.score}
              key={place.id}
              id={place.id}
            />
          ))}
          <PaginationBar
            currentPage={currentPage}
            totalContents={totalContentCount}
            contentsPerPage={PER_PAGE.MAIN_REVIEW_SEARCH}
            moveToNextPage={moveToNextPage}
            moveToPrevPage={moveToPrevPage}
          />
        </section>
      )}
    </div>
  );
}
