type Lang = 'en' | 'zh';

interface Strings {
  [key: string]: { en: string; zh: string };
}

let currentLang: Lang = 'en';

const strings: Strings = {
  // Nav
  'nav.home': { en: 'Home', zh: '首页' },
  'nav.waiver': { en: 'Waiver Check', zh: '豁免检查' },
  'nav.j1': { en: 'J-1 Compliance', zh: 'J-1合规' },
  'nav.compare': { en: 'Compare Plans', zh: '对比方案' },
  'nav.glossary': { en: 'Glossary', zh: '术语表' },
  'nav.wheretogo': { en: 'Where to Go', zh: '去哪看病' },
  'nav.cost': { en: 'Cost Estimator', zh: '费用估算' },
  'nav.mentalhealth': { en: 'Mental Health', zh: '心理健康' },
  'nav.bill': { en: 'Bill Explainer', zh: '账单解读' },

  // Hero
  'hero.title': { en: 'Navigate US Health Insurance with Confidence', zh: '自信应对美国医疗保险' },
  'hero.subtitle': { en: 'Free tools built for international students. Check waiver eligibility, verify J-1 compliance, compare plans, and understand your coverage — in English and Chinese.', zh: '专为留学生打造的免费工具。检查保险豁免资格、验证J-1签证合规性、对比保险方案、了解你的保障——中英双语。' },
  'hero.cta': { en: 'Get Started', zh: '开始使用' },

  // Feature cards
  'feature.waiver.title': { en: 'Waiver Eligibility', zh: '豁免资格检查' },
  'feature.waiver.desc': { en: 'Check if your plan qualifies to waive university SHIP', zh: '检查你的保险是否符合豁免学校SHIP的条件' },
  'feature.j1.title': { en: 'J-1 Compliance', zh: 'J-1合规检查' },
  'feature.j1.desc': { en: 'Check if your plan meets J-1 requirements', zh: '检查你的保险是否符合J-1签证要求' },
  'feature.compare.title': { en: 'Compare Plans', zh: '保险对比' },
  'feature.compare.desc': { en: 'Compare up to 3 plans side by side', zh: '最多3个保险方案并排对比' },
  'feature.glossary.title': { en: 'Insurance Glossary', zh: '保险术语' },
  'feature.glossary.desc': { en: 'Plain-English definitions with examples', zh: '通俗易懂的定义和示例' },
  'feature.wheretogo.title': { en: 'Where Should I Go?', zh: '去哪看病？' },
  'feature.wheretogo.desc': { en: 'Find the right care for your situation', zh: '根据症状找到合适的就医方式' },
  'feature.cost.title': { en: 'Cost Estimator', zh: '费用估算' },
  'feature.cost.desc': { en: 'Estimate out-of-pocket costs for common scenarios', zh: '估算常见医疗场景的自付费用' },
  'feature.mentalhealth.title': { en: 'Mental Health Resources', zh: '心理健康资源' },
  'feature.mentalhealth.desc': { en: 'Find support, therapy, and crisis resources', zh: '获取心理支持、治疗和危机资源' },
  'feature.bill.title': { en: 'I Got a Bill', zh: '我收到了账单' },
  'feature.bill.desc': { en: 'Understand your EOB and medical bills', zh: '了解你的保险理赔说明和医疗账单' },

  // Disclaimer
  'disclaimer': { en: 'This is not medical or legal advice. Consult a qualified professional for personalized guidance.', zh: '本工具不构成医疗或法律建议。请咨询专业人士获取个性化指导。' },

  // Common
  'common.back': { en: 'Back', zh: '返回' },
  'common.next': { en: 'Next', zh: '下一步' },
  'common.reset': { en: 'Start Over', zh: '重新开始' },
  'common.results': { en: 'Results', zh: '结果' },
  'common.step': { en: 'Step', zh: '第' },
  'common.of': { en: 'of', zh: '步，共' },
  'common.steps': { en: '', zh: '步' },
  'common.close': { en: 'Close', zh: '关闭' },
  'common.search': { en: 'Search...', zh: '搜索...' },
  'common.noResults': { en: 'No results found', zh: '未找到结果' },
  'common.learnMore': { en: 'Learn more', zh: '了解更多' },
  'common.estimated': { en: 'Estimated', zh: '估算' },
  'common.approximately': { en: 'approximately', zh: '大约' },
  'common.perYear': { en: '/year', zh: '/年' },
  'common.perMonth': { en: '/month', zh: '/月' },
  'common.withInsurance': { en: 'With Insurance', zh: '有保险' },
  'common.withoutInsurance': { en: 'Without Insurance', zh: '无保险' },
  'common.select': { en: 'Select...', zh: '请选择...' },
  'common.required': { en: 'Required', zh: '必填' },
  'common.optional': { en: 'Optional', zh: '选填' },

  // Waiver Checker
  'waiver.title': { en: 'Waiver Eligibility Checker', zh: '保险豁免资格检查' },
  'waiver.subtitle': { en: 'Check if your alternative plan qualifies to waive your university\'s SHIP.', zh: '检查你的替代保险是否符合豁免学校SHIP的条件。' },
  'waiver.selectUniversity': { en: 'Select your university', zh: '选择你的学校' },
  'waiver.otherUniversity': { en: 'Other / Not Listed', zh: '其他/未列出' },
  'waiver.planDetails': { en: 'Enter your plan details', zh: '输入你的保险详情' },
  'waiver.deductible': { en: 'Annual Deductible ($)', zh: '年度免赔额（$）' },
  'waiver.oopMax': { en: 'Out-of-Pocket Maximum ($)', zh: '自付上限（$）' },
  'waiver.networkRadius': { en: 'In-network providers within campus radius?', zh: '校园附近是否有网络内医疗机构？' },
  'waiver.mentalHealth': { en: 'Mental health coverage at parity?', zh: '是否包含与医疗同等的心理健康保障？' },
  'waiver.prescriptions': { en: 'Prescription drug coverage included?', zh: '是否包含处方药保障？' },
  'waiver.usInsurer': { en: 'U.S.-based insurer with U.S. claims office?', zh: '是否为美国本土保险公司（有美国理赔办公室）？' },
  'waiver.medevac': { en: 'Medical evacuation coverage ($50,000+)?', zh: '医疗撤离保障（$50,000+）？' },
  'waiver.repatriation': { en: 'Repatriation of remains ($25,000+)?', zh: '遗体运返保障（$25,000+）？' },
  'waiver.preexisting': { en: 'No pre-existing condition exclusions?', zh: '无既往病症排除条款？' },
  'waiver.coveragePeriod': { en: 'Coverage spans the full academic year?', zh: '保障覆盖整个学年？' },
  'waiver.preventive': { en: 'Preventive care covered at 100%?', zh: '预防保健全额报销？' },
  'waiver.noBenefitCaps': { en: 'No annual/lifetime benefit caps?', zh: '无年度/终身保障上限？' },
  'waiver.directPay': { en: 'Plan pays providers directly (not reimbursement)?', zh: '保险直接向医疗机构付款（非报销）？' },
  'waiver.yes': { en: 'Yes', zh: '是' },
  'waiver.no': { en: 'No', zh: '否' },
  'waiver.unsure': { en: 'Not Sure', zh: '不确定' },
  'waiver.result.eligible': { en: 'Likely Eligible to Waive', zh: '很可能符合豁免条件' },
  'waiver.result.maybe': { en: 'May Not Qualify', zh: '可能不符合条件' },
  'waiver.result.ineligible': { en: 'Does Not Meet Requirements', zh: '不符合要求' },
  'waiver.result.pass': { en: 'Meets requirement', zh: '符合要求' },
  'waiver.result.fail': { en: 'Does not meet requirement', zh: '不符合要求' },
  'waiver.result.warn': { en: 'Needs verification', zh: '需要确认' },
  'waiver.deadline': { en: 'Waiver Deadline', zh: '豁免截止日期' },
  'waiver.shipCost': { en: 'SHIP Annual Cost', zh: 'SHIP年费' },
  'waiver.waiverLink': { en: 'University Waiver Portal', zh: '学校豁免门户' },
  'waiver.travelWarning': { en: 'Travel insurance and home-country plans almost never qualify for a SHIP waiver.', zh: '旅行保险和国内保险几乎无法满足SHIP豁免条件。' },

  // J-1 Compliance
  'j1.title': { en: 'J-1 Coverage Compliance Checker', zh: 'J-1签证保险合规检查' },
  'j1.subtitle': { en: 'Check if your plan meets the U.S. Department of State requirements under 22 CFR 62.14.', zh: '检查你的保险是否符合美国国务院22 CFR 62.14的要求。' },
  'j1.medicalBenefits': { en: 'Medical benefits per illness/injury ($)', zh: '每次疾病/伤害的医疗保障（$）' },
  'j1.repatriation': { en: 'Repatriation of remains coverage ($)', zh: '遗体运返保障（$）' },
  'j1.evacuation': { en: 'Medical evacuation coverage ($)', zh: '医疗撤离保障（$）' },
  'j1.deductible': { en: 'Deductible per illness/injury ($)', zh: '每次疾病/伤害的免赔额（$）' },
  'j1.coinsurance': { en: 'Coinsurance (your share, %)', zh: '共保比例（你的份额，%）' },
  'j1.insurerRating': { en: 'Insurer financial rating', zh: '保险公司财务评级' },
  'j1.ratingAMinus': { en: 'A.M. Best A- or above (or equivalent)', zh: 'A.M. Best A-或以上（或同等评级）' },
  'j1.ratingBelow': { en: 'Below A- / Unknown', zh: '低于A- / 不确定' },
  'j1.ratingGovt': { en: 'Backed by home government', zh: '本国政府担保' },
  'j1.result.compliant': { en: 'Your plan meets all J-1 requirements', zh: '你的保险符合所有J-1签证要求' },
  'j1.result.nonCompliant': { en: 'Your plan does not meet J-1 requirements', zh: '你的保险不符合J-1签证要求' },
  'j1.result.partial': { en: 'Your plan has gaps in J-1 compliance', zh: '你的保险存在J-1合规缺口' },
  'j1.requirement.medical': { en: 'Medical benefits ≥ $100,000 per illness/injury', zh: '医疗保障 ≥ $100,000/次' },
  'j1.requirement.repatriation': { en: 'Repatriation of remains ≥ $25,000', zh: '遗体运返 ≥ $25,000' },
  'j1.requirement.evacuation': { en: 'Medical evacuation ≥ $50,000', zh: '医疗撤离 ≥ $50,000' },
  'j1.requirement.deductible': { en: 'Deductible ≤ $500 per illness/injury', zh: '免赔额 ≤ $500/次' },
  'j1.requirement.coinsurance': { en: 'Coinsurance ≤ 25%', zh: '共保比例 ≤ 25%' },
  'j1.requirement.rating': { en: 'Insurer rating A.M. Best A- or equivalent', zh: '保险公司评级A.M. Best A-或同等' },
  'j1.dependentNote': { en: 'J-2 dependents (spouse and children) must maintain identical coverage. Non-compliance for any dependent can result in termination of the J-1 holder\'s program.', zh: 'J-2家属（配偶和子女）必须维持相同的保险保障。任何家属不合规都可能导致J-1持有人的项目终止。' },
  'j1.willfulFailure': { en: 'Willful failure to maintain compliant insurance is a violation of J-1 status and may result in program termination.', zh: '故意不维持合规保险属于违反J-1身份，可能导致项目终止。' },
  'j1.source': { en: 'Source: 22 CFR 62.14', zh: '来源：22 CFR 62.14' },

  // Compare
  'compare.title': { en: 'Plan Comparison Tool', zh: '保险方案对比工具' },
  'compare.subtitle': { en: 'Compare up to 3 plans side by side across different usage scenarios.', zh: '在不同使用场景下最多对比3个保险方案。' },
  'compare.addPlan': { en: 'Add Plan', zh: '添加方案' },
  'compare.removePlan': { en: 'Remove', zh: '移除' },
  'compare.planName': { en: 'Plan Name', zh: '方案名称' },
  'compare.monthlyPremium': { en: 'Monthly Premium ($)', zh: '月保费（$）' },
  'compare.annualDeductible': { en: 'Annual Deductible ($)', zh: '年度免赔额（$）' },
  'compare.coinsurance': { en: 'Coinsurance (%)', zh: '共保比例（%）' },
  'compare.oopMax': { en: 'Out-of-Pocket Max ($)', zh: '自付上限（$）' },
  'compare.copayPCP': { en: 'PCP Copay ($)', zh: '初诊医生挂号费（$）' },
  'compare.copaySpecialist': { en: 'Specialist Copay ($)', zh: '专科医生挂号费（$）' },
  'compare.copayER': { en: 'ER Copay ($)', zh: '急诊挂号费（$）' },
  'compare.copayUrgent': { en: 'Urgent Care Copay ($)', zh: '紧急诊所挂号费（$）' },
  'compare.scenario.healthy': { en: 'Healthy Year', zh: '健康年份' },
  'compare.scenario.healthyDesc': { en: '1 PCP visit, 1 prescription', zh: '1次初诊, 1次处方' },
  'compare.scenario.moderate': { en: 'Moderate Use', zh: '中等使用' },
  'compare.scenario.moderateDesc': { en: '3 PCP, 1 specialist, 2 Rx, 1 urgent care', zh: '3次初诊, 1次专科, 2次处方, 1次紧急诊所' },
  'compare.scenario.major': { en: 'Major Event', zh: '重大事件' },
  'compare.scenario.majorDesc': { en: 'ER + hospitalization + surgery + follow-up', zh: '急诊 + 住院 + 手术 + 复诊' },
  'compare.totalAnnual': { en: 'Total Estimated Annual Cost', zh: '预计年度总费用' },
  'compare.bestValue': { en: 'Best Value', zh: '最优方案' },
  'compare.premiumTotal': { en: 'Annual Premium', zh: '年保费' },
  'compare.oopTotal': { en: 'Out-of-Pocket Costs', zh: '自付费用' },
  'compare.networkType': { en: 'Network Type', zh: '网络类型' },

  // Glossary
  'glossary.title': { en: 'Insurance Terminology Glossary', zh: '保险术语表' },
  'glossary.subtitle': { en: 'Plain-language definitions with worked examples and common misconceptions.', zh: '通俗易懂的定义，附带计算示例和常见误解。' },
  'glossary.example': { en: 'Worked Example', zh: '计算示例' },
  'glossary.misconception': { en: 'Common Misconception', zh: '常见误解' },
  'glossary.relatedTerms': { en: 'Related Terms', zh: '相关术语' },

  // Where to Go
  'wheretogo.title': { en: 'Where Should I Go?', zh: '去哪看病？' },
  'wheretogo.subtitle': { en: 'Select your situation and we\'ll recommend the right care level.', zh: '选择你的情况，我们会推荐合适的就医方式。' },
  'wheretogo.selectSituation': { en: 'What\'s going on?', zh: '你的情况是什么？' },
  'wheretogo.recommendation': { en: 'Recommended', zh: '推荐' },
  'wheretogo.why': { en: 'Why', zh: '原因' },
  'wheretogo.cost': { en: 'Estimated Cost', zh: '预计费用' },
  'wheretogo.whatToBring': { en: 'What to Bring', zh: '需要带什么' },
  'wheretogo.whenER': { en: 'When to Go to the ER Instead', zh: '什么情况应该去急诊' },
  'wheretogo.emergency911': { en: 'If you are experiencing a medical emergency, call 911 immediately.', zh: '如果你正在经历医疗紧急状况，请立即拨打911。' },
  'wheretogo.level.er': { en: 'Emergency Room', zh: '急诊室' },
  'wheretogo.level.urgent': { en: 'Urgent Care', zh: '紧急诊所' },
  'wheretogo.level.primary': { en: 'Primary Care / Campus Health', zh: '初诊医生/校医院' },
  'wheretogo.level.telehealth': { en: 'Telehealth', zh: '远程医疗' },
  'wheretogo.costComparison': { en: 'Cost Comparison by Care Level', zh: '不同就医方式费用对比' },

  // Cost Estimator
  'cost.title': { en: 'Cost Estimator', zh: '费用估算器' },
  'cost.subtitle': { en: 'Estimate your out-of-pocket costs for common medical scenarios.', zh: '估算常见医疗场景的自付费用。' },
  'cost.selectScenario': { en: 'Select a medical scenario', zh: '选择医疗场景' },
  'cost.planDetails': { en: 'Your plan details (or use defaults)', zh: '你的保险详情（或使用默认值）' },
  'cost.useDefaults': { en: 'Use typical SHIP defaults', zh: '使用典型SHIP默认值' },
  'cost.breakdown': { en: 'Cost Breakdown', zh: '费用明细' },
  'cost.billedAmount': { en: 'Billed Amount', zh: '账单金额' },
  'cost.insuranceAdjustment': { en: 'Insurance Adjustment', zh: '保险调整' },
  'cost.deductibleApplied': { en: 'Deductible Applied', zh: '免赔额' },
  'cost.coinsuranceApplied': { en: 'Coinsurance', zh: '共保金额' },
  'cost.yourResponsibility': { en: 'Your Responsibility', zh: '你需支付' },
  'cost.insurancePays': { en: 'Insurance Pays', zh: '保险支付' },
  'cost.withPlan': { en: 'With Your Plan', zh: '有保险' },
  'cost.withoutPlan': { en: 'Without Insurance', zh: '无保险' },
  'cost.basedOnTypical': { en: 'Based on typical costs. Actual costs vary by location and provider.', zh: '基于典型费用。实际费用因地区和医疗机构不同而有差异。' },

  // Mental Health
  'mh.title': { en: 'Mental Health Resources', zh: '心理健康资源' },
  'mh.subtitle': { en: 'Support, therapy options, and crisis resources for international students.', zh: '为留学生提供的心理支持、治疗选择和危机资源。' },
  'mh.crisis.title': { en: 'Crisis Resources — Available 24/7', zh: '危机资源——全天候可用' },
  'mh.crisis.subtitle': { en: 'If you or someone you know is in immediate danger, call 911.', zh: '如果你或你认识的人处于紧急危险中，请拨打911。' },
  'mh.category.campus': { en: 'Campus Counseling', zh: '校内咨询' },
  'mh.category.insurance': { en: 'Insurance-Covered Therapy', zh: '保险报销的治疗' },
  'mh.category.crisis': { en: 'Crisis Resources', zh: '危机资源' },
  'mh.category.online': { en: 'Online Platforms', zh: '在线平台' },
  'mh.category.free': { en: 'Free & Low-Cost Options', zh: '免费或低价选择' },
  'mh.howToFind': { en: 'How to Find a Therapist', zh: '如何找到治疗师' },
  'mh.culturalNote': { en: 'Finding Culturally Competent Care', zh: '寻找具有文化敏感性的治疗' },
  'mh.insuranceCoverage': { en: 'How Insurance Covers Mental Health', zh: '保险如何覆盖心理健康' },
  'mh.cost': { en: 'Cost', zh: '费用' },
  'mh.access': { en: 'How to Access', zh: '如何使用' },
  'mh.phone': { en: 'Phone', zh: '电话' },

  // Bill Explainer
  'bill.title': { en: 'I Got a Bill — Now What?', zh: '我收到了账单——怎么办？' },
  'bill.subtitle': { en: 'Enter numbers from your EOB or medical bill to see a plain-language breakdown.', zh: '输入你的理赔说明或医疗账单上的数字，查看通俗易懂的解读。' },
  'bill.billedAmount': { en: 'Billed Amount ($)', zh: '账单金额（$）' },
  'bill.allowedAmount': { en: 'Allowed Amount ($)', zh: '保险认可金额（$）' },
  'bill.insurancePaid': { en: 'Insurance Paid ($)', zh: '保险已支付（$）' },
  'bill.patientResponsibility': { en: 'Patient Responsibility ($)', zh: '患者自付金额（$）' },
  'bill.deductibleApplied': { en: 'Deductible Applied ($)', zh: '免赔额（$）' },
  'bill.copayApplied': { en: 'Copay ($)', zh: '挂号费（$）' },
  'bill.coinsuranceApplied': { en: 'Coinsurance ($)', zh: '共保金额（$）' },
  'bill.explain': { en: 'Explain My Bill', zh: '解读我的账单' },
  'bill.explanation': { en: 'Here\'s What Happened', zh: '这是怎么回事' },
  'bill.flowTitle': { en: 'How Your Bill Was Calculated', zh: '你的账单是如何计算的' },
  'bill.eobVsBill': { en: 'EOB vs. Medical Bill', zh: '理赔说明 vs. 医疗账单' },
  'bill.eobExplain': { en: 'An EOB (Explanation of Benefits) is NOT a bill. It\'s a statement from your insurance showing what they processed. Wait for the actual bill from your provider.', zh: '理赔说明（EOB）不是账单。它是保险公司发给你的处理结果说明。请等待医疗机构寄来的正式账单。' },
  'bill.isThisRight': { en: 'Is This Right? Common Billing Errors', zh: '账单正确吗？常见账单错误' },
  'bill.whatNext': { en: 'What to Do Next', zh: '下一步该做什么' },
  'bill.noSurprises': { en: 'Know Your Rights: No Surprises Act', zh: '了解你的权利：无意外账单法案' },
  'bill.noSurprisesExplain': { en: 'Since January 2022, you are protected from surprise bills for emergency care and out-of-network providers at in-network facilities. You pay only in-network rates.', zh: '自2022年1月起，你不会因急诊或网络内医院的非网络医生而收到意外账单。你只需支付网络内费率。' },

  // Errors
  'error.required': { en: 'This field is required', zh: '此项为必填' },
  'error.invalidNumber': { en: 'Please enter a valid number', zh: '请输入有效的数字' },
  'error.minValue': { en: 'Value must be at least', zh: '数值不能低于' },
  'error.maxValue': { en: 'Value must be at most', zh: '数值不能超过' },
};

export function t(key: string): string {
  const entry = strings[key];
  if (!entry) return key;
  return entry[currentLang];
}

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang): void {
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('baoyi_lang', lang);
}

export function toggleLang(): void {
  setLang(currentLang === 'en' ? 'zh' : 'en');
}

export function initLang(): void {
  const saved = localStorage.getItem('baoyi_lang') as Lang | null;
  if (saved && (saved === 'en' || saved === 'zh')) {
    setLang(saved);
  } else {
    const browserLang = navigator.language.toLowerCase();
    setLang(browserLang.startsWith('zh') ? 'zh' : 'en');
  }
}
