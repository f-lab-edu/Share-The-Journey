import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between mt-5">
      <Link href="/">Home</Link>
      <h1 className="font-bold text-lg">Share The Journey</h1>
      <Link href="/login">Login</Link>
    </header>
  );
};

export default Header;
