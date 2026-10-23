import React from 'react';

export default function Scene2_3_2({ currentStep }) {
  return (
    <g transform="translate(40, 40)">
      <text x="0" y="10" fill="#0f172a" fontSize="12" fontWeight="800">10.20.1.0 / 24 Subnet Block</text>
      <g transform="translate(0, 30)">
        {/* Blocks */}
        <rect x="0" y="0" width="55" height="36" rx="4" fill="#e0f2fe" stroke="var(--brand-primary, #0284c7)" strokeWidth="2" />
        <text x="27" y="22" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="800">10.</text>

        <rect x="65" y="0" width="55" height="36" rx="4" fill="#e0f2fe" stroke="var(--brand-primary, #0284c7)" strokeWidth="2" />
        <text x="92" y="22" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="800">20.</text>

        <rect x="130" y="0" width="55" height="36" rx="4" fill="#e0f2fe" stroke="var(--brand-primary, #0284c7)" strokeWidth="2" />
        <text x="157" y="22" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="800">1.</text>

        {/* Cycling last octet */}
        <rect x="195" y="0" width="65" height="36" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="227" y="22" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="800">
          {currentStep === 0 ? '0' : currentStep === 1 ? '1...254' : '255'}
        </text>
      </g>
      <text x="0" y="95" fill="#64748b" fontSize="9">
        Fixed network prefix (24 bits) + 256 assignable host addresses
      </text>
    </g>
  );
}
