import Image from 'next/image';
import currency from 'currency.js';
import { doc, getDoc } from 'firebase/firestore';
import ReviewArea from '@/components/ReviewArea';
import db from '@/app/db';

import { PlaceDetailProps } from '@/types/place';
import StarIcon from '@/icons/starIcon';

const fetchPlace = async (id: string): Promise<PlaceDetailProps | null> => {
  const docRef = doc(db, 'places', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as PlaceDetailProps;
  }

  return null;
};

const getUserName = async (uid: string) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    return userDoc.data().nickname;
  }

  return null;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const place = await fetchPlace(params.id);

  if (!place) {
    return (
      <div>해당 장소가 존재하지 않습니다.</div>
    );
  }
  return (
    <>
      <Image
        src={place.imgUrl ?? '/default.png'}
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

const PlaceInfo = async ({
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
  const userName = (await getUserName(registrant)) ?? '유저의 이름을 가져오지 못했습니다.';

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
