'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaFileExport, FaFilter, FaTools } from 'react-icons/fa';
import { getPath } from 'shared/routing/paths';
import { Button } from 'shared/ui/button';

import styles from './homepage.module.scss';

export function HomePage() {
  const router = useRouter();
  return (
    <main className={styles.homePage}>
      <section className={styles.featuresSection}>
        <div className={styles.headerBlock}>
          <h2>Управляйте своими финансами легко вместе с Budget Tracker</h2>
        </div>
        <div className={styles.contentBlock}>
          <div className={styles.featuresList}>
            <ul>
              <li>
                <FaTools className={styles.icon} />
                <div className={styles.featureText}>
                  <strong>Удобный и понятный инструмент</strong>
                  <p>для ведения личного бюджета</p>
                </div>
              </li>
              <li>
                <FaFilter className={styles.icon} />
                <div className={styles.featureText}>
                  <strong>Гибкая система фильтров</strong>
                  <p>и простой интерфейс для работы с операциями</p>
                </div>
              </li>
              <li>
                <FaFileExport className={styles.icon} />
                <div className={styles.featureText}>
                  <strong>Экспорт транзакций</strong>
                  <p>в формате .xlsx</p>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.registration}>
            <h3>Зарегистрируйтесь и попробуйте весь доступный функционал</h3>
            <Button
              className={styles.button}
              theme="primary"
              onClick={() => {
                router.push(getPath('signup'));
              }}
            >
              Зарегистрироваться
            </Button>
            <p className={styles.loginText}>
              Уже зарегистрированы? <br />
              <Link href={getPath('signin')} className={styles.link}>
                Войдите в свой аккаунт
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
