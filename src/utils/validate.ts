import { collection, query, where, getDocs } from 'firebase/firestore';

import db from '@/libs/db';
import { NewPlaceForm } from '@/types/place';

export const validateNewPlaceForm = (props: NewPlaceForm) => {
  const { name, location, price, score, review, amenities } = props;

  if (!name) {
    return { success: false, message: '이름을 올바르게 입력해 주세요.' };
  } else if (!location) {
    return { success: false, message: '위치를 올바르게 입력해 주세요.' };
  } else if (price === undefined || price < 0) {
    return { success: false, message: '올바른 가격을 입력해 주세요.' };
  } else if (score === undefined || score < 0 || score > 5) {
    return { success: false, message: '올바른 평점을 입력해 주세요.' };
  } else if (!review) {
    return { success: false, message: '한 줄 평을 입력해 주세요.' };
  } else if (!amenities) {
    return { success: false, message: '편의시설을 선택해 주세요.' };
  }

  return { success: true, message: '' };
};

export const validateEmail = (email: string) => {
  const emailRegex =
    /^(?!\.)(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length < 6;
};

export const validateNicknameRegex = (nickname: string) => {
  const nicknameRegex = /^(?!.*\s)[가-힣a-zA-Z0-9]+$/;
  const nicknameLength = nickname.length >= 2 && nickname.length <= 10;

  return nicknameRegex.test(nickname) && nicknameLength;
};

export const validateSameNickname = async (nickname: string) => {
  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, where('nickname', '==', nickname));
  const querySnapshot = await getDocs(q);

  return querySnapshot.empty;
};
