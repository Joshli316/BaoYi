import { refreshIcons } from '../utils/ui';
import { t, getLang } from '../i18n';
import { formatMoney } from '../utils/calculator';

let container: HTMLElement;

interface BillData {
  billedAmount: number;
  allowedAmount: number;
  insurancePaid: number;
  patientResponsibility: number;
  deductibleApplied: number;
  copayApplied: number;
  coinsuranceApplied: number;
}

export function render(el: HTMLElement): void {
  container = el;
  renderUI();
}

export function cleanup(): void {}

function renderUI(): void {
  const lang = getLang();
  container.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'fade-in';
  wrapper.style.maxWidth = '720px';
  wrapper.style.margin = '0 auto';

  wrapper.innerHTML = `
    <h1 style="margin-bottom:8px;">${t('bill.title')}</h1>
    <p style="margin-bottom:32px;color:var(--text-body);">${t('bill.subtitle')}</p>

    <!-- Input Form -->
    <div class="card" style="padding:24px;margin-bottom:32px;">
      <div style="display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));">
        ${renderField('billedAmount', t('bill.billedAmount'))}
        ${renderField('allowedAmount', t('bill.allowedAmount'))}
        ${renderField('insurancePaid', t('bill.insurancePaid'))}
        ${renderField('patientResponsibility', t('bill.patientResponsibility'))}
        ${renderField('deductibleApplied', t('bill.deductibleApplied'))}
        ${renderField('copayApplied', t('bill.copayApplied'))}
        ${renderField('coinsuranceApplied', t('bill.coinsuranceApplied'))}
      </div>
      <button class="btn-primary" id="explain-btn" style="margin-top:24px;">${t('bill.explain')}</button>
    </div>

    <!-- Results (hidden initially) -->
    <div id="bill-results" style="display:none;"></div>

    <!-- EOB vs Bill -->
    <section style="margin-bottom:32px;">
      <h2 style="margin-bottom:12px;">${t('bill.eobVsBill')}</h2>
      <div class="worked-example">
        <p>${t('bill.eobExplain')}</p>
      </div>
    </section>

    <!-- Common Billing Errors -->
    <section style="margin-bottom:32px;">
      <h2 style="margin-bottom:16px;">${t('bill.isThisRight')}</h2>
      <div style="display:grid;gap:8px;">
        ${getBillingErrors(lang).map(err => `
          <div style="display:flex;align-items:flex-start;gap:10px;padding:12px 16px;background:var(--bg-card);border:1px solid var(--border-color);">
            <i data-lucide="x-circle" style="width:18px;height:18px;color:var(--red-600);flex-shrink:0;margin-top:2px;"></i>
            <span style="font-size:0.9375rem;color:var(--text-body);">${err}</span>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- What to Do Next -->
    <section style="margin-bottom:32px;">
      <h2 style="margin-bottom:16px;">${t('bill.whatNext')}</h2>
      <div style="display:grid;gap:12px;">
        ${getNextSteps(lang).map((step, i) => `
          <div style="display:flex;align-items:flex-start;gap:12px;">
            <div class="stepper-step active" style="flex-shrink:0;width:28px;height:28px;font-size:0.8125rem;">${i + 1}</div>
            <p style="font-size:0.9375rem;color:var(--text-body);padding-top:4px;">${step}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- No Surprises Act -->
    <section style="margin-bottom:32px;">
      <h2 style="margin-bottom:12px;display:flex;align-items:center;gap:8px;">
        <i data-lucide="shield-check" style="width:22px;height:22px;color:var(--emerald-600);"></i>
        ${t('bill.noSurprises')}
      </h2>
      <div class="result-panel-pass">
        <p>${t('bill.noSurprisesExplain')}</p>
      </div>
    </section>

    <p style="font-size:0.8125rem;color:var(--text-muted);">
      <i data-lucide="shield-alert" style="width:14px;height:14px;display:inline;vertical-align:middle;"></i>
      ${t('disclaimer')}
    </p>
  `;

  container.appendChild(wrapper);

  // Explain button
  wrapper.querySelector('#explain-btn')?.addEventListener('click', () => {
    const data = getFormData(wrapper);
    const resultsDiv = wrapper.querySelector('#bill-results') as HTMLElement;
    renderExplanation(resultsDiv, data, lang);
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  refreshIcons();
}

function renderField(id: string, label: string): string {
  return `
    <div>
      <label style="display:block;font-size:0.8125rem;color:var(--text-muted);margin-bottom:4px;">${label}</label>
      <input type="number" class="input-field bill-input" data-field="${id}" placeholder="0" min="0" step="0.01">
    </div>
  `;
}

function getFormData(wrapper: HTMLElement): BillData {
  const data: any = {};
  wrapper.querySelectorAll('.bill-input').forEach(input => {
    const field = (input as HTMLElement).dataset.field!;
    data[field] = parseFloat((input as HTMLInputElement).value) || 0;
  });
  return data as BillData;
}

function renderExplanation(el: HTMLElement, data: BillData, lang: string): void {
  const writeOff = Math.max(0, data.billedAmount - data.allowedAmount);

  const explanation = lang === 'zh'
    ? `医疗机构向保险公司收费 <span class="font-mono">${formatMoney(data.billedAmount)}</span>。你的保险公司将费用协商降至 <span class="font-mono">${formatMoney(data.allowedAmount)}</span>（节省了 <span class="font-mono">${formatMoney(writeOff)}</span>）。保险公司支付了 <span class="font-mono">${formatMoney(data.insurancePaid)}</span>。扣除免赔额 <span class="font-mono">${formatMoney(data.deductibleApplied)}</span>、挂号费 <span class="font-mono">${formatMoney(data.copayApplied)}</span> 和共保 <span class="font-mono">${formatMoney(data.coinsuranceApplied)}</span> 后，你需要支付 <span class="font-mono">${formatMoney(data.patientResponsibility)}</span>。`
    : `The provider charged <span class="font-mono">${formatMoney(data.billedAmount)}</span>. Your insurance negotiated it down to <span class="font-mono">${formatMoney(data.allowedAmount)}</span> (saving you <span class="font-mono">${formatMoney(writeOff)}</span>). Insurance paid <span class="font-mono">${formatMoney(data.insurancePaid)}</span>. After your deductible (<span class="font-mono">${formatMoney(data.deductibleApplied)}</span>), copay (<span class="font-mono">${formatMoney(data.copayApplied)}</span>), and coinsurance (<span class="font-mono">${formatMoney(data.coinsuranceApplied)}</span>), you owe <span class="font-mono">${formatMoney(data.patientResponsibility)}</span>.`;

  el.innerHTML = `
    <div class="result-panel-pass" style="margin-bottom:24px;">
      <h3 style="margin-bottom:12px;display:flex;align-items:center;gap:8px;">
        <i data-lucide="message-circle" style="width:20px;height:20px;color:var(--emerald-600);"></i>
        ${t('bill.explanation')}
      </h3>
      <p style="font-size:1.0625rem;line-height:1.7;">${explanation}</p>
    </div>

    <h3 style="margin-bottom:12px;">${t('bill.flowTitle')}</h3>
    <div class="worked-example" style="margin-bottom:32px;">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;justify-content:center;">
        <div style="text-align:center;padding:12px 16px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:6px;">
          <div style="font-size:0.75rem;color:var(--text-muted);">${t('bill.flow.billed')}</div>
          <div class="font-mono" style="font-size:1.125rem;color:var(--text-heading);">${formatMoney(data.billedAmount)}</div>
        </div>
        <i data-lucide="arrow-right" class="flow-arrow" style="width:20px;height:20px;"></i>
        <div style="text-align:center;padding:12px 16px;background:var(--bg-card);border:1px solid var(--border-color);border-radius:6px;">
          <div style="font-size:0.75rem;color:var(--text-muted);">${t('bill.flow.allowed')}</div>
          <div class="font-mono" style="font-size:1.125rem;color:var(--text-heading);">${formatMoney(data.allowedAmount)}</div>
        </div>
        <i data-lucide="arrow-right" class="flow-arrow" style="width:20px;height:20px;"></i>
        <div style="text-align:center;padding:12px 16px;background:var(--emerald-50);border:1px solid var(--emerald-500);border-radius:6px;">
          <div style="font-size:0.75rem;color:var(--emerald-700);">${t('bill.flow.insurancePays')}</div>
          <div class="font-mono" style="font-size:1.125rem;color:var(--emerald-700);">${formatMoney(data.insurancePaid)}</div>
        </div>
        <i data-lucide="arrow-right" class="flow-arrow" style="width:20px;height:20px;"></i>
        <div style="text-align:center;padding:12px 16px;background:var(--red-100);border:1px solid var(--red-500);border-radius:6px;">
          <div style="font-size:0.75rem;color:var(--red-700);">${t('bill.flow.youPay')}</div>
          <div class="font-mono" style="font-size:1.125rem;color:var(--red-700);">${formatMoney(data.patientResponsibility)}</div>
        </div>
      </div>
    </div>
  `;

  refreshIcons();
}

function getBillingErrors(lang: string): string[] {
  return lang === 'zh' ? [
    '重复收费 — 同一日期同一项目被收了两次',
    '分拆收费 — 本应合并的项目被拆成多个高价代码',
    '升级编码 — 使用了比实际更贵的服务代码',
    '患者信息错误 — 姓名、生日或保险号不正确导致拒赔',
    '未接受的服务 — 被收费的检查或药物你并没有接受',
    '网络内医生违规额外收费 — 网络内医生不应向你收取超出自付部分的费用',
  ] : [
    'Duplicate charges — same service billed twice on the same date',
    'Unbundling — services that should be one code split into multiple higher-cost codes',
    'Upcoding — a more expensive service code used than what was actually performed',
    'Wrong patient info — incorrect name, DOB, or insurance ID caused a claim denial',
    'Services not received — charges for tests or medications you did not actually receive',
    'Balance billing by in-network providers — in-network providers cannot bill beyond your cost-sharing',
  ];
}

function getNextSteps(lang: string): string[] {
  return lang === 'zh' ? [
    '比较你的账单和理赔说明（EOB）——"患者自付"金额应该一致',
    '要求详细的逐项账单（含CPT代码），检查是否有错误',
    '如果有疑问，打电话给保险公司（保险卡背面的号码）',
    '如果金额较大，联系医院账单部门申请分期付款计划',
    '向非营利医院申请经济援助——根据收入可能获得50-100%的减免',
    '如果理赔被拒，你有权进行内部申诉和外部独立审查',
  ] : [
    'Compare your bill to your EOB — the "patient responsibility" amounts should match',
    'Request an itemized bill with CPT codes and check for errors',
    'Call your insurance company (number on the back of your card) with questions',
    'For large bills, contact the billing department to set up a payment plan',
    'Apply for financial assistance at nonprofit hospitals — you may qualify for 50-100% reduction based on income',
    'If a claim is denied, you have the right to an internal appeal and external independent review',
  ];
}
