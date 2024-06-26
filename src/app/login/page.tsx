import Link from 'next/link';

import Header from '@/components/Header';

const Page = () => {
  return (
    <>
      <Header />
      <h1 className="w-2/4 mx-auto text-center font-bold text-2xl mb-5 mt-32">
        Login
      </h1>
      <div className="w-2/5 mx-auto rounded-lg bg-slate-100 p-3">
        <form className="mt-1">
          <label className="block">
            이메일
            <input
              className="my-2 rounded-md w-full p-1"
              type="email"
              name="email"
            />
          </label>
          <label className="block">
            비밀번호
            <input
              className="rounded-md w-full my-2 p-1"
              type="password"
              name="password"
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
