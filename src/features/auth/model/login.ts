import { methods } from 'shared/lib/fetch/fetch';

export const loginUser = async (login: string, password: string) => {
  try {
    const response = await methods.post('/api/signin', {
      data: { login, password },
      json: true,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка входа');
  }
};
