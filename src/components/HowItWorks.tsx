import { Reveal } from './Reveal'

const STEPS = [
  {
    title: 'Apply',
    body: 'Fill out the Motivation 101 application below. Honest answers only. It takes three minutes.',
  },
  {
    title: 'Talk it out',
    body: 'I personally review every application. If it’s a fit, I reach out within 24 to 48 hours to schedule your intro call and map out your plan.',
  },
  {
    title: 'Do the work',
    body: 'Custom training, weekly check-ins, and 24/7 accountability. You show up. I keep you honest.',
  },
]

export function HowItWorks() {
  return (
    <section id="how">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">How it works</p>
          <h2 className="display display-lg">Three steps. No shortcuts.</h2>
        </Reveal>
        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="step">
                <div className="step-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
