import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import bundleAnalyzer from '@next/bundle-analyzer'

const isStandalone = process.env.NEXT_BUILD_STANDALONE === 'true'

const nextConfig: NextConfig = {
  output: isStandalone ? 'standalone' : 'export',
}

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/i18n/request.ts',
  experimental: {
    createMessagesDeclaration: './src/messages/en.json',
  },
})

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(withNextIntl(nextConfig))
