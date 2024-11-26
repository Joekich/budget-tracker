const routes = {
  // use typeHandle as a key if corresponding typeHandle exists
  homepage: '/',
  profile: '/profile',
  signin: '/signin',
  signup: '/signup',
  dashboard: '/profile/dashboard',
  transactions: '/profile/transactions',
  savings: '/profile/savings',
  settings: '/profile/settings',
};

export type RoutePaths = keyof typeof routes;

export const getPath = (type: RoutePaths, { slug }: { slug?: string | null } = {}) => {
  if (!slug) {
    return routes[type];
  }

  return `${routes[type]}/${slug}`;
};
