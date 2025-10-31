import Image from 'next/image'
import { MainNavbar } from './navbar'
import { ProfileMenu } from './profile-menu'
import { Wrapper } from '../../../../components/common/wrapper'
import { SearchInput } from './search-input'
import { LanguageMenu } from './language-menu'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export function MainHeader() {
  const t = useTranslations('main.layout.header')

  return (
    <header className="sticky top-0 mt-3 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Wrapper>
        <div className="flex items-center justify-between gap-4 py-2 flex-wrap md:flex-nowrap">
          <div className="shrink-0">
            <Link
              href="/"
              className="flex items-start gap-1 md:gap-2 rounded h-auto select-none"
            >
              <Image
                src="/logo.svg"
                priority
                width={15}
                height={15}
                alt={t('logo.alt')}
                className="rounded-[2px] md:h-[20px] md:w-[20px] "
              />
              <span className="font-merri-sans text-sm md:text-lg font-black text-primary">
                {t('logo.title')}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex w-full justify-center items-center">
            <SearchInput />
          </div>

          <div className="min-w-44 items-center flex flex-1 justify-end">
            <ProfileMenu />
            <LanguageMenu />
          </div>
        </div>
      </Wrapper>

      <div className="flex md:hidden px-4 w-full justify-center items-center mb-3">
        <SearchInput />
      </div>

      <MainNavbar />
    </header>
  )
}
