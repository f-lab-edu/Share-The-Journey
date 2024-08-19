import Image from 'next/image';
import Link from 'next/link';
import currency from 'currency.js';

import { PlaceCardProps } from '@/types/place';

const SearchResultCard = ({
  imgUrls,
  name,
  location,
  price,
  score,
  id,
}: PlaceCardProps) => {
  const priceText =
    price > 0
      ? `${currency(price, { separator: ',', precision: 1 }).format()}`
      : '무료';

  const imgUrlStr = imgUrls[0] ? imgUrls[0] : '/default.png';

  return (
    <Link href={`/detail/${id}`}>
      <section className="w-10/12 mx-auto my-5 flex p-1">
        <Image
          className="rounded-lg !h-[210px]"
          src={imgUrlStr}
          alt={name}
          width={350}
          height={250}
        />
        <div className="ml-3">
          <h2 className="font-bold mb-1">{name}</h2>
          <p className="text-sm text-slate-400 mb-1">{location}</p>
          <p className=" text-center text-xs w-7 rounded-md font-bold p-0.5 bg-yellow-400">
            {score}
          </p>
        </div>
        <p className="ml-auto mt-auto text-lg font-bold">{priceText}</p>
      </section>
    </Link>
  );
};

export default SearchResultCard;
