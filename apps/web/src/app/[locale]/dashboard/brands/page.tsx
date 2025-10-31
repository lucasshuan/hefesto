'use client'

import { BrandDrawer } from '@/components/drawers/brand-drawer'
import { TemplateBrandsTable } from '@/components/templates/table/brands-table'
import { Button } from '@/components/ui/button'
import { useDrawer } from '@/contexts/drawer-context'
import { PlusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ManageBrandsPage() {
  const t = useTranslations('dashboard')
  const { open } = useDrawer()
  return (
    <>
      <div className="p-2">
        <div className="flex flex-row align-middle justify-between h-9 mb-6">
          <h2 className="font-bold text-lg flex flex-row gap-3">
            {t('manageBrands.title')}
          </h2>
          <Button variant="outline" onClick={() => open(BrandDrawer)}>
            <PlusIcon /> {t('actions.add')}
          </Button>
        </div>
        <TemplateBrandsTable />
      </div>
    </>
  )
}
