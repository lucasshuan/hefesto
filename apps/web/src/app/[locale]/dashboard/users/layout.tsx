import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gerenciar Usuários | Painel',
  description: 'Gerenciamento de usuários do sistema',
}

export default function ManageUsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
