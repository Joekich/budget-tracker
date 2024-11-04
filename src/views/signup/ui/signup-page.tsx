'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { fetch } from 'shared/lib/fetch';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

import { schemaSignupValidation } from '../model/signin.types';
import styles from './signup-page.module.scss';

export function SignUpPage() {
  const router = useRouter();
  const [state, setState] = useState({
    login: '',
    password: '',
    confirmPassword: '',
  });
  const [focusedField, setFocusedField] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isFormValid = () =>
    schemaSignupValidation.safeParse({
      login: state.login,
      password: state.password,
      confirmPassword: state.confirmPassword,
    }).success;

  const handleInputChange = (key: keyof typeof state) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

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
    } catch {
      // eslint-disable-next-line no-alert
      alert('Ошибка регистрации');
    }
  };

  return (
    <main className={styles.authPage}>
      <div className={styles.formWrapper}>
        <header>
          <h1>Регистрация нового пользователя</h1>
        </header>
        <form className={styles.authContainer}>
          <div className={styles.inputWrapper}>
            <Input
              value={state.login}
              className={styles.authInput}
              onChange={handleInputChange('login')}
              onFocus={() => {
                setFocusedField('login');
              }}
              onBlur={() => {
                setFocusedField('');
              }}
            />
            <div
              className={clsx(
                styles.placeholder,
                (focusedField === 'login' || state.login) && styles.placeholderActive,
              )}
            >
              Логин
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              value={state.password}
              className={styles.authInput}
              onChange={handleInputChange('password')}
              onFocus={() => {
                setFocusedField('password');
              }}
              onBlur={() => {
                setFocusedField('');
              }}
            />
            <div
              className={clsx(
                styles.placeholder,
                (focusedField === 'password' || state.password) && styles.placeholderActive,
              )}
            >
              Пароль
            </div>
            <button
              type="button"
              className={clsx(styles.iconWrapper, styles.roundedRight)}
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FiEyeOff size={24} /> : <FiEye size={24} />}
            </button>
          </div>
          <div className={styles.inputWrapper}>
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              value={state.confirmPassword}
              className={styles.authInput}
              onChange={handleInputChange('confirmPassword')}
              onFocus={() => {
                setFocusedField('confirmPassword');
              }}
              onBlur={() => {
                setFocusedField('');
              }}
            />
            <div
              className={clsx(
                styles.placeholder,
                (focusedField === 'confirmPassword' || state.confirmPassword) && styles.placeholderActive,
              )}
            >
              Подтвердите пароль
            </div>
            <button
              type="button"
              className={clsx(styles.iconWrapper, styles.roundedRight)}
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FiEyeOff size={24} /> : <FiEye size={24} />}
            </button>
          </div>
        </form>
        <div className={styles.buttonGroup}>
          <Button className={styles.submitButton} onClick={handleSubmit}>
            Зарегистрироваться
          </Button>
          <Button
            className={clsx(styles.submitButton, styles.cancelButton)}
            onClick={() => {
              router.push('/');
            }}
          >
            Отмена
          </Button>
        </div>
      </div>
    </main>
  );
}
