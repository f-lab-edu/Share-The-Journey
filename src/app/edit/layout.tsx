import { ReactNode } from 'react';
import Header from '@/components/Header';

const Edit = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Edit;
