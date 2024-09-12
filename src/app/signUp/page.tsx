'use client';

import { useState } from 'react';
import { Input, Button, Spinner } from '@nextui-org/react';

import UnknownError from '@/components/UnknownError';
import { useSignUp } from '@/hooks/auth/useSignUp';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const { signUp, isLoading, error, resetError } = useSignUp();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signUp(email, password, nickname);
  };

  const getErrorMessage = () => {
    switch (error) {
      case 'emailInUse':
        return '이미 사용중인 이메일입니다.';
      case 'invalidEmail':
        return '이메일 형식이 올바르지 않습니다.';
      case 'weakPassword':
        return '비밀번호는 6자 이상이어야 합니다.';
      case 'invalidNickname':
        return '닉네임은 2~10자의 한글, 영문, 숫자만 가능합니다.';
    }
  };

  if (error === 'unknown') {
    return <UnknownError onClick={resetError} useAt={'signUp'} />;
  }

  return (
    <>
      <h1 className="w-2/4 mx-auto text-center font-bold text-2xl mb-5 mt-32">
        회원가입
      </h1>
      <div className="w-2/5 mx-auto rounded-lg bg-slate-100 p-4">
        <form className="mt-1 flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="mb-3 font-semibold">
            <Input
              variant="bordered"
              className="bg-white rounded-xl"
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
              variant="bordered"
              className="bg-white rounded-xl"
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
              variant="bordered"
              className="bg-white rounded-xl"
              type="text"
              label="닉네임"
              value={nickname}
              isInvalid={error === 'invalidNickname'}
              errorMessage={getErrorMessage()}
              isRequired
              placeholder="한글, 영문, 숫자를 포함할 수 있는 2~10자의 닉네임을 입력해주세요."
              labelPlacement="outside"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <Button
            color="success"
            radius="lg"
            className="w-full text-white font-semibold"
            type="submit"
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" color="default" /> : '회원가입'}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Page;
