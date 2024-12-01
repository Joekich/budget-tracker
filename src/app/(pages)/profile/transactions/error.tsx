'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from 'shared/ui/button';

import styles from './error.module.scss';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.search = '';
    router.replace(url.toString());
  }, [router]);

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
