'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Building2Icon,
  ChevronRight,
  ChevronRightIcon,
  DatabaseIcon,
  GithubIcon,
  HeartHandshake,
  SparklesIcon,
  Tags,
  TrendingDownIcon,
  WrenchIcon,
} from 'lucide-react'
import { Wrapper } from '../../../../components/common/wrapper'
import { useSession } from '@/hooks/use-session'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

const CATEGORIES = [
  { slug: 'cpu', name: 'CPUs' },
  { slug: 'gpu', name: 'GPUs' },
  { slug: 'motherboard', name: 'Motherboards' },
  { slug: 'ram', name: 'Memory (RAM)' },
  { slug: 'ssd', name: 'SSDs' },
]
const BRANDS = [
  'AMD',
  'Intel',
  'NVIDIA',
  'ASUS',
  'MSI',
  'Gigabyte',
  'Corsair',
  'Kingston',
]
const SOURCES = [
  { name: 'Kabum', type: 'retailer' },
  { name: 'Amazon', type: 'marketplace' },
  { name: 'Terabyte', type: 'retailer' },
  { name: 'Pichau', type: 'retailer' },
]

export function MainNavbar() {
  const { me } = useSession()

  return (
    <div className="hidden md:block my-1">
      <Wrapper>
        <div className="flex h-12 items-center justify-between flex-row-reverse">
          <nav>
            <NavigationMenu className="relative z-40" viewport={false}>
              <NavigationMenuList>
                <ItemCategories />
                <ItemBrands />
                <ItemSources />
                <ItemPrices />
                <ItemContribute />
                {me?.role === 'admin' && <ItemDashboard />}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </Wrapper>
    </div>
  )
}

function ItemCategories() {
  const t = useTranslations('main.layout.nav')

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="gap-2 bg-transparent">
        <Tags className="h-4 w-4" />
        {t('primary.categories')}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="p-4">
        <div className="grid min-w-[420px] grid-cols-2 gap-2">
          {CATEGORIES.map((c) => (
            <NavigationMenuLink
              asChild
              key={c.slug}
              className="rounded-md px-3 py-2 hover:bg-muted"
            >
              <Link
                href={`/category/${c.slug}`}
                className="flex flex-row items-center justify-between"
              >
                <span>{c.name}</span>
                <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

function ItemBrands() {
  const t = useTranslations('main.layout.nav')

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="gap-2 bg-transparent">
        <Building2Icon className="h-4 w-4" />
        {t('primary.brands')}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="p-4">
        <div className="grid min-w-[420px] grid-cols-2 gap-2">
          {BRANDS.map((b) => (
            <NavigationMenuLink
              asChild
              key={b}
              className="rounded-md px-3 py-2 hover:bg-muted"
            >
              <Link
                href={`/brand/${encodeURIComponent(b.toLowerCase())}`}
                className="flex flex-row items-center justify-between"
              >
                <span>{b}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

function ItemSources() {
  const t = useTranslations('main.layout.nav')

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="gap-2 bg-transparent">
        <DatabaseIcon className="h-4 w-4" />
        {t('primary.sources')}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="p-4">
        <div className="min-w-[420px] space-y-1">
          {SOURCES.map((s) => (
            <NavigationMenuLink
              asChild
              key={s.name}
              className="block rounded-md px-3 py-2 hover:bg-muted"
            >
              <Link
                href={`/source/${encodeURIComponent(s.name.toLowerCase())}`}
              >
                {s.name}
                <span className="ml-2 text-xs text-muted-foreground">
                  ({s.type})
                </span>
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

function ItemPrices() {
  const t = useTranslations('main.layout.nav')

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="gap-2 bg-transparent">
        <TrendingDownIcon className="h-4 w-4" />
        {t('primary.prices')}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="p-4">
        <div className="min-w-[200px] space-y-1">
          <NavItem href="/prices/latest" label={t('dropdown.prices.drops')} />
          <NavItem
            href="/prices/trending"
            label={t('dropdown.prices.trends')}
          />
          <NavItem href="/prices/alerts" label={t('dropdown.prices.alerts')} />
          <NavItem
            href="/prices/history"
            label={t('dropdown.prices.history')}
          />
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

function ItemContribute() {
  const t = useTranslations('main.layout.nav')

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="gap-2 bg-transparent">
        <SparklesIcon className="h-4 w-4" />
        {t('primary.contribute')}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="p-4">
        <div className="min-w-[200px] space-y-1">
          <NavItem
            href="#"
            label={t('dropdown.contribute.donate')}
            icon={<HeartHandshake />}
          />
          <NavigationMenuLink
            asChild
            className="block rounded-md px-3 py-2 hover:bg-muted"
          >
            <Link
              target="_blank"
              href="https://github.com/lucasshuan/hefesto-frontend"
              className="flex flex-row items-center gap-2"
            >
              <GithubIcon /> {t('dropdown.contribute.github')}
            </Link>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

function ItemDashboard() {
  const t = useTranslations('main.layout.nav')

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href="/dashboard"
          className="flex flex-row items-center gap-3 px-4 font-bold"
        >
          <WrenchIcon className="h-4 w-4" />
          {t('primary.dashboard')}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

function NavItem({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon?: React.ReactElement
}) {
  return (
    <NavigationMenuLink
      asChild
      className="block rounded-md px-3 py-2 hover:bg-muted"
    >
      <Link href={href} className="flex flex-row items-center gap-2">
        {icon} {label}
      </Link>
    </NavigationMenuLink>
  )
}
