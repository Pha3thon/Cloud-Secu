import React from 'react';

export default function Scene1_5({ currentStep }) {
  const quotas = [
    { label: 'Instances', used: 2, max: 10, pct: 20 },
    { label: 'VCPUs', used: 3, max: 20, pct: 15 },
    { label: 'RAM (GB)', used: 6, max: 50, pct: 12 },
    { label: 'Floating IPs', used: currentStep >= 2 ? 3 : 1, max: 3, pct: currentStep >= 2 ? 100 : 33 }
  ];

  return (
    <g transform="translate(40, 30)">
      <text x="0" y="10" fill="#0f172a" fontSize="12" fontWeight="800">Limit Summary (quickmart)</text>
      {quotas.map((q) => (
        <g key={q.label} transform={`translate(0, ${28 + quotas.indexOf(q) * 30})`}>
          <text x="0" y="10" fill="#334155" fontSize="9" fontWeight="600">{q.label}</text>
          <text x="230" y="10" textAnchor="end" fill="#64748b" fontSize="8.5">{q.used} of {q.max} Used</text>
          {/* Bar track */}
          <rect x="0" y="14" width="230" height="8" rx="4" fill="#e2e8f0" />
          {/* Bar fill */}
          <rect
            x="0"
            y="14"
            width={(230 * q.pct) / 100}
            height="8"
            rx="4"
            fill={q.pct >= 100 ? '#ef4444' : 'var(--brand-primary, #0284c7)'}
            style={{ transition: 'all 500ms' }}
          />
        </g>
      ))}
      {currentStep >= 2 && (
        <g transform="translate(150, 120)">
          <rect width="90" height="20" rx="4" fill="#fee2e2" stroke="#ef4444" />
          <text x="45" y="13" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="700">Limit Reached!</text>
        </g>
      )}
    </g>
  );
}
