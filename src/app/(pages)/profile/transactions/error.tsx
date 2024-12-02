'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getPath } from 'shared/routing/paths';
import { Button } from 'shared/ui/button';

import styles from './error.module.scss';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    router.push(getPath('transactions'));
    console.error(error);
  }, [router, error]);

  return (
    <div className={styles.errorBlock}>
      <h1>Ошибка</h1>
      <p>
        Фильтры работают некорректно <br />
        Пожалуйста, сбросьте их <br />и попробуйте заново
      </p>
      <Button
        className={styles.resetButton}
        theme="primary"
        onClick={() => {
          reset();
        }}
      >
        Сбросить фильтры
      </Button>
    </div>
  );
}
