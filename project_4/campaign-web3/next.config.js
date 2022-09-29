/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    campaignFactoryAddress: process.env.CAMPAIGN_FACTORY_ADDRESS,
    projectId: process.env.PROJECT_ID
  }
}

module.exports = nextConfig
