/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'simg-ssl.duolingo.com',
              pathname: '/ssr-avatars/**',
            },
          ],
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/duostats',
          permanent: true, 
        },
      ];
    },
};

export default nextConfig;
