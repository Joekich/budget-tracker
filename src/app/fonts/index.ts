import { Inter } from 'next/font/google';

// Custom local font example
// import localFont from 'next/font/local';
//
// export const customFont = localFont({
//   display: 'swap',
//   variable: '--custom-font',
//   src: [
//     {
//       path: './assets/customFont.woff2',
//       weight: '500',
//       style: 'normal',
//     },
//   ],
// });

export const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--inter',
});
