import { MainHeader } from '@/app/[locale]/(main)/_components/header'
import { Wrapper } from '@/components/common/wrapper'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MainHeader />
      <main className="flex-1 flex flex-col h-full">{children}</main>
      <footer className="bg-background h-20 border-t-1 flex justify-center align-items">
        <Wrapper className="flex items-center h-full">
          <span className="text-muted-foreground text-sm">© 2025 Hefesto</span>
        </Wrapper>
      </footer>
    </>
  )
}
