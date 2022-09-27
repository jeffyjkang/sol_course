/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    campaignFactoryAddress: process.env.CAMPAIGN_FACTORY_ADDRESS
  }
}

module.exports = nextConfig
