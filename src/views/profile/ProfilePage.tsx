'use client';

import { useSession } from 'next-auth/react';

export const ProfilePage = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Вы не авторизованы</h1>
      </main>
    );
  }

  return (
    <main style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Здравствуйте, {session.user?.login || 'Пользователь'}</h1>
    </main>
  );
};
