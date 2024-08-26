'use client';

import { Input, Button, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import Header from '@/components/Header';

import auth from '@/app/auth';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((_res) => {
        router.push('/');
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Header />
      <h1 className="w-2/4 mx-auto text-center font-bold text-2xl mb-5 mt-32">
        로그인
      </h1>
      <div className="w-2/5 mx-auto rounded-lg bg-slate-100 p-4">
        <form className="flex flex-wrap" onSubmit={handleSubmit}>
          <div className="mb-3 font-semibold w-full">
            <Input
              className="bg-white rounded-xl"
              variant="bordered"
              type="email"
              name="email"
              label="이메일"
              labelPlacement="outside"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5 font-semibold w-full">
            <Input
              variant="bordered"
              label="비밀번호"
              labelPlacement="outside"
              placeholder="비밀번호를 입력해주세요."
              className="bg-white rounded-xl"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="block bg-green-600 rounded-2xl p-2 w-full text-white font-semibold mb-3"
            type="submit"
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" color="default" /> : '로그인'}
          </Button>
          <Button
            className="block bg-yellow-400 rounded-2xl p-2 w-full mb-3 font-semibold"
            type="button"
            isDisabled={isLoading}
            onClick={() => {
              router.push('/signUp');
            }}
          >
            회원가입
          </Button>
          <p className="text-sm text-center my-1 mx-auto">
            아직 회원이 아니시라면 회원가입을 눌러주세요.
          </p>
        </form>
      </div>
    </>
  );
};

export default Page;
