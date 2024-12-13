'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { PiWarningCircle } from 'react-icons/pi';
import { fetch } from 'shared/lib/fetch';
import { Button } from 'shared/ui/button/ui/button';
import { Input } from 'shared/ui/input';

import { schemaSignupValidation } from '../model/signup.types';
import styles from './signup-page.module.scss';

export function SignUpPage() {
  const router = useRouter();
  const [state, setState] = useState({
    login: '',
    password: '',
    confirmPassword: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ login?: string; password?: string; confirmPassword?: string }>({});

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
    const validation = schemaSignupValidation.safeParse(state);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      // Object.keys(state).forEach((key) => {
      //   const error = validation.error.issues.find(i => i.path[0] === key)?.message
      //
      //   if(error) errors[key] = error;
      // })

      validation.error.issues.reverse().forEach((issue) => {
        if (issue.path[0]) {
          const key = issue.path[0] as keyof typeof fieldErrors;
          errors[key] = issue.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

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
          <div className={styles.info}>
            <span>
              <PiWarningCircle size={20} /> Логин должен состоять минимум из 4 символов
            </span>
          </div>
          <div className={styles.info}>
            <span>
              <PiWarningCircle size={20} /> Пароль должен состоять минимум из 8 символов, <br /> содержать одну
              заглавную букву английского алфавита и одну цифру
            </span>
          </div>
          <div className={clsx(styles.inputWrapper, fieldErrors.login && styles.inputError)}>
            <Input
              value={state.login}
              className={styles.authInput}
              onChange={handleInputChange('login')}
              onFocus={() => {
                setFieldErrors((prev) => ({ ...prev, login: undefined }));
              }}
            />
            <div className={clsx(styles.placeholder, fieldErrors.login && styles.errorPlaceholder)}>
              {fieldErrors.login || 'Логин'}
            </div>
          </div>
          <div
            className={clsx(
              styles.inputWrapper,
              (fieldErrors.password || fieldErrors.confirmPassword) && styles.inputError,
            )}
          >
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              value={state.password}
              className={styles.authInput}
              onChange={handleInputChange('password')}
              onFocus={() => {
                setFieldErrors((prev) => ({ ...prev, password: undefined, confirmPassword: undefined }));
              }}
            />
            <div className={clsx(styles.placeholder, fieldErrors.password && styles.errorPlaceholder)}>
              {fieldErrors.password || 'Пароль'}
            </div>
            <button
              type="button"
              className={clsx(styles.iconWrapper, styles.roundedRight)}
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FiEyeOff size={24} /> : <FiEye size={24} />}
            </button>
          </div>
          <div className={clsx(styles.inputWrapper, fieldErrors.confirmPassword && styles.inputError)}>
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              value={state.confirmPassword}
              className={styles.authInput}
              onChange={handleInputChange('confirmPassword')}
              onFocus={() => {
                setFieldErrors((prev) => ({ ...prev, password: undefined, confirmPassword: undefined }));
              }}
            />
            <div className={clsx(styles.placeholder, fieldErrors.confirmPassword && styles.errorPlaceholder)}>
              {fieldErrors.confirmPassword || 'Подтвердите пароль'}
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
