/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
