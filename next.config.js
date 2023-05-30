/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ['cdn.shopify.com']
  }
}

module.exports = nextConfig
