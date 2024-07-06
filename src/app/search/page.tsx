import { Suspense } from 'react';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import SearchResult from '@/components/SearchResult';

const Page = () => {
  return (
    <>
      <Header />
      <h1 className="text-center text-2xl font-bold my-10">검색 결과 보기</h1>
      <SearchBar />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResult />
      </Suspense>
    </>
  );
};

export default Page;
