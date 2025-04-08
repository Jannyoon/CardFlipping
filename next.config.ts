import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    // .worker.js 파일을 Webpack에서 asset으로 처리
    config.module.rules.push({
      test: /\.worker\.js$/,
      type: 'asset/resource',
    });

    return config;
  }
};

export default nextConfig;