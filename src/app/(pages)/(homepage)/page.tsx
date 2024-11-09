import { auth } from 'app/model/auth';
import { redirect } from 'next/navigation';
import { HomePage } from 'views/home';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/profile/dashboard');
  }

  return <HomePage />;
}
