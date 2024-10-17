'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import styles from './ProfilePage.module.scss';

export function ProfilePage() {
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
        <Link href="/">Home</Link>
        <h1>Здравствуйте, {session.user?.name || 'Пользователь'}</h1>
        <button type="button" onClick={async () => signOut()}>
          {' '}
          Sign Out
        </button>
      </div>
    </main>
  );
}
