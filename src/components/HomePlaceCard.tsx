import Image from 'next/image';
import Link from 'next/link';

import { PlaceCardProps } from '@/types/place';

const HomePlaceCard = ({
  imgUrl,
  name,
  score,
  location,
  price,
  id,
}: PlaceCardProps) => {
  const priceText = price > 0 ? `${price.toLocaleString()}$` : '무료';
  const imgUrlStr = imgUrl ? imgUrl : '/default.png';

  return (
    <section className="w-10/12 mb-8 mx-auto hover:border rounded-xl overflow-hidden">
      <Link href={`/detail/${id}`}>
        <Image
          src={imgUrlStr}
          alt={name}
          width={900}
          height={400}
          className="!h-[400px]"
        />
        <div className="flex justify-between px-3 my-4 font-bold text-2xl">
          <p>
            {name}, {location}, {priceText}
          </p>
          <p>별점 {score}</p>
        </div>
      </Link>
    </section>
  );
};

export default HomePlaceCard;
