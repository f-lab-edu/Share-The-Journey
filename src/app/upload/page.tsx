'use client';

import { useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';
import PlaceForm from '@/components/PlaceForm';

const Page = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // fail-fast
    return <></>;
  }

  return (
    <>
      <h1 className="mt-20 text-center font-bold text-2xl mb-5">
        추천 여행지 등록하기
      </h1>
      <PlaceForm mode={'upload'} userId={user.uid} />
    </>
  );
};

export default Page;
