'use client'

import * as React from 'react'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '../input'
import { Button } from '../button'
import { Skeleton } from '../skeleton'
import {
  ArrowLeftIcon,
  ArrowLeftToLineIcon,
  ArrowRightIcon,
  ArrowRightToLineIcon,
  SearchIcon,
  Rows2Icon,
  Rows3Icon,
  Rows4Icon,
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip'
import { motion } from 'motion/react'
import { motionVariants } from '@/lib/motion/variants'
import { useTranslations } from 'next-intl'

type WithMeta = { meta?: { className?: string } }

interface DataTableProps<TData, TValue> {
  title?: string
  columns: (ColumnDef<TData, TValue> & WithMeta)[]
  data: TData[] | undefined
}

type Density = 'compact' | 'cozy' | 'comfortable'

const densityClasses: Record<Density, { th: string; td: string; row: string }> =
  {
    compact: { th: 'py-1.5', td: 'py-1.5', row: 'h-9' },
    cozy: { th: 'py-2', td: 'py-2', row: 'h-11' },
    comfortable: { th: 'py-3', td: 'py-3', row: 'h-13' },
  }

export function DataTable<TData, TValue>({
  title,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  if (!data) return <Skeleton className="h-[194px]" />

  const t = useTranslations('ui.dataTable')
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [density, setDensity] = React.useState<Density>('cozy')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: 'onChange',
    defaultColumn: {
      size: 120,
      minSize: 0,
      maxSize: 1000,
      enableGlobalFilter: true,
    },
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'auto',
  })

  const { pageIndex, pageSize } = table.getState().pagination
  const filtered = table.getFilteredRowModel?.()
  const total =
    filtered?.rows?.length ?? table.getPrePaginationRowModel().rows.length
  const start = total === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min((pageIndex + 1) * pageSize, total)

  const nextDensity = () =>
    setDensity((d) =>
      d === 'compact' ? 'cozy' : d === 'cozy' ? 'comfortable' : 'compact'
    )

  const DensityIcon =
    density === 'compact'
      ? Rows4Icon
      : density === 'cozy'
        ? Rows3Icon
        : Rows2Icon

  const d = densityClasses[density]

  return (
    <motion.div
      variants={motionVariants.dropIn}
      initial="hidden"
      animate="visible"
      className="overflow-x-auto rounded-md border bg-card"
    >
      <div className="flex justify-between w-full h-auto p-2 bg-gradient-to-r from-primary-dark/70 to-muted/70">
        <div className="p-2">
          <h5 className="text-foreground font-merri-sans font-bold text-sm">
            {title}
          </h5>
        </div>
        <div className="flex items-center gap-2">
          <DataTableButton
            onClick={nextDensity}
            icon={<DensityIcon />}
            label={t('density', { density })}
            aria-label={t('density', { density })}
          />
          <div className="relative">
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              className="pl-8 w-56"
              placeholder={t('search')}
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Table className="w-full table-fixed">
        <colgroup>
          {table.getVisibleLeafColumns().map((col) => (
            <col key={col.id} style={{ width: col.getSize() }} />
          ))}
        </colgroup>

        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className={`hover:bg-transparent ${d.row}`}>
              {hg.headers.map((header) => {
                const cls =
                  (header.column.columnDef as WithMeta).meta?.className ?? ''
                return (
                  <TableHead
                    key={header.id}
                    className={`text-input text-xs uppercase select-none px-2 ${d.th} ${cls}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={d.row}
              >
                {row.getVisibleCells().map((cell) => {
                  const cls =
                    (cell.column.columnDef as WithMeta).meta?.className ?? ''
                  return (
                    <TableCell key={cell.id} className={`px-2 ${d.td} ${cls}`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow className={d.row}>
              <TableCell
                colSpan={columns.length}
                className={`text-center ${d.td}`}
              >
                {t('noResults')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-1 p-2">
        <span className="text-input px-3">
          {start}-{end} de {total}
        </span>
        <DataTableButton
          icon={<ArrowLeftToLineIcon />}
          label={t('pagination.first')}
          onClick={() => table.setPageIndex(0)}
          active={table.getCanPreviousPage()}
        />
        <DataTableButton
          icon={<ArrowLeftIcon />}
          label={t('pagination.previous')}
          onClick={() => table.previousPage()}
          active={table.getCanPreviousPage()}
        />
        <DataTableButton
          icon={<ArrowRightIcon />}
          label={t('pagination.next')}
          onClick={() => table.nextPage()}
          active={table.getCanNextPage()}
        />
        <DataTableButton
          icon={<ArrowRightToLineIcon />}
          label={t('pagination.last')}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          active={table.getCanNextPage()}
        />
      </div>
    </motion.div>
  )
}

interface DataTableButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  label: string
  onClick: () => void
  active?: boolean
}

function DataTableButton({
  icon,
  label,
  onClick,
  active = true,
  ...props
}: DataTableButtonProps) {
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="border disabled:border-border border-transparent"
          size="sm"
          onClick={onClick}
          disabled={!active}
          {...props}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
