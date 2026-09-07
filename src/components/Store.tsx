import { STORE } from '../config'
import { Reveal } from './Reveal'

const INSIDE = [
  'The exact 90-day arc I walk my 1-on-1 clients through',
  'A 12-week strength program for gym or garage, all levels',
  'My sobriety system: day one, cravings, triggers, and the reset rule',
  'Morning routine, daily standards, and printable worksheets',
]

export function Store() {
  const { ebook, comingSoon } = STORE

  return (
    <section id="store">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">The Store</p>
          <h2 className="display display-lg">
            Take the playbook <span className="accent">home.</span>
          </h2>
          <p className="lede" style={{ marginTop: '1.25rem' }}>
            Not ready for 1-on-1 coaching yet? Start here. This is everything I teach in the first
            90 days, in your pocket for less than a bar tab.
          </p>
        </Reveal>

        <div className="store-grid">
          <Reveal className="store-cover-wrap">
            <a
              href={ebook.checkoutUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Buy ${ebook.title}`}
            >
              <img
                className="store-cover"
                src={ebook.cover}
                alt={`E-book cover: ${ebook.title}`}
                loading="lazy"
              />
            </a>
          </Reveal>

          <Reveal delay={0.08} className="store-info">
            <p className="store-kicker">E-book · Instant download</p>
            <h3 className="store-title display">{ebook.title}</h3>
            <p className="store-tagline">{ebook.tagline}</p>

            <ul className="store-bullets">
              {INSIDE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="store-buy-row">
              <a
                className="btn btn-primary btn-lg"
                href={ebook.checkoutUrl}
                target="_blank"
                rel="noreferrer"
              >
                Get the book · {ebook.price}
              </a>
              <span className="store-price-note">One-time. Yours forever.</span>
            </div>
            <p className="store-trust">
              Secure checkout · Instant PDF · Read on phone, tablet, or print it
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="store-coming">
            <div>
              <p className="store-kicker">Next up</p>
              <h4>{comingSoon.title}</h4>
              <p>{comingSoon.tagline}</p>
            </div>
            <span className="store-badge">Coming soon</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
