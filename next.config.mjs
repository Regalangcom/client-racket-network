/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'galangbucket.s3.ap-southeast-2.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',  
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
};
export default nextConfig;