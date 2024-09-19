'use client';

import { useSearchParams } from 'next/navigation';
import { Spinner } from '@nextui-org/react';

import SearchResultCard from './SearchResultCard';
import PaginationBar from '@/components/Pagination';
import { useFetchSearchPlaces } from '@/hooks/useFetchSearchPlaces';
import { useGetContentCount } from '@/hooks/useGetContentCount';
import { usePagination } from '@/hooks/usePagination';
import { PER_PAGE } from '@/constants/perPage';

const SearchResult = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const { totalContentCount } = useGetContentCount('places', query);
  const { currentPage, moveToNextPage, moveToPrevPage } = usePagination(
    1,
    Math.ceil(totalContentCount / PER_PAGE.MAIN_REVIEW_SEARCH)
  );
  const { places, error, isLoading } = useFetchSearchPlaces(
    PER_PAGE.MAIN_REVIEW_SEARCH,
    query,
    currentPage
  );

  return (
    <section className="w-8/12 mx-auto mt-20">
      <div className="mb-14">
        {error && (
          <>
            <p className="text-2xl text-center text-red-400 font-semibold">
              {error}
            </p>
            <p className="text-center text-red-400 mt-2">다시 시도해 주세요.</p>
          </>
        )}
        {!error && isLoading && (
          <div className="flex items-center justify-center h-screen">
            <Spinner color="default" />
          </div>
        )}
        {!error && places.length > 0 && (
          <>
            {places.map((place, index) => (
              <SearchResultCard {...place} key={place.id} />
            ))}
            <div className="mt-14">
              <PaginationBar
                currentPage={currentPage}
                totalContents={totalContentCount}
                contentsPerPage={PER_PAGE.MAIN_REVIEW_SEARCH}
                moveToNextPage={moveToNextPage}
                moveToPrevPage={moveToPrevPage}
              />
            </div>
          </>
        )}
        {!error && places.length === 0 && (
          <>
            <p className="text-2xl text-center text-slate-400 font-semibold">
              검색 결과를 찾을 수 없습니다.
            </p>
            <p className="text-center text-slate-400 mt-2">
              다른 검색어로 다시 시도해주세요.
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default SearchResult;
