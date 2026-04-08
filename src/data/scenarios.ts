export interface MedicalScenario {
  id: string;
  name: string;
  nameZh: string;
  icon: string;
  description: string;
  descriptionZh: string;
  lineItems: {
    description: string;
    descriptionZh: string;
    billedAmount: number;
  }[];
  totalBilled: number;
  typicalWithSHIP: { low: number; high: number };
  typicalWithoutInsurance: { low: number; high: number };
  notes: string;
  notesZh: string;
}

export const defaultSHIPPlan = {
  monthlyPremium: 570,
  annualDeductible: 250,
  coinsurancePercent: 20,
  oopMax: 6500,
  copayPCP: 25,
  copaySpecialist: 40,
  copayER: 200,
  copayUrgentCare: 50,
};

export const medicalScenarios: MedicalScenario[] = [
  {
    id: "flu-cold",
    name: "Flu / Cold Visit",
    nameZh: "流感/感冒就诊",
    icon: "Thermometer",
    description:
      "Standard office visit for flu or cold symptoms, including a rapid test and prescription medication.",
    descriptionZh:
      "因流感或感冒症状进行的常规门诊，包括快速检测和处方药。",
    lineItems: [
      {
        description: "Office visit (PCP)",
        descriptionZh: "门诊就诊（家庭医生）",
        billedAmount: 200,
      },
      {
        description: "Rapid flu/strep test",
        descriptionZh: "流感/链球菌快速检测",
        billedAmount: 50,
      },
      {
        description: "Prescription (Tamiflu or antibiotic)",
        descriptionZh: "处方药（达菲或抗生素）",
        billedAmount: 130,
      },
    ],
    totalBilled: 380,
    typicalWithSHIP: { low: 30, high: 65 },
    typicalWithoutInsurance: { low: 340, high: 420 },
    notes:
      "With SHIP you typically pay a $25 copay plus a $10-25 Rx copay. Without insurance you pay the full billed amount, though some clinics offer cash-pay discounts.",
    notesZh:
      "有SHIP保险通常只需支付$25挂号费加$10-25药物自付额。没有保险则需支付全部费用，部分诊所提供现金优惠价。",
  },
  {
    id: "urgent-care-sprain",
    name: "Urgent Care (Sprain)",
    nameZh: "急诊诊所（扭伤）",
    icon: "Activity",
    description:
      "Urgent care visit for an ankle or wrist sprain, including X-ray, splint, and pain medication.",
    descriptionZh:
      "因脚踝或手腕扭伤前往急诊诊所，包括X光、夹板固定和止痛药。",
    lineItems: [
      {
        description: "Urgent care visit",
        descriptionZh: "急诊诊所就诊",
        billedAmount: 300,
      },
      {
        description: "X-ray (2 views)",
        descriptionZh: "X光片（2个角度）",
        billedAmount: 275,
      },
      {
        description: "Splint / brace",
        descriptionZh: "夹板/护具",
        billedAmount: 200,
      },
      {
        description: "Prescription (ibuprofen 800mg)",
        descriptionZh: "处方药（布洛芬800mg）",
        billedAmount: 30,
      },
    ],
    totalBilled: 805,
    typicalWithSHIP: { low: 45, high: 165 },
    typicalWithoutInsurance: { low: 700, high: 900 },
    notes:
      "With SHIP you pay the $50 urgent care copay, and the remaining services go toward your deductible at 20% coinsurance. Without insurance, some urgent care centers offer bundled cash pricing around $500-700.",
    notesZh:
      "有SHIP保险需支付$50急诊诊所自付额，其余费用按20%共付比例计入免赔额。没有保险时，部分急诊诊所提供$500-700的打包现金价。",
  },
  {
    id: "er-chest-pain",
    name: "ER Visit (Chest Pain Workup)",
    nameZh: "急诊室（胸痛检查）",
    icon: "HeartPulse",
    description:
      "Emergency room visit for chest pain evaluation, including EKG, blood work, chest X-ray, and observation hours.",
    descriptionZh:
      "因胸痛前往急诊室，包括心电图、血液检查、胸部X光和留观。",
    lineItems: [
      {
        description: "ER facility fee",
        descriptionZh: "急诊室设施费",
        billedAmount: 2500,
      },
      {
        description: "ER physician fee",
        descriptionZh: "急诊医生诊费",
        billedAmount: 850,
      },
      {
        description: "EKG (electrocardiogram)",
        descriptionZh: "心电图（EKG）",
        billedAmount: 325,
      },
      {
        description: "Blood work (troponin, CBC, BMP)",
        descriptionZh: "血液检查（肌钙蛋白、血常规、基础代谢）",
        billedAmount: 500,
      },
      {
        description: "Chest X-ray",
        descriptionZh: "胸部X光",
        billedAmount: 350,
      },
      {
        description: "Observation (4-6 hours)",
        descriptionZh: "留观（4-6小时）",
        billedAmount: 1250,
      },
    ],
    totalBilled: 5775,
    typicalWithSHIP: { low: 305, high: 800 },
    typicalWithoutInsurance: { low: 4800, high: 6500 },
    notes:
      "With SHIP you pay the $200 ER copay plus 20% coinsurance after your deductible. If admitted, the ER copay is typically waived. Without insurance, hospitals may offer financial assistance or payment plans, but the initial bill is steep.",
    notesZh:
      "有SHIP保险需支付$200急诊自付额，加上免赔额后20%的共付比例。如果住院，急诊自付额通常免除。没有保险时，医院可能提供经济援助或分期付款，但初始账单金额很高。",
  },
  {
    id: "broken-arm",
    name: "Broken Arm",
    nameZh: "手臂骨折",
    icon: "Bone",
    description:
      "ER visit for a broken arm, including X-rays, casting, follow-up visits, and cast removal.",
    descriptionZh:
      "因手臂骨折前往急诊室，包括X光、打石膏、复诊和拆石膏。",
    lineItems: [
      {
        description: "ER visit",
        descriptionZh: "急诊室就诊",
        billedAmount: 3000,
      },
      {
        description: "X-rays (initial)",
        descriptionZh: "X光片（初次）",
        billedAmount: 400,
      },
      {
        description: "Casting / splint application",
        descriptionZh: "石膏/夹板固定",
        billedAmount: 350,
      },
      {
        description: "Prescription (pain medication)",
        descriptionZh: "处方药（止痛药）",
        billedAmount: 30,
      },
      {
        description: "Follow-up visit (orthopedic)",
        descriptionZh: "复诊（骨科）",
        billedAmount: 300,
      },
      {
        description: "Follow-up X-ray",
        descriptionZh: "复诊X光",
        billedAmount: 200,
      },
      {
        description: "Cast removal",
        descriptionZh: "拆石膏",
        billedAmount: 225,
      },
    ],
    totalBilled: 4505,
    typicalWithSHIP: { low: 290, high: 630 },
    typicalWithoutInsurance: { low: 3800, high: 5000 },
    notes:
      "With SHIP, the ER copay ($200) plus specialist copay ($40) and 20% coinsurance on the rest keeps costs manageable. Total out-of-pocket spans multiple visits over 6-8 weeks. Without insurance, negotiate a cash price — many orthopedic offices offer 30-50% discounts for self-pay.",
    notesZh:
      "有SHIP保险，急诊自付额（$200）加专科自付额（$40）和20%共付比例使费用可控。总自付费用分布在6-8周的多次就诊中。没有保险时可协商现金价——许多骨科诊所为自费患者提供30-50%折扣。",
  },
  {
    id: "appendectomy",
    name: "Appendectomy (Surgery)",
    nameZh: "阑尾切除术",
    icon: "Syringe",
    description:
      "Emergency appendectomy including ER evaluation, CT scan, laparoscopic surgery, 2-day hospital stay, and medications.",
    descriptionZh:
      "紧急阑尾切除术，包括急诊评估、CT扫描、腹腔镜手术、2天住院和药物。",
    lineItems: [
      {
        description: "ER evaluation",
        descriptionZh: "急诊评估",
        billedAmount: 4500,
      },
      {
        description: "CT scan (abdomen/pelvis)",
        descriptionZh: "CT扫描（腹部/盆腔）",
        billedAmount: 2750,
      },
      {
        description: "Surgeon fee",
        descriptionZh: "外科医生费",
        billedAmount: 5500,
      },
      {
        description: "Anesthesia",
        descriptionZh: "麻醉费",
        billedAmount: 2250,
      },
      {
        description: "Hospital stay (2 days)",
        descriptionZh: "住院（2天）",
        billedAmount: 10000,
      },
      {
        description: "Pathology",
        descriptionZh: "病理检查",
        billedAmount: 550,
      },
      {
        description: "Medications (IV antibiotics, pain meds)",
        descriptionZh: "药物（静脉抗生素、止痛药）",
        billedAmount: 1250,
      },
    ],
    totalBilled: 26800,
    typicalWithSHIP: { low: 1330, high: 3580 },
    typicalWithoutInsurance: { low: 22000, high: 30000 },
    notes:
      "With SHIP, after the $250 deductible you pay 20% coinsurance up to the $6,500 out-of-pocket max. A $26,800 bill at 20% = $5,310 coinsurance + $250 deductible, well under the OOP max. Without insurance this is financially devastating — always negotiate and apply for hospital financial assistance.",
    notesZh:
      "有SHIP保险，在$250免赔额之后按20%共付比例支付，最高不超过$6,500自付上限。$26,800的账单按20%计算=$5,310共付+$250免赔额，在自付上限以内。没有保险则经济压力巨大——务必协商价格并申请医院经济援助。",
  },
  {
    id: "therapy-session",
    name: "Therapy Session",
    nameZh: "心理咨询",
    icon: "Brain",
    description:
      "Individual therapy session (50 minutes) with a licensed therapist. Campus counseling centers often provide free sessions.",
    descriptionZh:
      "个人心理咨询（50分钟），由持证治疗师提供。校园心理咨询中心通常提供免费服务。",
    lineItems: [
      {
        description: "Individual therapy (50 min)",
        descriptionZh: "个人心理咨询（50分钟）",
        billedAmount: 200,
      },
    ],
    totalBilled: 200,
    typicalWithSHIP: { low: 20, high: 40 },
    typicalWithoutInsurance: { low: 150, high: 250 },
    notes:
      "Most SHIP plans cover mental health with a $20-40 copay per session. Campus counseling centers typically offer 6-12 free sessions per year. Telehealth therapy platforms may also accept SHIP. Without insurance, sliding-scale therapists charge $60-120/session.",
    notesZh:
      "大多数SHIP保险以每次$20-40的自付额覆盖心理健康服务。校园心理咨询中心通常每年提供6-12次免费咨询。远程心理咨询平台也可能接受SHIP保险。没有保险时，按收入调整的治疗师收费$60-120/次。",
  },
  {
    id: "dental-emergency",
    name: "Dental Emergency",
    nameZh: "牙科急诊",
    icon: "Smile",
    description:
      "Emergency dental visit for severe tooth pain, including exam, X-ray, extraction, and antibiotics.",
    descriptionZh:
      "因严重牙痛进行的牙科急诊，包括检查、X光、拔牙和抗生素。",
    lineItems: [
      {
        description: "Emergency dental exam",
        descriptionZh: "牙科急诊检查",
        billedAmount: 140,
      },
      {
        description: "Dental X-ray (periapical)",
        descriptionZh: "牙科X光（根尖片）",
        billedAmount: 50,
      },
      {
        description: "Tooth extraction (simple)",
        descriptionZh: "拔牙（简单）",
        billedAmount: 250,
      },
      {
        description: "Prescription (amoxicillin + ibuprofen)",
        descriptionZh: "处方药（阿莫西林+布洛芬）",
        billedAmount: 35,
      },
    ],
    totalBilled: 475,
    typicalWithSHIP: { low: 475, high: 475 },
    typicalWithoutInsurance: { low: 400, high: 550 },
    notes:
      "SHIP plans typically do NOT cover dental services. You pay the full amount out of pocket. Some universities offer discounted dental clinics, and dental schools provide care at 50-70% off. Consider purchasing separate dental insurance ($20-40/month) if you anticipate dental needs.",
    notesZh:
      "SHIP保险通常不覆盖牙科服务，需全额自付。部分大学提供折扣牙科诊所，牙科学院的治疗费用可优惠50-70%。如预计有牙科需求，可考虑单独购买牙科保险（$20-40/月）。",
  },
  {
    id: "annual-physical",
    name: "Annual Physical / Preventive",
    nameZh: "年度体检/预防保健",
    icon: "ClipboardCheck",
    description:
      "Routine annual physical exam with standard blood work, TB screening, and flu vaccination.",
    descriptionZh:
      "常规年度体检，包括标准血液检查、结核筛查和流感疫苗。",
    lineItems: [
      {
        description: "Annual physical exam",
        descriptionZh: "年度体检",
        billedAmount: 300,
      },
      {
        description: "Blood work (CBC, lipid panel, glucose)",
        descriptionZh: "血液检查（血常规、血脂、血糖）",
        billedAmount: 250,
      },
      {
        description: "TB test (QuantiFERON)",
        descriptionZh: "结核检测（QuantiFERON）",
        billedAmount: 60,
      },
      {
        description: "Flu shot",
        descriptionZh: "流感疫苗",
        billedAmount: 50,
      },
    ],
    totalBilled: 660,
    typicalWithSHIP: { low: 0, high: 0 },
    typicalWithoutInsurance: { low: 550, high: 750 },
    notes:
      "Preventive care is covered at 100% with no copay under ACA-compliant SHIP plans. This includes annual physicals, routine blood work, immunizations, and screenings. Without insurance, campus health centers often offer basic physicals at reduced rates ($100-200).",
    notesZh:
      "预防保健在符合ACA的SHIP保险下100%覆盖，无需自付。包括年度体检、常规血液检查、疫苗接种和筛查。没有保险时，校园健康中心通常以优惠价格（$100-200）提供基本体检。",
  },
  {
    id: "monthly-prescription",
    name: "Prescription (Monthly)",
    nameZh: "每月处方药",
    icon: "Pill",
    description:
      "Monthly prescription costs for common medications: a generic SSRI (antidepressant) and a brand-name rescue inhaler.",
    descriptionZh:
      "常见药物的每月处方费用：仿制SSRI（抗抑郁药）和品牌急救吸入器。",
    lineItems: [
      {
        description: "Generic SSRI (e.g., sertraline 50mg, 30-day)",
        descriptionZh: "仿制SSRI（如舍曲林50mg，30天）",
        billedAmount: 25,
      },
      {
        description: "Brand-name inhaler (e.g., ProAir HFA)",
        descriptionZh: "品牌吸入器（如ProAir HFA）",
        billedAmount: 200,
      },
    ],
    totalBilled: 225,
    typicalWithSHIP: { low: 10, high: 25 },
    typicalWithoutInsurance: { low: 60, high: 250 },
    notes:
      "With SHIP, generic drugs typically cost $10-15 copay and brand-name drugs $25-50. Use GoodRx or Cost Plus Drugs for additional savings. Without insurance, generics are affordable ($4-25 at Walmart/Costco), but brand-name drugs can be very expensive. Always ask your doctor about generic alternatives.",
    notesZh:
      "有SHIP保险，仿制药通常自付$10-15，品牌药$25-50。使用GoodRx或Cost Plus Drugs可额外节省。没有保险时，仿制药价格可接受（Walmart/Costco $4-25），但品牌药可能非常昂贵。务必向医生询问仿制药替代方案。",
  },
  {
    id: "covid-respiratory",
    name: "COVID / Respiratory (Mild)",
    nameZh: "新冠/呼吸道感染（轻症）",
    icon: "Wind",
    description:
      "Telehealth visit for mild COVID or respiratory symptoms, including rapid test and antiviral prescription.",
    descriptionZh:
      "因轻度新冠或呼吸道症状进行远程医疗就诊，包括快速检测和抗病毒处方药。",
    lineItems: [
      {
        description: "Telehealth visit",
        descriptionZh: "远程医疗就诊",
        billedAmount: 175,
      },
      {
        description: "Rapid COVID test (in-office or at-home kit)",
        descriptionZh: "新冠快速检测（诊所或居家检测盒）",
        billedAmount: 100,
      },
      {
        description: "Paxlovid (5-day course)",
        descriptionZh: "Paxlovid（5天疗程）",
        billedAmount: 950,
      },
    ],
    totalBilled: 1225,
    typicalWithSHIP: { low: 0, high: 100 },
    typicalWithoutInsurance: { low: 400, high: 1300 },
    notes:
      "Many SHIP plans cover telehealth at low or no cost, and COVID tests/treatments may still be covered under federal programs. Paxlovid pricing varies — check if your plan covers antivirals. Without insurance, free COVID tests may be available through public health programs, and Pfizer offers a patient assistance program for Paxlovid.",
    notesZh:
      "许多SHIP保险以低费用或免费覆盖远程医疗，新冠检测和治疗可能仍在联邦计划覆盖范围内。Paxlovid价格不一——请确认保险是否覆盖抗病毒药物。没有保险时，公共卫生项目可能提供免费新冠检测，辉瑞也为Paxlovid提供患者援助计划。",
  },
];
