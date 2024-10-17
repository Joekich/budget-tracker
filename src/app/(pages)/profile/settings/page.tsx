import { type Metadata } from 'next';
import { getMetadata } from 'shared/lib/metadata';
import { SettingsPage } from 'views/settings';

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({ title: 'Profile - budget tracker', description: 'your finance helper', path: 'settings' });
}

function Settings() {
  return <SettingsPage />;
}

export default Settings;
