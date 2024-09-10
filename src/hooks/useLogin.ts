'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';

import auth from '@/libs/auth';
import { validateEmail, validatePassword } from '@/utils/validate';
import { LOGIN_ERROR, LoginErrorTypes } from '@/constants/error';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginErrorTypes | null>(null);
  const router = useRouter();

  const login = (email: string, password: string) => {
    if (!validateEmail(email)) {
      setError(LOGIN_ERROR.EMAIL);
      return;
    } else if (validatePassword(password)) {
      setError(LOGIN_ERROR.PASSWORD);
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((_res) => {
        router.push('/');
      })
      .catch((err) => {
        if (err.message.includes('invalid-credential')) {
          setError(LOGIN_ERROR.INVALID);
        } else {
          setError(LOGIN_ERROR.UNKNOWN);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const resetError = () => {
    setError(null);
  };

  return { isLoading, error, login, resetError };
};

export { useLogin };
