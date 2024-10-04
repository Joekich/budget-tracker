'use client';

import { useRouter } from 'next/navigation';
import { getPath } from 'shared/routing/paths';
import { Button } from 'shared/ui/button';

import styles from './homepage.module.scss';

export const HomePage = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push(getPath('signin'));
  };

  const handleRegisterClick = () => {
    router.push(getPath('signup'));
  };

  return (
    <main className={styles.homePage}>
      <header>
        <h1>Welcome to the Home Page</h1>
      </header>

      <section className={styles.buttonGroup}>
        <Button label="Регистрация" className={styles.button} onClick={handleRegisterClick} />
        <Button label="Войти" className={styles.button} onClick={handleLoginClick} />
      </section>
    </main>
  );
};
