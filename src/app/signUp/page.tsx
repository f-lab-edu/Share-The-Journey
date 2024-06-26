import Header from '@/components/Header';

const Page = () => {
  return (
    <>
      <Header />
      <h1 className="w-2/4 mx-auto text-center font-bold text-2xl mb-5 mt-32">
        Sign Up
      </h1>
      <div className="w-2/5 mx-auto rounded-lg bg-slate-100 p-4">
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
          <label className="block">
            닉네임
            <input
              className="rounded-md w-full my-2 p-1"
              type="text"
              name="nickname"
            />
          </label>
          <button
            className="block bg-green-600 rounded-2xl p-2 w-full text-white font-semibold my-2"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
