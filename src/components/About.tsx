import { Reveal } from './Reveal'

export function About() {
  return (
    <section className="about" id="about">
      <div className="container about-grid">
        <Reveal>
          <figure className="about-photo" style={{ margin: 0 }}>
            <img src="/images/joe-avatar.jpg" alt="Joe Hawley — @theebigjoe" />
            <figcaption>@theebigjoe</figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Your Coach</p>
          <h2 className="display display-lg">Meet Joe Hawley</h2>
          <p className="lede" style={{ marginTop: '1.5rem' }}>
            They call him Theebigjoe for a reason: 6&rsquo;9&rdquo;, 285 pounds, and impossible to
            out-excuse. Joe coaches men who are done waiting — men who want to get sober, get
            stronger, and walk into every room with confidence.
          </p>
          <p className="lede" style={{ marginTop: '1rem' }}>
            This isn&rsquo;t about quick fixes or waiting for motivation to appear. It&rsquo;s about
            building discipline, confidence, strength, accountability, and consistency — and
            becoming the man you know you&rsquo;re capable of becoming.
          </p>
          <blockquote className="about-quote">
            “We all get 24 hours. Outwork everybody.”
            <cite>— Joe Hawley</cite>
          </blockquote>
          <div className="about-tags">
            <span className="tag">Sobriety</span>
            <span className="tag">Strength</span>
            <span className="tag">Faith</span>
            <span className="tag">Accountability</span>
            <span className="tag">Remote · Worldwide</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
