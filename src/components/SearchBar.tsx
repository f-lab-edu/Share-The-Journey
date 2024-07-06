'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim() === '') return;
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="w-8/12 mx-auto">
      <form
        onSubmit={handleSearchSubmit}
        className="w-full flex justify-center"
      >
        <input
          type="search"
          placeholder="여행지를 검색해보세요."
          className="w-3/4 border rounded-3xl border-slate-300 px-3 py-2 mx-auto"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </section>
  );
};

export default SearchBar;
