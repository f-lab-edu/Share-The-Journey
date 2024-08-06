import Link from 'next/link';
import currency from 'currency.js';
import { Card, CardHeader, CardFooter, Image } from '@nextui-org/react';

import StarIcon from '@/icons/starIcon';
import { PlaceCardProps } from '@/types/place';

const HomePlaceCard = ({
  imgUrls,
  name,
  score,
  location,
  price,
  id,
}: PlaceCardProps) => {
  const priceText =
    price > 0
      ? `${currency(price, { separator: ',', precision: 1 }).format()}`
      : '무료';

  return (
    <section className="w-9/12 mb-8 mx-auto rounded-xl overflow-hidden">
      <Link href={`/detail/${id}`}>
        <Card
          isFooterBlurred
          isPressable
          className="w-full h-[380px] col-span-12 sm:col-span-7"
        >
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              {location}
            </p>
            <h4 className="text-white/90 font-bold text-xl">{name}</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src={imgUrls[0]}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 font-semibold text-white/60">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-1">
                <StarIcon />
                <p>{score}</p>
              </div>
              <p>{priceText}</p>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </section>
  );
};

export default HomePlaceCard;
