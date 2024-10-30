'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { getPath } from 'shared/routing/paths';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

import styles from './signinpage.module.scss';

export function SignInPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!login || !password) {
      // eslint-disable-next-line no-alert
      alert('Введите логин и пароль');
      return;
    }

    const response = await signIn('credentials', {
      redirect: false,
      login,
      password,
    });

    if (!response) {
      // eslint-disable-next-line no-alert
      alert('Ошибка сервера');
      return;
    }

    if (response.error) {
      // eslint-disable-next-line no-alert
      alert('Неверный логин или пароль');
      return;
    }

    router.push(getPath('dashboard'));
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
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <Input
          placeholder="Пароль"
          type="password"
          value={password}
          className={styles.authInput}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </section>
      <section className={styles.buttonGroup}>
        <Button className={styles.button} onClick={handleLogin}>
          Войти
        </Button>
      </section>
    </main>
  );
}
