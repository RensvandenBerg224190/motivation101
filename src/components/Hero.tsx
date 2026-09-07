import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

const spring = { type: 'spring', bounce: 0, duration: 0.8 } as const

export function Hero() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  // Photo is hidden at the top; it fades in and rises up once you start
  // scrolling, then keeps drifting up slightly (parallax) as you go deeper.
  const photoOpacity = useTransform(scrollY, [40, 280], [0, 1])
  const photoY = useTransform(scrollY, [0, 280, 800], [90, 0, -60])

  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 34 },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: reduced ? { duration: 0.3, delay } : { ...spring, delay },
  })

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />

      <motion.div
        className="hero-photo-wrap"
        aria-hidden="true"
        style={reduced ? { opacity: photoOpacity } : { opacity: photoOpacity, y: photoY }}
      >
        <img className="hero-photo" src="/images/joe-cutout.jpg" alt="" />
      </motion.div>

      <div className="container hero-content">
        <motion.div className="hero-kicker" {...rise(0)}>
          <img
            src="/images/joe-hq.jpg"
            alt="Joe Hawley"
            width={40}
            height={40}
            style={{ objectPosition: 'top' }}
          />
          <span>@theebigjoe · 1-on-1 remote coaching</span>
        </motion.div>

        <motion.h1 className="display display-xl" {...rise(0.08)}>
          Get sober.
          <br />
          Stronger.
          <br />
          <span className="accent">Confident.</span>
        </motion.h1>

        <motion.p className="lede" {...rise(0.18)}>
          I&rsquo;m Joe Hawley. I coach men to get sober, stronger, and confident. No quick fixes,
          no waiting for motivation. Discipline, strength, faith, and real accountability, wherever
          you train.
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
