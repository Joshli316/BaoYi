export interface GlossaryTerm {
  id: string;
  term: string;
  termZh: string;
  definition: string;
  definitionZh: string;
  example: string;
  exampleZh: string;
  misconception: string;
  misconceptionZh: string;
  relatedTerms: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "deductible",
    term: "Deductible",
    termZh: "免赔额",
    definition:
      "The amount you pay out of your own pocket for covered health care services before your insurance plan starts to pay. Most plans reset the deductible every calendar year (January 1).",
    definitionZh:
      "在保险公司开始赔付之前，你需要自己支付的医疗费用金额。大多数计划每年1月1日重置免赔额。",
    example:
      "Your plan has a $1,500 annual deductible. You visit urgent care ($400) and get lab work ($600). You pay the full $1,000. Later, you break your wrist and the ER bill is $3,000. You pay the remaining $500 of your deductible, then coinsurance kicks in — you pay 20% of the remaining $2,500 = $500. Your total out-of-pocket for all three events: $2,000.",
    exampleZh:
      "你的计划年免赔额是$1,500。你去了急诊诊所（$400）并做了化验（$600），全部自付$1,000。之后你手腕骨折，急诊费$3,000。你先付完剩余的$500免赔额，然后共同保险生效——你支付剩余$2,500的20% = $500。三次就医总自付费用：$2,000。",
    misconception:
      "\“I paid my deductible, so everything is free now.\” — No. After meeting your deductible, you still pay copays or coinsurance on most services until you reach the out-of-pocket maximum.",
    misconceptionZh:
      "“我已经付完免赔额了，以后看病都免费了。“——不对。付完免赔额后，你仍然需要支付挂号费（copay）或共同保险（coinsurance），直到达到自付上限（out-of-pocket maximum）。",
    relatedTerms: ["coinsurance", "copay", "oop-max", "premium"],
  },
  {
    id: "copay",
    term: "Copay (Copayment)",
    termZh: "挂号费 / 定额自付",
    definition:
      "A fixed dollar amount you pay for a covered health care service at the time of the visit. Copays can vary by service type — for example, $30 for a primary care visit but $75 for a specialist.",
    definitionZh:
      "每次就医时你需要支付的固定金额。不同类型的服务挂号费不同——例如，看家庭医生$30，看专科医生$75。",
    example:
      "You see your primary care doctor for a sore throat. The office visit is billed at $250, but your plan has a $30 copay for primary care. You pay $30 at the front desk and leave. The insurance covers the remaining $220. No deductible math involved for this visit.",
    exampleZh:
      "你因喉咙痛去看家庭医生，诊费为$250，但你的计划规定家庭医生挂号费$30。你在前台付$30即可，保险公司承担剩余$220。这次就医不涉及免赔额计算。",
    misconception:
      "\“Copays count toward my deductible.\” — It depends on the plan. Many plans have copays that apply before the deductible is met, meaning those copay amounts do NOT reduce your deductible. Always check your Summary of Benefits.",
    misconceptionZh:
      "“挂号费会算进免赔额里。“——不一定。许多计划的挂号费独立于免赔额，也就是说你付的挂号费不会减少你的免赔额余额。一定要查看你的保险福利摘要（Summary of Benefits）。",
    relatedTerms: ["coinsurance", "deductible", "oop-max"],
  },
  {
    id: "coinsurance",
    term: "Coinsurance",
    termZh: "共同保险",
    definition:
      "The percentage of costs you pay for a covered health care service after you have met your deductible. For example, if your coinsurance is 20%, the insurance pays 80% and you pay 20%.",
    definitionZh:
      "在你满足免赔额之后，你需要按比例支付的医疗费用。例如，如果共同保险是20%，保险公司付80%，你付20%。",
    example:
      "You have a $1,000 deductible and 20% coinsurance. You need surgery costing $10,000. You pay the first $1,000 (deductible). For the remaining $9,000, you pay 20% = $1,800. The insurance pays $7,200. Your total: $2,800.",
    exampleZh:
      "你的免赔额是$1,000，共同保险比例20%。你需要做一个$10,000的手术。先付$1,000免赔额，剩余$9,000你付20% = $1,800，保险公司付$7,200。你的总费用：$2,800。",
    misconception:
      "\“Coinsurance and copay are the same thing.\” — No. A copay is a flat dollar amount ($30), while coinsurance is a percentage (20%). Coinsurance costs depend on the total bill, so a 20% coinsurance on a $50,000 hospital stay is $10,000.",
    misconceptionZh:
      "“共同保险和挂号费是一回事。“——不对。挂号费是固定金额（如$30），共同保险是百分比（如20%）。共同保险费用取决于总账单金额，所以$50,000住院费的20%就是$10,000。",
    relatedTerms: ["deductible", "copay", "oop-max"],
  },
  {
    id: "oop-max",
    term: "Out-of-Pocket Maximum",
    termZh: "自付上限",
    definition:
      "The most you have to pay for covered services in a plan year. After you reach this amount, the insurance plan pays 100% of covered services. For 2025, the ACA limit is $9,200 for individual plans and $18,400 for family plans.",
    definitionZh:
      "一个计划年度内你需要自付的最高金额。达到这个上限后，保险公司承担100%的保障服务费用。2025年ACA规定个人计划上限为$9,200，家庭计划为$18,400。",
    example:
      "Your plan has a $1,500 deductible, 20% coinsurance, and a $6,000 out-of-pocket maximum. You have a $40,000 hospital stay. You pay $1,500 (deductible) + 20% of $38,500 = $7,700. But wait — $1,500 + $4,500 = $6,000 hits your OOP max. So you actually pay $6,000 total, and insurance covers the remaining $34,000.",
    exampleZh:
      "你的计划免赔额$1,500，共同保险20%，自付上限$6,000。你住院花了$40,000。先付$1,500免赔额，再付剩余$38,500的20%。但当你自付总额达到$6,000时（$1,500 + $4,500），自付上限生效，保险公司承担剩余全部$34,000。",
    misconception:
      "\“The out-of-pocket max includes my monthly premium.\” — No. Your monthly premium payments do NOT count toward the out-of-pocket maximum. Only deductibles, copays, and coinsurance count.",
    misconceptionZh:
      "“自付上限包括每月保费。“——不对。每月保费不算在自付上限内。只有免赔额、挂号费和共同保险才计入自付上限。",
    relatedTerms: ["deductible", "copay", "coinsurance", "premium"],
  },
  {
    id: "premium",
    term: "Premium",
    termZh: "保费",
    definition:
      "The amount you pay each month to maintain your health insurance coverage, regardless of whether you use any medical services. For international students, SHIP premiums are typically billed per semester.",
    definitionZh:
      "为维持健康保险每月需支付的固定费用，无论是否使用医疗服务。国际学生的校园保险（SHIP）保费通常按学期收取。",
    example:
      "Your university SHIP plan costs $2,800 per year ($1,400 per semester), billed to your student account. Even if you never visit a doctor, you still pay this amount. If you use a private marketplace plan instead, you might pay $350/month = $4,200/year — but you must get a waiver from the school first.",
    exampleZh:
      "你的大学校园保险（SHIP）年费$2,800（每学期$1,400），直接加到学费账单上。即使你一次医生都没看，这笔费用仍然要付。如果你用私人市场保险，可能每月$350 = 每年$4,200——但必须先向学校申请豁免。",
    misconception:
      "\“A cheaper premium means I save money overall.\” — Not necessarily. Plans with low premiums often have higher deductibles and coinsurance. If you get sick or injured, a $200/month plan with a $5,000 deductible may cost you far more than a $400/month plan with a $500 deductible.",
    misconceptionZh:
      "“保费越低越省钱。“——不一定。低保费计划通常免赔额和共同保险更高。如果你生病或受伤，每月$200保费但$5,000免赔额的计划，实际花费可能远超每月$400保费但$500免赔额的计划。",
    relatedTerms: ["deductible", "oop-max", "ship"],
  },
  {
    id: "in-network",
    term: "In-Network",
    termZh: "网络内",
    definition:
      "Doctors, hospitals, and other health care providers that have a contract with your insurance plan to provide services at pre-negotiated, lower rates. Using in-network providers almost always costs you less.",
    definitionZh:
      "与你的保险公司签约的医生、医院和其他医疗机构，按预先协商的较低费率提供服务。使用网络内医疗机构几乎总是更便宜。",
    example:
      "You need an MRI. The hospital list price is $2,500. Your in-network hospital has a negotiated rate of $1,200. With 20% coinsurance (after deductible), you pay $240 in-network. If you go out-of-network, the plan may only cover 50% of the $2,500, leaving you with $1,250.",
    exampleZh:
      "你需要做MRI，医院标价$2,500。网络内医院的协商价是$1,200。在满足免赔额后按20%共同保险计算，你只需付$240。如果去网络外医院，保险可能只报销$2,500的50%，你需要付$1,250。",
    misconception:
      "\“Any doctor who accepts my insurance is in-network.\” — No. A doctor may accept your insurance type (e.g., Blue Cross) but not be in your specific plan's network. Always verify through your plan's online provider directory or call the insurer before scheduling.",
    misconceptionZh:
      "“接受我保险的医生就是网络内的。“——不对。医生可能接受你的保险品牌（如Blue Cross），但不在你的具体计划网络内。就医前一定要通过保险公司的在线医生目录或打电话确认。",
    relatedTerms: ["out-of-network", "balance-billing", "hmo-vs-ppo", "referral"],
  },
  {
    id: "out-of-network",
    term: "Out-of-Network",
    termZh: "网络外",
    definition:
      "Providers who do not have a contract with your insurance plan. You will typically pay significantly more — higher coinsurance, a separate (higher) deductible, or the plan may not cover the service at all.",
    definitionZh:
      "未与你的保险公司签约的医疗机构。你通常需要支付更多费用——更高的共同保险比例、单独（更高）的免赔额，或者保险根本不报销。",
    example:
      "Your plan covers in-network at 80/20 (you pay 20%) but out-of-network at 50/50 (you pay 50%). A specialist visit costs $500. In-network: you pay $100. Out-of-network: you pay $250, PLUS the doctor can balance-bill you for any amount above what the insurer considers \"reasonable and customary.\"",
    exampleZh:
      "你的计划网络内报销比例80/20（你付20%），网络外50/50（你付50%）。专科诊费$500。网络内：你付$100。网络外：你付$250，而且医生还可以就保险公司认为的“合理惯例费用”之外的差额向你收费（balance billing）。",
    misconception:
      "\“In an emergency, I have to go to an in-network ER.\” — No. Under the No Surprises Act (2022), emergency services must be covered at in-network rates even at out-of-network facilities. You cannot be balance-billed for emergency care.",
    misconceptionZh:
      "“急诊必须去网络内医院。“——不对。根据2022年《无意外账单法》（No Surprises Act），即使在网络外医院的急诊也必须按网络内费率报销，不能对你进行差额收费。",
    relatedTerms: ["in-network", "balance-billing", "hmo-vs-ppo"],
  },
  {
    id: "eob",
    term: "EOB (Explanation of Benefits)",
    termZh: "保险理赔说明",
    definition:
      "A statement from your insurance company after a claim is processed. It shows what was billed, what the plan paid, and what you owe. An EOB is NOT a bill — it is an explanation of how your claim was handled.",
    definitionZh:
      "保险公司处理理赔后发给你的说明文件。上面显示了账单金额、保险支付金额和你需要支付的金额。EOB不是账单——它是对理赔处理方式的说明。",
    example:
      "You visit a dermatologist. Billed: $350. Your EOB shows: Provider charged $350, plan's negotiated rate $220, plan paid $176 (80%), your responsibility $44 (20% coinsurance). The $130 difference ($350 - $220) is the provider write-off — you do NOT pay that.",
    exampleZh:
      "你去看皮肤科，账单$350。你的EOB显示：医生收费$350，计划协商价$220，保险付$176（80%），你需付$44（20%共同保险）。$130的差额（$350 - $220）是医生的折让，你不用付。",
    misconception:
      "\“I got an EOB, so I need to pay this amount right away.\” — No. Wait for the actual bill from the provider. Sometimes the EOB arrives before the provider sends your bill, and amounts can be adjusted. Compare the EOB with the bill before paying.",
    misconceptionZh:
      "“收到EOB就要马上付钱。“——不对。要等医疗机构发来的正式账单。有时EOB比账单先到，金额可能会调整。付款前一定要把EOB和账单对比核实。",
    relatedTerms: ["coinsurance", "in-network", "balance-billing"],
  },
  {
    id: "prior-authorization",
    term: "Prior Authorization",
    termZh: "事前授权",
    definition:
      "Approval from your insurance plan that you must get before receiving certain services (like MRIs, surgeries, or specialty medications). Without it, the plan may deny coverage entirely, even if the service is normally covered.",
    definitionZh:
      "在接受某些医疗服务（如MRI、手术或特殊药物）之前，必须获得保险公司的预先批准。没有事前授权，即使该服务通常在保障范围内，保险也可能完全拒绝报销。",
    example:
      "Your doctor recommends knee surgery ($25,000). Your plan requires prior authorization for all surgeries. Your doctor's office submits the request. The insurer reviews it in 5-15 business days and approves it. If you skip this step and just schedule the surgery, you could be stuck paying the full $25,000.",
    exampleZh:
      "医生建议你做膝盖手术（$25,000）。你的计划要求所有手术需事前授权。医生办公室提交申请，保险公司在5-15个工作日内审核并批准。如果你跳过这一步直接做手术，可能要自己承担全部$25,000。",
    misconception:
      "\“My doctor ordered it, so it's automatically covered.\” — No. Your doctor decides what's medically appropriate, but the insurance company decides what's covered. Many services require prior authorization, and getting it denied is common. Always ask if PA is required.",
    misconceptionZh:
      "“医生开了就自动报销。“——不对。医生决定什么是医学上合适的，但保险公司决定什么在保障范围内。许多服务需要事前授权，被拒绝很常见。一定要提前问清楚是否需要事前授权。",
    relatedTerms: ["formulary", "in-network", "referral"],
  },
  {
    id: "formulary",
    term: "Formulary",
    termZh: "药品目录",
    definition:
      "A list of prescription drugs covered by your insurance plan, organized into tiers. Lower-tier drugs (generics) have lower copays; higher-tier drugs (brand-name, specialty) cost more. Drugs not on the formulary may not be covered at all.",
    definitionZh:
      "保险计划覆盖的处方药清单，按等级分类。低等级药物（仿制药）挂号费较低；高等级药物（品牌药、特殊药）费用更高。不在目录上的药物可能完全不报销。",
    example:
      "You need allergy medication. Tier 1 (generic cetirizine): $10 copay. Tier 2 (brand-name Zyrtec): $35 copay. Tier 3 (specialty allergy biologic like Dupixent): $150 copay + prior authorization. A non-formulary drug might cost you the full retail price — possibly $500+/month.",
    exampleZh:
      "你需要过敏药。第1级（仿制药西替利嗪）：$10挂号费。第2级（品牌药Zyrtec）：$35挂号费。第3级（特殊过敏生物制剂如Dupixent）：$150挂号费+需要事前授权。不在目录上的药可能要付全价——可能每月$500以上。",
    misconception:
      "\“If a drug is FDA-approved, my insurance covers it.\” — No. Insurance companies maintain their own formulary lists. An FDA-approved drug can be excluded from your plan's formulary. You can request a formulary exception, but it requires medical justification from your doctor.",
    misconceptionZh:
      "“FDA批准的药保险都报销。“——不对。保险公司有自己的药品目录。FDA批准的药可能不在你的计划目录上。你可以申请目录例外，但需要医生提供医学依据。",
    relatedTerms: ["prior-authorization", "copay", "premium"],
  },
  {
    id: "referral",
    term: "Referral",
    termZh: "转诊",
    definition:
      "A written order from your primary care physician (PCP) that allows you to see a specialist. HMO plans almost always require referrals; PPO plans usually do not. Without a required referral, the specialist visit may not be covered.",
    definitionZh:
      "家庭医生（PCP）开具的书面指令，允许你去看专科医生。HMO计划几乎都要求转诊；PPO计划通常不要求。如果需要转诊但没有，专科就诊可能不报销。",
    example:
      "You have an HMO plan. Your knee hurts and you want to see an orthopedist. Step 1: Visit your PCP ($30 copay). Step 2: PCP writes a referral to an in-network orthopedist. Step 3: See the orthopedist ($50 specialist copay). If you skip Step 1 and go directly to the orthopedist, your HMO may deny the entire claim.",
    exampleZh:
      "你的HMO计划。你膝盖疼想看骨科。第一步：看家庭医生（$30挂号费）。第二步：家庭医生写转诊单给网络内骨科。第三步：看骨科（$50专科挂号费）。如果跳过第一步直接看骨科，HMO可能拒绝整个理赔。",
    misconception:
      "\“I can just call a specialist and book an appointment.\” — With an HMO, no. You must go through your PCP first. Even with a PPO, checking whether your plan requires a referral for specific specialists can save you hundreds of dollars.",
    misconceptionZh:
      "“我可以直接打电话预约专科。“——如果是HMO计划，不行。你必须先看家庭医生。即使是PPO计划，提前确认是否需要转诊也能省下几百美元。",
    relatedTerms: ["in-network", "hmo-vs-ppo", "prior-authorization"],
  },
  {
    id: "balance-billing",
    term: "Balance Billing (Surprise Billing)",
    termZh: "差额收费（意外账单）",
    definition:
      "When an out-of-network provider bills you for the difference between their charge and what your insurance considers a reasonable amount. The No Surprises Act (2022) protects you from balance billing in emergency situations and certain other scenarios.",
    definitionZh:
      "当网络外医疗机构就其收费与保险公司认为合理金额之间的差额向你收费。2022年的《无意外账单法》在急诊和某些特定情况下保护你免受差额收费。",
    example:
      "You have surgery at an in-network hospital, but the anesthesiologist is out-of-network (you didn't choose them). The anesthesiologist charges $4,000. Your insurer says the reasonable rate is $2,500 and pays $2,000 (80%). Before the No Surprises Act, you could be billed the $2,000 balance ($4,000 - $2,000). Now, you only owe the in-network cost-sharing amount (your 20% of $2,500 = $500).",
    exampleZh:
      "你在网络内医院做手术，但麻醉师是网络外的（不是你选的）。麻醉师收费$4,000，保险公司认为合理费率是$2,500并支付$2,000（80%）。在《无意外账单法》之前，你可能被收$2,000差额。现在，你只需按网络内标准支付$2,500的20% = $500。",
    misconception:
      "\“I went to an in-network hospital, so every doctor there is in-network.\” — No. Individual doctors within an in-network hospital (anesthesiologists, radiologists, pathologists) can be out-of-network. The No Surprises Act helps, but always ask beforehand when possible.",
    misconceptionZh:
      "“我去了网络内医院，里面的医生都是网络内的。“——不对。网络内医院里的个别医生（麻醉师、放射科医生、病理科医生）可能是网络外的。《无意外账单法》提供了保护，但尽量提前询问。",
    relatedTerms: ["out-of-network", "in-network", "eob"],
  },
  {
    id: "coordination-of-benefits",
    term: "Coordination of Benefits (COB)",
    termZh: "保险协调 / 福利协调",
    definition:
      "Rules that determine which insurance plan pays first when you are covered by two or more health plans. The primary plan pays first, then the secondary plan may cover some or all of the remaining costs.",
    definitionZh:
      "当你同时有两份或以上健康保险时，决定哪个计划先赔付的规则。主保险先赔付，副保险可能承担部分或全部剩余费用。",
    example:
      "You have university SHIP as your primary plan and your spouse's employer plan as secondary. You have a $2,000 medical bill. SHIP (primary) pays $1,600 (80%). Your spouse's plan (secondary) reviews the remaining $400 and covers $320 (80% of the remainder). You pay $80. Without COB, you would have paid $400.",
    exampleZh:
      "你的大学校园保险（SHIP）是主保险，配偶的雇主保险是副保险。你有$2,000的医疗费。SHIP（主）先付$1,600（80%）。配偶的保险（副）审核剩余$400并支付$320（剩余部分的80%）。你付$80。没有福利协调的话，你要付$400。",
    misconception:
      "\“Having two insurance plans means everything is free.\” — No. The combined payment from both plans will never exceed the total bill. And managing two plans means more paperwork, potential delays, and coordination headaches.",
    misconceptionZh:
      "“有两份保险就什么都免费了。“——不对。两份保险的赔付总额不会超过账单总额。而且管理两份保险意味着更多的文书工作、可能的延误和协调麻烦。",
    relatedTerms: ["ship", "premium", "eob"],
  },
  {
    id: "ship",
    term: "SHIP (Student Health Insurance Plan)",
    termZh: "校园学生健康保险",
    definition:
      "A health insurance plan offered by colleges and universities, specifically designed for students. Most U.S. universities require international students to enroll in SHIP unless they can prove they have comparable coverage and obtain a waiver.",
    definitionZh:
      "大学为学生提供的健康保险计划。大多数美国大学要求国际学生参加SHIP，除非能证明有同等保障的其他保险并获得豁免。",
    example:
      "Your university's SHIP costs $1,400/semester. It includes: $500 deductible, $30 PCP copay, $50 specialist copay, 20% coinsurance, $6,500 OOP max, and covers mental health, prescriptions, and preventive care. The premium is automatically added to your tuition bill. To waive it, you must submit proof of comparable coverage by the deadline (usually 2-3 weeks after classes start).",
    exampleZh:
      "你学校的SHIP每学期$1,400，包括：$500免赔额、$30家庭医生挂号费、$50专科挂号费、20%共同保险、$6,500自付上限，覆盖心理健康、处方药和预防保健。保费自动加到学费账单上。要豁免的话，必须在截止日期前（通常开学后2-3周）提交同等保障的证明。",
    misconception:
      "\“SHIP is a rip-off — I can just buy cheaper insurance online.\” — Be careful. Many cheap plans marketed to international students are limited-benefit plans that don't meet university waiver requirements. They may have low annual caps ($50,000-$100,000), exclude pre-existing conditions, or not cover mental health. Always verify the waiver criteria first.",
    misconceptionZh:
      "“校园保险太贵了，网上买便宜的就行。“——要小心。很多面向国际学生的廉价保险是有限保障计划，不满足学校豁免要求。它们可能有低年度赔付上限（$50,000-$100,000）、排除既往症，或不覆盖心理健康。一定要先确认学校的豁免标准。",
    relatedTerms: ["premium", "deductible", "hmo-vs-ppo", "coordination-of-benefits"],
  },
  {
    id: "hmo-vs-ppo",
    term: "HMO vs PPO",
    termZh: "HMO与PPO对比",
    definition:
      "Two common plan types. HMO (Health Maintenance Organization): lower premiums, requires a primary care physician, needs referrals for specialists, and generally only covers in-network care. PPO (Preferred Provider Organization): higher premiums, no referral needed, covers out-of-network care (at higher cost), and offers more flexibility.",
    definitionZh:
      "两种常见保险类型。HMO（健康维护组织）：保费较低，需指定家庭医生，看专科需转诊，通常只覆盖网络内。PPO（优选医疗机构组织）：保费较高，不需转诊，覆盖网络外（费用更高），更灵活。",
    example:
      "HMO plan: $250/month premium, $30 PCP copay, $0 out-of-network coverage. You must pick a PCP, and that PCP must refer you to any specialist. PPO plan: $400/month premium, $30 PCP copay, $50 specialist copay, out-of-network coverage at 50%. You can see any specialist without a referral. Over a year with no health issues: HMO saves you $1,800 in premiums. But if you need a specific out-of-network specialist, PPO gives you access.",
    exampleZh:
      "HMO计划：月保费$250、$30家庭医生挂号费、网络外不覆盖。必须选定家庭医生，由家庭医生转诊才能看专科。PPO计划：月保费$400、$30家庭医生挂号费、$50专科挂号费、网络外按50%报销。无需转诊可直接看任何专科。一年没生病的话，HMO省$1,800保费。但如果需要特定的网络外专科医生，PPO能让你就医。",
    misconception:
      "\“PPO is always better because it has more flexibility.\” — Not necessarily. If you rarely see specialists and are healthy, an HMO can save you $1,500-$2,000/year in premiums. Most university SHIP plans are PPO-style, which is convenient for students who are new to the U.S. health system.",
    misconceptionZh:
      "“PPO总是更好因为更灵活。“——不一定。如果你很少看专科且身体健康，HMO每年能省$1,500-$2,000保费。大多数大学SHIP是PPO式的，对刚来美国不熟悉医疗系统的学生更方便。",
    relatedTerms: ["in-network", "out-of-network", "referral", "premium", "ship"],
  },
  {
    id: "preventive-care",
    term: "Preventive Care",
    termZh: "预防保健",
    definition:
      "Health services aimed at preventing illness rather than treating it — such as annual physicals, vaccinations, and screenings. Under the ACA, most preventive services must be covered at 100% with no cost-sharing when you use an in-network provider, even if you haven't met your deductible.",
    definitionZh:
      "旨在预防疾病而非治疗的医疗服务——如年度体检、疫苗接种和筛查。根据ACA（平价医疗法案），大多数预防服务在使用网络内医疗机构时必须100%报销，无需自付，即使你还没满足免赔额。",
    example:
      "You haven't met your $1,500 deductible, but you go for an annual physical with your in-network PCP. Cost: $0. You also get a flu shot: $0. Blood pressure screening: $0. But if during the visit, your doctor orders extra lab work to investigate a symptom (diagnostic, not preventive), those labs WILL apply to your deductible — say $200.",
    exampleZh:
      "你还没满足$1,500免赔额，但去网络内家庭医生做年度体检。费用：$0。打流感疫苗：$0。血压筛查：$0。但如果体检时医生因某个症状额外开了化验（属于诊断性而非预防性），这些化验会算入免赔额——比如$200。",
    misconception:
      "\“My annual physical is free, so any tests my doctor orders during it are also free.\” — No. Only the preventive screening itself is free. If your doctor orders additional diagnostic tests based on symptoms or findings during the visit, those are billed separately and subject to your deductible and cost-sharing.",
    misconceptionZh:
      "“年度体检免费，所以体检时医生开的所有检查都免费。“——不对。只有预防性筛查本身免费。如果医生在体检中因症状或发现额外开了诊断性检查，这些会单独计费，适用免赔额和自付费用。",
    relatedTerms: ["deductible", "in-network", "copay", "ship"],
  },
  {
    id: "claim",
    term: "Claim",
    termZh: "理赔",
    definition:
      "A request submitted to your insurance company to pay for medical services you received. In most cases, the provider submits the claim directly. You may need to submit claims yourself if you see an out-of-network provider or receive care abroad.",
    definitionZh:
      "向保险公司提交的支付医疗服务费用的申请。大多数情况下，医疗机构直接提交理赔。如果你看了网络外的医生或在国外就医，可能需要自己提交理赔。",
    example:
      "You visit an in-network doctor: the office files the claim automatically. You receive an EOB in 2-4 weeks, then a bill for your share. But if you see a doctor in China during summer break, you pay $300 upfront, get an itemized receipt, and submit a claim form to your insurance when you return. Reimbursement may take 30-60 days and might only cover 70% ($210).",
    exampleZh:
      "你去网络内医生看病：诊所自动提交理赔。2-4周后你收到EOB，然后收到你应付部分的账单。但如果你暑假在中国看了医生，先自付$300，拿到详细收据，回来后向保险公司提交理赔表。报销可能需要30-60天，可能只报销70%（$210）。",
    misconception:
      "\“If the claim is denied, there's nothing I can do.\” — Wrong. You have the right to appeal every denial. First, call the insurer to understand why. Common reasons: missing prior authorization, coding errors, or out-of-network status. Many denials are overturned on appeal.",
    misconceptionZh:
      "“理赔被拒就没办法了。“——不对。你有权对每次拒赔提出申诉。先打电话问清拒赔原因，常见原因包括：缺少事前授权、编码错误或网络外状态。很多拒赔在申诉后被推翻。",
    relatedTerms: ["eob", "prior-authorization", "out-of-network"],
  },
  {
    id: "grace-period",
    term: "Grace Period",
    termZh: "宽限期",
    definition:
      "A set period after your premium payment is due during which you can make the payment without losing coverage. For ACA marketplace plans, the grace period is 90 days if you received a premium subsidy, or 30 days otherwise. University SHIP plans typically follow the school's payment deadlines.",
    definitionZh:
      "保费到期后的一段时间内你仍可付款而不会失去保障。ACA市场保险如果你有保费补贴，宽限期为90天，否则为30天。大学SHIP通常按学校的付款截止日期执行。",
    example:
      "Your marketplace plan premium of $350 is due on January 1. You forget to pay. You have until January 31 (30-day grace period) to pay without losing coverage. If you still don't pay, your coverage is terminated retroactively to January 1, and you are responsible for any medical bills incurred during that month.",
    exampleZh:
      "你的市场保险月保费$350，1月1日到期。你忘了付。你有到1月31日（30天宽限期）的时间补缴而不失去保障。如果还不付，保险从1月1日起追溯取消，你要自己承担这个月的所有医疗费。",
    misconception:
      "\“I can just pay my premium late every month and still keep coverage.\” — The grace period is a safety net, not a strategy. Repeated late payments can result in termination, and during the grace period, insurers may hold or deny claims until payment is received.",
    misconceptionZh:
      "“每个月保费迟交也没关系。“——宽限期是安全网，不是策略。反复迟交可能导致保险终止，而且在宽限期内，保险公司可能暂停或拒绝理赔，直到收到付款。",
    relatedTerms: ["premium", "ship", "claim"],
  },
];
