# Master Drop Taxi — Next.js website

Next.js 15 (App Router) + TypeScript + React 19. Plain CSS design system in `src/app/globals.css`
(layout language taken from the reference HTML, recoloured with the logo palette: navy, teal, gold, taxi amber).
Animations are CSS + IntersectionObserver — no animation library needed.

## Run

```bash
npm install
cp .env.example .env.local   # optional: add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Google Maps
With `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` set (Maps JavaScript + Places + Directions APIs enabled), the estimator uses
Places Autocomplete and calculates **road** distance and travel time through all stops. Without a key it shows an
"approx. distance" field instead.

## Where to edit
| What | File |
|---|---|
| Phone / WhatsApp (+91 97871 11277), email, address, hours, hero video | `src/data/site.ts` |
| Vehicles, per-km rates, min km, driver allowance, waiting | `src/data/vehicles.ts` (served by `/api/pricing`) |
| Tour, temple & plan packages | `src/data/packages.ts` |
| Services, FAQ, safety features, policy wording | `src/data/content.ts` |
| Fare formula | `src/lib/fare.ts` |
| Enquiry / lead capture (connect DB + notifications here) | `src/app/api/enquiry/route.ts` |

## Pages
`/` home (5-slide hero, estimate tabs: One Way / Round Trip / Multi-Stop, fleet, fare calculator, tour & temple packages,
why us, stats, app coming-soon, FAQ, CTA) · `/services` · `/plans` · `/about` · `/contact` · `/faq` ·
`/policies/[terms|privacy|cancellation|refund|luggage|pet|cookies]` · `/booking-confirmation` · sitemap.xml · robots.txt

## Before going live
- Replace the placeholder email in `site.ts`; verify the 15+ years / 50,000+ customers stats.
- Confirm local rates (and Mini waiting charge) in `vehicles.ts`; add package prices (`startingPrice`) if you want to show them.
- Have the policy wording reviewed.
- Admin panel, database, SMS/email notifications and payments are not built yet — the data files and API routes are the hand-off points.
