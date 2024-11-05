/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dummyjson.com', 'cdn.dummyjson.com','www.ogbeauty.in',
      'iberchem.com',
      'www.alankaram.in',
      'images.pexels.com',
      'www.centuryply.com',
      'm.media-amazon.com',
      'images.unsplash.com',
      'assets.ajio.com',], // Configure allowed image domains
  },
 output:'standalone'
  // Other configurations can go here
};

module.exports = nextConfig;
