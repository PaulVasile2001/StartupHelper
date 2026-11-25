const projectKey = import.meta.env.VITE_POSTHOG_KEY?.trim()
const apiHost = import.meta.env.VITE_POSTHOG_HOST?.trim() || 'https://eu.i.posthog.com'

type PostHogClient = typeof import('posthog-js').default

const isCampaignSimulation = () =>
  new URLSearchParams(window.location.search).get('utm_campaign') ===
  'validation2_simulated'

let initialized = false
let consentGranted = false
let consentRevision = 0
let posthogClient: PostHogClient | undefined
let posthogClientPromise: Promise<PostHogClient> | undefined

export function isAnalyticsConfigured() {
  return Boolean(projectKey)
}

export async function enableAnalytics() {
  if (!projectKey) return false

  const revision = ++consentRevision

  try {
    posthogClientPromise ??= import('posthog-js')
      .then(({ default: client }) => {
        posthogClient = client
        return client
      })
      .catch((error: unknown) => {
        posthogClientPromise = undefined
        throw error
      })

    const client = await posthogClientPromise
    if (revision !== consentRevision) return false

    if (!initialized) {
      client.init(projectKey, {
        api_host: apiHost,
        defaults: '2026-08-30',
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false,
        capture_performance: false,
        enable_recording_console_log: false,
        opt_out_useragent_filter: isCampaignSimulation(),
        session_recording: {
          maskAllInputs: true,
        },
      })
      initialized = true
    }

    client.opt_in_capturing()
    consentGranted = true
    client.capture('$pageview', {
      $current_url: window.location.href,
      campaign_simulation: isCampaignSimulation(),
    })
    return true
  } catch (error) {
    if (revision === consentRevision) {
      console.error('Could not initialize PostHog analytics:', error)
      consentGranted = false
    }
    return false
  }
}

export function disableAnalytics() {
  consentRevision += 1
  consentGranted = false
  if (initialized) posthogClient?.opt_out_capturing()
}

export function captureAnalytics(
  event: string,
  properties?: Record<string, string | number | boolean>,
) {
  if (consentGranted) {
    posthogClient?.capture(event, {
      ...properties,
      campaign_simulation: isCampaignSimulation(),
    })
  }
}
