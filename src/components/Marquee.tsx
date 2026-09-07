const QUOTES = [
  'Wake up and live.',
  'Pray as hard as you train.',
  'We all get 24 hours.',
  'Outwork everybody.',
  'Money is not the problem.',
  'Life is short.',
  'Do better.',
  "It's Monday. Set the pace.",
]

export function Marquee() {
  // Track is duplicated so the CSS loop (translateX(-50%)) is seamless.
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-item" style={{ gap: 'inherit' }}>
            {QUOTES.map((q) => (
              <span key={q} className="marquee-item">
                {q}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
