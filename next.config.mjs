/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns: [
      {
        hostname: "i.pinimg.com"
      }
    ]
  }

  /* config options here */
};

export default nextConfig;
