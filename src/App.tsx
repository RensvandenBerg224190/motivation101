import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Pillars } from './components/Pillars'
import { About } from './components/About'
import { HowItWorks } from './components/HowItWorks'
import { ContentSection } from './components/ContentSection'
import { ApplySection } from './components/ApplicationForm'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { Reveal } from './components/Reveal'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Pillars />
        <About />
        <HowItWorks />
        <ContentSection />
        <ApplySection />
        <FAQ />
        <section className="cta-band">
          <div className="container">
            <Reveal>
              <h2 className="display display-lg">
                Stop waiting. <span className="accent">Start.</span>
              </h2>
              <a href="#apply" className="btn btn-primary btn-lg">
                Apply for Coaching
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
