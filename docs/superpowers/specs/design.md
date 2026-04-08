# BaoYi 保易 — Design Document

## Problem Statement
International students in the US face four critical health insurance pain points:
1. **Overpaying**: Auto-enrolled in $2,400–$8,200/yr university SHIP plans they could waive with qualifying alternative coverage
2. **Skipping care**: Avoid medical visits because they don't understand costs, insurance terms, or where to go
3. **Wrong insurance**: Arrive with travel insurance thinking it's health insurance — major coverage gaps for pre-existing conditions, mental health, prescriptions
4. **J-1 non-compliance**: Exchange visitors unknowingly violate 22 CFR 62.14 State Department minimums, risking program termination

## Target Users
- **Primary**: International students (F-1, J-1) at US universities, ages 18-30, predominantly from China, India, South Korea, and other Asian countries
- **Secondary**: J-2 dependents, university international student advisors (ISAs) who recommend the tool
- **Language**: Bilingual English/Chinese (most common L1 among US international students)

## What This Product Is
- A free, client-side educational tool
- A bilingual navigator that explains complex insurance concepts in plain language
- A compliance checker grounded in actual regulations (22 CFR 62.14)
- A cost estimator using realistic medical scenario data

## What This Product Is NOT
- Not an insurance broker or marketplace — we don't sell insurance
- Not medical advice — we educate, not diagnose
- Not legal advice — we explain regulations, not interpret them for specific cases
- Not a substitute for an ISA or insurance professional

## User Journey
1. **Landing**: Student arrives (likely from a WeChat share or university ISA referral). Sees 8 feature cards. Picks their most urgent need.
2. **Quick wins**: Waiver checker or J-1 compliance checker gives an immediate yes/no verdict with clear next steps.
3. **Education**: Glossary and bill explainer build understanding for the long term.
4. **Ongoing reference**: "Where should I go?" wizard and cost estimator get bookmarked for when they actually need care.
5. **Crisis support**: Mental health resources page is there when they need it, with 988 and Crisis Text Line prominently displayed.

## Key Design Rationale

### Why "Shield & Guide"?
Insurance is anxiety-inducing for international students. The navy + emerald palette with shield iconography communicates:
- **Navy**: Authority, trust, "we know what we're talking about"
- **Emerald**: Safety, compliance, "you're covered"
- **Shield motif**: Protection — "we've got your back"
- **Bold verdicts**: Clear compliant/non-compliant badges reduce ambiguity

### Why tabbed navigation (not wizard)?
Students have different urgent needs. A forced linear flow would frustrate someone who just wants to check J-1 compliance. Tabs let them jump directly to their need. Within each feature, wizards provide guided flow.

### Why client-side only?
- Privacy: Students entering insurance details shouldn't worry about data storage
- Trust: "No server, no data collection" is a trust signal for this audience
- Simplicity: No auth, no backend, no HIPAA concerns
- Accessibility: Works offline after first load (PWA)

### Why bilingual EN/ZH specifically?
Chinese students are the largest international student population in the US (~290,000). Most existing insurance resources are English-only. The language barrier compounds the confusion.

### Why not include plan recommendations?
Recommending specific plans crosses from education into brokerage, which requires licensing. We compare plans the user inputs — we never suggest "buy Plan X."

## Disclaimer Strategy
Every output screen shows: "This is not medical or legal advice. Consult a qualified professional." This is:
- Legally protective (not practicing medicine or law)
- Honest (we're an educational tool, not a professional service)
- Consistently placed (persistent footer bar, not buried in fine print)
