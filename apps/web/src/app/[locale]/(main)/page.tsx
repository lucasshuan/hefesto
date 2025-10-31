import { EmbersFx } from '@/components/fx/embers-fx'
import { Button } from '@/components/ui/button'
import { TelescopeIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('main.home.meta')
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  }
}

export default function HomePage() {
  const t = useTranslations('main.home')
  return (
    <div className="flex-1 h-full mt-4 bg-primary-dark ">
      <div
        aria-hidden
        className="pointer-events-none flex justify-center w-full absolute mt-[-20px] z-10"
      >
        <div className="hidden md:block h-[24rem] w-[24rem] rounded-full bg-primary/35 brightness-50 blur-[80px]" />
      </div>
      <div className="relative h-[400px] flex justify-center items-center overflow-hidden bg-[linear-gradient(to_bottom,theme(colors.background)_0%,theme(colors.background)_30%,theme(colors.primary-dark)_100%)]">
        <EmbersFx />
        <div className="flex flex-col items-center z-10">
          <h1 className="mt-8 font-semibold text-5xl lg:text-7xl min-h-14 lg:min-h-22 bg-gradient-to-b from-accent-foreground/70 to-foreground inline-block text-transparent bg-clip-text h-auto  text-center">
            {t('title')}
          </h1>
          <h3 className="text-lg text-accent-foreground opacity-75 mt-2 z-10 text-center">
            {t('subtitle')}
          </h3>
          <div className="flex flex-row gap-2 mt-4">
            <Button
              variant="default"
              className="bg-primary/80 font-normal text-md text-primary-foreground mt-6 mb-9 h-12 hover:bg-primary duration-300"
            >
              <TelescopeIcon />
              {t('actions.explore')}
            </Button>
          </div>
        </div>
      </div>
      <div className="h-full bg-primary-dark"></div>
    </div>
  )
}
