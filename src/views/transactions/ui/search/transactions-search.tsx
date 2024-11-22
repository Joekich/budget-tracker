import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Button } from 'shared/ui/button';

import styles from './transactions-search.module.scss';

type SearchProps = {
  onSearch: (query: string) => void;
  defaultQuery?: string;
};

export function TransactionsSearch({ onSearch, defaultQuery = '' }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState(defaultQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery.trim());
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
          type="text"
          value={searchQuery}
          placeholder="Поиск по названию..."
          className={styles.searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button theme="primary" className={styles.searchButton} onClick={handleSearchClick}>
          <BiSearch size={20} />
        </Button>
      </div>
    </div>
  );
}
