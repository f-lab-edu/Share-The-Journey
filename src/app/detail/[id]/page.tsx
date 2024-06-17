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
    </>
  );
};

export default Page;
