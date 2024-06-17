import Image from 'next/image';

import placeInfo from '../../places.json';

import Header from '@/components/Header';

type PlaceProps = {
  imgUrl: string;
  name: string;
  location: string;
  price: number;
  score: number;
  registrant: string;
  description: string;
};

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const place: PlaceProps | undefined = placeInfo.find(
    (place) => place.id === Number(id)
  );

  return (
    <>
      <Header />
      <Image
        src={place!.imgUrl}
        alt={place!.name}
        width={1200}
        height={600}
        className="!h-[400px] !w-[700px] mx-auto my-20 rounded-lg"
      />
      <PlaceInfo {...place!} />
    </>
  );
};

export default Page;

const PlaceInfo = ({
  name,
  location,
  price,
  description,
  score,
  registrant,
}: PlaceProps) => {
  return (
    <section className="bg-gray-300 rounded-md p-3 w-9/12 mx-auto mb-10">
      <h1 className="text-xl font-extrabold mb-3">이름: {name}</h1>
      <h3 className="font-semibold mb-3">등록자: {registrant}</h3>
      <p className="mb-3">주소: {location}</p>
      <p className="mb-3">가격 정보: {price > 0 ? `${price}$` : 'free'}</p>
      <p className="mb-3">주변시설: 주차장 있음, 화장실 있음</p>
      <p className=" text-lg font-bold">한줄평: {description}</p>
    </section>
  );
};
