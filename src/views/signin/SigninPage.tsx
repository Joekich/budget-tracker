'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { getPath } from 'shared/routing/paths';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

import styles from './signinpage.module.scss';

export const SignInPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      login,
      password,
    });

    if (result?.error) {
      // eslint-disable-next-line no-alert
      alert('Неверный логин или пароль');
    } else {
      router.push(getPath('profile'));
    }
  };

  const handleCancel = () => {
    router.push(getPath('homepage'));
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
        <Button label="Отмена" className={`${styles.button} ${styles.cancelButton}`} onClick={handleCancel} />
      </section>
    </main>
  );
};
