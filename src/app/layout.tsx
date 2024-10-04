import './styles/normalize.css';
import './styles/variables.scss';
import './styles/app.scss';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getMetadata } from 'shared/lib/metadata';

import { inter } from './fonts';
import SessionProvider from './SessionProvider';

export async function generateMetadata(): Promise<Metadata> {
  // const globals = await globalsApi.get();
  // return getMetadata(globals.data.meta);
  return getMetadata();
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="msapplication-config" content="/assets/icons/browserconfig.xml" />
        <link rel="mask-icon" href="/assets/icons/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
