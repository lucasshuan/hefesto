'use client'

import { BrandDrawer } from '@/components/drawers/brand-drawer'
import { DataTable } from '@/components/ui/data-table'
import {
  TableId,
  TableActions,
  tableIdColumnDef,
  tableActionsColumnDef,
  tableDateColumnDef,
} from '@/components/ui/data-table/columns'
import { useDrawer } from '@/contexts/drawer-context'
import { BrandDto, useListBrands } from '@/lib/api/generated'
import type { ColumnDef } from '@tanstack/react-table'
import { EditIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

export function TemplateBrandsTable() {
  const t = useTranslations('dashboard')

  const { open } = useDrawer()
  const { data } = useListBrands()

  const columns: ColumnDef<BrandDto>[] = React.useMemo(
    () => [
      {
        ...tableIdColumnDef,
        accessorKey: 'id',
        header: t('common.table.columns.id'),
        cell: ({ row }) => <TableId id={row.original.id} />,
      },
      {
        accessorKey: 'name',
        header: t('manageBrands.table.columns.name'),
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
                onClick: () => open(BrandDrawer, { data: row.original }),
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
        title={t('manageBrands.table.title')}
        columns={columns}
        data={data}
      />
    </>
  )
}
