const webpack = require('webpack')
const dotenv = require('dotenv-webpack')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
