import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Header />
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
