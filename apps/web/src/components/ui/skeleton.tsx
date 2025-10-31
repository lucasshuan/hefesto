import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

interface SpecterProps extends React.ComponentProps<'div'> {
  loading: boolean
}

function Specter({ loading, className, children, ...props }: SpecterProps) {
  return loading ? <Skeleton className={className} {...props} /> : children
}

export { Skeleton, Specter }
