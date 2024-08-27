import { ReactNode } from 'react';

import Header from '@/components/Header';

const Upload = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Upload;
