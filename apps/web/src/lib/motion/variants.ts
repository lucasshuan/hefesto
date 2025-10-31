import type { Variants } from 'motion/react'
import { easeOut } from 'motion/react'

export const motionVariants: Record<string, Variants> = {
  dropIn: {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: easeOut },
    },
  },
}
