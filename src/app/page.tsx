'use client';

import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import HomePlaceCard from '@/components/HomePlaceCard';
import db from './db';
import { AuthContext } from './AuthContext';
import { PlaceDetailProps } from '@/types/place';

export default function Home() {
  const [places, setPlaces] = useState<PlaceDetailProps[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'places'));
        const placeData: PlaceDetailProps[] = [];

        querySnapshot.forEach((doc) => {
          placeData.push({ id: doc.id, ...doc.data() } as PlaceDetailProps);
        });

        setPlaces(placeData);
      } catch (e) {
        console.error('Error getting documents: ', e);
      }
    };

    fetchPlaces();
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
  const { user } = useContext(AuthContext);
  const uploadLink = user ? '/upload' : '/login';
  const myJourneyListLink = user ? '/' : '/login';

  const handleClickLink = () => {
    if (!user) {
      alert('로그인 후 이용해주세요.');
    }
  };
  return (
    <section>
      <div className="mb-6">
        <h1 className="font-bold text-xl">
          나만의 여행지를 공유하고, 가고싶은 여행지를 찾아보세요.
        </h1>
      </div>
      <div className="flex justify-between mb-6">
        <Link
          className="font-semibold"
          href={uploadLink}
          onClick={handleClickLink}
        >
          추천 여행지 등록하기
        </Link>
        <Link
          className="font-semibold"
          href={myJourneyListLink}
          onClick={handleClickLink}
        >
          내가 추천한 여행지
        </Link>
      </div>
    </section>
  );
};
