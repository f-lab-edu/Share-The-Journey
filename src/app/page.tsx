'use client';

import Header from '@/components/Header';
import SearchBar from '@/components/Search/SearchBar';
import HomePlaceCard from '@/components/Card/HomePlaceCard';
import PaginationBar from '@/components/Pagination';
import { useFetchPlaces } from '@/hooks/useFetchPlaces';
import { useGetContentCount } from '@/hooks/useGetContentCount';
import { PER_PAGE } from '@/constants/perPage';

export default function Home() {
  const { places, currentPage, moveToNextPage, moveToPrevPage } =
    useFetchPlaces(PER_PAGE.MAIN_REVIEW_SEARCH);
  const { totalContentCount } = useGetContentCount('places');

  return (
    <div>
      <Header />
      <section className="flex justify-center mt-10">
        <div className="mb-6">
          <h1 className="font-bold text-xl">
            나만의 여행지를 공유하고, 가고싶은 여행지를 찾아보세요.
          </h1>
        </div>
      </section>
      <SearchBar />
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
    </div>
  );
}
