import React from 'react';
import { Character } from '../parts';

export default function Scene3_1({ currentStep }) {
  return (
    <g>
      {/* Island qm-net */}
      <circle cx="90" cy="95" r="55" fill="#f0fdf4" stroke="#10b981" strokeWidth="2" />
      <text x="90" y="75" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="800">qm-net Island</text>
      <Character type="trainee" x={90} y={80} scale={0.7} />

      {/* Mainland public-net */}
      <rect x="230" y="40" width="90" height="110" rx="8" fill="#e0f2fe" stroke="var(--brand-primary, #0284c7)" strokeWidth="2" />
      <text x="275" y="60" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="800">public-net</text>
      <text x="275" y="74" textAnchor="middle" fill="#64748b" fontSize="7.5">203.0.113.0/24</text>

      {/* Bridge (qm-router) */}
      <path
        d="M 145 95 L 230 95"
        stroke={currentStep >= 1 ? 'var(--brand-primary, #0284c7)' : '#cbd5e1'}
        strokeWidth="5"
        strokeDasharray={currentStep >= 1 ? 'none' : '4,4'}
      />
      <rect x="165" y="80" width="46" height="30" rx="4" fill="#1e293b" />
      <text x="188" y="98" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontWeight="700">qm-router</text>
    </g>
  );
}
