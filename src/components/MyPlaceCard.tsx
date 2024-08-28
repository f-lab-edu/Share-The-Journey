import Image from 'next/image';
import currency from 'currency.js';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from '@nextui-org/react';

import StarIcon from '@/icons/starIcon';
import { PlaceCardProps } from '@/types/place';

const MyPlaceCard = ({
  imgUrls,
  price,
  location,
  score,
  name,
}: PlaceCardProps) => {
  const imgUrlStr = imgUrls[0] ? imgUrls[0] : '/default.png';
  const priceText =
    price > 0
      ? `${currency(price, {
          symbol: '₩',
          separator: ',',
          precision: 0,
        }).format()}`
      : '무료';
  return (
    <div className="flex flex-col items-center">
      <Card className="py-4 px-2">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <div className="flex justify-between w-full">
            <p className="text-md uppercase font-bold">{location}</p>
            <div className="flex gap-1 items-center text-sm text-default-500">
              <StarIcon />
              <p>{score}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 font-semibold">{priceText}</p>
          <h2 className="font-bold text-lg mb-2">{name}</h2>
        </CardHeader>
        <CardBody className="overflow-visible relative w-[270px] h-[200px] mx-2">
          <Image
            src={imgUrlStr}
            alt={name}
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="rounded-lg object-cover"
            priority
          />
        </CardBody>
        <CardFooter className="gap-2 flex justify-evenly pb-0">
          <Button color="success" className="flex-grow">
            수정
          </Button>
          <Button color="danger" className="flex-grow">
            삭제
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyPlaceCard;
