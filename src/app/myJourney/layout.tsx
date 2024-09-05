import { ReactNode } from 'react';

import Header from '@/components/Header';

const MyJourney = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MyJourney;
