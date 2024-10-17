import type { ReactNode } from 'react';
import { Sidebar } from 'widgets/sidebar';

export default async function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      {children}
    </div>
  );
}
