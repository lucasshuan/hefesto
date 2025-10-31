'use client'

import { UserDrawer } from '@/components/drawers/user-drawer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DataTable } from '@/components/ui/data-table'
import {
  TableId,
  TableActions,
  tableIdColumnDef,
  tableActionsColumnDef,
  tableDateColumnDef,
} from '@/components/ui/data-table/columns'
import { useDrawer } from '@/contexts/drawer-context'
import { useListUsers, UserDto } from '@/lib/api/generated'
import type { ColumnDef } from '@tanstack/react-table'
import { EditIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

export function TemplateUsersTable() {
  const t = useTranslations('dashboard')

  const { open } = useDrawer()
  const { data } = useListUsers()

  const columns: ColumnDef<UserDto>[] = React.useMemo(
    () => [
      {
        ...tableIdColumnDef,
        accessorKey: 'id',
        header: t('common.table.columns.id'),
        cell: ({ row }) => <TableId id={row.original.id} />,
      },
      {
        accessorKey: 'imageUrl',
        header: t('manageUsers.table.columns.avatar'),
        enableGlobalFilter: false,
        cell: ({ row }) => (
          <Avatar>
            <AvatarImage
              src={row.original.imageUrl as unknown as string | undefined}
              alt="Avatar"
              loading="lazy"
            />
            <AvatarFallback>
              {row.original.name?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        ),
      },
      { accessorKey: 'name', size: 180, header: 'Nome' },
      {
        accessorKey: 'email',
        header: t('manageUsers.table.columns.email'),
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
                onClick: () => open(UserDrawer, { data: row.original }),
              },
            ]}
          />
        ),
      },
    ],
    []
  )

  return (
    <DataTable
      title={t('manageUsers.table.title')}
      columns={columns}
      data={data}
    />
  )
}
