import isEmpty from 'lodash/isEmpty';
import { notFound } from 'next/navigation';

export function checkResponseData<T>({ data, errorCode }: Awaited<{ data: T; errorCode: number | undefined }>) {
  if (errorCode === 404 || errorCode === 422 || isEmpty(data)) {
    return notFound();
  }

  if (errorCode) {
    throw new Error(errorCode.toString());
  }

  return data as NonNullable<T>;
}
