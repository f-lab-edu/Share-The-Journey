import Link from 'next/link';
import placeData from './places.json';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BigCard from '../components/BigCard';

export default function Home() {
  return (
    <div>
      <Header />
      <section className="flex justify-center mt-10">
        <HomeTitle />
      </section>
      <SearchBar />
      <section className="mt-10 w-8/12 mx-auto">
        {placeData.map((place) => (
          <BigCard
            imgUrl={place.imgUrl}
            name={place.name}
            location={place.location}
            price={place.price}
            score={place.score}
            key={place.id}
            id={place.id}
          />
        ))}
      </section>
    </div>
  );
}

const HomeTitle = () => {
  return (
    <section>
      <div className="mb-6">
        <h1 className="font-bold text-xl">
          나만의 여행지를 공유하고, 가고싶은 여행지를 찾아보세요.
        </h1>
      </div>
      <div className="flex justify-between mb-6">
        <Link className="font-semibold" href="/">
          추천 여행지 등록하기
        </Link>
        <Link className="font-semibold" href="/">
          내가 추천한 여행지
        </Link>
      </div>
    </section>
  );
};
