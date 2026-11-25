import { useEffect, useRef, useState } from 'react'
import { disableAnalytics, enableAnalytics, isAnalyticsConfigured } from '../analytics'

type ConsentChoice = 'accepted' | 'rejected'

const consentStorageKey = 'startuphelper-analytics-consent'

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [analyticsError, setAnalyticsError] = useState(false)
  const consentAttempt = useRef(0)

  useEffect(() => {
    if (!isAnalyticsConfigured()) return

    try {
      const savedChoice = window.localStorage.getItem(consentStorageKey)
      if (savedChoice === 'accepted') {
        setChoice('accepted')
        const attempt = ++consentAttempt.current
        void enableAnalytics().then((enabled) => {
          if (consentAttempt.current !== attempt) return
          if (!enabled) {
            setAnalyticsError(true)
            setSettingsOpen(true)
          }
        })
      } else if (savedChoice === 'rejected') {
        setChoice('rejected')
        disableAnalytics()
      }
    } catch (error) {
      console.error('Could not read analytics consent:', error)
    }
  }, [])

  if (!isAnalyticsConfigured()) return null

  async function choose(choice: ConsentChoice) {
    const attempt = ++consentAttempt.current

    try {
      window.localStorage.setItem(consentStorageKey, choice)
    } catch (error) {
      console.error('Could not save analytics consent:', error)
    }

    setChoice(choice)
    setSettingsOpen(false)
    setAnalyticsError(false)

    if (choice === 'accepted') {
      const enabled = await enableAnalytics()
      if (consentAttempt.current !== attempt) return
      if (!enabled) {
        setAnalyticsError(true)
        setSettingsOpen(true)
      }
    } else {
      disableAnalytics()
    }
  }

  if (choice !== null && !settingsOpen) {
    return (
      <button className="analytics-settings" type="button" onClick={() => setSettingsOpen(true)}>
        Privacy settings
      </button>
    )
  }

  return (
    <aside className="analytics-consent" aria-label="Analytics privacy settings">
      <h2>Help us improve Startup Helper</h2>
      <p>
        Allow PostHog analytics and session replay to help us understand site usage.
        Form inputs are masked in recordings. No analytics run unless you agree.
      </p>
      {analyticsError && (
        <p className="analytics-error" role="alert">
          Analytics could not be loaded. Please check the PostHog configuration and try again.
        </p>
      )}
      <div className="analytics-consent-actions">
        <button className="analytics-accept" type="button" onClick={() => choose('accepted')}>
          Accept analytics
        </button>
        <button className="analytics-reject" type="button" onClick={() => choose('rejected')}>
          Reject
        </button>
      </div>
    </aside>
  )
}
