import { type Metadata } from 'next';
import { getMetadata } from 'shared/lib/metadata';
import { ProfilePage } from 'views/profile';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({ title: 'Profile - budget tracker', description: 'your finance helper', path: 'profile' });
}

function Profile() {
  return <ProfilePage />;
}

export default Profile;
