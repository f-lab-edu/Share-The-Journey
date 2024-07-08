import { useMemo, useState, useEffect, ReactNode } from 'react';
import { getAuth, User } from 'firebase/auth';

import { AuthContext } from './AuthContext';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
