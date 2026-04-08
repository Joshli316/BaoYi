// Care Triage Data — maps symptoms/situations to recommended care levels
// BaoYi Health Insurance Navigator

export interface CareLevel {
  id: 'er' | 'urgent' | 'primary' | 'telehealth';
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  typicalCostWithInsurance: string;
  typicalCostWithoutInsurance: string;
  hours: string;
  hoursZh: string;
}

export interface TriageSituation {
  id: string;
  situation: string;
  situationZh: string;
  icon: string; // lucide icon name
  recommendedLevel: 'er' | 'urgent' | 'primary' | 'telehealth';
  reason: string;
  reasonZh: string;
  costWithInsurance: string;
  costWithoutInsurance: string;
  costWithInsuranceZh: string;
  costWithoutInsuranceZh: string;
  whatToBring: string[];
  whatToBringZh: string[];
  whenToGoER: string;
  whenToGoERZh: string;
  isEmergency: boolean;
}

// ---------------------------------------------------------------------------
// Care Levels
// ---------------------------------------------------------------------------

export const careLevels: CareLevel[] = [
  {
    id: 'er',
    name: 'Emergency Room',
    nameZh: '急诊室',
    description:
      'For life-threatening emergencies. Open 24/7. Highest cost but handles the most serious conditions.',
    descriptionZh:
      '用于危及生命的紧急情况。全天候开放。费用最高，但可处理最严重的病症。',
    typicalCostWithInsurance: '$250–$500 copay',
    typicalCostWithoutInsurance: '$1,500–$3,000+',
    hours: '24/7',
    hoursZh: '全天候 24 小时',
  },
  {
    id: 'urgent',
    name: 'Urgent Care',
    nameZh: '紧急护理中心',
    description:
      'For non-life-threatening issues that need same-day attention. Walk-in, no appointment needed.',
    descriptionZh:
      '用于非危及生命但需要当天处理的问题。无需预约，可直接就诊。',
    typicalCostWithInsurance: '$20–$75 copay',
    typicalCostWithoutInsurance: '$150–$280',
    hours: 'Usually 8 AM – 8 PM, including weekends',
    hoursZh: '通常上午 8 点至晚上 8 点，含周末',
  },
  {
    id: 'primary',
    name: 'Primary Care / Campus Health',
    nameZh: '初级保健 / 校园健康中心',
    description:
      'For routine checkups, ongoing conditions, preventive care, and referrals to specialists.',
    descriptionZh:
      '用于常规检查、慢性病管理、预防保健以及专科转诊。',
    typicalCostWithInsurance: '$20–$40 copay',
    typicalCostWithoutInsurance: '$150–$300',
    hours: 'Weekdays, appointment usually required',
    hoursZh: '工作日，通常需要预约',
  },
  {
    id: 'telehealth',
    name: 'Telehealth',
    nameZh: '远程医疗',
    description:
      'Virtual visits via phone or video. Convenient for minor issues, prescription refills, and follow-ups.',
    descriptionZh:
      '通过电话或视频进行远程就诊。适合小问题、续方和复诊。',
    typicalCostWithInsurance: '$10–$40 copay',
    typicalCostWithoutInsurance: '$40–$90',
    hours: 'Many platforms available 24/7',
    hoursZh: '许多平台全天候可用',
  },
];

// ---------------------------------------------------------------------------
// Triage Situations
// ---------------------------------------------------------------------------

const defaultWhatToBring = [
  'Insurance card',
  'Photo ID',
  'List of current medications',
  'Payment method',
];

const defaultWhatToBringZh = [
  '保险卡',
  '带照片的身份证件',
  '当前用药清单',
  '付款方式',
];

export const triageSituations: TriageSituation[] = [
  // ── Emergency Room ─────────────────────────────────────────────────────
  {
    id: 'chest-pain',
    situation: 'Chest pain or difficulty breathing',
    situationZh: '胸痛或呼吸困难',
    icon: 'heart-pulse',
    recommendedLevel: 'er',
    reason:
      'Could indicate a heart attack, pulmonary embolism, or other life-threatening condition requiring immediate intervention.',
    reasonZh:
      '可能是心脏病发作、肺栓塞或其他危及生命的情况，需要立即干预。',
    costWithInsurance: '$250–$500',
    costWithoutInsurance: '$1,500–$3,000+',
    costWithInsuranceZh: '$250–$500',
    costWithoutInsuranceZh: '$1,500–$3,000+',
    whatToBring: [...defaultWhatToBring],
    whatToBringZh: [...defaultWhatToBringZh],
    whenToGoER: 'You are already at the ER level — call 911 immediately.',
    whenToGoERZh: '这已属于急诊级别——请立即拨打 911。',
    isEmergency: true,
  },
  {
    id: 'severe-bleeding',
    situation: 'Severe bleeding that won\'t stop',
    situationZh: '严重出血无法止住',
    icon: 'droplets',
    recommendedLevel: 'er',
    reason:
      'Uncontrolled bleeding can lead to shock and requires emergency medical treatment.',
    reasonZh:
      '无法控制的出血可能导致休克，需要紧急医疗处理。',
    costWithInsurance: '$250–$500',
    costWithoutInsurance: '$1,500–$3,000+',
    costWithInsuranceZh: '$250–$500',
    costWithoutInsuranceZh: '$1,500–$3,000+',
    whatToBring: [...defaultWhatToBring],
    whatToBringZh: [...defaultWhatToBringZh],
    whenToGoER: 'You are already at the ER level — call 911 immediately.',
    whenToGoERZh: '这已属于急诊级别——请立即拨打 911。',
    isEmergency: true,
  },
  {
    id: 'loss-of-consciousness',
    situation: 'Loss of consciousness or fainting',
    situationZh: '意识丧失或晕厥',
    icon: 'brain',
    recommendedLevel: 'er',
    reason:
      'May indicate a serious neurological, cardiac, or metabolic issue that needs immediate evaluation.',
    reasonZh:
      '可能是严重的神经、心脏或代谢问题，需立即检查。',
    costWithInsurance: '$250–$500',
    costWithoutInsurance: '$1,500–$3,000+',
    costWithInsuranceZh: '$250–$500',
    costWithoutInsuranceZh: '$1,500–$3,000+',
    whatToBring: [...defaultWhatToBring],
    whatToBringZh: [...defaultWhatToBringZh],
    whenToGoER: 'You are already at the ER level — call 911 immediately.',
    whenToGoERZh: '这已属于急诊级别——请立即拨打 911。',
    isEmergency: true,
  },
  {
    id: 'suspected-stroke',
    situation: 'Suspected stroke (face drooping, arm weakness, speech difficulty)',
    situationZh: '疑似中风（面部下垂、手臂无力、言语困难）',
    icon: 'zap',
    recommendedLevel: 'er',
    reason:
      'Stroke treatment is extremely time-sensitive. Every minute counts for preventing permanent brain damage.',
    reasonZh:
      '中风治疗极为紧迫，每一分钟都关系到能否避免永久性脑损伤。',
    costWithInsurance: '$250–$500',
    costWithoutInsurance: '$1,500–$3,000+',
    costWithInsuranceZh: '$250–$500',
    costWithoutInsuranceZh: '$1,500–$3,000+',
    whatToBring: [...defaultWhatToBring],
    whatToBringZh: [...defaultWhatToBringZh],
    whenToGoER: 'You are already at the ER level — call 911 immediately.',
    whenToGoERZh: '这已属于急诊级别——请立即拨打 911。',
    isEmergency: true,
  },
  {
    id: 'severe-allergic-reaction',
    situation: 'Severe allergic reaction (anaphylaxis)',
    situationZh: '严重过敏反应（过敏性休克）',
    icon: 'shield-alert',
    recommendedLevel: 'er',
    reason:
      'Anaphylaxis can cause airway closure and cardiac arrest within minutes. Use an EpiPen if available and call 911.',
    reasonZh:
      '过敏性休克可在数分钟内导致气道关闭和心脏骤停。如有 EpiPen 请先使用，并拨打 911。',
    costWithInsurance: '$250–$500',
    costWithoutInsurance: '$1,500–$3,000+',
    costWithInsuranceZh: '$250–$500',
    costWithoutInsuranceZh: '$1,500–$3,000+',
    whatToBring: [...defaultWhatToBring, 'EpiPen (if you have one)'],
    whatToBringZh: [...defaultWhatToBringZh, 'EpiPen（如有）'],
    whenToGoER: 'You are already at the ER level — call 911 immediately.',
    whenToGoERZh: '这已属于急诊级别——请立即拨打 911。',
    isEmergency: true,
  },

  // ── Urgent Care ────────────────────────────────────────────────────────
  {
    id: 'fever',
    situation: 'Fever (adult, no rash or stiff neck)',
    situationZh: '发烧（成人，无皮疹或颈部僵硬）',
    icon: 'thermometer',
    recommendedLevel: 'urgent',
    reason:
      'Most fevers in adults can be evaluated at urgent care. They can run tests and prescribe medication same day.',
    reasonZh:
      '大多数成人发烧可在紧急护理中心诊治。当天即可做检查并开药。',
    costWithInsurance: '$20–$75',
    costWithoutInsurance: '$150–$280',
    costWithInsuranceZh: '$20–$75',
    costWithoutInsuranceZh: '$150–$280',
    whatToBring: [...defaultWhatToBring],
    whatToBringZh: [...defaultWhatToBringZh],
    whenToGoER:
      'Go to the ER if fever is above 103\u00B0F (39.4\u00B0C), accompanied by a stiff neck, rash, confusion, or seizures.',
    whenToGoERZh:
      '如果体温超过 39.4\u00B0C（103\u00B0F），伴有颈部僵硬、皮疹、意识模糊或抽搐，请去急诊室。',
    isEmergency: false,
  },
  {
    id: 'minor-cuts-stitches',
    situation: 'Minor cuts that may need stitches',
    situationZh: '可能需要缝合的小伤口',
    icon: 'scissors',
    recommendedLevel: 'urgent',
    reason:
      'Urgent care can clean, stitch, and bandage minor lacerations without the long ER wait.',
    reasonZh:
      '紧急护理中心可以清理、缝合和包扎小伤口，无需在急诊室长时间等待。',
    costWithInsurance: '$20–$75',
    costWithoutInsurance: '$150–$280',
    costWithInsuranceZh: '$20–$75',
    costWithoutInsuranceZh: '$150–$280',
    whatToBring: [...defaultWhatToBring],
    whatToBringZh: [...defaultWhatToBringZh],
    whenToGoER:
      'Go to the ER if the cut is very deep, on the face, or bleeding won\'t stop after 15 minutes of firm pressure.',
    whenToGoERZh:
      '如果伤口很深、在面部，或持续按压 15 分钟后仍无法止血，请去急诊室。',
    isEmergency: false,
  },
  {
    id: 'sprains-strains',
    situation: 'Sprains and strains',
    situationZh: '扭伤和拉伤',
    icon: 'bone',
    recommendedLevel: 'urgent',
    reason:
      'Urgent care can do X-rays to rule out fractures and provide splints, wraps, and pain management.',
    reasonZh:
      '紧急护理中心可拍 X 光排除骨折，并提供夹板、绷带和止痛治疗。',
    costWithInsurance: '$20–$75',
    costWithoutInsurance: '$150–$280',
    costWithInsuranceZh: '$20–$75',
    costWithoutInsuranceZh: '$150–$280',
    whatToBring: [...defaultWhatToBring],
    whatToBringZh: [...defaultWhatToBringZh],
    whenToGoER:
      'Go to the ER if the limb looks visibly deformed, you cannot move it at all, or there is numbness/tingling.',
    whenToGoERZh:
      '如果肢体明显变形、完全无法活动，或出现麻木/刺痛，请去急诊室。',
    isEmergency: false,
  },
  {
    id: 'uti-symptoms',
    situation: 'UTI symptoms (painful urination, frequent urge)',
    situationZh: '尿路感染症状（排尿疼痛、尿频）',
    icon: 'flame',
    recommendedLevel: 'urgent',
    reason:
      'Urgent care can do a quick urine test and prescribe antibiotics the same day.',
    reasonZh:
      '紧急护理中心可快速做尿检并当天开抗生素。',
    costWithInsurance: '$20–$75',
    costWithoutInsurance: '$150–$280',
    costWithInsuranceZh: '$20–$75',
    costWithoutInsuranceZh: '$150–$280',
    whatToBring: [...defaultWhatToBring],
    whatToBringZh: [...defaultWhatToBringZh],
    whenToGoER:
      'Go to the ER if you have high fever, severe back/flank pain, blood in urine, or vomiting — this may indicate a kidney infection.',
    whenToGoERZh:
      '如果出现高烧、严重腰/侧腹痛、尿中带血或呕吐，可能是肾脏感染，请去急诊室。',
    isEmergency: false,
  },
  {
    id: 'sore-throat-ear',
    situation: 'Sore throat or ear infection',
    situationZh: '喉咙痛或耳部感染',
    icon: 'ear',
    recommendedLevel: 'urgent',
    reason:
      'Urgent care can do a strep test or examine the ear and prescribe antibiotics if needed. Telehealth is also an option for mild cases.',
    reasonZh:
      '紧急护理中心可做链球菌检测或耳部检查，必要时开抗生素。轻症也可选择远程医疗。',
    costWithInsurance: '$20–$75',
    costWithoutInsurance: '$150–$280',
    costWithInsuranceZh: '$20–$75',
    costWithoutInsuranceZh: '$150–$280',
    whatToBring: [...defaultWhatToBring],
    whatToBringZh: [...defaultWhatToBringZh],
    whenToGoER:
      'Go to the ER if you have difficulty breathing, cannot swallow liquids, or notice swelling in your throat/neck.',
    whenToGoERZh:
      '如果呼吸困难、无法吞咽液体，或喉咙/颈部肿胀，请去急诊室。',
    isEmergency: false,
  },
  {
    id: 'minor-burn',
    situation: 'Minor burn (small area, no blistering or charring)',
    situationZh: '轻度烧伤（面积小，无水泡或焦化）',
    icon: 'flame-kindling',
    recommendedLevel: 'urgent',
    reason:
      'Urgent care can clean and dress minor burns and prescribe pain relief or antibiotic ointment.',
    reasonZh:
      '紧急护理中心可清洁和包扎轻度烧伤，并开止痛药或抗生素药膏。',
    costWithInsurance: '$20–$75',
    costWithoutInsurance: '$150–$280',
    costWithInsuranceZh: '$20–$75',
    costWithoutInsuranceZh: '$150–$280',
    whatToBring: [...defaultWhatToBring],
    whatToBringZh: [...defaultWhatToBringZh],
    whenToGoER:
      'Go to the ER if the burn is larger than your palm, involves the face/hands/feet/joints, or shows white/charred skin.',
    whenToGoERZh:
      '如果烧伤面积大于手掌、涉及面部/手/脚/关节，或皮肤发白/焦化，请去急诊室。',
    isEmergency: false,
  },
  {
    id: 'back-pain',
    situation: 'Back pain (acute, non-traumatic)',
    situationZh: '腰背痛（急性、非外伤）',
    icon: 'person-standing',
    recommendedLevel: 'urgent',
    reason:
      'Urgent care can evaluate the pain, prescribe muscle relaxants or anti-inflammatory medication, and refer for imaging if needed.',
    reasonZh:
      '紧急护理中心可评估疼痛、开肌肉松弛剂或消炎药，并在必要时安排影像检查。',
    costWithInsurance: '$20–$75',
    costWithoutInsurance: '$150–$280',
    costWithInsuranceZh: '$20–$75',
    costWithoutInsuranceZh: '$150–$280',
    whatToBring: [...defaultWhatToBring],
    whatToBringZh: [...defaultWhatToBringZh],
    whenToGoER:
      'Go to the ER if you have numbness in the legs, loss of bladder/bowel control, or the pain follows a serious fall or accident.',
    whenToGoERZh:
      '如果出现腿部麻木、大小便失禁，或疼痛源于严重跌倒或事故，请去急诊室。',
    isEmergency: false,
  },
  {
    id: 'eye-issue',
    situation: 'Eye issue (pink eye, minor irritation)',
    situationZh: '眼部问题（结膜炎、轻微刺激）',
    icon: 'eye',
    recommendedLevel: 'urgent',
    reason:
      'Urgent care can diagnose pink eye or minor infections and prescribe drops. Telehealth is also suitable if symptoms are mild.',
    reasonZh:
      '紧急护理中心可诊断结膜炎或轻微感染并开眼药水。症状较轻时也可选择远程医疗。',
    costWithInsurance: '$20–$75',
    costWithoutInsurance: '$150–$280',
    costWithInsuranceZh: '$20–$75',
    costWithoutInsuranceZh: '$150–$280',
    whatToBring: [...defaultWhatToBring],
    whatToBringZh: [...defaultWhatToBringZh],
    whenToGoER:
      'Go to the ER if you have sudden vision loss, a chemical splash in the eye, an object embedded in the eye, or severe eye pain.',
    whenToGoERZh:
      '如果突然视力丧失、化学品溅入眼睛、异物嵌入眼睛或剧烈眼痛，请去急诊室。',
    isEmergency: false,
  },

  // ── Primary Care / Campus Health ───────────────────────────────────────
  {
    id: 'routine-checkup',
    situation: 'Routine checkup or annual physical',
    situationZh: '常规体检或年度体检',
    icon: 'clipboard-check',
    recommendedLevel: 'primary',
    reason:
      'Primary care is the right place for preventive visits, health screenings, and establishing a relationship with a doctor.',
    reasonZh:
      '初级保健适合预防性检查、健康筛查以及与医生建立长期关系。',
    costWithInsurance: '$20–$40 (often $0 for preventive)',
    costWithoutInsurance: '$150–$300',
    costWithInsuranceZh: '$20–$40（预防性检查通常免费）',
    costWithoutInsuranceZh: '$150–$300',
    whatToBring: [...defaultWhatToBring, 'Previous medical records if new patient'],
    whatToBringZh: [...defaultWhatToBringZh, '如果是新患者，请带上以往的病历'],
    whenToGoER: 'Not applicable for routine visits.',
    whenToGoERZh: '常规检查不适用此建议。',
    isEmergency: false,
  },
  {
    id: 'vaccination',
    situation: 'Vaccination (flu shot, COVID booster, etc.)',
    situationZh: '接种疫苗（流感疫苗、新冠加强针等）',
    icon: 'syringe',
    recommendedLevel: 'primary',
    reason:
      'Campus health centers and primary care offices stock standard vaccines. Many are fully covered by insurance.',
    reasonZh:
      '校园健康中心和初级保健诊所备有常规疫苗，许多疫苗保险全额覆盖。',
    costWithInsurance: '$0–$40',
    costWithoutInsurance: '$150–$300',
    costWithInsuranceZh: '$0–$40',
    costWithoutInsuranceZh: '$150–$300',
    whatToBring: [...defaultWhatToBring, 'Vaccination record / immunization history'],
    whatToBringZh: [...defaultWhatToBringZh, '疫苗接种记录'],
    whenToGoER: 'Go to the ER only if you experience a severe allergic reaction after vaccination (difficulty breathing, swelling, hives).',
    whenToGoERZh: '仅在接种后出现严重过敏反应（呼吸困难、肿胀、荨麻疹）时去急诊室。',
    isEmergency: false,
  },
  {
    id: 'mental-health',
    situation: 'Mental health concern (non-crisis)',
    situationZh: '心理健康问题（非危机）',
    icon: 'heart-handshake',
    recommendedLevel: 'primary',
    reason:
      'Primary care or campus counseling can provide initial assessment, therapy referrals, and medication management for anxiety, depression, or stress.',
    reasonZh:
      '初级保健或校园心理咨询中心可提供初步评估、心理治疗转介，以及焦虑、抑郁或压力的药物管理。',
    costWithInsurance: '$20–$40',
    costWithoutInsurance: '$150–$300',
    costWithInsuranceZh: '$20–$40',
    costWithoutInsuranceZh: '$150–$300',
    whatToBring: [...defaultWhatToBring],
    whatToBringZh: [...defaultWhatToBringZh],
    whenToGoER:
      'Go to the ER or call 988 (Suicide & Crisis Lifeline) if you are having thoughts of self-harm, suicide, or harming others.',
    whenToGoERZh:
      '如果有自我伤害、自杀或伤害他人的想法，请去急诊室或拨打 988（自杀与危机生命线）。',
    isEmergency: false,
  },

  // ── Telehealth ─────────────────────────────────────────────────────────
  {
    id: 'cold-flu',
    situation: 'Cold or flu symptoms',
    situationZh: '感冒或流感症状',
    icon: 'thermometer-snowflake',
    recommendedLevel: 'telehealth',
    reason:
      'A telehealth doctor can assess symptoms, recommend OTC treatments, and prescribe antivirals like Tamiflu if needed — all from home.',
    reasonZh:
      '远程医生可评估症状、推荐非处方药，必要时开达菲等抗病毒药——无需出门。',
    costWithInsurance: '$10–$40',
    costWithoutInsurance: '$40–$90',
    costWithInsuranceZh: '$10–$40',
    costWithoutInsuranceZh: '$40–$90',
    whatToBring: ['Insurance card', 'Thermometer reading', 'List of symptoms and when they started'],
    whatToBringZh: ['保险卡', '体温读数', '症状清单及起始时间'],
    whenToGoER:
      'Go to the ER if you have difficulty breathing, persistent chest pain, confusion, or cannot keep fluids down.',
    whenToGoERZh:
      '如果出现呼吸困难、持续胸痛、意识模糊或无法进食饮水，请去急诊室。',
    isEmergency: false,
  },
  {
    id: 'skin-rash',
    situation: 'Skin rash (non-emergency)',
    situationZh: '皮疹（非紧急）',
    icon: 'scan',
    recommendedLevel: 'telehealth',
    reason:
      'Many rashes can be diagnosed via photo or video call. The doctor can prescribe creams or antihistamines remotely.',
    reasonZh:
      '许多皮疹可通过照片或视频诊断。医生可远程开外用药或抗组胺药。',
    costWithInsurance: '$10–$40',
    costWithoutInsurance: '$40–$90',
    costWithInsuranceZh: '$10–$40',
    costWithoutInsuranceZh: '$40–$90',
    whatToBring: ['Insurance card', 'Clear photos of the rash', 'Notes on when it appeared and any new products/foods'],
    whatToBringZh: ['保险卡', '皮疹的清晰照片', '出现时间及近期使用的新产品/食物记录'],
    whenToGoER:
      'Go to the ER if the rash spreads rapidly, is accompanied by fever, difficulty breathing, or swelling of face/throat.',
    whenToGoERZh:
      '如果皮疹迅速蔓延，伴有发烧、呼吸困难或面部/喉咙肿胀，请去急诊室。',
    isEmergency: false,
  },
  {
    id: 'prescription-refill',
    situation: 'Prescription refill',
    situationZh: '处方续药',
    icon: 'pill',
    recommendedLevel: 'telehealth',
    reason:
      'Telehealth is the quickest and cheapest way to renew ongoing prescriptions without an in-person visit.',
    reasonZh:
      '远程医疗是续方最快捷、最便宜的方式，无需亲自就诊。',
    costWithInsurance: '$10–$40',
    costWithoutInsurance: '$40–$90',
    costWithInsuranceZh: '$10–$40',
    costWithoutInsuranceZh: '$40–$90',
    whatToBring: ['Insurance card', 'Current medication name and dosage', 'Pharmacy preference'],
    whatToBringZh: ['保险卡', '当前药物名称和剂量', '首选药房'],
    whenToGoER: 'Not applicable for prescription refills.',
    whenToGoERZh: '续方不适用此建议。',
    isEmergency: false,
  },

  // ── Special Case ───────────────────────────────────────────────────────
  {
    id: 'dental-emergency',
    situation: 'Dental emergency (severe toothache, knocked-out tooth)',
    situationZh: '牙科急诊（剧烈牙痛、牙齿脱落）',
    icon: 'smile',
    recommendedLevel: 'urgent',
    reason:
      'Most dental emergencies need an emergency dentist, not a regular ER. Urgent care can manage pain and infection until you see a dentist. Call your dental insurance or a 24-hour dental clinic first.',
    reasonZh:
      '大多数牙科急诊需要急诊牙医而非普通急诊室。紧急护理中心可控制疼痛和感染，直到您看到牙医。请先拨打牙科保险或 24 小时牙科诊所电话。',
    costWithInsurance: '$20–$75 (urgent care); dental costs vary',
    costWithoutInsurance: '$150–$280 (urgent care); dental costs vary',
    costWithInsuranceZh: '$20–$75（紧急护理）；牙科费用另计',
    costWithoutInsuranceZh: '$150–$280（紧急护理）；牙科费用另计',
    whatToBring: [...defaultWhatToBring, 'Dental insurance card (if separate)', 'Knocked-out tooth in milk or saline'],
    whatToBringZh: [...defaultWhatToBringZh, '牙科保险卡（如有单独的）', '脱落的牙齿（放在牛奶或生理盐水中）'],
    whenToGoER:
      'Go to the ER if there is uncontrollable bleeding from the mouth, jaw injury, severe facial swelling affecting breathing, or signs of a spreading infection (fever, swelling extending to neck).',
    whenToGoERZh:
      '如果口腔大量出血无法控制、颌骨受伤、面部严重肿胀影响呼吸，或感染扩散迹象（发烧、肿胀延伸到颈部），请去急诊室。',
    isEmergency: false,
  },
];
