'use client';

import { useSearchParams } from 'next/navigation';

import SearchResultCard from './SearchResultCard';
import PaginationBar from './Pagination';
import { useFetchPlaces } from '@/hooks/useFetchPlaces';
import { useGetContentCount } from '@/hooks/useGetContentCount';

const SearchResult = () => {
  const contentsPerPage = 5;
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const { places, error, currentPage, paginate } = useFetchPlaces(
    contentsPerPage,
    query
  );
  const { totalContentCount } = useGetContentCount('places', query);

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
        {!error && places.length > 0 && (
          <>
            {places.map((place) => (
              <div key={place.id}>
                <SearchResultCard {...place} />
                <hr className="w-10/12 mx-auto" />
              </div>
            ))}
            <div className="mt-14">
              <PaginationBar
                size="lg"
                isCompact={false}
                currentPage={currentPage}
                totalContents={totalContentCount}
                contentsPerPage={contentsPerPage}
                paginate={paginate}
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
