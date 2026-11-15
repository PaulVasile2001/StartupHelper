import { Lightbulb, Users, TrendingUp } from 'lucide-react'

const steps = [
  { number: '01', icon: Lightbulb, title: 'Put your idea out there.', text: 'Share the thing you can’t stop thinking about. Rough drafts welcome.', tone: 'step-blue' },
  { number: '02', icon: Users, title: 'Find your kind of people.', text: 'Meet thoughtful builders, get honest feedback, and find a co-founder.', tone: 'step-green' },
  { number: '03', icon: TrendingUp, title: 'Make the next move.', text: 'Turn good conversations into small experiments and real momentum.', tone: 'step-peach' },
]

export default function HowItWorks() {
  return (
    <section className="how-section page-wrap" id="how-it-works">
      <div className="section-intro">
        <div className="eyebrow">A LITTLE HELP GOES A LONG WAY</div>
        <h2>From “what if?”<br />to <span>what’s next.</span></h2>
        <p>You don’t need a pitch deck or a five-year plan. Just bring the idea. We’ll help you find your next step.</p>
      </div>
      <div className="steps-grid">
        {steps.map(({ number, icon: Icon, title, text, tone }) => (
          <article className={`step-card ${tone}`} key={number}>
            <div className="step-number">{number}<span>✳</span></div>
            <div className="step-illustration"><Icon size={43} strokeWidth={1.4} /></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
