import { useMemo, useState, useEffect, ReactNode } from 'react';
import { getAuth, User } from 'firebase/auth';

import { AuthContext } from './AuthContext';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const value = useMemo(() => ({ user }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
