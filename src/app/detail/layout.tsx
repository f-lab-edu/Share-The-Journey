import { ReactNode } from 'react';
import Header from '@/components/Header';

const Detail = ({ children }: { children: ReactNode }) => {
  return <><Header />{children}</>;
};

export default Detail;
