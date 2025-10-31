'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Link, usePathname } from '@/i18n/navigation'
import {
  Building2Icon,
  DatabaseIcon,
  LayoutDashboardIcon,
  Package2Icon,
  TagsIcon,
  UserIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function DashboardSidebar() {
  const t = useTranslations('dashboard.layout')

  const items = [
    { icon: UserIcon, title: t('items.users'), link: '/dashboard/users' },
    {
      icon: Building2Icon,
      title: t('items.brands'),
      link: '/dashboard/brands',
    },
    {
      icon: TagsIcon,
      title: t('items.categories'),
      link: '/dashboard/categories',
    },
    {
      icon: DatabaseIcon,
      title: t('items.sources'),
      link: '/dashboard/sources',
    },
    {
      icon: Package2Icon,
      title: t('items.components'),
      link: '/dashboard/components',
    },
  ]
  const pathname = usePathname()

  return (
    <Sidebar side="left" collapsible="icon" variant="inset">
      <SidebarHeader>
        <div className="flex items-center justify-between px-2">
          <Link href="/" className="select-none">
            <Image
              src="/logo.svg"
              priority
              width={20}
              height={20}
              alt="Hefesto logo"
              className="rounded-[2px]"
            />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
                <Link href="/dashboard" prefetch>
                  <LayoutDashboardIcon className="h-5 w-5" />
                  <span>{t('items.overview')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t('groups.manage')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active =
                  pathname === item.link || pathname.startsWith(item.link + '/')
                return (
                  <SidebarMenuItem key={item.link}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link href={item.link} prefetch>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter></SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
