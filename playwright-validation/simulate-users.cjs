const { chromium } = require('playwright');

const SITE_URL = 'https://paulvasile2001.github.io/StartupHelper/';
const CAMPAIGN = 'validation2_simulated';

console.log('[TEST MODE] PostHog events are tagged campaign_simulation=true; Formspree submissions are mocked.');

// Lista de vizitatori simulați (unii convertesc, alții doar navighează)
const visitors = [
  {
    name: 'Andrei Popa',
    email: 'andrei.popa.upb@example.test',
    utm: 'whatsapp',
    categories: ['Community', 'Food'],
    saveIdea: true,
    subscribe: true,
    viewport: { width: 1440, height: 900 },
  },
  {
    name: 'Mara Ionescu',
    email: 'mara.ionescu.dev@example.test',
    utm: 'reddit',
    categories: ['Climate', 'Community'],
    saveIdea: false,
    subscribe: true,
    viewport: { width: 1280, height: 800 },
  },
  {
    name: 'Vlad Marinescu',
    email: null,
    utm: 'reddit',
    categories: ['Food'],
    saveIdea: false,
    subscribe: false,
    viewport: { width: 1366, height: 768 },
  },
  {
    name: 'Elena Dumitrescu',
    email: 'elena.dumitrescu24@example.test',
    utm: 'linkedin',
    categories: ['Community', 'Climate'],
    saveIdea: true,
    subscribe: true,
    viewport: { width: 390, height: 844 }, // Mobil
  },
  {
    name: 'Radu Stanciu',
    email: 'radu.stanciu.cs@example.test',
    utm: 'whatsapp',
    categories: ['Food', 'Community'],
    saveIdea: true,
    subscribe: true,
    viewport: { width: 1536, height: 864 },
  },
  {
    name: 'Ioana Gheorghe',
    email: null, // Vizitator care doar dă scroll și pleacă
    utm: 'linkedin',
    categories: ['Climate'],
    saveIdea: true,
    subscribe: false,
    viewport: { width: 412, height: 915 }, // Mobil
  },
  {
    name: 'Mihai Tudor',
    email: 'mihai.tudor.startup@example.test',
    utm: 'whatsapp',
    categories: ['Community'],
    saveIdea: false,
    subscribe: true,
    viewport: { width: 1440, height: 900 },
  },
  {
    name: 'Bianca Vasilescu',
    email: 'bianca.vasilescu99@example.test',
    utm: 'reddit',
    categories: ['Food', 'Climate'],
    saveIdea: true,
    subscribe: true,
    viewport: { width: 1280, height: 800 },
  },
];

const sleep = (minMs, maxMs) => {
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function smoothScroll(page, targetY, steps = 10) {
  await page.evaluate(
    async ({ y, numSteps }) => {
      const startY = window.scrollY;
      const delta = (y - startY) / numSteps;
      for (let i = 1; i <= numSteps; i++) {
        window.scrollTo(0, startY + delta * i);
        await new Promise((r) => setTimeout(r, 50 + Math.random() * 60));
      }
    },
    { y: targetY, numSteps: steps }
  );
}

async function runVisitor(visitor) {
  const browser = await chromium.launch({
    headless: false, // Pune true dacă vrei să ruleze în fundal fără ferestre
    slowMo: 70,
  });

  const context = await browser.newContext({
    viewport: visitor.viewport,
  });

  await context.route('**/*', async (route) => {
    const request = route.request();
    const requestUrl = new URL(request.url());

    if (requestUrl.hostname !== 'formspree.io') {
      await route.continue();
      return;
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Accept, Content-Type',
    };

    if (request.method() === 'OPTIONS') {
      await route.fulfill({ status: 204, headers: corsHeaders });
      return;
    }

    if (request.method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: corsHeaders,
        body: JSON.stringify({ ok: true }),
      });
      return;
    }

    await route.abort();
  });

  const page = await context.newPage();
  page.on('response', (response) => {
    const responseUrl = new URL(response.url());
    if (responseUrl.hostname === 'eu.i.posthog.com') {
      console.log(`  -> [POSTHOG] ${response.status()} ${responseUrl.pathname}`);
    }
  });

  try {
    console.log(`\n[START] ${visitor.name} | sursa: ${visitor.utm}`);
    const campaignUrl = new URL(SITE_URL);
    campaignUrl.searchParams.set('utm_source', visitor.utm);
    campaignUrl.searchParams.set('utm_medium', visitor.utm === 'linkedin' ? 'social' : 'community');
    campaignUrl.searchParams.set('utm_campaign', CAMPAIGN);
    await page.goto(campaignUrl.toString(), { waitUntil: 'networkidle' });
    await sleep(1000, 2000);

    // 1. Acceptă banner-ul de analytics
    const acceptBtn = page.getByRole('button', { name: 'Accept analytics' });
    await acceptBtn.waitFor({ state: 'visible' });
    await acceptBtn.click();
    console.log(`  -> Accepted analytics`);
    console.log('  -> Waiting 10 seconds for PostHog session replay to start');
    await page.waitForTimeout(10000);

    const heroCta = page.getByRole('link', { name: /Get updates/i });
    if (await heroCta.isVisible()) {
      await heroCta.click();
      console.log('  -> Clicked hero CTA');
    }

    // 2. Scroll spre secțiunea cu idei
    const docHeight = await page.evaluate(() => document.body.scrollHeight);
    await smoothScroll(page, Math.floor(docHeight * 0.35));
    await sleep(800, 1600);

    // 3. Dă click pe categorii random
    for (const cat of visitor.categories) {
      await page.getByRole('button', { name: cat }).click();
      console.log(`  -> Clicked category: ${cat}`);
      await sleep(700, 1500);
    }

    // 4. Opțional: apasă pe Save idea
    if (visitor.saveIdea) {
      const saveBtn = page.getByRole('button', { name: 'Save idea' }).first();
      if (await saveBtn.isVisible()) {
        await saveBtn.click();
        console.log(`  -> Saved an idea`);
        await sleep(600, 1200);
      }
    }

    // 5. Scroll până jos la formular
    await smoothScroll(page, docHeight);
    await sleep(1000, 1800);

    // 6. Dacă acest vizitator se abonează, completează formularul
    if (visitor.subscribe && visitor.email) {
      const emailBox = page.getByRole('textbox', { name: 'Email address' });
      await emailBox.click();
      await emailBox.pressSequentially(visitor.email, { delay: 65 });
      await sleep(400, 900);

      await page.getByRole('checkbox', { name: 'I agree to receive email' }).check();
      await sleep(400, 800);

      await page.getByRole('button', { name: 'Get updates' }).click();
      await page.getByText('Thanks for joining! Check your inbox for updates.').waitFor();
      console.log('  -> [SIMULATED SIGNUP] Formspree was mocked; no real lead created');
    } else {
      console.log(`  -> Left page without subscribing (bounce/browse)`);
      await sleep(1000, 2000);
    }

    await page.waitForTimeout(10000);
    console.log('  -> Waiting 10 seconds for PostHog events and replay to flush');
  } catch (err) {
    console.log(`  -> [ERROR] ${visitor.name}: ${err.message}`);
    throw err;
  } finally {
    await browser.close();
  }
}

(async () => {
  for (const v of visitors) {
    await runVisitor(v);
    await sleep(1500, 3000);
  }
  console.log('\nToți vizitatorii au terminat!');
})();