'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/react';

import SearchIcon from '@/icons/searchIcon';

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
        <Input
          type="search"
          placeholder="여행지를 검색해보세요."
          className="w-3/4 rounded-3xl px-4 py-2 mx-auto text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<SearchIcon size={20} />}
          size="lg"
        />
      </form>
    </section>
  );
};

export default SearchBar;
