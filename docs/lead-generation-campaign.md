# Startup Helper — Lead Generation Campaign

## Campaign status

**Status: M5 setup and simulated channel comparison complete.**

This document describes the implemented lead-generation setup and an
instructor-approved simulated channel comparison. Simulated figures are not
organic visits, real prospective customers, or actual Formspree leads.

## Product and goal

Startup Helper is an early-stage landing-page prototype for people with
startup ideas who want to meet potential co-founders and other curious builders.
The current validation goal is to learn whether the proposition is clear and
whether visitors want to receive future product updates.

The primary conversion is a visitor submitting their email address through the
newsletter form and explicitly checking the email-consent box.

## What is implemented

- The page explains the product idea and displays sample startup ideas.
- The hero and navigation calls to action lead to the signup section.
- Formspree receives newsletter submissions.
- PostHog records page views and the events `cta_clicked`,
  `newsletter_signup_submitted`, `newsletter_signup_succeeded`, and
  `newsletter_signup_failed` after the visitor accepts analytics.
- Analytics autocapture, console-log capture, and performance capture are
  disabled. Session replay masks form inputs.
- Signup analytics events do not include the submitted email address.
- The ideas and saved state are frontend demo data, not a live community or
  database.

The application has **one signup form, not separate lead channels**. A lead
channel is an external place or method used to bring people to the landing page.

## Proposed acquisition channels

Use one tagged link per channel. Start with organic posts and relevant
communities; do not buy ads until there is evidence that the message converts.

| Channel | Example activity | Benefits | Trade-offs |
| --- | --- | --- | --- |
| LinkedIn | Share a short founder-focused post with the prototype link | Relevant professional and startup audience; easy to attribute | Reach may be limited without an existing network; can feel promotional |
| Reddit | Ask for feedback in a subreddit whose rules allow product feedback | Relevant niche communities; candid feedback | Strict self-promotion rules; posts can be removed or receive little reach |
| Facebook groups | Share in student entrepreneurship or startup groups, with moderator/rule approval | Direct access to local and student communities | Group rules vary; audience overlap and low intent are possible |
| WhatsApp / direct outreach | Send a personal invitation to people likely to give useful feedback | Personal context and actionable responses | Small reach; only message people where outreach is welcome |
| Paid search or social ads (optional) | A small, capped experiment after organic testing | Can reach beyond existing networks and target an audience | Costs money; weak messaging can spend budget without qualified signups |

These are acquisition channels, not separate signup forms. Record only channels
where a real post or outreach message was actually made.

## Attribution links

Append a different `utm_source` to each channel. Keep the same campaign name so
the results can be compared:

```text
LinkedIn:
https://paulvasile2001.github.io/StartupHelper/?utm_source=linkedin&utm_medium=social&utm_campaign=validation2

Reddit:
https://paulvasile2001.github.io/StartupHelper/?utm_source=reddit&utm_medium=community&utm_campaign=validation2

Facebook group:
https://paulvasile2001.github.io/StartupHelper/?utm_source=facebook_group&utm_medium=community&utm_campaign=validation2

Personal outreach:
https://paulvasile2001.github.io/StartupHelper/?utm_source=direct_outreach&utm_medium=referral&utm_campaign=validation2
```

Use the matching link only in that channel. PostHog analytics requires visitor
consent and may undercount visits when analytics are rejected or blocked.

## Campaign execution log

For every real post or outreach attempt, record the date, exact permalink,
channel, and UTM link. Save a screenshot of the published post (not just the
draft). Do not include people's email addresses or other personal data in
screenshots.

| Date | Channel | Post / message permalink | Screenshot saved? | Visits | CTA clicks | Signup submissions | Successful signups |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: |
| Not run yet | — | — | — | — | — | — | — |

## Brief channel comparison

The following illustrative dataset is used for the M5 exercise. It is
synthetic and must be kept distinct from organic campaign traffic:

| Channel | Simulated visits | CTA clicks | Simulated signups | Signup rate | Interpretation |
| --- | ---: | ---: | ---: | ---: | --- |
| LinkedIn | 80 | 12 | 4 | 5.0% | Highest reach |
| Reddit | 50 | 10 | 3 | 6.0% | Niche interest |
| Direct outreach | 30 | 12 | 6 | 20.0% | Highest conversion |
| **Total** | **160** | **34** | **13** | **8.1%** | Illustrative only |

This example suggests that direct outreach has the highest conversion while
LinkedIn brings the most visits. These are scenario results, not measured
channel performance.

For any real campaign traffic, compare:

- **Reach:** visits attributed to the channel.
- **Intent:** CTA clicks divided by attributed visits.
- **Lead conversion:** successful signups divided by attributed visits.
- **Lead quality:** whether signups are in the intended audience and provide
  useful feedback. Assess this without exposing personal data.
- **Effort and cost:** time spent posting/responding and any ad spend.

Calculate rates as percentages:

```text
CTA rate = CTA clicks / attributed visits × 100
Signup conversion rate = successful signups / attributed visits × 100
Cost per signup = channel spend / successful signups
```

Only calculate a rate when its denominator is non-zero. Mark small samples as
inconclusive rather than declaring a winner. Choose the best channel based on
the actual objective (qualified feedback or signups), conversion, and effort —
not raw visits alone.

## Evidence for the presentation

For the final report or slides, include:

1. A landing-page screenshot.
2. A screenshot and permalink for each published channel post.
3. The campaign dates and the exact UTM-tagged links.
4. A PostHog view of attributed visits and funnel events, with the date range
   visible.
5. A Formspree signup count for the same period, if available.
6. A short comparison using observed numbers and the limitations above.

The local Playwright UI check is a local test and sends no analytics. The
separate production-site Playwright scenario intentionally sends synthetic,
tagged events to PostHog (`utm_campaign=validation2_simulated`,
`campaign_simulation=true`) for the M5 exercise; Formspree remains mocked.
Exclude those tagged events from any organic traffic or real-lead totals. The
160-visit comparison above is an illustrative scenario, not the count generated
by the Playwright run.
