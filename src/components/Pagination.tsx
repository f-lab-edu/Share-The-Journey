import { Pagination } from '@nextui-org/react';

type PaginationProps = {
  size: 'sm' | 'lg';
  isCompact: boolean;
  currentPage: number;
  totalContents: number;
  contentsPerPage: number;
  paginate: (pageNumber: number) => void;
};

const PaginationBar = ({
  size,
  isCompact,
  currentPage,
  totalContents,
  paginate,
  contentsPerPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalContents / contentsPerPage);

  return (
    <div className="flex justify-center mb-5">
      <Pagination
        isCompact={isCompact}
        showControls
        total={totalPages}
        page={currentPage}
        onChange={(page) => paginate(page)}
        size={size}
      />
    </div>
  );
};

export default PaginationBar;