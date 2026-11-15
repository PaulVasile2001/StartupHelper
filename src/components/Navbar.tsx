import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href="#top" onClick={close}>
        <Sparkles className="brand-mark" size={21} />
        <span>Startup Helper</span>
      </a>
      <button
        className="menu-toggle"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={`main-nav ${open ? 'open' : ''}`} aria-label="Main navigation">
        <a href="#how-it-works" onClick={close}>How it works</a>
        <a href="#community" onClick={close}>Community</a>
        <a className="nav-cta" href="#get-started" onClick={close}>Get started <span>↗</span></a>
      </nav>
    </header>
  )
}
