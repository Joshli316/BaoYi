# Implementation Plan: BaoYi 保易

## Overview
BaoYi is a free, bilingual (English/Chinese) health insurance navigator for international students in the US. It solves four pain points: overpaying for university SHIP plans that could be waived, skipping medical care due to cost/navigation confusion, confusing travel insurance with health insurance, and J-1 students unknowingly violating State Department coverage requirements. 100% client-side, no accounts, no server — deployed to Cloudflare Pages as a PWA.

## Design Spec

### Design Direction
```
Mood: Bold | Density: Balanced | Color: High contrast (navy + emerald) | Type: Inter + system CJK | Shapes: Mixed (sharp cards, rounded buttons/badges)
```

Reference: Credit Karma's confidence + Mint's "we've got your back" energy. NOT a generic healthcare template.

### Anti-AI Design Rules (enforce during build)
1. **Vary spacing intentionally** — tighter within form groups (12px), looser between sections (48-64px). Not uniform 24px everywhere.
2. **Left-align all body text** — only the landing hero headline and big verdict numbers are centered. Everything else left-aligned.
3. **Solid buttons only** — no gradients. Emerald fill for primary, ghost (outline) for secondary, text-only for tertiary.
4. **Navy/emerald palette is deliberate** — navy = trust, authority, protection. Emerald = go, safe, compliant. Amber = caution. Red = fail. No blue, no purple.
5. **No identical card grids** — feature cards on home use uniform 2x4 grid, but wizard results use varied layouts (big verdict left, details right).
6. **Landing hero leads with reassurance** — "Navigate US Health Insurance with Confidence / 自信应对美国医疗保险" with shield motif. Not "Welcome to BaoYi."
7. **Mixed radius** — cards: sharp (`rounded-none`, 4px left-border accent). Buttons: soft (`rounded-full`). Inputs: medium (`rounded-md`). Badges: pill (`rounded-full`).
8. **One dominant element per screen** — on compliance check results, the verdict badge is 32px with shield icon. Everything else is supporting.
9. **Lucide icons only** — shield-check, shield-alert, shield-x for compliance states. stethoscope, heart-pulse, brain, receipt for features. No emoji.
10. **Specific copy** — "Check if your plan meets J-1 requirements" not "Optimize your insurance coverage." "Estimated out-of-pocket: ~$180" not "Calculate your potential expenses."

### Color Palette
| Token | Hex | Usage | Contrast |
|-------|-----|-------|----------|
| `--navy-950` | `#080E1B` | Header/nav background | — |
| `--navy-900` | `#0F172A` | Heading text, dark UI elements | 16.8:1 on white (AAA) |
| `--navy-800` | `#1E293B` | Secondary dark elements | 13.6:1 on white (AAA) |
| `--navy-700` | `#334155` | Borders on dark surfaces | — |
| `--emerald-500` | `#10B981` | Primary CTAs, compliant badges, links | 3.4:1 on white (large text) |
| `--emerald-600` | `#059669` | Button hover, body links | 4.6:1 on white (AA) |
| `--emerald-700` | `#047857` | Active/pressed buttons | 5.9:1 on white (AAA) |
| `--emerald-50` | `#ECFDF5` | Compliant result panel bg | — |
| `--amber-500` | `#F59E0B` | Warning badges | 2.7:1 (use on dark bg only) |
| `--amber-100` | `#FEF3C7` | Warning panel bg | — |
| `--amber-800` | `#92400E` | Warning text | 7.3:1 on white (AAA) |
| `--red-500` | `#EF4444` | Non-compliant badges, errors | 3.9:1 on white (large text) |
| `--red-100` | `#FEE2E2` | Error panel bg | — |
| `--red-700` | `#B91C1C` | Error text | 6.1:1 on white (AAA) |
| `--slate-50` | `#F8FAFC` | Page background | — |
| `--slate-100` | `#F1F5F9` | Alternating section bg | — |
| `--slate-300` | `#CBD5E1` | Input borders, dividers | — |
| `--slate-400` | `#94A3B8` | Muted/helper text | 3.4:1 (large text only) |
| `--slate-600` | `#475569` | Body text | 7.0:1 on white (AAA) |
| `--white` | `#FFFFFF` | Card backgrounds | — |

### Typography
| Role | Font | Size | Weight | Line-height | Letter-spacing |
|------|------|------|--------|-------------|----------------|
| Page title (h1) | Inter | 36px / 2.25rem | 800 | 1.1 | -0.025em |
| Section title (h2) | Inter | 28px / 1.75rem | 700 | 1.2 | -0.02em |
| Card/wizard title (h3) | Inter | 20px / 1.25rem | 700 | 1.3 | -0.01em |
| Body | Inter | 16px / 1rem | 400 | 1.6 | 0 |
| Body bold | Inter | 16px / 1rem | 600 | 1.6 | 0 |
| Small / helper | Inter | 14px / 0.875rem | 400 | 1.5 | 0 |
| Badge text | Inter | 13px / 0.8125rem | 600 | 1 | 0.02em |
| Button text | Inter | 16px / 1rem | 600 | 1 | 0.02em |
| Money/numbers | SF Mono, Cascadia Code, Fira Code, monospace | 15px | 600 | 1.4 | 0 |
| Chinese body | PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif | 16px | 400 | 1.8 | 0 |
| Chinese heading | PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif | 28px | 700 | 1.4 | 0 |

**Note:** Chinese text needs taller line-height (1.8 vs 1.6). The i18n toggle must switch line-height along with lang attribute.

### Component Specs

**Cards** — `rounded-none`, 1px `slate-200` border, white bg, `shadow-sm`. On hover: `shadow-md` + 4px left border in `emerald-500`. Feature cards on home get a 4px navy top stripe + Lucide icon.

**Buttons:**
- Primary: `bg-emerald-600 text-white rounded-full px-6 py-3 font-semibold shadow-sm`. Hover: `bg-emerald-700`. Active: `bg-emerald-800`.
- Secondary: `bg-white text-navy-900 border border-slate-300 rounded-full px-6 py-3`. Hover: `bg-slate-50 border-slate-400`.
- Ghost: `text-emerald-600 hover:bg-emerald-50 rounded-md px-4 py-2`.
- Disabled: `opacity-50 cursor-not-allowed`.

**Status Badges:**
- Compliant: `bg-emerald-500 text-white rounded-full px-3 py-1` + shield-check icon
- Warning: `bg-amber-100 text-amber-800 rounded-full px-3 py-1` + alert-triangle icon
- Non-compliant: `bg-red-100 text-red-700 rounded-full px-3 py-1` + x-circle icon
- Info: `bg-navy-800 text-white rounded-full px-3 py-1` + info icon

**Result Panels:**
- Compliant: 4px left border emerald-500, bg-emerald-50, shield-check at 32px, verdict headline + explanation
- Warning: 4px left border amber-500, bg-amber-50, alert-triangle at 32px
- Non-compliant: 4px left border red-500, bg-red-50, x-circle at 32px

**Form Inputs:** `rounded-md border-slate-300 px-4 py-3`. Focus: `ring-2 ring-emerald-500 border-emerald-500`. Error: `ring-2 ring-red-500 border-red-500`.

**Wizard Stepper:** Horizontal (desktop), vertical (mobile). Numbered circles — navy bg + white text. Active: emerald bg. Completed: emerald bg + check. Upcoming: slate-300 bg. Connected by 2px lines.

**Comparison Table:** Sticky header (navy bg, white text). Alternating rows (white / slate-50). Best-value column: emerald-50 bg + emerald top border. Numbers in monospace.

**Terminology Accordion:** Term as header (bold, navy), collapsed by default. Expands to: definition → worked example (slate-100 box, monospace numbers) → "common misconception" callout (amber left-border box).

**Disclaimer Bar:** Persistent bottom bar — `bg-navy-800 text-slate-300 text-sm py-3`. Shield icon + disclaimer text.

### Navigation
**Desktop:** Full-width `navy-950` top bar. Logo (shield icon + "BaoYi 保易") left-aligned. 8 feature tabs center — text links, active tab has 3px emerald underline. EN/ZH toggle + dark mode toggle right.

**Mobile:** `navy-950` top bar with logo + hamburger. Slide-out nav lists all 8 features. Bottom: lang + dark mode toggles.

### Transitions
- Global: `transition-all duration-150 ease-in-out`
- Card hover: shadow grows + left border appears
- Wizard steps: slide-left (CSS transform, 200ms)
- Results: fade-in from opacity-0 (200ms)
- Accordion: max-height transition (200ms)
- Focus: `outline-none ring-2 ring-emerald-500 ring-offset-2`

### Responsive Breakpoints
| Breakpoint | Width | Changes |
|-----------|-------|---------|
| Mobile | < 640px | Single column, stacked cards, slide-out nav, vertical stepper |
| Tablet | 640-1023px | 2-column grid, tabs collapse to scrollable |
| Desktop | 1024px+ | Full 2x4 grid, horizontal stepper, side-by-side comparison |

---

## Steps

### Step 1: Project scaffolding
- Create `package.json` with esbuild, TypeScript
- Create `tsconfig.json`
- Create `build.js` (esbuild config)
- Create `index.html` with app shell: navy top nav, main content area, disclaimer footer bar
- Create `manifest.json` (PWA)
- Create `sw.js` (service worker with cache-first)
- Load Tailwind v4 via CDN, Inter font via Google Fonts, Lucide via CDN
- Set up CSS custom properties for the full color palette (light + dark mode)

### Step 2: Core infrastructure
- Create `src/app.ts` — tab router (hash-based: `#waiver`, `#j1`, `#compare`, `#glossary`, `#wheretogo`, `#cost`, `#mentalhealth`, `#bill`), navigation controller, dark mode toggle, feature view mounting/unmounting
- Create `src/i18n.ts` — bilingual string store, language toggle, `t()` function, lang attribute switching, line-height adjustment for Chinese
- Create `src/utils/storage.ts` — sessionStorage wrapper for wizard state persistence
- Create `src/utils/calculator.ts` — OOP cost calculation engine (deductible → copay → coinsurance → OOP max logic)

### Step 3: Landing page / dashboard
- Hero section with shield motif: "Navigate US Health Insurance with Confidence / 自信应对美国医疗保险"
- 2x4 grid of feature cards with icons, titles, one-line descriptions
- Each card links to its feature tab
- Feature icons: shield-check (waiver), shield (J-1), columns (compare), book-open (glossary), map-pin (where to go), calculator (cost), heart-pulse (mental health), receipt (bill)

### Step 4: Waiver Eligibility Checker
- Stepped wizard: select university (or "other") → input your alternative plan details (deductible, OOP max, network type, mental health, prescription coverage, US-based insurer, medevac/repatriation) → results
- Data file `src/data/waiver-criteria.ts` with criteria for 10+ major universities (UC system, USC, NYU, Columbia, Stanford, MIT, UMich, etc.)
- Results panel: item-by-item checklist showing which criteria pass/fail with shield-check / x-circle icons
- Overall verdict badge: "Likely eligible to waive" (green) / "May not qualify" (amber) / "Does not meet requirements" (red)
- Link to university's actual waiver portal with deadline info

### Step 5: J-1 Coverage Compliance Checker
- Wizard: input plan details → medical coverage per illness ($), repatriation ($), medical evacuation ($), deductible ($), coinsurance (%), insurer rating
- Check against 22 CFR 62.14 minimums: $100K medical, $25K repatriation, $50K medevac, $500 max deductible, 25% max coinsurance, A.M. Best A- or equivalent
- Data file `src/data/j1-minimums.ts` with regulatory thresholds and source citations
- Results: line-by-line compliance check with pass/fail for each criterion
- Verdict: "Your plan meets all J-1 requirements" (green shield) or specific gaps listed with red badges
- J-2 dependent note: same requirements apply
- Link to 22 CFR 62.14 source text

### Step 6: Plan Comparison Tool
- Input forms for up to 3 plans side by side (add/remove plans)
- Fields per plan: name, monthly premium, annual deductible, copay (PCP/specialist/ER/urgent care), coinsurance %, OOP max, network type
- 3 scenario tabs: Healthy Year (1 PCP visit, 1 prescription), Moderate Use (3 PCP, 1 specialist, 2 prescriptions, 1 urgent care), Major Event (ER visit + hospitalization + surgery + follow-up)
- Calculate estimated annual cost for each plan under each scenario using the calculator utility
- Comparison table: rows = cost categories, columns = plans. Best value highlighted in emerald-50
- Summary row showing total estimated annual cost (premium + OOP) per plan
- Mobile: tab between plans instead of side-by-side

### Step 7: Insurance Terminology Glossary
- Data file `src/data/glossary-terms.ts` with 15+ terms, each having: term (EN/ZH), definition, worked numerical example, common misconception, related terms
- Accordion UI: click term to expand definition + example + misconception callout
- Search/filter bar at top
- Terms: deductible, copay, coinsurance, OOP max, premium, in-network, out-of-network, EOB, prior authorization, formulary, referral, balance billing, coordination of benefits, SHIP, HMO vs PPO
- Worked examples use monospace numbers in a slate-100 box showing step-by-step math
- "Common misconception" in amber-bordered callout box

### Step 8: "Where Should I Go?" Wizard
- Symptom/situation selector: dropdown or card selection (fever, injury, chest pain, mental health crisis, routine checkup, dental, eye, etc.)
- Decision tree in `src/data/care-triage.ts` mapping symptoms to recommended care level
- 4 care levels: Emergency Room, Urgent Care, Primary Care / Campus Health, Telehealth
- Results show: recommended care level, why, estimated cost range (with/without insurance), what to bring, when to go to ER instead
- Warning banner for true emergencies: "If you're experiencing a medical emergency, call 911 immediately"
- Cost comparison table for the selected scenario across care levels

### Step 9: Cost Estimator
- Wizard: select a medical scenario (from 10 predefined: flu visit, urgent care, ER visit, broken arm, appendectomy, therapy session, dental emergency, annual physical, prescription, COVID) → input your plan details (or use defaults) → see estimated costs
- Uses `src/utils/calculator.ts` to compute: billed amount → insurance adjustments → deductible applied → copay/coinsurance → patient responsibility
- Shows step-by-step cost breakdown with monospace numbers
- Visual cost bar showing what insurance pays vs what you pay
- Compare: "With your plan" vs "Without insurance" side by side
- Scenario data from `src/data/scenarios.ts` (billed amounts, typical ranges)

### Step 10: Mental Health Resources Guide
- Organized by category: Campus Counseling, Insurance-Covered Therapy, Crisis Resources, Online Platforms, Free/Low-Cost Options
- Each resource as a card with: name, what it is, cost, how to access, phone/URL
- Crisis resources prominently displayed at top: 988 Lifeline, Crisis Text Line, campus emergency
- "How to find a therapist" step-by-step guide section
- Insurance coverage explainer: what mental health parity means, typical copays, how to find in-network therapists
- Cultural competency note: how to find therapists who understand international student experiences
- Data in `src/data/mental-health-resources.ts`

### Step 11: "I Got a Bill" Explainer
- Input form: enter numbers from your EOB or bill (billed amount, allowed amount, insurance paid, patient responsibility, deductible applied, copay, coinsurance)
- Plain-language breakdown: "The doctor charged $X. Your insurance negotiated it down to $Y. After your deductible, you owe $Z."
- Visual diagram showing the flow: Billed → Allowed → Insurance Pays → You Pay
- EOB vs Bill explainer section
- "Is this right?" checklist: common billing errors to look for
- "What to do next" guidance: verify amounts, check for errors, request itemized bill, ask about payment plans, financial assistance
- No Surprises Act explainer

### Step 12: Bilingual QA + Polish
- Verify ALL strings in i18n.ts have both EN and ZH translations
- Test language toggle switches everything (including error messages, tooltips, badges, disclaimers, placeholder text)
- Dark mode: verify all colors work, text contrast passes, no gray-on-dark-gray
- Responsive: test at 375px, 768px, 1024px
- Keyboard navigation through all wizards
- Print stylesheet for result panels
- Verify all 8 features load without console errors

### Step 13: PWA + Deployment prep
- Verify manifest.json, sw.js, icons
- Bump service worker cache name
- Build to dist/
- Test offline capability
- Create `_headers` and `_redirects` for Cloudflare Pages
- Verify entry point is `index.html`

## Files to Create/Modify
- `index.html` — app shell with nav, content area, disclaimer bar
- `package.json` — project config with esbuild
- `tsconfig.json` — TypeScript config
- `build.js` — esbuild bundler config
- `manifest.json` — PWA manifest
- `sw.js` — service worker
- `src/app.ts` — tab router + nav controller
- `src/i18n.ts` — bilingual string store
- `src/utils/storage.ts` — sessionStorage wrapper
- `src/utils/calculator.ts` — OOP cost engine
- `src/features/waiver.ts` — waiver checker
- `src/features/j1compliance.ts` — J-1 compliance checker
- `src/features/compare.ts` — plan comparison
- `src/features/glossary.ts` — terminology glossary
- `src/features/wheretogo.ts` — care location wizard
- `src/features/cost.ts` — cost estimator
- `src/features/mentalhealth.ts` — mental health resources
- `src/features/bill.ts` — bill explainer
- `src/data/waiver-criteria.ts` — university waiver data
- `src/data/j1-minimums.ts` — J-1 regulatory thresholds
- `src/data/scenarios.ts` — medical scenario costs
- `src/data/glossary-terms.ts` — insurance terms
- `src/data/care-triage.ts` — symptom decision tree
- `src/data/mental-health-resources.ts` — resource directory
- `src/styles/print.css` — print styles

## Open Questions
None — research phase answered all domain questions. Data is in `research/` for reference during build.
