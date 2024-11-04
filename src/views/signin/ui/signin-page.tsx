'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { getPath } from 'shared/routing/paths';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

import styles from './signin-page.module.scss';

export function SignInPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

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

    if (response?.error) {
      // eslint-disable-next-line no-alert
      alert('Неверный логин или пароль');
      return;
    }

    router.push(getPath('dashboard'));
  };

  return (
    <main className={styles.authPage}>
      <div className={styles.formWrapper}>
        <header>
          <h1>Вход в личный кабинет</h1>
        </header>
        <form className={styles.authContainer}>
          <div className={styles.inputWrapper}>
            <Input
              value={login}
              className={styles.authInput}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
              onFocus={() => {
                setIsLoginFocused(true);
              }}
              onBlur={(e) => {
                setIsLoginFocused(e.target.value.length > 0);
              }}
            />
            <div className={clsx(styles.placeholder, isLoginFocused && styles.placeholderActive)}>Логин</div>
          </div>
          <div className={styles.inputWrapper}>
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              className={styles.authInput}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onFocus={() => {
                setIsPasswordFocused(true);
              }}
              onBlur={(e) => {
                setIsPasswordFocused(e.target.value.length > 0);
              }}
            />
            <div className={clsx(styles.placeholder, isPasswordFocused && styles.placeholderActive)}>Пароль</div>
            <Button
              type="button"
              className={clsx(styles.iconWrapper, styles.roundedRight)}
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FiEyeOff size={24} /> : <FiEye size={24} />}
            </Button>
          </div>
        </form>
        <Button className={styles.submitButton} onClick={handleLogin}>
          Войти
        </Button>
        <Button
          className={`${styles.submitButton} ${styles.cancelButton}`}
          onClick={() => {
            router.push('/');
          }}
        >
          Отмена
        </Button>
      </div>
    </main>
  );
}
