'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import HomePlaceCard from '@/components/HomePlaceCard';
import { PlaceDetailProps } from '@/types/place';

export default function Home() {
  const [places, setPlaces] = useState<PlaceDetailProps[]>([]);

  useEffect(() => {
    fetch('/api/places')
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data.data);
      });
  }, []);

  return (
    <div>
      <Header />
      <section className="flex justify-center mt-10">
        <HomeTitle />
      </section>
      <SearchBar />
      <section className="mt-10 w-8/12 mx-auto">
        {places.map((place) => (
          <HomePlaceCard
            imgUrl={place.imgUrl}
            name={place.name}
            location={place.location}
            price={place.price}
            score={place.score}
            key={place.id}
            id={place.id}
          />
        ))}
      </section>
    </div>
  );
}

const HomeTitle = () => {
  return (
    <section>
      <div className="mb-6">
        <h1 className="font-bold text-xl">
          나만의 여행지를 공유하고, 가고싶은 여행지를 찾아보세요.
        </h1>
      </div>
      <div className="flex justify-between mb-6">
        <Link className="font-semibold" href="/upload">
          추천 여행지 등록하기
        </Link>
        <Link className="font-semibold" href="/">
          내가 추천한 여행지
        </Link>
      </div>
    </section>
  );
};
