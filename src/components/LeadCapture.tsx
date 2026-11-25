import { FormEvent, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { captureAnalytics } from '../analytics'

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function LeadCapture() {
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    if (!endpoint) {
      setStatus('error')
      return
    }

    const formData = new FormData(form)
    const email = formData.get('email')

    if (typeof email !== 'string' || !email) {
      setStatus('error')
      return
    }

    captureAnalytics('newsletter_signup_submitted')
    setStatus('submitting')

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          consent: true,
          source: 'Startup Helper landing page',
        }),
      })

      if (!response.ok) {
        throw new Error(`Formspree returned status ${response.status}`)
      }

      form.reset()
      captureAnalytics('newsletter_signup_succeeded')
      setStatus('success')
    } catch (error) {
      console.error('Lead form submission failed:', error)
      captureAnalytics('newsletter_signup_failed')
      setStatus('error')
    }
  }

  return (
    <div className="lead-capture">
      <form className="lead-form" onSubmit={handleSubmit}>
        <div className="lead-form-row">
          <label className="sr-only" htmlFor="lead-email">Email address</label>
          <input
            id="lead-email"
            name="email"
            type="email"
            placeholder="Your email address"
            autoComplete="email"
            required
          />
          <button className="button button-light" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Joining...' : 'Get updates'}
            <ArrowUpRight size={16} />
          </button>
        </div>
        <label className="lead-consent">
          <input name="consent" type="checkbox" required />
          <span>I agree to receive email updates. I can unsubscribe at any time.</span>
        </label>
      </form>

      <p className="lead-message" aria-live="polite" role={status === 'error' ? 'alert' : 'status'}>
        {status === 'success' && 'Thanks for joining! Check your inbox for updates.'}
        {status === 'error' && !endpoint && 'The signup form is not connected yet. Please try again later.'}
        {status === 'error' && endpoint && 'We could not submit your email. Please try again later.'}
      </p>
    </div>
  )
}
