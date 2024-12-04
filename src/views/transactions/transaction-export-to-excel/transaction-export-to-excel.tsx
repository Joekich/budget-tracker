'use client';

import { FiDownload } from 'react-icons/fi';
import { Button } from 'shared/ui/button';

import styles from './transaction-export-to-excel.module.scss';

export function TransactionExportToExcel() {
  const handleExport = async () => {
    try {
      const response = await fetch('/api/get-all-transactions-to-export');
      if (!response.ok) {
        throw new Error('Не удалось экспортировать файл');
      }

      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'transactions.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Ошибка экспорта:', error);
    }
  };

  return (
    <Button theme="primary" className={styles.downloadButton} onClick={handleExport}>
      <FiDownload size={20} />
      <span className={styles.span}>.xlsx</span>
    </Button>
  );
}
