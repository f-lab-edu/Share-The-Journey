import { ReactNode } from 'react';
import Header from '@/components/Header';

const Login = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Login;
