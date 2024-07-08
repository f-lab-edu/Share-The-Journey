'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { PlaceCardProps } from '@/types/place';

import SearchResultCard from './SearchResultCard';

const SearchResult = () => {
  const [searchResult, setSearchResult] = useState<PlaceCardProps[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        setSearchResult(data.data);
      } catch (error) {
        console.error('Search error:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <section className="w-8/12 mx-auto mt-20">
      {searchResult &&
        searchResult.map((place) => (
          <div key={place.id}>
            <SearchResultCard
              imgUrl={place.imgUrl}
              name={place.name}
              location={place.location}
              price={place.price}
              score={place.score}
              id={place.id}
            />
            <hr className="w-10/12 mx-auto" />
          </div>
        ))}
      {searchResult.length === 0 && (
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
