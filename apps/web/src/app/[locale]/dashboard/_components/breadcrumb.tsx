'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import React from 'react'

export function DashboardBreadcrumb() {
  const t = useTranslations('dashboard.layout')
  const pathname = usePathname()

  const labelMap: Record<string, string> = {
    dashboard: t('routes.dashboard'),
    users: t('routes.manageUsers'),
    categories: t('routes.manageCategories'),
    brands: t('routes.manageBrands'),
    components: t('routes.manageComponents'),
    sources: t('routes.manageSources'),
  }

  const segments = React.useMemo(() => {
    const parts = pathname
      .split('?')[0]
      .split('#')[0]
      .split('/')
      .filter(Boolean)
    const acc: { label: string; href: string }[] = []
    parts.forEach((part, i) => {
      const href = '/' + parts.slice(0, i + 1).join('/')
      acc.push({ label: decodeURIComponent(part), href })
    })
    return acc
  }, [pathname])

  function humanize(label: string) {
    const key = label.toLowerCase()
    return (
      labelMap[key] ??
      label.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())
    )
  }

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((seg, i) => (
            <React.Fragment key={seg.href}>
              <BreadcrumbItem>
                {i < segments.length - 1 ? (
                  <BreadcrumbLink asChild>
                    <Link href={seg.href}>{humanize(seg.label)}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{humanize(seg.label)}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {i < segments.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
