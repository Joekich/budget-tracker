import './styles/normalize.css';
import './styles/variables.scss';
import './styles/app.scss';

import { type Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';
import { getMetadata } from 'shared/lib/metadata';

import { auth } from '../../prisma/auth';
import { inter } from './fonts';

export async function generateMetadata(): Promise<Metadata> {
  // const globals = await globalsApi.get();
  // return getMetadata(globals.data.meta);
  return getMetadata();
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <meta name="msapplication-config" content="/assets/icons/browserconfig.xml" />
        <link rel="mask-icon" href="/assets/icons/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
