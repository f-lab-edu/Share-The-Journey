'use client';

import { Spinner } from '@nextui-org/react';

import PlaceForm from '@/components/PlaceForm';
import { useFetchPlace } from '@/hooks/useFetchPlace';

const Page = ({ params }: { params: { id: string } }) => {
  const { placeData, placeError, isLoading } = useFetchPlace(params.id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner color="default" />
      </div>
    );
  }

  if (placeError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>{placeError}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mt-20 text-center font-bold text-2xl mb-5">
        나의 여행지 수정하기
      </h1>
      <PlaceForm
        initialData={placeData ?? undefined}
        mode={'edit'}
        id={params.id}
      />
    </div>
  );
};

export default Page;
