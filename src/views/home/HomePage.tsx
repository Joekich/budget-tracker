'use client';

import { useRouter } from 'next/navigation';
import { getPath } from 'shared/routing/paths';

import styles from './homepage.module.scss';

export function HomePage() {
  const router = useRouter();

  const credentialsActionLogin = () => router.push(getPath('signin'));

  const credentialsActionRegister = () => router.push(getPath('signup'));

  return (
    <main className={styles.homePage}>
      <section className={styles.buttonGroup}>
        <h1>Budget Tracker</h1>
        <button type="button" className={styles.button} onClick={credentialsActionLogin}>
          Войти
        </button>
        <button type="button" className={styles.button} onClick={credentialsActionRegister}>
          Зарегистрироваться
        </button>
      </section>
    </main>
  );
}
