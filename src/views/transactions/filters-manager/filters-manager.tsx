'use client';

import isNumber from 'lodash/isNumber';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from 'shared/ui/button';
import { Modal } from 'shared/ui/modal';

import { type FiltersState, parseFiltersFromUrl, TransactionFilters } from '../filters/transaction-filters';
import styles from './filters-manager.module.scss';

const activeFiltersCount = (currentFilters: FiltersState): number =>
  [
    !!currentFilters.type,
    currentFilters.categories.length > 0,
    isNumber(currentFilters.amountRange.min) || isNumber(currentFilters.amountRange.max),
    !!currentFilters.dateRange.start || !!currentFilters.dateRange.end,
  ].filter(Boolean).length;

export function FiltersManager() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const searchParams = useSearchParams();

  const filtersCount = activeFiltersCount(parseFiltersFromUrl(searchParams));

  return (
    <>
      <Button
        theme="primary"
        className={styles.filterButton}
        onClick={() => {
          setIsFiltersOpen(true);
        }}
      >
        Фильтры
        <div className={styles.filterCount}>{filtersCount > 0 && filtersCount}</div>
      </Button>

      <Modal
        isOpen={isFiltersOpen}
        onClose={() => {
          setIsFiltersOpen(false);
        }}
      >
        <TransactionFilters
          onClose={() => {
            setIsFiltersOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
