import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Header />
      <section className="flex justify-center mt-10">
        <HomeTitle />
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
    <section className="w-3/4">
      <div className="flex justify-center mb-6">
        <h1 className="font-bold text-xl">
          나만의 여행지를 공유하고, 가고싶은 여행지를 찾아보세요.
        </h1>
      </div>
      <div className="flex justify-between mb-6">
        <Link className="ml-10 font-semibold" href="/">
          추천 여행지 등록하기
        </Link>
        <Link className="mr-10 font-semibold" href="/">
          내가 추천한 여행지
        </Link>
      </div>
    </section>
  );
};
