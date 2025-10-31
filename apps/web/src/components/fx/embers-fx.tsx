'use client'

import React from 'react'

export function EmbersFx() {
  interface Ember {
    id: number
    size: number
    left: number
    duration: number
    delay: number
    drift: number
  }

  const [embers, setEmbers] = React.useState<Ember[]>([])

  React.useEffect(() => {
    const count = Math.floor(window.innerWidth * 0.1)
    const arr = Array.from({ length: count }).map((_, i) => {
      const duration = Math.random() * 1 + 0.5
      const delay = -Math.random() * duration
      const drift = (Math.random() - 0.5) * 180
      return {
        id: i,
        size: Math.random() * 6 + 2,
        left: Math.random() * 100,
        duration,
        delay,
        drift,
      }
    })
    setEmbers(arr)
  }, [])

  return (
    <div>
      {embers.map((e) => (
        <span
          key={e.id}
          className="ember"
          style={{
            width: e.size,
            height: e.size,
            left: `${e.left}%`,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            ['--ember-rotation' as string]: `${e.drift}deg`,
            ['--ember-drift' as string]: `${e.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
