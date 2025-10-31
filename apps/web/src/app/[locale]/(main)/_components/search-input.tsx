'use client'

import { SearchIcon } from 'lucide-react'
import { Input } from '../../../../components/ui/input'
import React from 'react'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export function SearchInput() {
  const t = useTranslations('main.layout.header.search')
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || e.isComposing
      if (!typing && e.key === '/') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function onSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = inputRef.current?.value?.trim()
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <form
      onSubmit={onSearchSubmit}
      className="relative min-w-60 w-full max-w-3xl"
    >
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        ref={inputRef}
        type="search"
        placeholder={t('placeholder')}
        className="pl-9 text-sm"
        aria-label="Pesquisar"
      />
    </form>
  )
}
