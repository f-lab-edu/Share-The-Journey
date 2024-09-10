import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import auth from '@/libs/auth';

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<'로그아웃에 실패했어요' | null>(null);

  const router = useRouter();
  const logout = () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    signOut(auth)
      .then(() => {
        router.push('/');
      })
      .catch((err) => {
        setError('로그아웃에 실패했어요');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, error, logout };
};

export { useLogout };
