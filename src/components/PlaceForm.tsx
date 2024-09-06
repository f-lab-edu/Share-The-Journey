'use client';

import {
  Input,
  Checkbox,
  CheckboxGroup,
  Button,
  Spinner,
} from '@nextui-org/react';
import { ChangeEvent, FormEvent, useState } from 'react';

import { useUpdatePlace } from '@/hooks/useUpdatePlace';
import { NewPlaceForm } from '@/types/place';
import { validateNewPlaceForm } from '@/utils/validate';

type PlaceFormProps = {
  initialData?: Partial<NewPlaceForm>;
  mode: 'upload' | 'edit';
  isSubmitting?: boolean;
  id?: string;
};

const PlaceForm = ({
  initialData = {},
  mode,
  isSubmitting,
  id,
}: PlaceFormProps) => {
  const [newPlace, setNewPlace] = useState<Partial<NewPlaceForm>>({
    ...initialData,
    amenities: initialData.amenities ?? [],
  });
  const [error, setError] = useState<'error' | null>(null);
  const { updatePlace } = useUpdatePlace();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlace((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'score' ? parseFloat(value) : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updatePlace(id as string, newPlace as NewPlaceForm);
    } catch (error) {
      console.error(error);
    }
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newPlaceValidateInfo = validateNewPlaceForm(newPlace as NewPlaceForm);

    if (!newPlaceValidateInfo.success) {
      alert(newPlaceValidateInfo.message);
      return;
    }

    try {
      if (mode === 'edit') {
        await handleUpdate();
      } else {
        console.log('uploading...');
      }
    } catch (error) {
      console.error(error);
      setError('error');
    }
  };

  if (error) {
    return <div>Unknown Error Occurred! {error}</div>;
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
            min={0}
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
