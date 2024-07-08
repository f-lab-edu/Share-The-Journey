import { Input, Checkbox, CheckboxGroup } from '@nextui-org/react';

import Header from '@/components/Header';

const Page = () => {
  return (
    <>
      <Header />
      <h1 className="mt-20 text-center font-bold text-2xl mb-5">
        추천 여행지 등록하기
      </h1>
      <div className="w-3/5 mx-auto bg-slate-100 p-4 rounded-lg mb-10">
        <form className="flex flex-wrap">
          <div className="mb-3 font-semibold w-full">
            <Input
              type="text"
              isRequired
              label="이름"
              labelPlacement="outside"
              placeholder="이름을 입력해 주세요."
              variant="bordered"
              className="bg-white rounded-xl"
            />
          </div>
          <div className="mb-3 font-semibold w-full">
            <Input
              type="text"
              isRequired
              label="위치"
              labelPlacement="outside"
              placeholder="위치를 입력해 주세요. ex) 서울특별시 강남구 역삼동 123-45"
              variant="bordered"
              className="bg-white rounded-xl"
            />
          </div>
          <div className="mb-3 font-semibold w-full">
            <Input
              color="default"
              isRequired
              type="number"
              placeholder="0.00"
              label="가격"
              labelPlacement="outside"
              variant="bordered"
              className="bg-white rounded-xl"
              min={0}
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </div>
          <div className="mb-3 font-semibold w-full">
            <Input
              label="평점"
              labelPlacement="outside"
              placeholder="0~5 사이의 숫자를 입력해 주세요. ex) 4.5"
              isRequired
              variant="bordered"
              className="bg-white rounded-xl"
              type="number"
              min={0}
              max={5}
            />
          </div>
          <div className="mb-3 font-semibold w-full">
            <Input
              type="text"
              label="한줄평"
              labelPlacement="outside"
              placeholder="여행지의 간단한 소감을 입력해주세요!"
              isRequired
              variant="bordered"
              className="bg-white rounded-xl"
            />
          </div>
          <div className="mb-3 text-black w-full">
            <CheckboxGroup
              className="label:text-black"
              label={
                <span className="text-black text-sm font-semibold">
                  편의시설
                </span>
              }
              orientation="horizontal"
              color="primary"
              radius="md"
            >
              <Checkbox size="md" value="bathroom">
                화장실
              </Checkbox>
              <Checkbox size="md" value="parking">
                주차장
              </Checkbox>
            </CheckboxGroup>
          </div>
          <label className="block">
            <h3 className="text-sm font-semibold">사진</h3>
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
