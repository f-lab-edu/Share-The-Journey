import { useState } from 'react';

export const usePagination = (initialPage: number, totalPage: number) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const moveToNextPage = () => {
    setCurrentPage((page) => (page < totalPage ? page + 1 : page));
  };

  const moveToPrevPage = () => {
    setCurrentPage((page) => (page > 1 ? page - 1 : page));
  };

  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };
  return { currentPage, moveToNextPage, moveToPrevPage, setPage };
};
