import messages from '@/messages/en.json'
import { routing } from '@/i18n/routing'

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages
    Locale: (typeof routing.locales)[number]
  }
}
