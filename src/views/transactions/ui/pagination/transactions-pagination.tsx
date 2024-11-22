'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BiChevronLeft, BiChevronRight, BiFirstPage, BiLastPage } from 'react-icons/bi';
import { Button } from 'shared/ui/button/ui/button';

import styles from './transactions-pagination.module.scss';

type TransactionsPaginationProps = {
  totalTransactions: number;
  transactionsPerPage: number;
};

export function TransactionsPagination({ totalTransactions, transactionsPerPage }: TransactionsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
  if (totalPages < 2) return null;

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', pageNumber.toString());
      router.push(`?${params.toString()}`);
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
        disabled={currentPage === 1}
        theme="secondary"
        onClick={() => {
          handlePageChange(1);
        }}
      >
        <BiFirstPage size={20} />
      </Button>
      <Button
        disabled={currentPage === 1}
        theme="secondary"
        onClick={() => {
          handlePageChange(currentPage - 1);
        }}
      >
        <BiChevronLeft size={20} />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          theme={page === currentPage ? 'primary' : 'secondary'}
          className={styles.paginationButton}
          onClick={() => {
            handlePageChange(page);
          }}
        >
          {page}
        </Button>
      ))}

      <Button
        disabled={currentPage === totalPages}
        theme="secondary"
        onClick={() => {
          handlePageChange(currentPage + 1);
        }}
      >
        <BiChevronRight size={20} />
      </Button>
      <Button
        disabled={currentPage === totalPages}
        theme="secondary"
        onClick={() => {
          handlePageChange(totalPages);
        }}
      >
        <BiLastPage size={20} />
      </Button>
    </div>
  );
}
