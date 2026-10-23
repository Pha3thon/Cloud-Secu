import React from 'react';

export default function Scene7_1({ currentStep: _currentStep }) {
  return (
    <g transform="translate(40, 30)">
      <text x="0" y="10" fill="#0f172a" fontSize="12" fontWeight="800">Keystone Role Hierarchy</text>
      {/* Ladder Steps */}
      <g transform="translate(20, 25)">
        {/* Step 1: Reader */}
        <rect x="0" y="70" width="70" height="25" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="35" y="86" textAnchor="middle" fill="#334155" fontSize="8.5" fontWeight="700">reader (View)</text>

        {/* Step 2: Member */}
        <rect x="80" y="40" width="75" height="55" rx="4" fill="#e0f2fe" stroke="var(--brand-primary, #0284c7)" strokeWidth="2" />
        <text x="117" y="56" textAnchor="middle" fill="#0369a1" fontSize="8.5" fontWeight="800">member</text>
        <text x="117" y="70" textAnchor="middle" fill="#0369a1" fontSize="7">(Build & Run)</text>

        {/* Step 3: Admin */}
        <rect x="165" y="10" width="80" height="85" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
        <text x="205" y="26" textAnchor="middle" fill="#991b1b" fontSize="8.5" fontWeight="800">admin</text>
        <text x="205" y="40" textAnchor="middle" fill="#991b1b" fontSize="7">(Full Cloud Power)</text>
      </g>
    </g>
  );
}
