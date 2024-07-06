'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import currency from 'currency.js';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';

import { PlaceCardProps } from '@/types/place';

const Page = () => {
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
    <>
      <Header />
      <h1 className="text-center text-2xl font-bold my-10">
        {query} 검색 결과 보기
      </h1>
      <SearchBar />
      <section className="w-8/12 mx-auto mt-20">
        {searchResult &&
          searchResult.map((place) => (
            <>
              <SearchResultCard
                imgUrl={place.imgUrl}
                name={place.name}
                location={place.location}
                price={place.price}
                score={place.score}
                id={place.id}
                key={place.id}
              />
              <hr className="w-10/12 mx-auto" />
            </>
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
    </>
  );
};

export default Page;

const SearchResultCard = ({
  imgUrl,
  name,
  location,
  price,
  score,
  id,
}: PlaceCardProps) => {
  const priceText =
    price > 0
      ? `${currency(price, { separator: ',', precision: 1 }).format()}`
      : '무료';
  const imgUrlStr = imgUrl ? imgUrl : '/default.png';

  return (
    <Link href={`/detail/${id}`}>
      <section className="w-10/12 mx-auto my-5 flex p-1">
        <Image
          className="rounded-lg !h-[210px]"
          src={imgUrlStr}
          alt={name}
          width={350}
          height={250}
        />
        <div className="ml-3">
          <h2 className="font-bold mb-1">{name}</h2>
          <p className="text-sm text-slate-400 mb-1">{location}</p>
          <p className=" text-center text-xs w-7 rounded-md font-bold p-0.5 bg-yellow-400">
            {score}
          </p>
        </div>
        <p className="ml-auto mt-auto text-lg font-bold">{priceText}</p>
      </section>
    </Link>
  );
};
