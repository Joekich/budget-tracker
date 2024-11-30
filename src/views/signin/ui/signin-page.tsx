'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { type FormEvent, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { getPath } from 'shared/routing/paths';
import { Button } from 'shared/ui/button/ui/button';
import { Input } from 'shared/ui/input';
import { z } from 'zod';

import styles from './signin-page.module.scss';

const schemaLoginValidation = z.object({
  login: z.string().min(1, 'Введите свой логин'),
  password: z.string().min(1, 'Введите свой пароль'),
});

export function SignInPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ login?: string; password?: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = schemaLoginValidation.safeParse({ login, password });

    if (!validation.success) {
      const errors: { login?: string; password?: string } = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0] === 'login') errors.login = issue.message;
        if (issue.path[0] === 'password') errors.password = issue.message;
      });
      setFieldErrors(errors);
      setGlobalError(null);
      return;
    }

    setFieldErrors({});

    const response = await signIn('credentials', {
      redirect: false,
      login,
      password,
    });

    if (response?.error) {
      setGlobalError('Логин или пароль введён неправильно');
      return;
    }

    setGlobalError(null);
    router.push(getPath('dashboard'));
  };

  return (
    <main className={styles.authPage}>
      <div className={styles.formWrapper}>
        <header>
          <h1>Вход в личный кабинет</h1>
        </header>
        <form className={styles.authContainer} onSubmit={handleLogin}>
          <div className={clsx(styles.inputWrapper, fieldErrors.login && styles.inputError)}>
            <Input
              value={login}
              className={styles.authInput}
              onFocus={() => {
                setFieldErrors((prev) => ({ ...prev, login: undefined }));
              }}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
            <div className={clsx(styles.placeholder, fieldErrors.login && styles.errorPlaceholder)}>
              {fieldErrors.login || 'Логин'}
            </div>
          </div>
          <div className={clsx(styles.inputWrapper, fieldErrors.password && styles.inputError)}>
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              className={styles.authInput}
              onFocus={() => {
                setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className={clsx(styles.placeholder, fieldErrors.password && styles.errorPlaceholder)}>
              {fieldErrors.password || 'Пароль'}
            </div>
            <Button className={styles.iconWrapper} onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <FiEyeOff size={24} /> : <FiEye size={24} />}
            </Button>
          </div>
          {globalError && <p className={styles.fieldError}>{globalError}</p>}
          <Button type="submit" theme="primary" className={styles.submitButton}>
            Войти
          </Button>
          <Button
            theme="secondary"
            className={clsx(styles.submitButton, styles.cancelButton)}
            onClick={() => {
              router.push('/');
            }}
          >
            Отмена
          </Button>
        </form>
      </div>
    </main>
  );
}
