import { useState } from 'react';

import styles from './transactions-search.module.scss';

type SearchProps = {
  onSearch: (query: string) => void;
};

export function TransactionsSearch({ onSearch }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className={styles.filterWrapper}>
      <input
        type="text"
        value={searchQuery}
        placeholder="Поиск..."
        className={styles.searchInput}
        onChange={handleSearch}
      />
    </div>
  );
}
