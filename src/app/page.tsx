'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import HomePlaceCard from '@/components/HomePlaceCard';
import db from './db';
import { PlaceDetailProps } from '@/types/place';

export default function Home() {
  const [places, setPlaces] = useState<PlaceDetailProps[]>([]);

  useEffect(() => {
    // fetch('/api/places')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setPlaces(data.data);
    //   });
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
      </section>
    </div>
  );
}
