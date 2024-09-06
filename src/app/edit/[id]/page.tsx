import { Spinner } from '@nextui-org/react';

import PlaceForm from '@/components/PlaceForm';
import { useFetchPlace } from '@/hooks/useFetchPlace';

const Page = async ({ params }: { params: { id: string } }) => {
  const placeData = await useFetchPlace(params.id);

  if (!placeData) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="mt-20 text-center font-bold text-2xl mb-5">
        나의 여행지 수정하기
      </h1>
      <PlaceForm initialData={placeData} mode={'edit'} />
    </div>
  );
};

export default Page;
