'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export const ProfilePage = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main style={{ textAlign: 'center', marginTop: '100px' }}>
        <Link href="/">Home</Link>
        <h1>Вы не авторизованы</h1>
      </main>
    );
  }

  return (
    <main style={{ textAlign: 'center', marginTop: '100px' }}>
      <Link href="/">Home</Link>
      <h1>Здравствуйте, {session.user?.name || 'Пользователь'}</h1>
      <button type="button" onClick={() => signOut()}>
        {' '}
        Sign Out
      </button>
    </main>
  );
};
