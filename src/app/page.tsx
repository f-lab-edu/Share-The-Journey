'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import HomePlaceCard from '@/components/HomePlaceCard';
import PaginationBar from '@/components/Pagination';
import db from './db';
import { PlaceDetailProps } from '@/types/place';

export default function Home() {
  const [places, setPlaces] = useState<PlaceDetailProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const contentsPerPage = 5;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const q = query(collection(db, 'places'), orderBy('score', 'desc'));
        const querySnapshot = await getDocs(q);
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

  const indexOfLastContent = currentPage * contentsPerPage;
  const indexOfFirstContent = indexOfLastContent - contentsPerPage;
  const currentContents = places.slice(indexOfFirstContent, indexOfLastContent);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
        {currentContents.map((place) => (
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
          totalContents={places.length}
          contentsPerPage={contentsPerPage}
          paginate={paginate}
        />
      </section>
    </div>
  );
}
