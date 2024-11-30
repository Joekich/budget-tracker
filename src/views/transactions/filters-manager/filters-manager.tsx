'use client';

import { useState } from 'react';
import {
  TbSquareRoundedNumber1,
  TbSquareRoundedNumber2,
  TbSquareRoundedNumber3,
  TbSquareRoundedNumber4,
} from 'react-icons/tb';
import { Button } from 'shared/ui/button';
import { Modal } from 'shared/ui/modal';

import { TransactionFilters } from '../filters/transaction-filters';
import styles from './filters-manager.module.scss';

export function FiltersManager() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const renderFilterIcon = () => {
    switch (activeFiltersCount) {
      case 1:
        return <TbSquareRoundedNumber1 className={styles.filterIcon} size={20} />;
      case 2:
        return <TbSquareRoundedNumber2 className={styles.filterIcon} size={20} />;
      case 3:
        return <TbSquareRoundedNumber3 className={styles.filterIcon} size={20} />;
      case 4:
        return <TbSquareRoundedNumber4 className={styles.filterIcon} size={20} />;
      default:
        return null;
    }
  };

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
        {renderFilterIcon()}
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
          onFiltersChange={setActiveFiltersCount}
        />
      </Modal>
    </>
  );
}
