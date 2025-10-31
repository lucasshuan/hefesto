'use client'

import React from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { useSession } from '@/hooks/use-session'
import { useRouter } from '@/i18n/navigation'
import { DashboardBreadcrumb } from './_components/breadcrumb'
import { DashboardSidebar } from './_components/sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { me, isAuthenticating } = useSession()
  const router = useRouter()

  React.useEffect(() => {
    if (!isAuthenticating && (!me || me?.role !== 'admin')) {
      router.replace('/')
    }
  }, [isAuthenticating, me])

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex flex-col h-dvh w-full bg-background">
        <DashboardTopbar />
        <SidebarInset>
          <main className="overflow-auto p-4">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function DashboardTopbar() {
  return (
    <div className="sticky top-0 z-20 w-full border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="h-11 flex items-center">
        <div className="flex-1 min-w-0 ml-6">
          <DashboardBreadcrumb />
        </div>
      </div>
    </div>
  )
}
