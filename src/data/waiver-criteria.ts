// BaoYi 保医 — University waiver criteria data
// Real criteria sourced from each university's SHIP waiver requirements

export interface WaiverCriterion {
  id: string;
  label: string;
  labelZh: string;
  type: 'boolean' | 'numeric';
  comparison?: 'lte' | 'gte'; // for numeric: lte = must be ≤ threshold, gte = must be ≥ threshold
  threshold?: number;
}

export interface University {
  id: string;
  name: string;
  nameZh: string;
  shipCost: string;
  shipCostZh: string;
  waiverDeadline: string;
  waiverDeadlineZh: string;
  waiverUrl: string;
  notes: string;
  notesZh: string;
  j1CanWaive: boolean;
  criteria: WaiverCriterion[];
}

// ---------------------------------------------------------------------------
// Shared criterion builders — keeps per-school arrays DRY
// ---------------------------------------------------------------------------

const usInsurer = (required = true): WaiverCriterion => ({
  id: 'usInsurer',
  label: 'U.S.-based insurance company',
  labelZh: '美国本土保险公司承保',
  type: 'boolean',
});

const networkRadius = (miles: number): WaiverCriterion => ({
  id: 'networkRadius',
  label: `In-network providers within ${miles} miles of campus`,
  labelZh: `校园${miles}英里内有网络内医疗机构`,
  type: 'numeric',
  comparison: 'gte',
  threshold: miles,
});

const mentalHealth: WaiverCriterion = {
  id: 'mentalHealth',
  label: 'Mental health parity coverage',
  labelZh: '心理健康同等保障',
  type: 'boolean',
};

const prescriptions: WaiverCriterion = {
  id: 'prescriptions',
  label: 'Prescription drug coverage',
  labelZh: '处方药覆盖',
  type: 'boolean',
};

const preventive: WaiverCriterion = {
  id: 'preventive',
  label: 'Preventive care at 100%',
  labelZh: '预防保健100%报销',
  type: 'boolean',
};

const noBenefitCaps: WaiverCriterion = {
  id: 'noBenefitCaps',
  label: 'No annual or lifetime benefit caps',
  labelZh: '无年度或终身赔付上限',
  type: 'boolean',
};

const noPreexistingExclusions: WaiverCriterion = {
  id: 'noPreexistingExclusions',
  label: 'No pre-existing condition exclusions',
  labelZh: '无既往病症排除条款',
  type: 'boolean',
};

const medevac = (amount: number): WaiverCriterion => ({
  id: 'medevac',
  label: `Medical evacuation ≥ $${(amount / 1000).toFixed(0)}K`,
  labelZh: `医疗转运保额 ≥ $${(amount / 1000).toFixed(0)}K`,
  type: 'numeric',
  comparison: 'gte',
  threshold: amount,
});

const repatriation = (amount: number): WaiverCriterion => ({
  id: 'repatriation',
  label: `Repatriation of remains ≥ $${(amount / 1000).toFixed(0)}K`,
  labelZh: `遗体遣返保额 ≥ $${(amount / 1000).toFixed(0)}K`,
  type: 'numeric',
  comparison: 'gte',
  threshold: amount,
});

const coveragePeriod: WaiverCriterion = {
  id: 'coveragePeriod',
  label: 'Coverage for full academic year',
  labelZh: '覆盖整个学年',
  type: 'boolean',
};

const directPay: WaiverCriterion = {
  id: 'directPay',
  label: 'Direct pay to providers (not reimbursement-only)',
  labelZh: '直接向医疗机构付款（非仅报销制）',
  type: 'boolean',
};

const deductible = (max: number): WaiverCriterion => ({
  id: 'deductible',
  label: `Annual deductible ≤ $${max.toLocaleString()}`,
  labelZh: `年度免赔额 ≤ $${max.toLocaleString()}`,
  type: 'numeric',
  comparison: 'lte',
  threshold: max,
});

const oopMax = (max: number): WaiverCriterion => ({
  id: 'oopMax',
  label: `Out-of-pocket maximum ≤ $${max.toLocaleString()}`,
  labelZh: `自付上限 ≤ $${max.toLocaleString()}`,
  type: 'numeric',
  comparison: 'lte',
  threshold: max,
});

const acaCompliant: WaiverCriterion = {
  id: 'acaCompliant',
  label: 'ACA-compliant plan',
  labelZh: '符合ACA（平价医疗法案）标准',
  type: 'boolean',
};

const englishPolicy: WaiverCriterion = {
  id: 'englishPolicy',
  label: 'Policy documents in English',
  labelZh: '保单文件为英文',
  type: 'boolean',
};

const noReimbursementOnly: WaiverCriterion = {
  id: 'noReimbursementOnly',
  label: 'Not a reimbursement-only or travel insurance plan',
  labelZh: '非纯报销制或旅行保险',
  type: 'boolean',
};

const unlimitedBenefitMax: WaiverCriterion = {
  id: 'unlimitedBenefitMax',
  label: 'Unlimited (or no) annual/lifetime benefit maximum',
  labelZh: '无年度/终身赔付上限（或为无限）',
  type: 'boolean',
};

const lifetimeAggregate = (amount: number): WaiverCriterion => ({
  id: 'lifetimeAggregate',
  label: `Lifetime aggregate ≥ $${(amount / 1_000_000).toFixed(0)}M (or per-condition ≥ $500K)`,
  labelZh: `终身累计保额 ≥ $${(amount / 1_000_000).toFixed(0)}M（或单病种 ≥ $500K）`,
  type: 'numeric',
  comparison: 'gte',
  threshold: amount,
});

const coinsurance = (pct: number): WaiverCriterion => ({
  id: 'coinsurance',
  label: `Plan pays ≥ ${pct}% of usual & customary charges`,
  labelZh: `计划报销 ≥ ${pct}% 的合理惯常费用`,
  type: 'numeric',
  comparison: 'gte',
  threshold: pct,
});

// ---------------------------------------------------------------------------
// University data
// ---------------------------------------------------------------------------

export const universities: University[] = [
  // ── UC Berkeley ──────────────────────────────────────────────────────
  {
    id: 'uc-berkeley',
    name: 'UC Berkeley',
    nameZh: '加州大学伯克利分校',
    shipCost: '~$6,834/yr',
    shipCostZh: '约 $6,834/年',
    waiverDeadline: 'August 1 (Fall) / January 31 (Spring)',
    waiverDeadlineZh: '8月1日（秋季）/ 1月31日（春季）',
    waiverUrl: 'https://uhs.berkeley.edu/insurance/waiver',
    notes:
      'UC SHIP waiver. Must submit online via eTang. Plan must be from a U.S. insurer, English-language policy, and cover the full UC plan year.',
    notesZh:
      'UC SHIP豁免。需通过eTang在线提交。保险须由美国保险公司承保，英文保单，覆盖完整UC学年。',
    j1CanWaive: true,
    criteria: [
      usInsurer(),
      englishPolicy,
      networkRadius(50),
      oopMax(10600),
      mentalHealth,
      prescriptions,
      preventive,
      noBenefitCaps,
      noPreexistingExclusions,
      medevac(50000),
      repatriation(25000),
      directPay,
      coveragePeriod,
      noReimbursementOnly,
    ],
  },

  // ── UCLA ─────────────────────────────────────────────────────────────
  {
    id: 'ucla',
    name: 'UCLA',
    nameZh: '加州大学洛杉矶分校',
    shipCost: '~$6,834/yr',
    shipCostZh: '约 $6,834/年',
    waiverDeadline: 'August 1 (Fall) / January 31 (Spring)',
    waiverDeadlineZh: '8月1日（秋季）/ 1月31日（春季）',
    waiverUrl: 'https://www.studenthealth.ucla.edu/insurance/waiver-information',
    notes:
      'UC SHIP waiver. Same UC-wide criteria. Submit via Ashe Center portal. Insurance card and benefits summary required.',
    notesZh:
      'UC SHIP豁免。与UC系统统一标准。通过Ashe Center门户提交。需提供保险卡和福利摘要。',
    j1CanWaive: true,
    criteria: [
      usInsurer(),
      englishPolicy,
      networkRadius(50),
      oopMax(10600),
      mentalHealth,
      prescriptions,
      preventive,
      noBenefitCaps,
      noPreexistingExclusions,
      medevac(50000),
      repatriation(25000),
      directPay,
      coveragePeriod,
      noReimbursementOnly,
    ],
  },

  // ── UCSD ─────────────────────────────────────────────────────────────
  {
    id: 'ucsd',
    name: 'UC San Diego',
    nameZh: '加州大学圣地亚哥分校',
    shipCost: '~$6,834/yr',
    shipCostZh: '约 $6,834/年',
    waiverDeadline: 'September 22 (Fall) / January 19 (Winter)',
    waiverDeadlineZh: '9月22日（秋季）/ 1月19日（冬季）',
    waiverUrl: 'https://wellness.ucsd.edu/studenthealth/insurance/',
    notes:
      'UC SHIP waiver with UCSD-specific OOP max and network radius. UCSD uses a slightly lower OOP max ($8,700) and 40-mile network radius.',
    notesZh:
      'UC SHIP豁免，但UCSD自付上限较低（$8,700）且网络半径为40英里。',
    j1CanWaive: true,
    criteria: [
      usInsurer(),
      englishPolicy,
      networkRadius(40),
      oopMax(8700),
      mentalHealth,
      prescriptions,
      preventive,
      noBenefitCaps,
      noPreexistingExclusions,
      medevac(50000),
      repatriation(25000),
      directPay,
      coveragePeriod,
      noReimbursementOnly,
    ],
  },

  // ── USC ──────────────────────────────────────────────────────────────
  {
    id: 'usc',
    name: 'University of Southern California',
    nameZh: '南加州大学',
    shipCost: '~$6,500/yr',
    shipCostZh: '约 $6,500/年',
    waiverDeadline: 'September 12 (Fall) / January 30 (Spring)',
    waiverDeadlineZh: '9月12日（秋季）/ 1月30日（春季）',
    waiverUrl: 'https://engemannshc.usc.edu/insurance/waiver/',
    notes:
      'Plans from GBG, PSI, Student Medicover, generic travel insurance, and reimbursement-only programs are automatically rejected. Must provide direct-pay coverage.',
    notesZh:
      'GBG、PSI、Student Medicover、普通旅行保险及纯报销制计划会被自动拒绝。须提供直接付款保障。',
    j1CanWaive: true,
    criteria: [
      usInsurer(),
      medevac(50000),
      repatriation(25000),
      mentalHealth,
      prescriptions,
      preventive,
      noBenefitCaps,
      noPreexistingExclusions,
      directPay,
      noReimbursementOnly,
      coveragePeriod,
    ],
  },

  // ── NYU ──────────────────────────────────────────────────────────────
  {
    id: 'nyu',
    name: 'New York University',
    nameZh: '纽约大学',
    shipCost: '~$4,800/yr',
    shipCostZh: '约 $4,800/年',
    waiverDeadline: 'September 1 (Fall) / February 10 (Spring)',
    waiverDeadlineZh: '9月1日（秋季）/ 2月10日（春季）',
    waiverUrl: 'https://www.nyu.edu/students/health-and-wellness/student-health-insurance.html',
    notes:
      'Plan must be from a U.S.-headquartered insurer with unlimited benefit maximum and NYC-area in-network providers.',
    notesZh:
      '保险须由美国总部保险公司承保，无赔付上限，且在纽约市区有网络内医疗机构。',
    j1CanWaive: true,
    criteria: [
      usInsurer(),
      unlimitedBenefitMax,
      {
        id: 'nycNetwork',
        label: 'In-network providers in NYC area',
        labelZh: '纽约市区有网络内医疗机构',
        type: 'boolean',
      },
      mentalHealth,
      prescriptions,
      preventive,
      noPreexistingExclusions,
      coveragePeriod,
    ],
  },

  // ── Columbia ─────────────────────────────────────────────────────────
  {
    id: 'columbia',
    name: 'Columbia University',
    nameZh: '哥伦比亚大学',
    shipCost: '~$5,200/yr',
    shipCostZh: '约 $5,200/年',
    waiverDeadline: 'August 31 (Fall) / January 31 (Spring)',
    waiverDeadlineZh: '8月31日（秋季）/ 1月31日（春季）',
    waiverUrl: 'https://health.columbia.edu/insurance',
    notes:
      'J-1 visa holders CANNOT waive Columbia SHIP. A medical evacuation and repatriation letter from your insurer is required as part of the waiver application.',
    notesZh:
      'J-1签证持有者不能豁免哥大SHIP。豁免申请须提交保险公司出具的医疗转运和遗体遣返保障证明信。',
    j1CanWaive: false,
    criteria: [
      usInsurer(),
      medevac(50000),
      repatriation(25000),
      {
        id: 'medevacLetter',
        label: 'Insurer provides medevac + repatriation letter',
        labelZh: '保险公司出具医疗转运及遗体遣返证明信',
        type: 'boolean',
      },
      mentalHealth,
      prescriptions,
      preventive,
      noBenefitCaps,
      noPreexistingExclusions,
      coveragePeriod,
    ],
  },

  // ── Stanford ─────────────────────────────────────────────────────────
  {
    id: 'stanford',
    name: 'Stanford University',
    nameZh: '斯坦福大学',
    shipCost: '~$6,500/yr',
    shipCostZh: '约 $6,500/年',
    waiverDeadline: 'September 15 (Autumn) / January 15 (Winter)',
    waiverDeadlineZh: '9月15日（秋季）/ 1月15日（冬季）',
    waiverUrl: 'https://vaden.stanford.edu/insurance/waive-cardinal-care',
    notes:
      'F-1 students: deductible < $1,000. J-1 students: deductible < $500. Lifetime aggregate ≥ $2M or per-condition ≥ $500K. Bay Area in-network providers required.',
    notesZh:
      'F-1学生：免赔额 < $1,000。J-1学生：免赔额 < $500。终身累计保额 ≥ $200万或单病种 ≥ $50万。须有湾区网络内医疗机构。',
    j1CanWaive: true,
    criteria: [
      deductible(1000), // F-1; J-1 students must meet $500
      lifetimeAggregate(2000000),
      {
        id: 'bayAreaNetwork',
        label: 'In-network providers in the Bay Area',
        labelZh: '湾区有网络内医疗机构',
        type: 'boolean',
      },
      mentalHealth,
      prescriptions,
      preventive,
      noPreexistingExclusions,
      coveragePeriod,
    ],
  },

  // ── MIT ──────────────────────────────────────────────────────────────
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology',
    nameZh: '麻省理工学院',
    shipCost: '~$4,500/yr',
    shipCostZh: '约 $4,500/年',
    waiverDeadline: 'August 1 (Fall) / January 2 (Spring)',
    waiverDeadlineZh: '8月1日（秋季）/ 1月2日（春季）',
    waiverUrl: 'https://medical.mit.edu/health-plans',
    notes:
      'Plan must meet both ACA and Massachusetts state minimum creditable coverage (MCC) standards. Non-compliant plans will be rejected.',
    notesZh:
      '保险须同时满足ACA和马萨诸塞州最低合格保障（MCC）标准。不合规的计划将被拒绝。',
    j1CanWaive: true,
    criteria: [
      acaCompliant,
      {
        id: 'massMCC',
        label: 'Meets Massachusetts minimum creditable coverage (MCC)',
        labelZh: '满足马萨诸塞州最低合格保障（MCC）标准',
        type: 'boolean',
      },
      mentalHealth,
      prescriptions,
      preventive,
      noBenefitCaps,
      noPreexistingExclusions,
      coveragePeriod,
    ],
  },

  // ── University of Michigan ───────────────────────────────────────────
  {
    id: 'umich',
    name: 'University of Michigan',
    nameZh: '密歇根大学',
    shipCost: '~$3,400/yr',
    shipCostZh: '约 $3,400/年',
    waiverDeadline: 'August 31 (Fall) / January 15 (Winter)',
    waiverDeadlineZh: '8月31日（秋季）/ 1月15日（冬季）',
    waiverUrl: 'https://uhs.umich.edu/insurance',
    notes:
      'Very strict deductible: ≤ $100/yr individual ($200 family). Plan must cover ≥ 80% of usual & customary charges. Must have Ann Arbor area in-network providers.',
    notesZh:
      '免赔额要求极严：个人 ≤ $100/年（家庭$200）。须报销 ≥ 80% 合理惯常费用。须有安娜堡地区网络内医疗机构。',
    j1CanWaive: true,
    criteria: [
      deductible(100),
      coinsurance(80),
      {
        id: 'annArborNetwork',
        label: 'In-network providers in Ann Arbor area',
        labelZh: '安娜堡地区有网络内医疗机构',
        type: 'boolean',
      },
      mentalHealth,
      prescriptions,
      preventive,
      noPreexistingExclusions,
      coveragePeriod,
    ],
  },

  // ── Generic / Other ──────────────────────────────────────────────────
  {
    id: 'other',
    name: 'Other University',
    nameZh: '其他大学',
    shipCost: 'Varies',
    shipCostZh: '因校而异',
    waiverDeadline: 'Check your school',
    waiverDeadlineZh: '请查看学校官网',
    waiverUrl: '',
    notes:
      'Most U.S. universities require a domestic insurer, mental health parity, Rx coverage, preventive care, and a full-year coverage period. Check your school\'s specific requirements.',
    notesZh:
      '大多数美国大学要求美国本土保险公司承保、心理健康同等保障、处方药覆盖、预防保健及全学年保障。请查看学校具体要求。',
    j1CanWaive: true,
    criteria: [
      usInsurer(),
      mentalHealth,
      prescriptions,
      preventive,
      noBenefitCaps,
      noPreexistingExclusions,
      coveragePeriod,
    ],
  },
];

// ---------------------------------------------------------------------------
// Lookup helper
// ---------------------------------------------------------------------------

export function getUniversityById(id: string): University | undefined {
  return universities.find((u) => u.id === id);
}

export function getUniversitiesForDropdown(): { value: string; label: string; labelZh: string }[] {
  return universities.map((u) => ({
    value: u.id,
    label: u.name,
    labelZh: u.nameZh,
  }));
}
