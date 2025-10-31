'use client'

import { LanguagesIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu'
import { Button } from '../../../../components/ui/button'
import { usePathname, useRouter } from '@/i18n/navigation'
import { Locale, useLocale, useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function LanguageMenu() {
  const t = useTranslations('main.layout.header.languageMenu')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return
    router.replace(pathname, { locale: newLocale })
  }

  const langs = [
    { locale: 'en', label: 'English', code: 'us', alt: t('flag.en') },
    { locale: 'pt', label: 'Português', code: 'br', alt: t('flag.pt') },
  ] as const

  return (
    <div className="items-center gap-1 flex text-sm h-9">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="items-center gap-2 flex text-sm px-2"
        >
          <Button variant="ghost">
            <LanguagesIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-muted-foreground">
              {t('label')}
            </DropdownMenuLabel>
            {langs.map((lang) => (
              <DropdownMenuItem
                key={lang.locale}
                onClick={() => switchLocale(lang.locale)}
                disabled={locale === lang.locale}
                className={cn(
                  'cursor-pointer',
                  locale === lang.locale &&
                    'bg-background text-foreground pointer-events-none'
                )}
              >
                <Image
                  src={`https://cdn.jsdelivr.net/npm/circle-flags/flags/${lang.code}.svg`}
                  alt={lang.alt}
                  width={16}
                  height={16}
                  className="rounded-full"
                />
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
