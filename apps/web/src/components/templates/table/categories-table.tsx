'use client'

import { CategoryDrawer } from '@/components/drawers/category-drawer'
import { DataTable } from '@/components/ui/data-table'
import {
  TableId,
  TableActions,
  tableIdColumnDef,
  tableActionsColumnDef,
  tableDateColumnDef,
} from '@/components/ui/data-table/columns'
import { useDrawer } from '@/contexts/drawer-context'
import { CategoryDto, useListCategories } from '@/lib/api/generated'
import type { ColumnDef } from '@tanstack/react-table'
import { EditIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

export function TemplateCategoriesTable() {
  const t = useTranslations('dashboard')
  const { open } = useDrawer()
  const { data } = useListCategories()

  const columns: ColumnDef<CategoryDto>[] = React.useMemo(
    () => [
      {
        ...tableIdColumnDef,
        accessorKey: 'id',
        header: t('common.table.columns.id'),
        cell: ({ row }) => <TableId id={row.original.id} />,
      },
      {
        accessorKey: 'name',
        header: t('manageCategories.table.columns.name'),
      },
      {
        ...tableDateColumnDef,
        accessorKey: 'createdAt',
        header: t('common.table.columns.createdAt'),
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
      },
      {
        ...tableDateColumnDef,
        accessorKey: 'updatedAt',
        header: t('common.table.columns.updatedAt'),
        cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(),
      },
      {
        ...tableActionsColumnDef,
        accessorKey: 'actions',
        header: ' ',
        cell: ({ row }) => (
          <TableActions
            actions={[
              {
                label: t('common.table.actions.edit'),
                icon: <EditIcon />,
                onClick: () => open(CategoryDrawer, { data: row.original }),
              },
            ]}
          />
        ),
      },
    ],
    []
  )

  return (
    <>
      <DataTable
        title={t('manageCategories.table.title')}
        columns={columns}
        data={data}
      />
    </>
  )
}
