import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Reveal } from './Reveal'

const ITEMS = [
  {
    q: 'How does remote coaching work?',
    a: 'Everything runs through your phone: a custom training plan, weekly check-ins, and direct access to me for accountability. It works whether you train in a commercial gym, a garage, or on the road.',
  },
  {
    q: 'Do I need a gym membership?',
    a: 'No. I build your program around the equipment you actually have access to. Barbells, dumbbells, bands, or bodyweight. The standard stays the same.',
  },
  {
    q: 'I’m a complete beginner. Is this for me?',
    a: 'That’s exactly what the application is for. I coach all levels. The only requirement is that you’re serious about changing your life.',
  },
  {
    q: 'Do you help with sobriety?',
    a: 'Yes. Getting sober and staying sober is a core pillar of Motivation 101. You get structure, accountability, and a coach who holds the line with you every single day.',
  },
  {
    q: 'What does coaching cost?',
    a: 'Pricing depends on the level of coaching you need and is discussed on your intro call. The application asks one honest question up front: are you ready to invest in yourself?',
  },
  {
    q: 'How do I schedule a call with you?',
    a: 'Submit the application above. I review every application personally and reach out within 24 to 48 hours to schedule your intro call.',
  },
]

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = useReducedMotion()

  return (
    <section id="faq">
      <div className="container">
        <Reveal className="section-head" >
          <p className="eyebrow">FAQ</p>
          <h2 className="display display-lg">Straight answers.</h2>
        </Reveal>
        <div className="faq-list">
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div className="faq-item">
                  <button
                    className="faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {item.q}
                    <Chevron open={isOpen} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-a"
                        initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                        exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={
                          reduced
                            ? { duration: 0.2 }
                            : { type: 'spring', bounce: 0, duration: 0.45 }
                        }
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
