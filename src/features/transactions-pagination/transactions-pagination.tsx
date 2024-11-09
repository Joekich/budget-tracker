import clsx from 'clsx';
import { BiChevronLeft, BiChevronRight, BiFirstPage, BiLastPage } from 'react-icons/bi';
import { Button } from 'shared/ui/button';

import styles from './transactions-pagination.module.scss';

type TransactionsPaginationProps = {
  currentPage: number;
  totalTransactions: number;
  transactionsPerPage: number;
  onPageChange: (pageNumber: number) => void;
};

export function TransactionsPagination({
  currentPage,
  totalTransactions,
  transactionsPerPage,
  onPageChange,
}: TransactionsPaginationProps) {
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  let startPage = currentPage - 1;
  let endPage = currentPage + 1;

  if (currentPage === 1) {
    startPage = 1;
    endPage = Math.min(3, totalPages);
  } else if (currentPage === totalPages) {
    startPage = Math.max(1, totalPages - 2);
    endPage = totalPages;
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className={styles.paginationWrapper}>
      <Button
        className={clsx(styles.paginationButton, currentPage === 1 && styles.disabled)}
        onClick={() => {
          handlePageChange(1);
        }}
      >
        <BiFirstPage size={20} />
      </Button>
      <Button
        className={clsx(styles.paginationButton, currentPage === 1 && styles.disabled)}
        onClick={() => {
          handlePageChange(currentPage - 1);
        }}
      >
        <BiChevronLeft size={20} />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          className={clsx(styles.paginationButton, page === currentPage && styles.activePage)}
          onClick={() => {
            handlePageChange(page);
          }}
        >
          {page}
        </Button>
      ))}

      <Button
        className={clsx(styles.paginationButton, currentPage === totalPages && styles.disabled)}
        onClick={() => {
          handlePageChange(currentPage + 1);
        }}
      >
        <BiChevronRight size={20} />
      </Button>
      <Button
        className={clsx(styles.paginationButton, currentPage === totalPages && styles.disabled)}
        onClick={() => {
          handlePageChange(totalPages);
        }}
      >
        <BiLastPage size={20} />
      </Button>
    </div>
  );
}
