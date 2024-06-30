import Header from '@/components/Header';

const Page = () => {
  return (
    <>
      <Header />
      <h1 className="mt-20 text-center font-bold text-2xl mb-5">
        추천 여행지 등록하기
      </h1>
      <div className="w-3/5 mx-auto bg-slate-100 p-4 rounded-lg mb-10">
        <form>
          <label className="block">
            <h3 className="font-semibold">이름</h3>
            <input className="w-full p-1 px-2 rounded-md my-2" type="text" />
          </label>
          <label className="block">
            <h3 className="font-semibold">위치</h3>
            <input className="w-full p-1 px-2 rounded-md my-2" type="text" />
          </label>
          <label className="block">
            <h3 className="font-semibold">가격</h3>
            <input className="w-full p-1 px-2 rounded-md my-2" type="number" />
          </label>
          <label className="block">
            <h3 className="font-semibold">편의시설</h3>
            <input className="w-full p-1 px-2 rounded-md my-2" type="text" />
          </label>
          <label className="block">
            <h3 className="font-semibold">한줄평</h3>
            <input className="w-full p-1 px-2 rounded-md my-2" type="text" />
          </label>
          <label className="block">
            <h3 className="font-semibold">별점</h3>
            <input
              className="w-full p-1 px-2 rounded-md my-2"
              type="number"
              min={0}
              max={5}
            />
          </label>
          <label className="block">
            <h3 className="font-semibold">사진</h3>
            <input
              className="w-full p-1 my-2 text-slate-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-200 hover:file:text-slate-400"
              type="file"
              accept="image/*"
            />
          </label>

          <button className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg my-3">
            여행지 등록하기
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
