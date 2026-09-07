import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { FORM_ENTRIES, GOOGLE_FORM_ACTION, SOCIALS } from '../config'
import { Reveal } from './Reveal'

const spring = { type: 'spring', bounce: 0, duration: 0.45 } as const

const FITNESS_LEVELS = [
  'Just getting started',
  'Getting back into it',
  'Train consistently',
  'Advanced / competitive',
]

const SERIOUSNESS_CAPTIONS: Record<number, string> = {
  1: 'Just looking around',
  2: 'Just looking around',
  3: 'Testing the waters',
  4: 'Testing the waters',
  5: 'Ready for a push',
  6: 'Ready for a push',
  7: 'Committed',
  8: 'Committed',
  9: 'Locked in',
  10: 'ALL IN. Let’s go.',
}

type Answers = {
  goal: string
  obstacles: string
  ninetyDays: string
  fitnessLevel: string
  fitnessDetail: string
  seriousness: number | null
  invest: '' | 'Yes' | 'No'
  name: string
  email: string
  phone: string
}

const EMPTY: Answers = {
  goal: '',
  obstacles: '',
  ninetyDays: '',
  fitnessLevel: '',
  fitnessDetail: '',
  seriousness: null,
  invest: '',
  name: '',
  email: '',
  phone: '',
}

const TOTAL_STEPS = 7 // question steps, after the intro card

export function ApplicationForm() {
  const [step, setStep] = useState(-1) // -1 = intro card
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<Answers>(EMPTY)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'failed'>('idle')
  const reduced = useReducedMotion()

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((a) => ({ ...a, [key]: value }))
    setError('')
  }

  const validate = (s: number): string => {
    switch (s) {
      case 0:
        return answers.goal.trim() ? '' : 'Tell Joe your #1 goal — one honest sentence is enough.'
      case 1:
        return answers.obstacles.trim() ? '' : 'Be honest — what’s really holding you back?'
      case 2:
        return answers.ninetyDays.trim() ? '' : 'Give it a shot — where do you want to be in 90 days?'
      case 3:
        return answers.fitnessLevel ? '' : 'Pick the option that fits best.'
      case 4:
        return answers.seriousness ? '' : 'Pick a number — no wrong answers, just honest ones.'
      case 5:
        return answers.invest ? '' : 'Pick one.'
      case 6:
        if (!answers.name.trim()) return 'Your name is required so Joe knows who he’s talking to.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim()))
          return 'A valid email is required so Joe can reach you.'
        return ''
      default:
        return ''
    }
  }

  const go = (to: number) => {
    setDirection(to > step ? 1 : -1)
    setStep(to)
    setError('')
  }

  const next = () => {
    const msg = validate(step)
    if (msg) {
      setError(msg)
      return
    }
    if (step === TOTAL_STEPS - 1) {
      void submit()
    } else {
      go(step + 1)
    }
  }

  const submit = async () => {
    setStatus('submitting')
    const contact = `[Contact: ${answers.name.trim()} — ${answers.email.trim()}${
      answers.phone.trim() ? ' — ' + answers.phone.trim() : ''
    }]`
    const body = new URLSearchParams({
      [FORM_ENTRIES.goal]: `${answers.goal.trim()} ${contact}`,
      [FORM_ENTRIES.obstacles]: answers.obstacles.trim(),
      [FORM_ENTRIES.ninetyDays]: answers.ninetyDays.trim(),
      [FORM_ENTRIES.fitnessLevel]: answers.fitnessDetail.trim()
        ? `${answers.fitnessLevel} — ${answers.fitnessDetail.trim()}`
        : answers.fitnessLevel,
      [FORM_ENTRIES.seriousness]: `${answers.seriousness}/10 — ${SERIOUSNESS_CAPTIONS[answers.seriousness!]}`,
      [FORM_ENTRIES.invest]: answers.invest,
      pageHistory: '0,1',
    })
    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      setStatus('done')
    } catch {
      setStatus('failed')
    }
  }

  const motionProps = {
    custom: direction,
    variants: reduced
      ? {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 },
        }
      : {
          // enter and exit along the same axis — spatially consistent
          enter: (dir: number) => ({ x: dir * 56, opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit: (dir: number) => ({ x: dir * -56, opacity: 0 }),
        },
    initial: 'enter' as const,
    animate: 'center' as const,
    exit: 'exit' as const,
    transition: reduced ? ({ duration: 0.2 } as const) : spring,
  }

  const progress = status === 'done' ? 1 : Math.max(0, step) / TOTAL_STEPS

  if (status === 'done') {
    return (
      <div className="form-card">
        <motion.div
          className="success"
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={reduced ? { duration: 0.25 } : { type: 'spring', bounce: 0, duration: 0.6 }}
        >
          <div className="success-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M4.5 12.5l5 5 10-11"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3>Application received</h3>
          <p>
            Joe personally reviews every application and will reach out within 24–48 hours to
            schedule your intro call. Stay ready.
          </p>
          <div className="content-ctas">
            <a className="btn btn-ghost" href={SOCIALS.instagram} target="_blank" rel="noreferrer">
              Follow @theebigjoe
            </a>
            <a className="btn btn-ghost" href={SOCIALS.youtube} target="_blank" rel="noreferrer">
              Watch on YouTube
            </a>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="form-card">
      <div className="progress" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
        <motion.div
          className="progress-fill"
          style={{ width: '100%' }}
          animate={{ scaleX: progress }}
          initial={false}
          transition={spring}
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (step >= 0) next()
        }}
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {step === -1 && (
            <motion.div key="intro" {...motionProps}>
              <span className="q-label">It’s game time.</span>
              <p className="q-help">
                This isn’t about quick fixes, excuses, or waiting for motivation to appear. Answer
                the questions below honestly — your answers help Joe determine whether coaching is a
                good fit for you. Takes about 3 minutes.
              </p>
              <button type="button" className="btn btn-primary btn-lg" onClick={() => go(0)}>
                Start my application
              </button>
            </motion.div>
          )}

          {step === 0 && (
            <motion.div key="q0" {...motionProps}>
              <label className="q-label" htmlFor="goal">
                What is your #1 goal right now?
              </label>
              <p className="q-help">One honest sentence. What matters most?</p>
              <input
                id="goal"
                className="input"
                autoFocus
                value={answers.goal}
                onChange={(e) => set('goal', e.target.value)}
                placeholder="e.g. Get sober and build real strength"
              />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="q1" {...motionProps}>
              <label className="q-label" htmlFor="obstacles">
                What’s holding you back from reaching that goal?
              </label>
              <p className="q-help">The biggest things. Be straight — Joe reads every word.</p>
              <textarea
                id="obstacles"
                className="textarea"
                autoFocus
                value={answers.obstacles}
                onChange={(e) => set('obstacles', e.target.value)}
                placeholder="Drinking on weekends, no structure, zero consistency…"
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="q2" {...motionProps}>
              <label className="q-label" htmlFor="ninety">
                What do you want to accomplish in the next 90 days?
              </label>
              <p className="q-help">Paint the picture. Where are you standing three months from now?</p>
              <textarea
                id="ninety"
                className="textarea"
                autoFocus
                value={answers.ninetyDays}
                onChange={(e) => set('ninetyDays', e.target.value)}
                placeholder="90 days sober, 10 lb of muscle, morning routine locked in…"
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="q3" {...motionProps}>
              <span className="q-label">How would you describe your current fitness level?</span>
              <p className="q-help">No wrong answer — this just shapes your programming.</p>
              <div className="chips" role="radiogroup" aria-label="Current fitness level">
                {FITNESS_LEVELS.map((level) => (
                  <button
                    type="button"
                    key={level}
                    role="radio"
                    aria-checked={answers.fitnessLevel === level}
                    className={`chip${answers.fitnessLevel === level ? ' selected' : ''}`}
                    onClick={() => set('fitnessLevel', level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <label className="field-label" htmlFor="fitnessDetail" style={{ marginTop: '1.4rem' }}>
                Anything to add? <span className="form-hint">(optional)</span>
              </label>
              <input
                id="fitnessDetail"
                className="input"
                value={answers.fitnessDetail}
                onChange={(e) => set('fitnessDetail', e.target.value)}
                placeholder="Injuries, training history, sports background…"
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="q4" {...motionProps}>
              <span className="q-label">How serious are you about changing your life?</span>
              <p className="q-help">1 = just curious. 10 = all in, starting today.</p>
              <div className="scale-row" role="radiogroup" aria-label="Seriousness from 1 to 10">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <button
                    type="button"
                    key={n}
                    role="radio"
                    aria-checked={answers.seriousness === n}
                    className={`scale-chip${answers.seriousness === n ? ' selected' : ''}`}
                    onClick={() => set('seriousness', n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="scale-caption">
                {answers.seriousness ? SERIOUSNESS_CAPTIONS[answers.seriousness] : '\u00A0'}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="q5" {...motionProps}>
              <span className="q-label">
                Are you financially prepared to invest in yourself through professional coaching?
              </span>
              <p className="q-help">Coaching is an investment — in your body, your mind, and your future.</p>
              <div className="yesno" role="radiogroup" aria-label="Ready to invest">
                {(['Yes', 'No'] as const).map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    role="radio"
                    aria-checked={answers.invest === opt}
                    className={`chip${answers.invest === opt ? ' selected' : ''}`}
                    onClick={() => set('invest', opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div key="q6" {...motionProps}>
              <span className="q-label">Where can Joe reach you?</span>
              <p className="q-help">He’ll get back to you personally within 24–48 hours.</p>
              <label className="field-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="input"
                autoFocus
                autoComplete="name"
                value={answers.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Your full name"
              />
              <label className="field-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="input"
                type="email"
                autoComplete="email"
                value={answers.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="you@example.com"
              />
              <label className="field-label" htmlFor="phone">
                Phone or Instagram <span className="form-hint">(optional)</span>
              </label>
              <input
                id="phone"
                className="input"
                autoComplete="tel"
                value={answers.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="+1 555 000 0000 or @yourhandle"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <p className="form-error" role="alert" aria-live="polite">
          {error ||
            (status === 'failed'
              ? 'Something went wrong sending your application. Please try again — or apply directly via the form link below.'
              : '')}
        </p>

        {step >= 0 && (
          <div className="form-nav">
            <button
              type="button"
              className="btn-back"
              onClick={() => go(step - 1)}
              disabled={status === 'submitting'}
            >
              ← Back
            </button>
            <span className="form-hint">
              {step + 1} / {TOTAL_STEPS}
            </span>
            <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
              {status === 'submitting'
                ? 'Sending…'
                : step === TOTAL_STEPS - 1
                  ? 'Submit application'
                  : 'Continue'}
            </button>
          </div>
        )}
      </form>

      {status === 'failed' && (
        <p className="form-hint" style={{ marginTop: '1rem' }}>
          Backup:{' '}
          <a href="https://forms.gle/hJG8cbkzsmTGqFpYA" target="_blank" rel="noreferrer">
            open the application on Google Forms
          </a>
        </p>
      )}
    </div>
  )
}

export function ApplySection() {
  return (
    <section className="apply" id="apply">
      <div className="container apply-shell">
        <Reveal className="section-head" >
          <p className="eyebrow">Motivation 101</p>
          <h2 className="display display-lg">Coaching application</h2>
          <p className="lede" style={{ marginTop: '1.25rem' }}>
            Ready to get sober, stronger, and confident? Apply below — this is the exact
            application Joe uses to decide who he works with.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ApplicationForm />
        </Reveal>
      </div>
    </section>
  )
}
