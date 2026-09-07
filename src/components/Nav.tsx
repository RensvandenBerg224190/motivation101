import { useEffect, useState } from 'react'
import { STORE_LIVE } from '../config'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-logo">
          Motivation <em>101</em>
        </a>
        <nav className="nav-links">
          <a href="#coaching">Coaching</a>
          <a href="#about">About Joe</a>
          <a href="#content">Content</a>
          {STORE_LIVE ? <a href="#store">Store</a> : null}
          <a href="#faq">FAQ</a>
          <a href="#apply" className="btn btn-primary">
            Apply Now
          </a>
        </nav>
      </div>
    </header>
  )
}
