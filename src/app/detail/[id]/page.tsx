'use client';

import { Spinner } from '@nextui-org/react';

import ReviewArea from '@/components/ReviewArea';
import ImgCarousel from '@/components/ImgCarousel';
import PlaceInfo from '@/components/PlaceInfo';
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

  if (!placeData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>해당 장소가 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    <>
      <ImgCarousel imgUrls={placeData.imgUrls} />
      <PlaceInfo {...placeData} />
      <ReviewArea placeId={params.id} />
    </>
  );
};

export default Page;
