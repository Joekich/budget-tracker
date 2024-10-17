import '../../styles/normalize.css';
import '../../styles/variables.scss';
import '../../styles/app.scss';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getMetadata } from 'shared/lib/metadata';
import { Sidebar } from 'widgets/sidebar';

export async function generateMetadata(): Promise<Metadata> {
  // const globals = await globalsApi.get();
  // return getMetadata(globals.data.meta);
  return getMetadata();
}

export default async function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      {children}
    </div>
  );
}
