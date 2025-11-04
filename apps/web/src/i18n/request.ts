/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getRequestConfig } from 'next-intl/server'
import { hasLocale, Messages } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  const messages = (await import(`@/messages/${locale}.json`))
    .default as Messages

  return {
    locale,
    messages,
  }
})
