import { ArrowUpRight, Sparkles, Users, Lightbulb, Rocket } from 'lucide-react'
import Navbar from './components/Navbar'
import DiscoverPreview from './components/DiscoverPreview'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'
import LeadCapture from './components/LeadCapture'
import AnalyticsConsent from './components/AnalyticsConsent'
import { captureAnalytics } from './analytics'

function App() {
  return (
    <>
      <Navbar />
      <main id="top">
        <section className="hero page-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT BIG THING STARTS SMALL</div>
            <h1>Find your<br/><span className="nowrap">co-founders.</span></h1>
            <p className="hero-lede">Every great startup begins with a spark. Find your people, test your idea, and make the next move together.</p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href="#get-started"
                onClick={() => captureAnalytics('cta_clicked', { placement: 'hero' })}
              >
                Get updates <ArrowUpRight size={16} />
              </a>
              <a className="button button-quiet" href="#how-it-works"><span className="play-icon">▶</span> See how it works</a>
            </div>
            <div className="social-proof">
              <div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div>
              <p><strong>A good idea grows better together.</strong><br />Meet the people who can help it grow.</p>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="spark spark-one">✳</div><div className="spark spark-two">✳</div>
            <div className="hero-art-card">
              <div className="art-topline"><span><Sparkles size={15} /> A place to begin</span><span className="live-pill"><i /> OPEN COMMUNITY</span></div>
              <div className="art-main">
                <div className="art-icon"><Lightbulb size={31} /></div>
                <span className="art-kicker">GOOD IDEAS START WITH PEOPLE</span>
                <h2>One idea.<br /><em>A hundred possibilities.</em></h2>
                <p>Bring your curiosity. Find the people who want to build alongside you.</p>
                <div className="art-people">
                  <span className="art-person p-one">J</span><span className="art-person p-two">M</span><span className="art-person p-three">A</span>
                  <span className="art-people-label">Different skills, shared ambition.</span>
                </div>
              </div>
              <div className="art-bottom"><span><Users size={14} /> Find your people</span><span><Rocket size={14} /> Build something real</span></div>
            </div>
            <div className="floating-note"><span className="note-icon">↗</span><span><b>Good ideas travel.</b><small>Pass yours along.</small></span><span className="note-spark">✳</span></div>
          </div>
        </section>

        <section className="trust-strip page-wrap" id="community">
          <p>For the curious, the makers, and the <span>“what if?”</span> people.</p>
          <div className="trust-items"><span>✳ EARLY FOUNDERS</span><span>◉ CURIOUS MINDS</span><span>↗ FUTURE CO-FOUNDERS</span></div>
        </section>

        <DiscoverPreview />
        <HowItWorks />

        <section className="quote-section page-wrap">
          <div className="quote-mark">“</div>
          <blockquote>You don’t have to have it all figured out. You just have to be willing to start.</blockquote>
          <div className="quote-caption"><span className="quote-line" /> A reminder for every first-time founder <span className="quote-line" /></div>
        </section>

        <section className="cta-section page-wrap" id="get-started">
          <div className="cta-decoration cta-star-left">✳</div><div className="cta-decoration cta-star-right">✳</div>
          <div className="eyebrow">YOUR IDEA HAS A PLACE HERE</div>
          <h2>So, what are you<br />thinking about?</h2>
          <p>Join the list for product news, new ideas, and ways to find your people.</p>
          <LeadCapture />
          <small>No spam. Just occasional updates from Startup Helper.</small>
        </section>
      </main>
      <Footer />
      <AnalyticsConsent />
    </>
  )
}

export default App
