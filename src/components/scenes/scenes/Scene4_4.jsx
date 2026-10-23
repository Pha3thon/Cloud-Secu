import React from 'react';

export default function Scene4_4({ currentStep: _currentStep }) {
  return (
    <g>
      {/* Tier 1: Web */}
      <rect x="50" y="40" width="100" height="90" rx="8" fill="#e0f2fe" stroke="var(--brand-primary, #0284c7)" strokeWidth="2" />
      <text x="100" y="60" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="800">qm-web-sg</text>
      <text x="100" y="75" textAnchor="middle" fill="#0f172a" fontSize="8">Ports: 22, 80, 443</text>
      <text x="100" y="90" textAnchor="middle" fill="#64748b" fontSize="7.5">Remote: 0.0.0.0/0</text>

      {/* Inter-tier arrow */}
      <path d="M 150 85 L 200 85" stroke="#10b981" strokeWidth="3" />
      <polygon points="205,85 197,81 197,89" fill="#10b981" />

      {/* Tier 2: DB */}
      <rect x="205" y="40" width="100" height="90" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="255" y="60" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="800">qm-db-sg</text>
      <text x="255" y="75" textAnchor="middle" fill="#0f172a" fontSize="8">Port: 3306, 22</text>
      <text x="255" y="90" textAnchor="middle" fill="#b45309" fontSize="7.5">Remote: qm-web-sg</text>

      {/* World traffic blocked at DB */}
      <path d="M 330 85 L 305 85" stroke="#ef4444" strokeWidth="2.5" />
      <text x="320" y="75" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="800">✕</text>
    </g>
  );
}
