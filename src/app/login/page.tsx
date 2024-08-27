'use client';

import { Input, Button, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import auth from '@/app/auth';
import { validateEmail, validatePassword } from '@/utils/validate';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<
    'invalid' | 'unknown' | 'password' | 'email' | ''
  >('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setError('email');
      return;
    } else if (validatePassword(password)) {
      setError('password');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((_res) => {
        router.push('/');
      })
      .catch((err) => {
        console.error(err.message);
        if (err.message.includes('invalid-credential')) {
          setError('invalid');
        } else {
          setError('unknown');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (error === 'unknown') {
    return (
      <div className="w-2/5 mx-auto flex flex-col bg-yellow-100 p-4 mt-32 rounded-lg">
        <h1 className="mx-auto font-bold text-red-600 text-xl">오류</h1>
        <p className="mx-auto my-5 text-center">
          알 수 없는 오류가 발생했습니다.
          <br /> 다시 시도해 주세요.
        </p>
        <Button
          type="button"
          color="danger"
          onClick={() => {
            setError('');
          }}
          className="font-semibold w-3/5 mx-auto"
        >
          로그인 페이지로 이동하기
        </Button>
      </div>
    );
  }

  return (
    <>
      <h1 className="w-2/4 mx-auto text-center font-bold text-2xl mb-5 mt-32">
        로그인
      </h1>
      <div className="w-2/5 mx-auto rounded-lg bg-slate-100 p-4">
        <form className="flex flex-wrap" onSubmit={handleSubmit}>
          <div className="mb-3 font-semibold w-full">
            {error === 'invalid' && (
              <p className="font-semibold text-center text-red-600">
                이메일 또는 비밀번호를 확인해주세요.
              </p>
            )}
            <Input
              className="bg-white rounded-xl"
              isInvalid={error === 'email' || error === 'invalid'}
              errorMessage={
                error === 'email' ? '이메일 형식이 올바르지 않습니다.' : ''
              }
              variant="bordered"
              type="text"
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
              isInvalid={error === 'password' || error === 'invalid'}
              errorMessage={
                error === 'password' ? '비밀번호는 6자 이상이어야 합니다.' : ''
              }
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
