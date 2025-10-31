'use client'

import { logout, me, UserDto } from '@/lib/api/generated'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export async function fetchSession(): Promise<UserDto | null> {
  try {
    const data = await me()
    if (!data) return null
    return data as UserDto
  } catch {
    return null
  }
}

export function useSession() {
  const queryClient = useQueryClient()

  const query = useQuery<UserDto | null>({
    queryKey: ['session'],
    queryFn: fetchSession,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  })

  async function signOut() {
    await logout()
    await queryClient.invalidateQueries({ queryKey: ['session'] })
  }

  function signIn() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
  }

  return {
    me: query.data,
    isAuthenticating: query.isLoading,
    error: query.error,
    signIn,
    signOut,
    refresh: () => queryClient.invalidateQueries({ queryKey: ['session'] }),
  }
}
