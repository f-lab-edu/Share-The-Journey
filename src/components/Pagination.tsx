import { Button } from '@nextui-org/react';
import { NextArrow, PrevArrow } from '@/icons/arrow';

type PaginationProps = {
  currentPage: number;
  totalContents: number;
  contentsPerPage: number;
  moveToNextPage: (totalPage: number) => void;
  moveToPrevPage: () => void;
};

const PaginationBar = ({
  currentPage,
  totalContents,
  contentsPerPage,
  moveToNextPage,
  moveToPrevPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalContents / contentsPerPage);

  if (totalContents === 0) {
    return null;
  }

  return (
    <div className="flex justify-between mb-10 w-9/12 mx-auto items-center">
      <Button
        isDisabled={currentPage === 1}
        size="md"
        variant="light"
        color="default"
        onPress={moveToPrevPage}
      >
        <PrevArrow />
      </Button>
      <p className="text-sm font-semibold">페이지 {currentPage}</p>
      <Button
        isDisabled={currentPage === totalPages}
        size="md"
        variant="light"
        color="default"
        onPress={() => moveToNextPage(totalPages)}
      >
        <NextArrow />
      </Button>
    </div>
  );
};

export default PaginationBar;
