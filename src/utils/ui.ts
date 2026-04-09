declare const lucide: { createIcons: (opts?: Record<string, unknown>) => void } | undefined;

export function refreshIcons(): void {
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

export function renderStepper(current: number, total: number): HTMLElement {
  const stepper = document.createElement('div');
  stepper.className = 'stepper';
  for (let i = 1; i <= total; i++) {
    const step = document.createElement('div');
    step.className = `stepper-step ${i < current ? 'completed' : i === current ? 'active' : 'upcoming'}`;
    step.textContent = i < current ? '✓' : String(i);
    stepper.appendChild(step);
    if (i < total) {
      const line = document.createElement('div');
      line.className = `stepper-line ${i < current ? 'completed' : ''}`;
      stepper.appendChild(line);
    }
  }
  return stepper;
}
