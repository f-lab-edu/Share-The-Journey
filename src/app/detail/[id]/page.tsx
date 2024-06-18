import Image from 'next/image';
import { format, parse } from 'date-fns';

import placeInfo from '../../places.json';
import reviewInfo from '../../reviews.json';

import Header from '@/components/Header';

import { PlaceInfoProps } from '@/types/place';

type Review = {
  description: string;
  writer: string;
  score: number;
  date: string;
  review_id: number;
};

type ReviewProps = {
  reviews: Review[];
};

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const place: PlaceInfoProps | undefined = placeInfo.find(
    (place) => place.id === Number(id)
  );

  if (!place) {
    return (
      <>
        <Header />
        <div>해당 장소가 존재하지 않습니다.</div>
      </>
    );
  }

  const reviewList: Review[] = reviewInfo.filter(
    (review) => review.place_id === Number(id)
  )[0].reviews;
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
      <ReviewArea reviews={reviewList} />
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
  facilities,
}: PlaceInfoProps) => {
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
        가격 정보: {price > 0 ? `${price.toLocaleString()}$` : 'free'}
      </p>
      <p className="mb-3">주변시설: {facilities.join(', ')}</p>
      <p className=" text-lg font-bold">한줄평: {description}</p>
    </section>
  );
};

const ReviewArea = ({ reviews }: ReviewProps) => {
  return (
    <section className="w-9/12 mx-auto  bg-gray-300 p-3 rounded-md mb-10">
      <h2 className="text-xl font-extrabold mb-5">리뷰</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          const parsedDate = parse(review.date, 'yyyy-MM-dd', new Date());
          const formattedDate = format(parsedDate, 'yyyy.MM.dd');

          return (
            <div
              key={review.review_id}
              className="mb-5 border p-3 rounded-md bg-white"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-bold">작정자: {review.writer}</h3>
                <p className="font-semibold mb-1">
                  별점: <span className="text-amber-400">{review.score}</span>
                </p>
              </div>
              <p className="mb-1">{review.description}</p>
              <p className="font-semibold text-zinc-300">
                작성일: {formattedDate}
              </p>
            </div>
          );
        })
      ) : (
        <p className="mb-5 border p-2 rounded-md bg-white">리뷰가 없습니다.</p>
      )}
      <input
        type="text"
        placeholder="리뷰를 작성해주세요."
        className="w-full border p-2 rounded-md h-[100px]"
      />
    </section>
  );
};
