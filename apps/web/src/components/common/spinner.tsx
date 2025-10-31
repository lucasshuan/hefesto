import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'

export function Spinner({ className }: { className?: string }) {
  return <Loader className={cn('animate-spin', className)} />
}
