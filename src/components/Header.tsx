'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';

import auth from '@/app/auth';
import { AuthContext } from '@/app/AuthContext';

const Header = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push('/');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <header className="flex justify-between mt-5 items-center">
      <Link href="/">Home</Link>
      <h1 className="font-bold text-lg">Share The Journey</h1>
      {user && <button onClick={handleLogout}>Logout</button>}
      {!user && <Link href="/login">Login</Link>}
    </header>
  );
};

export default Header;
