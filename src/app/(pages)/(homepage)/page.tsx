'use client';

import { useBreakpoint } from 'shared/lib/breakpoints';

import styles from './page.module.scss';

export default function Home() {
  const breakpoint = useBreakpoint();

  const isMobile = breakpoint.equal('xs');
  const isLaptop = breakpoint.between('md', 'lg');
  const isSpecial = breakpoint.equal('sm') || breakpoint.equal('lg');
  const isDesktop = breakpoint.greater('xl');
  // const isMultiple = breakpoint.multiple(['xs', 'md-lg', 'xxl+']);

  return (
    <main className={styles.main}>
      <h1>Hello world!</h1>
      {isMobile && '📱'}
      {isLaptop && '⌨️'}
      {isDesktop && '🖥️'}
      {isSpecial && '🎁'}
      Happy coding🤓
    </main>
  );
}
