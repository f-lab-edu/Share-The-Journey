'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Input, Button } from '@nextui-org/react';

import auth from '@/app/auth';
import db from '@/app/db';
import Header from '@/components/Header';
import { validateEmail } from '@/utils/validate';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<'emailInUse' | 'invalidEmail' | 'weakPassword' | null>(
    null
  );
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError('invalidEmail');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        const userRef = doc(db, 'users', user.uid);

        return setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          nickname,
        });
      })
      .then(() => {
        router.push('/');
      })
      .catch((err) => {
        if (err.message.includes(AuthErrorCodes.EMAIL_EXISTS)) {
          setError('emailInUse');
        } else if (err.message.includes(AuthErrorCodes.WEAK_PASSWORD)) {
          setError('weakPassword');
        } else {
          // 에러 fallback 옵션 추가할 것
        }
      });
  };

  const getErrorMessage = () => {
    switch (error) {
      case 'emailInUse':
        return '이미 사용중인 이메일입니다.';
      case 'invalidEmail':
        return '이메일 형식이 올바르지 않습니다.'
      case 'weakPassword':
        return '비밀번호는 6자 이상이어야 합니다.'
    }
  }

  return (
    <>
      <Header />
      <h1 className="w-2/4 mx-auto text-center font-bold text-2xl mb-5 mt-32">
        Sign Up
      </h1>
      <div className="w-2/5 mx-auto rounded-lg bg-slate-100 p-4">
        <form className="mt-1 flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="mb-3 font-semibold">
            <Input
              type="text"
              label="이메일"
              value={email}
              isInvalid={error === 'emailInUse' || error === 'invalidEmail'}
              errorMessage={getErrorMessage()}
              isRequired
              placeholder="이메일을 입력해주세요."
              labelPlacement="outside"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 font-semibold">
            <Input
              type="password"
              label="비밀번호"
              value={password}
              isInvalid={error === 'weakPassword'}
              errorMessage={getErrorMessage()}
              isRequired
              placeholder="비밀번호를 입력해주세요."
              labelPlacement="outside"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 font-semibold">
            <Input
              type="text"
              label="닉네임"
              value={nickname}
              isRequired
              placeholder="닉네임을 입력해주세요."
              labelPlacement="outside"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <Button
            color="success"
            radius="lg"
            className="w-full text-white font-semibold"
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
};

export default Page;
