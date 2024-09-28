'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'shared/ui/button';

import { getPath } from '@/src/shared/routing/paths';

export const HomePage = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push(getPath('profile'));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to the Home Page</h1>
      <Button label="Войти" onClick={handleLoginClick} />
    </div>
  );
};
