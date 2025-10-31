'use client'

import { CategoryDrawer } from '@/components/drawers/category-drawer'
import { TemplateCategoriesTable } from '@/components/templates/table/categories-table'
import { Button } from '@/components/ui/button'
import { useDrawer } from '@/contexts/drawer-context'
import { PlusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ManageCategoriesPage() {
  const t = useTranslations('dashboard')
  const { open } = useDrawer()
  return (
    <>
      <div className="p-2">
        <div className="flex flex-row align-middle justify-between h-9 mb-6">
          <h2 className="font-bold text-lg flex flex-row gap-3">
            {t('manageCategories.title')}
          </h2>
          <Button variant="outline" onClick={() => open(CategoryDrawer)}>
            <PlusIcon /> {t('actions.add')}
          </Button>
        </div>
        <TemplateCategoriesTable />
      </div>
    </>
  )
}
