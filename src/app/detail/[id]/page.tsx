import Image from 'next/image';
import currency from 'currency.js';
import { format, parse } from 'date-fns';
import { doc, getDoc } from 'firebase/firestore';

import reviewInfo from '../../reviews.json';

import Header from '@/components/Header';
import db from '@/app/db';

import { PlaceDetailProps } from '@/types/place';
import StarIcon from '@/icons/starIcon';

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

  // 리뷰는 임시로 고정된 데이터 사용
  const reviewList: Review[] = reviewInfo.filter(
    (review) => review.place_id === 1
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
    <section className="bg-white p-3 w-3/5 mx-auto mb-10 text-slate-600">
      <h1 className="text-xl font-extrabold mb-5 flex items-center gap-1">
        {name}
        <StarIcon />
        <span className="font-semibold text-sm text-slate-600">{score}</span>
      </h1>
      <div className="flex justify-between mb-3">
        <h3 className="font-bold mb-3 text-medium text-slate-400">
          등록자{' '}
          <p className="font-medium pt-1 text-slate-600 text-sm">
            {registrant}
          </p>
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
                <h3 className="text-lg font-bold">작성자: {review.writer}</h3>
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
