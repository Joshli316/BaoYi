// Mental health resources for international students in the US
// Data source: verified public resources as of 2026

export type ResourceCategory = 'crisis' | 'campus' | 'insurance' | 'online' | 'free';

export interface MentalHealthResource {
  id: string;
  category: ResourceCategory;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  cost: string;
  costZh: string;
  access: string;
  accessZh: string;
  phone?: string;
  url?: string;
  icon: string;
  isCrisis?: boolean;
}

export interface TherapistStep {
  step: number;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
}

export const mentalHealthResources: MentalHealthResource[] = [
  // ─── CRISIS ────────────────────────────────────────────────
  {
    id: 'crisis-988',
    category: 'crisis',
    name: '988 Suicide & Crisis Lifeline',
    nameZh: '988 自杀与危机生命线',
    description:
      'Call or text 988 for immediate support. Available 24/7, 365 days a year. Supports 250+ languages via Language Line interpretation services.',
    descriptionZh:
      '拨打或发短信至 988 获得即时帮助。全年 24/7 全天候服务，通过 Language Line 提供 250 多种语言的翻译服务。',
    cost: 'Free',
    costZh: '免费',
    access: 'Call or text 988, available 24/7',
    accessZh: '拨打或发短信至 988，全天候可用',
    phone: '988',
    url: 'https://988lifeline.org',
    icon: 'phone-call',
    isCrisis: true,
  },
  {
    id: 'crisis-text-line',
    category: 'crisis',
    name: 'Crisis Text Line',
    nameZh: '危机短信热线',
    description:
      'Free, confidential crisis counseling via text message. Trained crisis counselors respond within minutes. Ideal if you prefer texting over calling.',
    descriptionZh:
      '通过短信提供免费、保密的危机心理咨询。训练有素的危机咨询师会在几分钟内回复。适合更喜欢发短信而非打电话的人。',
    cost: 'Free',
    costZh: '免费',
    access: 'Text HELLO to 741741, available 24/7',
    accessZh: '发送 HELLO 至 741741，全天候可用',
    phone: '741741',
    url: 'https://www.crisistextline.org',
    icon: 'message-circle',
    isCrisis: true,
  },
  {
    id: 'crisis-samhsa',
    category: 'crisis',
    name: 'SAMHSA National Helpline',
    nameZh: 'SAMHSA 全国求助热线',
    description:
      'Free referral and information service for mental health and substance use disorders. Provides treatment referrals, support groups, and community-based organizations.',
    descriptionZh:
      '为心理健康和药物滥用问题提供免费的转介和信息服务。提供治疗转介、支持小组和社区组织信息。',
    cost: 'Free',
    costZh: '免费',
    access: 'Call 1-800-662-4357, available 24/7, English & Spanish',
    accessZh: '拨打 1-800-662-4357，全天候可用，提供英语和西班牙语服务',
    phone: '1-800-662-4357',
    url: 'https://www.samhsa.gov/find-help/national-helpline',
    icon: 'heart-handshake',
    isCrisis: true,
  },
  {
    id: 'crisis-trevor',
    category: 'crisis',
    name: 'Trevor Project (LGBTQ+)',
    nameZh: 'Trevor 项目（LGBTQ+）',
    description:
      'Crisis intervention and suicide prevention for LGBTQ+ young people ages 13-24. Offers phone, text, and chat support.',
    descriptionZh:
      '为 13-24 岁 LGBTQ+ 青年提供危机干预和自杀预防服务。提供电话、短信和在线聊天支持。',
    cost: 'Free',
    costZh: '免费',
    access: 'Call 1-866-488-7386 or text START to 678-678, available 24/7',
    accessZh: '拨打 1-866-488-7386 或发送 START 至 678-678，全天候可用',
    phone: '1-866-488-7386',
    url: 'https://www.thetrevorproject.org',
    icon: 'rainbow',
    isCrisis: true,
  },

  // ─── CAMPUS ────────────────────────────────────────────────
  {
    id: 'campus-counseling',
    category: 'campus',
    name: 'University Counseling Centers',
    nameZh: '大学心理咨询中心',
    description:
      'Most universities offer free short-term counseling (typically 6-12 sessions per year). Walk-in crisis appointments are usually available same-day. Check your school\'s student health website for hours and intake process.',
    descriptionZh:
      '大多数大学提供免费的短期心理咨询（通常每年 6-12 次）。一般可以当天预约紧急危机咨询。请查看学校学生健康网站了解服务时间和预约流程。',
    cost: 'Free (included in student fees)',
    costZh: '免费（已包含在学费中）',
    access: 'Walk-in for crisis, appointment for regular sessions',
    accessZh: '紧急情况可直接到访，常规咨询需预约',
    icon: 'graduation-cap',
  },
  {
    id: 'campus-psychiatry',
    category: 'campus',
    name: 'Campus Psychiatry Services',
    nameZh: '校园精神科服务',
    description:
      'On-campus psychiatrists can evaluate whether medication might help with anxiety, depression, ADHD, or other conditions. Usually covered by student health fees or SHIP insurance.',
    descriptionZh:
      '校园精神科医生可以评估药物治疗是否有助于缓解焦虑、抑郁、ADHD 或其他症状。通常由学生健康费或 SHIP 保险覆盖。',
    cost: 'Usually covered by student fees or SHIP',
    costZh: '通常由学生费用或 SHIP 保险覆盖',
    access: 'Referral from counseling center or direct appointment',
    accessZh: '由心理咨询中心转介或直接预约',
    icon: 'stethoscope',
  },

  // ─── INSURANCE-COVERED ─────────────────────────────────────
  {
    id: 'insurance-in-network',
    category: 'insurance',
    name: 'In-Network Therapist (via SHIP)',
    nameZh: '网络内治疗师（通过 SHIP 保险）',
    description:
      'Your Student Health Insurance Plan (SHIP) covers mental health. Use your insurance company\'s provider directory to find in-network therapists near campus. In-network means lower out-of-pocket costs.',
    descriptionZh:
      '你的学生健康保险计划（SHIP）涵盖心理健康服务。使用保险公司的医疗提供者目录查找校园附近的网络内治疗师。网络内意味着更低的自付费用。',
    cost: '$20-40 copay per session',
    costZh: '每次 $20-40 自付额',
    access: 'Search your insurance provider directory or call the number on your insurance card',
    accessZh: '搜索你的保险公司提供者目录，或拨打保险卡上的电话号码',
    icon: 'shield-check',
  },
  {
    id: 'insurance-grow-therapy',
    category: 'insurance',
    name: 'Grow Therapy',
    nameZh: 'Grow Therapy',
    description:
      'Online platform that matches you with therapists who accept your insurance. Wide insurance acceptance including Aetna, Cigna, BCBS, UnitedHealthcare, and many student plans.',
    descriptionZh:
      '在线平台，帮你匹配接受你保险的治疗师。广泛接受 Aetna、Cigna、BCBS、UnitedHealthcare 及许多学生保险计划。',
    cost: 'Insurance copay only (varies by plan)',
    costZh: '仅需保险自付额（因计划而异）',
    access: 'Online booking at growtherapy.com',
    accessZh: '在 growtherapy.com 在线预约',
    url: 'https://www.growtherapy.com',
    icon: 'sprout',
  },

  // ─── ONLINE ────────────────────────────────────────────────
  {
    id: 'online-talkspace',
    category: 'online',
    name: 'Talkspace',
    nameZh: 'Talkspace',
    description:
      'Text, audio, and video therapy with licensed therapists. Accepts Aetna, Cigna, and BCBS insurance. Without insurance, plans range from $69-109/week.',
    descriptionZh:
      '与持证治疗师进行文字、语音和视频咨询。接受 Aetna、Cigna 和 BCBS 保险。无保险时，每周 $69-109。',
    cost: '$69-109/week without insurance; copay with insurance',
    costZh: '无保险每周 $69-109；有保险仅付自付额',
    access: 'App-based, sessions from your phone or computer',
    accessZh: '基于应用，可通过手机或电脑进行咨询',
    url: 'https://www.talkspace.com',
    icon: 'smartphone',
  },
  {
    id: 'online-betterhelp',
    category: 'online',
    name: 'BetterHelp',
    nameZh: 'BetterHelp',
    description:
      'Online therapy platform with text, phone, and video sessions. Large therapist network with various specialties. Limited insurance acceptance; financial aid available.',
    descriptionZh:
      '提供文字、电话和视频咨询的在线治疗平台。治疗师网络庞大，涵盖多种专业方向。保险接受有限；提供经济援助。',
    cost: '$65-100/week, limited insurance acceptance',
    costZh: '每周 $65-100，保险接受有限',
    access: 'Online at betterhelp.com, app available',
    accessZh: '在 betterhelp.com 在线使用，提供应用程序',
    url: 'https://www.betterhelp.com',
    icon: 'monitor-smartphone',
  },
  {
    id: 'online-psychology-today',
    category: 'online',
    name: 'Psychology Today Directory',
    nameZh: 'Psychology Today 治疗师目录',
    description:
      'Comprehensive therapist directory. Filter by insurance, language spoken, specialty, and location. Most therapists list whether they offer sliding scale fees. Great starting point for finding a therapist.',
    descriptionZh:
      '全面的治疗师目录。可按保险、语言、专业方向和位置筛选。大多数治疗师会标注是否提供浮动收费。找治疗师的绝佳起点。',
    cost: 'Directory is free; session costs vary by therapist',
    costZh: '目录免费；咨询费用因治疗师而异',
    access: 'Search at psychologytoday.com/us/therapists',
    accessZh: '在 psychologytoday.com/us/therapists 搜索',
    url: 'https://www.psychologytoday.com/us/therapists',
    icon: 'search',
  },

  // ─── FREE / LOW-COST ───────────────────────────────────────
  {
    id: 'free-open-path',
    category: 'free',
    name: 'Open Path Collective',
    nameZh: 'Open Path Collective',
    description:
      'Nonprofit network of therapists who offer sessions at reduced rates. One-time $65 membership fee, then $30-80 per session. No insurance needed.',
    descriptionZh:
      '非营利治疗师网络，提供低价咨询。一次性 $65 会员费，之后每次 $30-80。无需保险。',
    cost: '$30-80/session (one-time $65 membership)',
    costZh: '每次 $30-80（一次性 $65 会员费）',
    access: 'Register at openpathcollective.org',
    accessZh: '在 openpathcollective.org 注册',
    url: 'https://openpathcollective.org',
    icon: 'door-open',
  },
  {
    id: 'free-training-clinics',
    category: 'free',
    name: 'University Training Clinics',
    nameZh: '大学实习诊所',
    description:
      'Psychology and social work graduate programs run low-cost clinics where advanced students provide therapy under licensed supervision. Quality care at a fraction of the cost.',
    descriptionZh:
      '心理学和社会工作研究生项目运营的低价诊所，由高年级学生在持证督导下提供治疗。以极低费用获得优质服务。',
    cost: '$5-25/session',
    costZh: '每次 $5-25',
    access: 'Search "[your city] psychology training clinic" or ask your school\'s counseling center',
    accessZh: '搜索"[你所在城市] 心理学实习诊所"或咨询学校的心理咨询中心',
    icon: 'book-open',
  },
  {
    id: 'free-fqhc',
    category: 'free',
    name: 'Community Health Centers (FQHCs)',
    nameZh: '社区健康中心（FQHCs）',
    description:
      'Federally Qualified Health Centers offer mental health services on a sliding fee scale based on income. Available regardless of immigration or insurance status.',
    descriptionZh:
      '联邦认证健康中心按收入提供浮动收费的心理健康服务。无论移民身份或保险状态均可使用。',
    cost: 'Sliding scale based on income',
    costZh: '根据收入浮动收费',
    access: 'Find locations at findahealthcenter.hrsa.gov',
    accessZh: '在 findahealthcenter.hrsa.gov 查找就近中心',
    url: 'https://findahealthcenter.hrsa.gov',
    icon: 'hospital',
  },
  {
    id: 'free-amhc',
    category: 'free',
    name: 'Asian Mental Health Collective',
    nameZh: '亚裔心理健康联盟',
    description:
      'Directory of therapists who specialize in culturally responsive care for Asian and Asian American communities. Filter by language (Mandarin, Cantonese, etc.), insurance, and specialty.',
    descriptionZh:
      '专注于为亚裔和亚裔美国人社区提供文化敏感心理服务的治疗师目录。可按语言（普通话、粤语等）、保险和专业方向筛选。',
    cost: 'Directory is free; session costs vary',
    costZh: '目录免费；咨询费用因治疗师而异',
    access: 'Browse at asianmhc.org/therapists',
    accessZh: '在 asianmhc.org/therapists 浏览',
    url: 'https://www.asianmhc.org/therapists',
    icon: 'users',
  },
];

// ─── FIND A THERAPIST STEPS ──────────────────────────────────

export const findTherapistSteps: TherapistStep[] = [
  {
    step: 1,
    title: 'Check Your Insurance',
    titleZh: '确认你的保险',
    description:
      'Look at your insurance card or student health portal. Note your insurance company (e.g., Aetna, BCBS, UHC) and plan type. If you have SHIP (Student Health Insurance Plan), mental health is covered.',
    descriptionZh:
      '查看你的保险卡或学生健康门户。记下你的保险公司（如 Aetna、BCBS、UHC）和计划类型。如果你有 SHIP（学生健康保险计划），心理健康是被覆盖的。',
  },
  {
    step: 2,
    title: 'Search for In-Network Providers',
    titleZh: '搜索网络内治疗师',
    description:
      'Go to your insurance company\'s website and use the "Find a Provider" tool. Filter for "behavioral health" or "mental health." You can also use Psychology Today and filter by your insurance.',
    descriptionZh:
      '访问你保险公司的网站，使用"查找提供者"工具。筛选"行为健康"或"心理健康"。你也可以在 Psychology Today 上按你的保险进行筛选。',
  },
  {
    step: 3,
    title: 'Consider What You Need',
    titleZh: '考虑你的需求',
    description:
      'Think about preferences: language (Mandarin, Cantonese, English), gender of therapist, specialty (anxiety, depression, cultural adjustment, academic stress), and format (in-person vs. online).',
    descriptionZh:
      '想想你的偏好：语言（普通话、粤语、英语）、治疗师性别、专业方向（焦虑、抑郁、文化适应、学业压力）以及形式（面对面还是线上）。',
  },
  {
    step: 4,
    title: 'Call and Ask Questions',
    titleZh: '打电话咨询',
    description:
      'Call 2-3 therapists. Ask: "Do you accept [your insurance]?" "Do you have experience with international students?" "What is the copay per session?" Most offer a free 15-minute phone consultation.',
    descriptionZh:
      '打电话给 2-3 位治疗师。问："你接受 [你的保险] 吗？""你有服务国际学生的经验吗？""每次咨询的自付额是多少？"大多数治疗师提供免费的 15 分钟电话咨询。',
  },
  {
    step: 5,
    title: 'Book Your First Session',
    titleZh: '预约第一次咨询',
    description:
      'The first session is an intake assessment — the therapist learns about you and your concerns. It\'s normal to feel nervous. You can switch therapists if it\'s not a good fit after 2-3 sessions.',
    descriptionZh:
      '第一次咨询是初始评估——治疗师会了解你和你的问题。感到紧张是正常的。如果 2-3 次后觉得不合适，可以换治疗师。',
  },
];

// ─── INSURANCE COVERAGE EXPLAINER ────────────────────────────

export const insuranceCoverageInfo = {
  parityExplain:
    'Under the Mental Health Parity and Addiction Equity Act, insurance companies must cover mental health the same way they cover physical health. If your plan covers doctor visits, it must also cover therapy visits with similar copays and limits.',
  parityExplainZh:
    '根据《心理健康平等与成瘾公平法》，保险公司必须以与身体健康相同的方式覆盖心理健康。如果你的计划涵盖医生就诊，那么也必须以类似的自付额和限额覆盖心理咨询。',
  typicalCopay:
    'Most student insurance plans (SHIP) charge $20-40 per therapy session and $20-50 for psychiatry visits. After meeting your deductible, some plans cover 80-100% of in-network costs. Check your plan\'s Summary of Benefits for exact numbers.',
  typicalCopayZh:
    '大多数学生保险计划（SHIP）每次心理咨询收取 $20-40 自付额，精神科就诊收取 $20-50。在达到免赔额后，部分计划覆盖网络内费用的 80-100%。请查看你的计划福利摘要以了解具体金额。',
  howToFindInNetwork:
    'Step 1: Find your insurance company name on your insurance card. Step 2: Go to their website and look for "Find a Provider" or "Provider Directory." Step 3: Select "Behavioral Health" or "Mental Health" as the provider type. Step 4: Enter your ZIP code and search. Step 5: Call the provider to confirm they still accept your specific plan before booking.',
  howToFindInNetworkZh:
    '第一步：在保险卡上找到你的保险公司名称。第二步：访问他们的网站，寻找"查找提供者"或"提供者目录"。第三步：选择"行为健康"或"心理健康"作为提供者类型。第四步：输入你的邮编进行搜索。第五步：在预约前打电话确认该提供者仍接受你的具体保险计划。',
};
