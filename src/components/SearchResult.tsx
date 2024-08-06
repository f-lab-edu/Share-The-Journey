'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { PlaceCardProps } from '@/types/place';

import SearchResultCard from './SearchResultCard';
import db from '@/app/db';
import { collection, getDocs } from 'firebase/firestore';

const SearchResult = () => {
  const [searchResult, setSearchResult] = useState<PlaceCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  // useEffect(() => {
  //   if (!query) return;

  //   const fetchSearchResults = async () => {
  //     try {
  //       const response = await fetch('/api/search', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ query }),
  //       });

  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         setError(errorData.message);
  //         return;
  //       }

  //       const data = await response.json();
  //       setSearchResult(data.data);
  //     } catch (error) {
  //       setError('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
  //       console.error('Search error:', error);
  //     }
  //   };

  //   fetchSearchResults();
  // }, [query]);

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      try {
        const placesCollectionRef = collection(db, 'places');
        const querySnapshot = await getDocs(placesCollectionRef);
        const results: PlaceCardProps[] = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as PlaceCardProps))
          .filter((doc) =>
            doc.name.toLowerCase().includes(query.toLowerCase())
          );

        setSearchResult(results);
      } catch (error) {
        setError('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
        console.error('Firestore search error:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <section className="w-8/12 mx-auto mt-14">
      {error && (
        <>
          <p className="text-2xl text-center text-red-400 font-semibold">
            {error}
          </p>
          <p className="text-center text-red-400 mt-2">다시 시도해 주세요.</p>
        </>
      )}
      {!error &&
        searchResult.length > 0 &&
        searchResult.map((place) => (
          <div key={place.id} className="border-b-1 last:border-0">
            <SearchResultCard {...place} />
            {/* <hr className="w-10/12 mx-auto " /> */}
          </div>
        ))}
      {!error && searchResult.length === 0 && (
        <>
          <p className="text-2xl text-center text-slate-400 font-semibold">
            검색 결과를 찾을 수 없습니다.
          </p>
          <p className="text-center text-slate-400 mt-2">
            다른 검색어로 다시 시도해주세요.
          </p>
        </>
      )}
    </section>
  );
};

export default SearchResult;
