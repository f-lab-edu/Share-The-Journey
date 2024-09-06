import { ReactNode } from 'react';

import Header from '@/components/Header';

const SignUp = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default SignUp;
