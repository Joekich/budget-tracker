import { redirect } from 'next/navigation';
import { SignInPage } from 'views/signin';

import { auth } from '../../model/auth';

export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect('/profile/dashboard');
  }

  return <SignInPage />;
}
