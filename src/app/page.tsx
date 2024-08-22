'use client';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import HomePlaceCard from '@/components/HomePlaceCard';
import PaginationBar from '@/components/Pagination';
import { useFetchPlaces } from '@/hooks/useFetchPlaces';
import { useGetContentCount } from '@/hooks/useGetContentCount';

export default function Home() {
  const contentsPerPage = 5;
  const { places, currentPage, paginate } = useFetchPlaces(contentsPerPage);
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
          size="lg"
          isCompact={false}
          currentPage={currentPage}
          totalContents={totalContentCount}
          contentsPerPage={contentsPerPage}
          paginate={paginate}
        />
      </section>
    </div>
  );
}
