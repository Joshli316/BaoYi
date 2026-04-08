# BaoYi 保易

Free, bilingual (EN/ZH) health insurance navigator for international students in the US. Helps students check waiver eligibility, verify J-1 compliance, compare plans, understand insurance terms, find the right care facility, estimate costs, access mental health resources, and decode medical bills — without being an insurance broker.

## Tech Stack
- HTML/TypeScript single-page app
- Tailwind CSS v4 (CDN)
- Lucide icons (CDN)
- Cloudflare Pages deployment
- PWA manifest for installability
- No server, no database, no user accounts — 100% client-side

## Structure
```
BaoYi/
├── index.html          # Entry point, app shell, tab router
├── plan.md             # Implementation plan
├── CLAUDE.md           # This file
├── manifest.json       # PWA manifest
├── src/
│   ├── app.ts          # Main app logic, tab router, navigation
│   ├── i18n.ts         # Bilingual strings (EN/ZH), toggle logic
│   ├── features/
│   │   ├── waiver.ts       # Waiver eligibility checker wizard
│   │   ├── j1compliance.ts # J-1 coverage compliance checker
│   │   ├── compare.ts      # Plan comparison tool (up to 3 plans)
│   │   ├── glossary.ts     # Insurance terminology explainer
│   │   ├── wheretogo.ts    # "Where should I go?" care wizard
│   │   ├── cost.ts         # Cost estimator calculator
│   │   ├── mentalhealth.ts # Mental health resources guide
│   │   └── bill.ts         # "I got a bill" EOB explainer
│   ├── data/
│   │   ├── waiver-criteria.ts  # University waiver requirements data
│   │   ├── j1-minimums.ts      # 22 CFR 62.14 coverage minimums
│   │   ├── scenarios.ts        # Cost scenario data (10 medical scenarios)
│   │   ├── glossary-terms.ts   # Insurance term definitions + examples
│   │   ├── care-triage.ts      # Symptom → care level decision tree
│   │   └── mental-health-resources.ts  # Crisis lines, directories, platforms
│   ├── utils/
│   │   ├── calculator.ts   # OOP cost calculation engine
│   │   └── storage.ts      # sessionStorage wrapper for wizard state
│   └── styles/
│       └── print.css       # Print-friendly stylesheet
├── assets/
│   └── icons/          # PWA icons (192x192, 512x512)
├── research/           # 12 research reports (planning reference, not deployed)
└── dist/               # Build output for deployment
```

## Entry Point
index.html

## Build
`npm run build` (esbuild bundles src/ → dist/)

## Deployment
`wrangler pages deploy dist/`

## Conventions
- **Bilingual:** All user-facing strings go in i18n.ts. Keys are English, values are {en, zh} objects. Toggle switches ALL visible text including error messages, tooltips, badges, disclaimers.
- **Tab navigation:** 8 features accessible via top nav tabs (desktop) or slide-out menu (mobile). No nested routing — each feature is a self-contained view.
- **Wizard flow:** Checkers (waiver, J-1, where-to-go, cost estimator) use stepped wizards. One question or group per step. Progress stepper visible.
- **Disclaimers:** Every output screen includes "This is not medical or legal advice. Consult a qualified professional." In both languages. Persistent disclaimer bar at page bottom.
- **Tone:** Confident and reassuring. "Let's check your coverage" not "Input your insurance parameters." 6th-8th grade reading level.
- **Sources:** Regulatory citations (22 CFR 62.14, ACA provisions) linked inline. University-specific requirements cite source pages.
- **Privacy:** Zero server-side storage. sessionStorage for wizard state (cleared on tab close). No cookies. No analytics.
- **No insurance brokerage:** We educate, compare, and check compliance. We do NOT sell insurance, recommend specific plans, or provide medical/legal advice.
- **Estimates language:** Always use "approximately," "estimated," "based on typical costs" — never "you will pay exactly $X."
- **Status badges:** Use shield-check (compliant/green), alert-triangle (warning/amber), x-circle (non-compliant/red) consistently across all features.
- **Monospace for money:** All dollar amounts rendered in monospace font for precision feel.
- **Dark mode:** CSS custom properties. Toggle in nav. Respects system preference on first load.
- **Accessibility:** WCAG AA contrast, keyboard navigation, ARIA labels, 44px touch targets, lang attribute switches on toggle.
