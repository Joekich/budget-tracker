import Link from 'next/link';
import { getPath } from 'shared/routing/paths';

import styles from './homepage.module.scss';

export function HomePage() {
  return (
    <main className={styles.homePage}>
      <section className={styles.buttonGroup}>
        <h1>Budget Tracker</h1>
        <Link href={getPath('signin')} className={styles.button}>
          Войти
        </Link>
        <Link href={getPath('signup')} className={styles.button}>
          Зарегистрироваться
        </Link>
      </section>
    </main>
  );
}
