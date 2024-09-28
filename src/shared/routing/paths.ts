const routes = {
  // use typeHandle as a key if corresponding typeHandle exists
  homepage: '/',
  profile: '/profile',
};

export type RoutePaths = keyof typeof routes;

export const getPath = (type: RoutePaths, { slug }: { slug?: string | null } = {}) => {
  if (!slug) {
    return routes[type];
  }

  return `${routes[type]}/${slug}`;
};
