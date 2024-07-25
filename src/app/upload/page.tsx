'use client';

import { Input, Checkbox, CheckboxGroup } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import Header from '@/components/Header';
import db from '../db';
import { AuthContext } from '../AuthContext';

type NewPlaceForm = {
  name: string;
  location: string;
  price: number;
  score: number;
  review: string;
  amenities: string[];
  imgUrl: string | null;
  registrant: string;
};

const Page = () => {
  const { user } = useContext(AuthContext);
  const [newPlace, setNewPlace] = useState<Partial<NewPlaceForm>>({});
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  if (!user) {
    // fail-fast
    return <></>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlace((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'score' ? parseFloat(value) : value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setNewPlace((prev) => {
      const prevAmenities = prev.amenities ?? [];
      const newAmenities = checked
        ? [...prevAmenities, value]
        : prevAmenities.filter((a) => a !== value);
      return {
        ...prev,
        amenities: newAmenities,
      };
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    const { name, location, price, score, review, amenities } = newPlace;
    e.preventDefault();

    if (
      !name ||
      !location ||
      price === undefined ||
      price <= 0 ||
      score === undefined ||
      score < 0 ||
      score > 5 ||
      !review ||
      !amenities
    ) {
      alert('모든 필수 입력 항목을 입력해 주세요.');
      return;
    }

    try {
      let imgUrl = '';

      if (file) {
        const storage = getStorage();
        const imageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(imageRef, file);
        imgUrl = await getDownloadURL(imageRef);
      }

      const newPlaceData = {
        ...newPlace,
        imgUrl: imgUrl,
      };

      await addDoc(collection(db, 'places'), newPlaceData);
      router.push('/');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <>
      <Header />
      <h1 className="mt-20 text-center font-bold text-2xl mb-5">
        추천 여행지 등록하기
      </h1>
      <div className="w-3/5 mx-auto bg-slate-100 p-4 rounded-lg mb-10">
        <form className="flex flex-wrap" onSubmit={handleSubmit}>
          <div className="mb-3 font-semibold w-full">
            <Input
              type="text"
              isRequired
              name="name"
              label="이름"
              labelPlacement="outside"
              placeholder="이름을 입력해 주세요."
              variant="bordered"
              className="bg-white rounded-xl"
              value={newPlace.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 font-semibold w-full">
            <Input
              type="text"
              isRequired
              name="location"
              label="위치"
              labelPlacement="outside"
              placeholder="위치를 입력해 주세요. ex) 서울특별시 강남구 역삼동 123-45"
              variant="bordered"
              className="bg-white rounded-xl"
              value={newPlace.location}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 font-semibold w-full">
            <Input
              color="default"
              isRequired
              name="price"
              type="number"
              placeholder="0.00"
              label="가격"
              labelPlacement="outside"
              variant="bordered"
              className="bg-white rounded-xl"
              min={0}
              value={
                newPlace.price !== undefined
                  ? newPlace.price.toString()
                  : '0.00'
              }
              onChange={handleChange}
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
              name="score"
              variant="bordered"
              className="bg-white rounded-xl"
              type="number"
              step={0.1}
              min={0}
              max={5}
              value={
                newPlace.score !== undefined ? newPlace.score.toString() : '0.0'
              }
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 font-semibold w-full">
            <Input
              type="text"
              label="한줄평"
              labelPlacement="outside"
              placeholder="여행지의 간단한 소감을 입력해주세요!"
              isRequired
              name="review"
              variant="bordered"
              className="bg-white rounded-xl"
              value={newPlace.review}
              onChange={handleChange}
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
              <Checkbox
                size="md"
                value="bathroom"
                checked={(newPlace.amenities ?? []).includes('화장실')}
                onChange={handleCheckboxChange}
              >
                화장실
              </Checkbox>
              <Checkbox
                size="md"
                value="parking"
                checked={(newPlace.amenities ?? []).includes('주차장')}
                onChange={handleCheckboxChange}
              >
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
              onChange={handleFileChange}
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
