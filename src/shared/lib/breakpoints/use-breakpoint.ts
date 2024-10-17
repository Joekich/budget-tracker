import useBreakpointLib from 'use-breakpoint';

import { type BreakpointKey, breakpoints } from './breakpoints';
import { checkBreakpoint } from './check-breakpoint';

export function useBreakpoint(defaultBreakpoint?: BreakpointKey) {
  const { breakpoint } = useBreakpointLib(breakpoints, defaultBreakpoint);
  const currentBreakpoint = !breakpoint ? null : breakpoint;

  return {
    current: currentBreakpoint,
    multiple: (k: BreakpointKey[]) => checkBreakpoint(currentBreakpoint, k),
    equal: (k: BreakpointKey) => checkBreakpoint(currentBreakpoint, k),
    between: (a: BreakpointKey, b: BreakpointKey) => checkBreakpoint(currentBreakpoint, `${a}-${b}`),
    greater: (k: BreakpointKey) => checkBreakpoint(currentBreakpoint, `${k}+`),
  };
}
