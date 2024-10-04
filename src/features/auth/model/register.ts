import { methods } from 'shared/lib/fetch/fetch';

export const signup = async (login: string, password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    throw new Error('Пароли не совпадают');
  }

  try {
    const response = await methods.post('/api/signup', {
      data: { login, password },
      json: true,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка регистрации');
  }
};
