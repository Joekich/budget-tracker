'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { fetch } from 'shared/lib/fetch';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

import { schemaSignupValidation } from '../model/SignupPage.types';
import styles from './signuppage.module.scss';

export const SignUpPage = () => {
  const router = useRouter();
  const [state, setState] = useState({
    login: '',
    password: '',
    confirmPassword: '',
  });

  const isFormValid = () =>
    schemaSignupValidation.safeParse({
      login: state.login,
      password: state.password,
      confirmPassword: state.confirmPassword,
    }).success;

  const handleInputChange = (key: keyof typeof state) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setState((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    try {
      await fetch.post('/api/signup', {
        data: { login: state.login, password: state.password },
        json: true,
      });

      router.push('/');
      // eslint-disable-next-line no-alert
      alert('Теперь вы можете войти, используя свои данные');
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Ошибка регистрации');
    }
  };

  return (
    <main className={styles.authPage}>
      <header>
        <h1>Регистрация нового пользователя</h1>
      </header>
      <section className={styles.authContainer}>
        <Input
          placeholder="Логин"
          value={state.login}
          className={styles.authInput}
          onChange={handleInputChange('login')}
        />
        <Input
          placeholder="Пароль"
          type="password"
          value={state.password}
          className={styles.authInput}
          onChange={handleInputChange('password')}
        />
        <Input
          placeholder="Подтвердите пароль"
          type="password"
          value={state.confirmPassword}
          className={styles.authInput}
          onChange={handleInputChange('confirmPassword')}
        />
      </section>
      <section className={styles.buttonGroup}>
        <Button className={styles.button} onClick={handleSubmit}>
          Зарегистрироваться
        </Button>
        <Button className={`${styles.button} ${styles.cancelButton}`} onClick={() => router.push('/')}>
          Отмена
        </Button>
      </section>
    </main>
  );
};
