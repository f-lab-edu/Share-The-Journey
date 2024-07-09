import { createContext } from 'react';
import { User } from 'firebase/auth';

export const AuthContext = createContext({
  user: null as User | null,
});
