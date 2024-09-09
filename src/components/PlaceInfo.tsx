'use client';

import currency from 'currency.js';

import { useGetUserName } from '@/hooks/useGetUserName';
import { PlaceDetailProps } from '@/types/place';
import StarIcon from '@/icons/starIcon';

const PlaceInfo = ({
  name,
  location,
  price,
  review,
  score,
  registrant,
  amenities,
}: PlaceDetailProps) => {
  let { userName, nameError } = useGetUserName(registrant);
  const priceText =
    price > 0
      ? `${currency(price, {
          symbol: '₩',
          separator: ',',
          precision: 0,
        }).format()}`
      : '무료';

  const amenitiesText =
    amenities.length > 0 ? amenities.join(', ') : '정보 없음';

  if (nameError) {
    userName = '알 수 없는 이용자';
  }

  return (
    <section className="bg-white p-3 w-3/5 mx-auto mb-10 text-slate-600">
      <h1 className="text-xl font-extrabold mb-5 flex items-center gap-1">
        {name}
        <StarIcon />
        <span className="font-semibold text-sm text-slate-600">{score}</span>
      </h1>
      <div className="flex justify-between mb-3">
        <h3 className="font-bold mb-3 text-medium text-slate-400">
          작성자{' '}
          <p className="font-medium pt-1 text-slate-600 text-sm">{userName}</p>
        </h3>
        <div className="mb-3 font-bold text-slate-400">
          위치 <p className="font-medium text-sm text-slate-600">{location}</p>
        </div>
        <div className="mb-3 font-bold text-slate-400">
          편의시설{' '}
          <p className="font-medium text-sm text-slate-600">{amenitiesText}</p>{' '}
        </div>
        <div className="mb-3 font-bold text-slate-400">
          가격{' '}
          <p className="text-sm font-semibold text-slate-600">{priceText}</p>
        </div>
      </div>
      <div className="text-lg font-bold text-slate-400">
        작성자의 리뷰
        <p className="font-bold text-medium text-slate-600">{review}</p>
      </div>
    </section>
  );
};

export default PlaceInfo;
