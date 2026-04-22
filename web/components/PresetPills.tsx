'use client';

import { SCENARIOS, type Scenario } from '@/lib/scenarios';

export function PresetPills({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (s: Scenario) => void;
}) {
  return (
    <div className="presets" role="tablist" aria-label="Demo scenarios">
      {SCENARIOS.map((s) => (
        <button
          key={s.id}
          role="tab"
          aria-selected={activeId === s.id}
          className={`preset${activeId === s.id ? ' active' : ''}`}
          onClick={() => onSelect(s)}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
