/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      },
      {
        protocol: 'https',
        hostname: '**.cloudflare.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'codex1-nq28.onrender.com'
      }
    ],
    // Enable optimization for better performance
    unoptimized: false,
    formats: ['image/webp', 'image/avif']
  }
};

export default nextConfig;
