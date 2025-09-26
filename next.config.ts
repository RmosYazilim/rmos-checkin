import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Standalone çıktı üret, Docker'da .next/standalone kopyalanabilsin
  output: 'standalone',
};

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');
export default withNextIntl(nextConfig);
