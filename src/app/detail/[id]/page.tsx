import ReviewArea from '@/components/ReviewArea';
import ImgCarousel from '@/components/ImgCarousel';
import PlaceInfo from '@/components/PlaceInfo';
import { useFetchPlace } from '@/hooks/useFetchPlace';

const Page = async ({ params }: { params: { id: string } }) => {
  const place = await useFetchPlace(params.id);

  if (!place) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-bold text-slate-600">
        해당 장소가 존재하지 않습니다.
      </div>
    );
  }

  return (
    <>
      <ImgCarousel imgUrls={place.imgUrls} />
      <PlaceInfo {...place} />
      <ReviewArea placeId={params.id} />
    </>
  );
};

export default Page;
