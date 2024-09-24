import { type BreakpointKey, breakpoints } from './breakpoints';

const checkBreakpointRange = (breakpoint: BreakpointKey, range: string) => {
  const breakpointValue = breakpoints[breakpoint];
  if (typeof breakpointValue === 'undefined') {
    console.error(`Missing breakpoint value: ${breakpoint}`);
    return false;
  }

  const moreThan = range.split('+');
  const moreThanBp = moreThan[0] as BreakpointKey;
  const moreThanBpValue = moreThanBp && breakpoints[moreThanBp];
  if (moreThan.length > 1 && moreThanBpValue) {
    return breakpointValue >= moreThanBpValue;
  }

  const stringRange = range.split('-');
  if (stringRange.length !== 2) {
    return breakpoint === range;
  }

  const [start, end] = stringRange;
  if (!start || !end) {
    console.error(`Incorrect string range values: ${stringRange}`);
    return false;
  }

  const min = breakpoints[start as BreakpointKey];
  const max = breakpoints[end as BreakpointKey];
  if (min === undefined || max === undefined) {
    console.error(`Missing string range values:\nmin: ${start} (${min})\nmax: ${end} (${max})`);
    return false;
  }

  const breakPointNumber = breakpointValue;
  return breakPointNumber >= min && breakPointNumber < max;
};

export const checkBreakpoint = (breakpoint: BreakpointKey | null, range: Array<string> | string) => {
  if (!breakpoint) {
    return null;
  }

  if (typeof range === 'string') {
    return checkBreakpointRange(breakpoint, range);
  }
  return range.some((rangeItem) => checkBreakpointRange(breakpoint, rangeItem));
};
