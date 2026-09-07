import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Scroll-reveal wrapper. Critically damped spring (no overshoot — nothing
 * here carries gesture momentum). Falls back to a plain cross-fade when the
 * user prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={
        reduced
          ? { duration: 0.25, ease: 'easeOut' }
          : { type: 'spring', bounce: 0, duration: 0.7, delay }
      }
    >
      {children}
    </motion.div>
  )
}
