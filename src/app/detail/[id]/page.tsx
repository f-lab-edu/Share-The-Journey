import Image from 'next/image';
import currency from 'currency.js';

import { doc, getDoc } from 'firebase/firestore';

import Header from '@/components/Header';
import ReviewArea from '@/components/ReviewArea';
import db from '@/app/db';

import { PlaceDetailProps } from '@/types/place';

const fetchPlace = async (id: string): Promise<PlaceDetailProps | null> => {
  const docRef = doc(db, 'places', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as PlaceDetailProps;
  }

  return null;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const place = await fetchPlace(params.id);

  if (!place) {
    return (
      <>
        <Header />
        <div>해당 장소가 존재하지 않습니다.</div>
      </>
    );
  }

  const imgUrlStr = place.imgUrl ? place.imgUrl : '/default.png';

  return (
    <>
      <Header />
      <Image
        src={imgUrlStr}
        alt={place.name}
        width={1200}
        height={600}
        className="!h-[400px] !w-[700px] mx-auto my-20 rounded-lg"
      />
      <PlaceInfo {...place} />
      <ReviewArea placeId={params.id} />
    </>
  );
};

export default Page;

const PlaceInfo = ({
  name,
  location,
  price,
  review,
  score,
  registrant,
  amenities,
}: PlaceDetailProps) => {
  const priceText =
    price > 0
      ? `${currency(price, { separator: ',', precision: 1 }).format()}`
      : '무료';

  const amenitiesText =
    amenities.length > 0 ? amenities.join(', ') : '정보 없음';

  return (
    <section className="bg-gray-300 rounded-md p-3 w-9/12 mx-auto mb-10">
      <div className="flex justify-between">
        <h1 className="text-xl font-extrabold mb-3">이름: {name}</h1>
        <p className="font-semibold mb-1">
          별점: <span className="text-amber-500 pr-1">{score}</span>
        </p>
      </div>
      <h3 className="font-semibold mb-3">등록자: {registrant}</h3>
      <p className="mb-3">주소: {location}</p>
      <p className="mb-3">
        가격 정보: <span className="font-semibold">{priceText}</span>
      </p>
      <p className="mb-3">편의시설: {amenitiesText}</p>
      <p className=" text-lg font-bold">한줄평: {review}</p>
    </section>
  );
};
