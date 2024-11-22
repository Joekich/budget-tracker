'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Button } from 'shared/ui/button';

import styles from './transactions-search.module.scss';

export function TransactionsSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    if (!inputRef.current) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('searchQuery', inputRef.current.value);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchContainer}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Поиск по названию..."
          className={styles.searchInput}
          onKeyDown={handleKeyDown}
        />
        <Button theme="primary" className={styles.searchButton} onClick={handleSearchClick}>
          <BiSearch size={20} />
        </Button>
      </div>
    </div>
  );
}
