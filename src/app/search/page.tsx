import { Suspense } from 'react';

import Header from '@/components/Header';
import SearchBar from '@/components/Search/SearchBar';
import SearchResult from '@/components/Search/SearchResult';

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
