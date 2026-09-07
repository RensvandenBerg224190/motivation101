import { useEffect, useState } from 'react'

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
          <a href="#store">Store</a>
          <a href="#faq">FAQ</a>
          <a href="#apply" className="btn btn-primary">
            Apply Now
          </a>
        </nav>
      </div>
    </header>
  )
}
