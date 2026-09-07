import { Reveal } from './Reveal'

const PILLARS = [
  {
    num: '01',
    title: 'Faith',
    body: "Train the body, feed the spirit. Joe's coaching is built on something bigger than a meal plan — purpose, prayer, and peace under pressure.",
    verse: '“The hardship of discipline produces righteousness and peace.” — Hebrews 12:11',
  },
  {
    num: '02',
    title: 'Fitness',
    body: 'Custom strength programming built around your body, your schedule, and the equipment you actually have — commercial gym or garage. Strong for life, not just for the mirror.',
    verse: null,
  },
  {
    num: '03',
    title: 'Discipline',
    body: 'Sobriety, structure, and daily standards. Weekly check-ins, honest conversations, and zero room for excuses. Motivation fades — discipline doesn’t.',
    verse: null,
  },
]

export function Pillars() {
  return (
    <section id="coaching">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">The Method</p>
          <h2 className="display display-lg">
            God. Fitness. Discipline.
          </h2>
        </Reveal>
        <div className="pillar-grid">
          {PILLARS.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.08}>
              <div className="card">
                <span className="pillar-num">{p.num}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                {p.verse && <span className="verse">{p.verse}</span>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
