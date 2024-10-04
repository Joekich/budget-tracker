'use client';

import { isPasswordConfirmed, validateLogin, validatePassword } from 'entities/user';
import { signup } from 'features/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

import styles from './signuppage.module.scss';

export const SignUpPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  const handleSubmit = async () => {
    try {
      await signup(login, password, confirmPassword);
      router.push('/');
      // eslint-disable-next-line no-alert
      alert('Теперь вы можете войти, используя свои данные');
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Ошибка регистрации');
    }
  };

  const isFormValid = () =>
    validateLogin(login) && validatePassword(password) && isPasswordConfirmed(password, confirmPassword);

  return (
    <main className={styles.authPage}>
      <header>
        <h1>Регистрация нового пользователя</h1>
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
          onChange={handlePasswordChange}
        />
        <Input
          placeholder="Подтвердите пароль"
          type="password"
          value={confirmPassword}
          className={styles.authInput}
          onChange={handleConfirmPasswordChange}
        />
      </section>
      <section className={styles.buttonGroup}>
        <Button
          label="Зарегистрироваться"
          className={`${styles.button}`}
          disabled={!isFormValid()}
          onClick={handleSubmit}
        />
        <Button label="Отмена" className={`${styles.button} ${styles.cancelButton}`} onClick={() => router.push('/')} />
      </section>
    </main>
  );
};
