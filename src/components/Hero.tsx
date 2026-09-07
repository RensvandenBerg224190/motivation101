import { motion, useReducedMotion } from 'motion/react'

const spring = { type: 'spring', bounce: 0, duration: 0.8 } as const

export function Hero() {
  const reduced = useReducedMotion()

  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 34 },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: reduced ? { duration: 0.3, delay } : { ...spring, delay },
  })

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container">
        <motion.div className="hero-kicker" {...rise(0)}>
          <img
            src="/images/joe-hq.jpg"
            alt="Joe Hawley"
            width={40}
            height={40}
            style={{ objectPosition: 'top' }}
          />
          <span>@theebigjoe — 1-on-1 remote coaching</span>
        </motion.div>

        <motion.h1 className="display display-xl" {...rise(0.08)}>
          Get sober.
          <br />
          Stronger.
          <br />
          <span className="accent">Confident.</span>
        </motion.h1>

        <motion.p className="lede" {...rise(0.18)}>
          Remote coaching with Joe Hawley. No quick fixes, no waiting for motivation to show up —
          discipline, strength, faith, and real accountability, wherever you train.
        </motion.p>

        <motion.div className="hero-ctas" {...rise(0.26)}>
          <a href="#apply" className="btn btn-primary btn-lg">
            Apply for Coaching
          </a>
          <a href="#how" className="btn btn-ghost btn-lg">
            See how it works
          </a>
        </motion.div>

        <motion.div className="hero-stats" {...rise(0.36)}>
          <div className="stat">
            <b>6&rsquo;9&rdquo;</b>
            <span>Of coach</span>
          </div>
          <div className="stat">
            <b>285 lb</b>
            <span>Of accountability</span>
          </div>
          <div className="stat">
            <b>100%</b>
            <span>Remote, worldwide</span>
          </div>
          <div className="stat">
            <b>24/7</b>
            <span>In your corner</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
