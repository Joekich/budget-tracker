/** @type {import('next').NextConfig} */
export default ({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/api/auth/signin',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ]
  // },
});
