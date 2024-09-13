'use client';

import {
  Input,
  Checkbox,
  CheckboxGroup,
  Button,
  Spinner,
} from '@nextui-org/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import UnknownError from './UnknownError';
import { updatePlace } from '@/utils/updatePlace';
import { uploadImgs } from '@/utils/uploadImgs';
import { uploadPlace } from '@/utils/uploadPlace';
import { NewPlaceForm } from '@/types/place';
import { validateNewPlaceForm } from '@/utils/validate';

type PlaceFormProps = {
  initialData?: Partial<NewPlaceForm>;
  mode: 'upload' | 'edit';
  id?: string;
  userId?: string;
};

const PlaceForm = ({ initialData = {}, mode, id, userId }: PlaceFormProps) => {
  const [newPlace, setNewPlace] = useState<Partial<NewPlaceForm>>({
    ...initialData,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<'error' | null>(null);
  const router = useRouter();

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
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const newPlaceValidateInfo = validateNewPlaceForm(newPlace as NewPlaceForm);

    if (!newPlaceValidateInfo.success) {
      alert(newPlaceValidateInfo.message);
      return;
    }

    try {
      if (mode === 'edit') {
        await updatePlace(id as string, newPlace as NewPlaceForm);
        router.push(`/detail/${id}`);
      } else if (mode === 'upload') {
        const imgUrls = await uploadImgs(files);
        const newPlaceData = {
          ...newPlace,
          imgUrls,
          registrant: userId,
        } as NewPlaceForm;

        await uploadPlace(newPlaceData);
        router.push('/');
      }
    } catch (error) {
      setError('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return <UnknownError onClick={() => setError(null)} useAt={mode} />;
  }

  return (
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
            placeholder="무료는 0으로 입력해 주세요."
            label="가격"
            labelPlacement="outside"
            variant="bordered"
            className="bg-white rounded-xl"
            value={newPlace.price?.toString()}
            min={0}
            onChange={handleChange}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">₩</span>
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
            value={newPlace.score?.toString()}
            step={0.1}
            min={0}
            max={5}
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
              <span className="text-black text-sm font-semibold">편의시설</span>
            }
            orientation="horizontal"
            color="primary"
            radius="md"
            value={newPlace.amenities}
          >
            <Checkbox
              size="md"
              value="화장실"
              checked={(newPlace.amenities ?? []).includes('화장실')}
              onChange={handleCheckboxChange}
            >
              화장실
            </Checkbox>
            <Checkbox
              size="md"
              value="주차장"
              checked={(newPlace.amenities ?? []).includes('주차장')}
              onChange={handleCheckboxChange}
            >
              주차장
            </Checkbox>
          </CheckboxGroup>
        </div>
        {mode === 'upload' && (
          <label className="block">
            <h3 className="text-sm font-semibold">사진</h3>
            <p className="text-sm text-red-400">
              이미지는 수정할 수 없으니 신중하게 골라주세요.
            </p>
            <input
              className="w-full p-1 my-2 text-slate-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-200 hover:file:text-slate-400"
              type="file"
              accept="image/*"
              multiple={true}
              onChange={handleFileChange}
            />
          </label>
        )}
        <Button
          type="submit"
          isDisabled={isSubmitting}
          className="w-full bg-green-600 text-white text-md font-semibold p-2 rounded-lg my-3"
        >
          {isSubmitting ? <Spinner size="sm" color="default" /> : '저장하기'}
        </Button>
      </form>
    </div>
  );
};

export default PlaceForm;
