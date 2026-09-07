import { REELS, SOCIALS } from '../config'
import { Reveal } from './Reveal'

export function ContentSection() {
  return (
    <section id="content">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Daily Fuel</p>
          <h2 className="display display-lg">No days off.</h2>
          <p className="lede" style={{ marginTop: '1.25rem' }}>
            I post daily fuel for the disciplined life. Straight talk on training, sobriety, and
            faith.
          </p>
        </Reveal>
        <div className="reel-grid">
          {REELS.map((reel, i) => (
            <Reveal key={reel.url} delay={i * 0.06}>
              <a className="reel" href={reel.url} target="_blank" rel="noreferrer">
                <img src={reel.image} alt={`Instagram reel: ${reel.quote}`} loading="lazy" />
                <div className="reel-overlay">
                  <span>▶ {reel.quote}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="content-ctas">
            <a className="btn btn-ghost" href={SOCIALS.instagram} target="_blank" rel="noreferrer">
              Follow on Instagram
            </a>
            <a className="btn btn-ghost" href={SOCIALS.youtube} target="_blank" rel="noreferrer">
              Watch on YouTube
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
