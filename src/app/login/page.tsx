'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import Header from '@/components/Header';

import auth from '@/app/auth';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        router.push('/');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Header />
      <h1 className="w-2/4 mx-auto text-center font-bold text-2xl mb-5 mt-32">
        Login
      </h1>
      <div className="w-2/5 mx-auto rounded-lg bg-slate-100 p-4">
        <form className="mt-1" onSubmit={handleSubmit}>
          <label className="block">
            <h3 className="font-semibold">이메일</h3>
            <input
              className="my-2 rounded-md w-full p-1 px-2"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block">
            <h3 className="font-semibold">비밀번호</h3>
            <input
              className="rounded-md w-full my-2 p-1 px-2"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-sm text-center my-2">아직 회원이 아니신가요?</p>
          <Link href="/signUp">
            <button
              className="block bg-yellow-400 rounded-2xl p-2 w-full mb-3 font-semibold"
              type="button"
            >
              Sign Up
            </button>
          </Link>
          <button
            className="block bg-green-600 rounded-2xl p-2 w-full text-white font-semibold mb-2"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
