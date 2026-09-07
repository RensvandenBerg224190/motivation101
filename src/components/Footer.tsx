import { SOCIALS } from '../config'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-logo">
          Motivation <em>101</em>
        </div>
        <div className="footer-socials">
          <a href={SOCIALS.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={SOCIALS.youtube} target="_blank" rel="noreferrer">
            YouTube
          </a>
          <a href={SOCIALS.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
        </div>
        <p className="footer-note">
          © {new Date().getFullYear()} Motivation 101 · Remote coaching by Joe Hawley. Get sober.
          Get stronger. Get confident.
        </p>
      </div>
    </footer>
  )
}
