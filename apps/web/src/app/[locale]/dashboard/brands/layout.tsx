import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gerenciar Marcas | Painel',
  description: 'Gerenciamento de marcas do sistema',
}

export default function ManageBrandsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
