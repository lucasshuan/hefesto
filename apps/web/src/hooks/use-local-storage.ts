import * as React from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = React.useState<T>(initialValue)

  React.useEffect(() => {
    const raw = window.localStorage.getItem(key)
    if (raw !== null) setValue(JSON.parse(raw))
  }, [])

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
