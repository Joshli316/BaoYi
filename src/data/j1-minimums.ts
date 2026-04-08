/**
 * J-1 Visa Insurance Minimum Requirements
 * Based on 22 CFR 62.14 — Insurance Requirements for Exchange Visitors
 *
 * These are the federally mandated minimum insurance coverage levels
 * that all J-1 (and J-2 dependent) exchange visitors must maintain
 * for the duration of their program.
 *
 * Source: https://www.ecfr.gov/current/title-22/chapter-I/subchapter-G/part-62/subpart-A/section-62.14
 * Current thresholds effective: May 15, 2015
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface J1Requirement {
  id: string;
  /** Human-readable label */
  label: string;
  labelZh: string;
  /** 'numeric' = dollar/percentage threshold; 'rating' = insurer rating */
  type: 'numeric' | 'rating';
  /** 'gte' = plan must be >= threshold; 'lte' = plan must be <= threshold */
  comparison?: 'gte' | 'lte';
  /** Dollar amount or percentage value */
  threshold?: number;
  /** '$' for dollars, '%' for percentage */
  unit?: string;
  /** Extra context shown in UI */
  note?: string;
  noteZh?: string;
}

export interface RatingAgency {
  /** Rating agency name in English */
  name: string;
  /** Rating agency name in Chinese */
  nameZh: string;
  /** Minimum acceptable rating from this agency */
  minimumRating: string;
}

// ---------------------------------------------------------------------------
// Requirements (22 CFR 62.14(b))
// ---------------------------------------------------------------------------

export const j1Requirements: J1Requirement[] = [
  {
    id: 'medical-benefits',
    label: 'Medical Benefits',
    labelZh: '医疗保障',
    type: 'numeric',
    comparison: 'gte',
    threshold: 100_000,
    unit: '$',
    note: 'Per accident or illness (per occurrence, not annual aggregate)',
    noteZh: '每次事故或疾病（按次计算，非年度累计）',
  },
  {
    id: 'repatriation-of-remains',
    label: 'Repatriation of Remains',
    labelZh: '遗体运送',
    type: 'numeric',
    comparison: 'gte',
    threshold: 25_000,
    unit: '$',
    note: 'Coverage for return of mortal remains to home country',
    noteZh: '将遗体运回母国的费用',
  },
  {
    id: 'medical-evacuation',
    label: 'Medical Evacuation',
    labelZh: '医疗撤离',
    type: 'numeric',
    comparison: 'gte',
    threshold: 50_000,
    unit: '$',
    note: 'Evacuation to home country or nearest adequate medical facility',
    noteZh: '撤离至母国或最近的合格医疗机构',
  },
  {
    id: 'deductible',
    label: 'Maximum Deductible',
    labelZh: '最高免赔额',
    type: 'numeric',
    comparison: 'lte',
    threshold: 500,
    unit: '$',
    note: 'Per accident or illness',
    noteZh: '每次事故或疾病',
  },
  {
    id: 'coinsurance',
    label: 'Maximum Coinsurance (Patient Share)',
    labelZh: '最高共保比例（患者承担）',
    type: 'numeric',
    comparison: 'lte',
    threshold: 25,
    unit: '%',
    note: 'Patient pays no more than 25% after deductible',
    noteZh: '免赔额后患者最多承担25%',
  },
  {
    id: 'insurer-rating',
    label: 'Insurer Financial Rating',
    labelZh: '保险公司财务评级',
    type: 'rating',
    note: 'Insurer must hold at least one qualifying rating (see ratingAgencies), or be backed by the exchange visitor\'s home country government',
    noteZh: '保险公司必须持有至少一项合格评级（见评级机构列表），或由交流访问者母国政府担保',
  },
];

// ---------------------------------------------------------------------------
// Acceptable Insurer Ratings (22 CFR 62.14(c))
// ---------------------------------------------------------------------------

export const ratingAgencies: RatingAgency[] = [
  {
    name: 'A.M. Best',
    nameZh: 'A.M. Best（贝氏）',
    minimumRating: 'A-',
  },
  {
    name: 'Standard & Poor\'s (S&P)',
    nameZh: '标准普尔（S&P）',
    minimumRating: 'A-',
  },
  {
    name: 'Fitch Ratings',
    nameZh: '惠誉评级',
    minimumRating: 'A-',
  },
  {
    name: 'Moody\'s Investors Service',
    nameZh: '穆迪投资服务',
    minimumRating: 'A3',
  },
  {
    name: 'Weiss Research',
    nameZh: 'Weiss Research',
    minimumRating: 'B+',
  },
];

// ---------------------------------------------------------------------------
// Source Citation
// ---------------------------------------------------------------------------

export const j1Source = {
  /** CFR citation */
  citation: '22 CFR 62.14',
  /** Full regulation title */
  title: 'Insurance Requirements for Exchange Visitors',
  titleZh: '交流访问者保险要求',
  /** Link to the regulation on eCFR */
  url: 'https://www.ecfr.gov/current/title-22/chapter-I/subchapter-G/part-62/subpart-A/section-62.14',
  /** Date the current dollar thresholds took effect */
  effectiveDate: '2015-05-15',
  /** Federal Register notice that set the current thresholds */
  federalRegisterNotice: '80 FR 23960',
};

// ---------------------------------------------------------------------------
// Non-Compliance Consequences
// ---------------------------------------------------------------------------

export interface ComplianceConsequence {
  id: string;
  description: string;
  descriptionZh: string;
  severity: 'warning' | 'serious' | 'critical';
}

export const nonComplianceConsequences: ComplianceConsequence[] = [
  {
    id: 'program-termination',
    description:
      'The sponsor must terminate the exchange visitor\'s program if the visitor willfully fails to maintain required insurance coverage.',
    descriptionZh:
      '如果交流访问者故意未维持所要求的保险，项目主办方必须终止其交流项目。',
    severity: 'critical',
  },
  {
    id: 'status-loss',
    description:
      'Termination of the exchange program results in loss of J-1 status, requiring the visitor to depart the United States.',
    descriptionZh:
      '交流项目终止将导致丧失J-1身份，要求访问者离开美国。',
    severity: 'critical',
  },
  {
    id: 'sponsor-liability',
    description:
      'Sponsors are responsible for ensuring compliance. Failure to enforce insurance requirements may jeopardize the sponsor\'s Department of State designation.',
    descriptionZh:
      '项目主办方有责任确保合规。未能执行保险要求可能危及其国务院指定资格。',
    severity: 'serious',
  },
  {
    id: 'coverage-gap',
    description:
      'Any gap in insurance coverage — even brief — is a violation. Visitors should secure replacement coverage before an existing policy expires.',
    descriptionZh:
      '任何保险覆盖中断——即使很短暂——都属于违规。访问者应在现有保单到期前获得替代保险。',
    severity: 'warning',
  },
];

// ---------------------------------------------------------------------------
// J-2 Dependent Information
// ---------------------------------------------------------------------------

export interface J2DependentInfo {
  description: string;
  descriptionZh: string;
  /** Whether J-2 dependents must meet the same minimums as J-1 */
  sameRequirementsAsJ1: boolean;
  /** CFR section that applies to dependents */
  cfrReference: string;
}

export const j2DependentInfo: J2DependentInfo = {
  description:
    'J-2 dependents (spouse and minor children) accompanying or following to join a J-1 exchange visitor must maintain insurance coverage that meets the same minimum requirements as the J-1 principal. Sponsors must inform J-1 visitors of this obligation.',
  descriptionZh:
    'J-2 随行家属（配偶和未成年子女）必须维持与J-1主申请人相同最低要求的保险。项目主办方必须告知J-1访问者这一义务。',
  sameRequirementsAsJ1: true,
  cfrReference: '22 CFR 62.14(a)',
};
