import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="site-footer page-wrap">
      <a className="brand" href="#top"><Sparkles className="brand-mark" size={19} /><span>Startup Helper</span></a>
      <p>Made for the ideas that bring us together.</p>
      <a className="back-top" href="#top">Back to top ↑</a>
      <span className="copyright">© {new Date().getFullYear()} Startup Helper</span>
    </footer>
  )
}
