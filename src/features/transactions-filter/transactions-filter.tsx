import { useState } from 'react';

import styles from './transactions-filter.module.scss';

type FilterProps = {
  onSearch: (query: string) => void;
};

export function Filter({ onSearch }: FilterProps) {
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
