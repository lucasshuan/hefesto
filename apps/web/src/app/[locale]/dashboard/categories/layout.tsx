import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gerenciar Categorias | Painel',
  description: 'Gerenciamento de categorias do sistema',
}

export default function ManageCategoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
