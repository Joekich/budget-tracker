import { auth } from 'app/model/auth';
import { redirect } from 'next/navigation';
import { SignInPage } from 'views/signin';

export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect('/profile/dashboard');
  }

  return <SignInPage />;
}
