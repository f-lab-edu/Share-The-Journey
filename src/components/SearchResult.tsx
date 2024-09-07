'use client';

import { useSearchParams } from 'next/navigation';

import SearchResultCard from './SearchResultCard';
import PaginationBar from './Pagination';
import { useFetchSearchPlaces } from '@/hooks/useFetchSearchPlaces';
import { useGetContentCount } from '@/hooks/useGetContentCount';

const SearchResult = () => {
  const contentsPerPage = 5; // COM(MINOR): 상수가 렌더링 과정에 평가되어야 할까?
  const searchParams = useSearchParams();
  // COM: searchParm을 컴포넌트 내부에서 관리하는 것과 외부에서 관리하는 것은 어떤 장단점이 있을까? 극단적으로, fetch 결과를 외부에서 주입하는 것과 내부에서 관리하는 것 어떤 장단점이 있을까?
  const query = searchParams.get('query');
  const { places, error, currentPage, moveToNextPage, moveToPrevPage } =
    useFetchSearchPlaces(contentsPerPage, query);
  const { totalContentCount } = useGetContentCount('places', query);

  return (
    <section className='w-8/12 mx-auto mt-20'>
      <div className='mb-14'>
        {error && (
          <>
            <p className='text-2xl text-center text-red-400 font-semibold'>
              {error}
            </p>
            <p className='text-center text-red-400 mt-2'>다시 시도해 주세요.</p>
          </>
        )}
        {!error && places.length > 0 && (
          <>
            {places.map((place, index) => (
              <SearchResultCard {...place} key={place.id} />
            ))}
            <div className='mt-14'>
              <PaginationBar
                currentPage={currentPage}
                totalContents={totalContentCount}
                contentsPerPage={contentsPerPage}
                moveToNextPage={moveToNextPage}
                moveToPrevPage={moveToPrevPage}
              />
            </div>
          </>
        )}
        {!error && places.length === 0 && (
          <>
            <p className='text-2xl text-center text-slate-400 font-semibold'>
              검색 결과를 찾을 수 없습니다.
            </p>
            <p className='text-center text-slate-400 mt-2'>
              다른 검색어로 다시 시도해주세요.
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default SearchResult;
