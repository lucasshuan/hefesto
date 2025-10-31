'use client'

import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip'
import { Button } from '../button'
import { CopyIcon, EllipsisIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import { ColumnDef, ColumnSizingColumnDef } from '@tanstack/react-table'

interface TableIdProps {
  id: string
}

export function TableId({ id }: TableIdProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(id)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className={`font-mono text-xs ${copied && 'text-border'}`}
          size="sm"
          onClick={handleCopy}
        >
          <CopyIcon className={'text-border'} />
          {copied
            ? 'Copiado'
            : id.slice(0, 4) + '...' + id.slice(id.length - 4, id.length)}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{id}</TooltipContent>
    </Tooltip>
  )
}

interface TableActionsProps {
  actions: {
    icon: React.ReactNode
    label: string
    onClick: () => void
  }[]
}

export function TableActions({ actions }: TableActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {actions.map(({ onClick, icon, label }) => {
          return (
            <DropdownMenuItem
              key={label}
              className="cursor-pointer"
              onClick={onClick}
            >
              {icon}
              {label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const tableIdColumnDef: ColumnSizingColumnDef = {
  size: 120,
  minSize: 120,
  maxSize: 120,
  enableResizing: false as const,
}

export const tableActionsColumnDef: ColumnSizingColumnDef = {
  size: 50,
  minSize: 50,
  maxSize: 50,
  enableResizing: false as const,
}

export const tableDateColumnDef = {
  sortingFn: 'datetime',
  enableSorting: true,
} satisfies Pick<ColumnDef<unknown>, 'minSize' | 'sortingFn' | 'enableSorting'>
