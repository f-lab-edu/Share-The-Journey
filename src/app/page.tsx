import Link from 'next/link';
import Image from 'next/image';
import placeData from './places.json';

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
          />
        ))}
      </section>
    </div>
  );
}

const Header = () => {
  return (
    <header className="flex justify-between mt-5">
      <h1 className="font-bold text-lg">Share The Journey</h1>
      <Link href="/login">Login</Link>
    </header>
  );
};

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

const SearchBar = () => {
  return (
    <section className="flex justify-center w-8/12 mx-auto">
      <input
        type="search"
        placeholder="여행지를 검색해보세요."
        className="w-3/4 border rounded-3xl border-slate-300 px-3 py-2"
      />
    </section>
  );
};

type CardProps = {
  imgUrl: string;
  name: string;
  score: number;
  location: string;
  price: number;
};

const BigCard = ({ imgUrl, name, score, location, price }: CardProps) => {
  const priceText = price > 0 ? `${price}$` : '무료';

  return (
    <section className="w-10/12 mb-8 mx-auto hover:border rounded-xl overflow-hidden">
      <Link href="#">
        <Image
          src={imgUrl}
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
