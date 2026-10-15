# Rville portfolio

Next.js App Router portfolio for Orville Giovanni Sambono at **https://rville.dev**. Includes project pages, a printable resume, an optional terminal, and a password-protected content editor backed by Upstash Redis.

## Run locally

Use Node.js 22+ and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The public portfolio works without environment variables and falls back to `src/data/portfolio.json`. Hosting must support Next.js server routes; GitHub Pages static hosting cannot run the admin API.

## Enable the admin editor

Set these server-only environment variables in your hosting provider and redeploy:

- `ADMIN_PASSWORD`: a unique password of at least 16 characters; no default password is accepted.
- `UPSTASH_REDIS_REST_URL`: the HTTPS REST endpoint of your Redis database.
- `UPSTASH_REDIS_REST_TOKEN`: its read/write REST token.

Never prefix these variables with `NEXT_PUBLIC_` or commit their values. Existing `portfolio_data` Redis content is compatible.

Open **/admin** and sign in. You can also open **Explore the interactive terminal** and enter `admin`. The editor lets you update:

- Contact email (initially `orville@rville.dev`), profile photo URL, and CV URL.
- Introduction, skills, roles, project descriptions, categories, tags, repository/demo links, photos and accessible photo descriptions.
- Project goals, approach and verified results, plus achievement and credential proof links.

Use direct HTTPS image URLs rather than a sharing page. External images load directly in the visitor's browser; resize/compress them before linking. Blank profile/CV URLs use the bundled portrait and printable `/resume` page. Email delivery and mailbox setup remain with your email provider.

**Save Changes** writes to Redis for all visitors. A failed save leaves the draft open and never reports success. Closing the editor discards unsaved changes. Sessions expire after one hour, use HttpOnly/Secure/SameSite cookies, and are invalidated by logout or changing the password. Login attempts are rate limited. Cookies and API responses are excluded from offline caching.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm audit --omit=dev
```

Playwright starts the production build on port 3310 and an isolated Redis REST fixture on loopback port 3311. It never writes to your production database. Windows uses installed Chrome when available; otherwise run `npx playwright install chromium`. Override the executable with `PLAYWRIGHT_CHROME_PATH`. Reports are generated in `playwright-report/`.

Tests cover mobile scrolling and navigation, filtering, keyboard access, clipboard denial, no-JavaScript content, accessibility, admin persistence, expired sessions, failed writes, request validation, rate limiting, logout and offline caching. GitHub Actions runs the same checks.

## Dependency audit

The previous production advisories were addressed by updating Next.js and React. At the time of this change, the full development audit still reports an upstream `braces <=3.0.3` advisory through the Next.js ESLint plugin's glob tooling. No patched release is available for [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). The runtime audit is checked separately in CI. Do not use `npm audit fix --force` to downgrade the framework lint configuration; revisit this development dependency when an upstream fix ships.

Add project screenshots, CV and proof URLs in the editor when ready.

## Local audit results

Validation on 16 October 2026 used a production build and Chrome 155. Lint, TypeScript and build checks pass; the production dependency audit reports zero vulnerabilities. Playwright covers 24 interaction and security scenarios with an isolated local database.

| Lighthouse profile | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Mobile 412 × 823 | 91 | 100 | 100 | 100 | 2.9 s | 0 |
| Mobile 360 × 800 | 87 | 100 | 100 | 100 | 3.0 s | 0 |
| Desktop 1350 × 940 | 100 | 100 | 100 | 100 | 0.7 s | 0 |

These are local lab samples; production latency, Redis and hardware affect the results. The initial public-site audit scored 87–89 on mobile. Homepage JavaScript transfer fell from approximately 258 KB to 175 KB, unused web-font downloads were removed, and an unused 18 MB SVG was deleted. Mobile performance still has room to improve; these results do not claim a consistent score of 100.
