import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

import auth from '@/libs/auth';
import db from '@/libs/db';
import { validateEmail, validateNickname } from '@/utils/validate';

const useSignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<
    | 'emailInUse'
    | 'invalidEmail'
    | 'weakPassword'
    | 'unknown'
    | 'invalidNickname'
    | null
  >(null);

  const signUp = async (email: string, password: string, nickname: string) => {
    if (isLoading) return;

    if (!validateEmail(email)) {
      setError('invalidEmail');
      return;
    }

    if (!validateNickname(nickname)) {
      setError('invalidNickname');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const userRef = doc(db, 'users', user.uid);

      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        nickname,
      });

      router.push('/');
    } catch (err: any) {
      if (err.message.includes(AuthErrorCodes.EMAIL_EXISTS)) {
        setError('emailInUse');
      } else if (err.message.includes(AuthErrorCodes.WEAK_PASSWORD)) {
        setError('weakPassword');
      } else {
        setError('unknown');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => setError(null);

  return { signUp, isLoading, error, resetError };
};

export { useSignUp };
