'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import styles from './settings-page.module.scss';

export function SettingsPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className={styles.pageWrapper}>
        <Link href="/">Home</Link>
        <h1>Вы не авторизованы</h1>
      </main>
    );
  }

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <h1>Settings</h1>
      </div>
    </main>
  );
}
