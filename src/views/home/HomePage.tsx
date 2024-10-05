'use client';

import { signIn } from 'next-auth/react';

export function HomePage() {
  const credentialsAction = () => {
    signIn('credentials', {
      login: 'TestUser1',
      password: 'TestUser1',
      redirectTo: 'http://localhost:3000/profile',
    });
  };
  return (
    <button type="button" onClick={credentialsAction}>
      123
    </button>
  );
}
