'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

import styles from './signinpage.module.scss';

export const SignInPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signIn('credentials', {
      redirect: false,
      login: 'TestUser1',
      password: 'TestUser1',
      redirectTo: 'http://localhost:3000/profile',
    });
  };

  return (
    <main className={styles.authPage}>
      <header>
        <h1>Вход в личный кабинет</h1>
      </header>
      <section className={styles.authContainer}>
        <Input
          placeholder="Логин"
          value={login}
          className={styles.authInput}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          placeholder="Пароль"
          type="password"
          value={password}
          className={styles.authInput}
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>
      <section className={styles.buttonGroup}>
        <Button label="Войти" className={styles.button} onClick={handleLogin} />
      </section>
    </main>
  );
};
