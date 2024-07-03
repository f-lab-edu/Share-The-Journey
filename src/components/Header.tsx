'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import auth from '@/app/auth';

const Header = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

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
    <header className="flex justify-between mt-5">
      <Link href="/">Home</Link>
      <h1 className="font-bold text-lg">Share The Journey</h1>
      {user && <button onClick={handleLogout}>Logout</button>}
      {!user && <Link href="/login">Login</Link>}
    </header>
  );
};

export default Header;
