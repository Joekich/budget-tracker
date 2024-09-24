import b from 'styles/_breakpoints.module.scss';

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
type Breakpoints = { [p in BreakpointKey]: number };

function convertBreakpoints(obj: { [p: string]: string }) {
  const res: Breakpoints = {} as Breakpoints;
  const objectKeys = Object.keys(obj);
  for (let i = 0; i < objectKeys.length; i += 1) {
    const key = objectKeys[i];

    if (!key) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const value = obj[key];

    if (!value) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const numberValue = +value;

    if (!Number.isNaN(numberValue)) {
      res[key as BreakpointKey] = numberValue;
    }
  }

  return res;
}

export const breakpoints = convertBreakpoints(b);
