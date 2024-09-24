import { ZodError } from 'zod';

export const requestHandler = async <T>(tryBlock: () => Promise<T> | T, errorPlace: string) => {
  let fetchData: T | undefined;
  let errorCode: number | undefined;
  try {
    fetchData = await tryBlock();
  } catch (error) {
    console.error(errorPlace, error);
    errorCode = 500;

    if (error instanceof ZodError) {
      errorCode = 422;
    }
  }

  return {
    data: fetchData,
    errorCode,
  };
};
