import React from 'react';
import { Character } from '../parts';

export default function Scene1_2({ currentStep }) {
  return (
    <g>
      {/* Dashboard Window */}
      <rect x="50" y="30" width="180" height="110" rx="8" fill="#ffffff" stroke="var(--brand-primary, #0284c7)" strokeWidth="2" />
      <rect x="50" y="30" width="180" height="22" rx="8" fill="var(--brand-primary, #0284c7)" />
      <circle cx="62" cy="41" r="3" fill="#ffffff" opacity="0.8" />
      <circle cx="72" cy="41" r="3" fill="#ffffff" opacity="0.8" />
      <text x="90" y="44" fill="#ffffff" fontSize="9" fontWeight="700">Horizon: QuickMart Cloud</text>

      {/* Launch Button */}
      <rect x="70" y="70" width="70" height="24" rx="4" fill={currentStep >= 1 ? 'var(--brand-primary, #0284c7)' : '#e2e8f0'} />
      <text x="105" y="85" textAnchor="middle" fill={currentStep >= 1 ? '#ffffff' : '#64748b'} fontSize="9" fontWeight="700">
        Launch VM
      </text>

      {/* Request arrows flying to Nova */}
      {currentStep >= 2 && (
        <g>
          <path d="M 145 82 L 230 82" stroke="var(--brand-primary, #0284c7)" strokeWidth="2.5" strokeDasharray="4,4" />
          <polygon points="235,82 227,78 227,86" fill="var(--brand-primary, #0284c7)" />
          <rect x="155" y="66" width="60" height="14" rx="3" fill="#e0f2fe" />
          <text x="185" y="76" textAnchor="middle" fill="#0369a1" fontSize="7.5" fontWeight="700">POST /servers</text>
        </g>
      )}

      {/* Nova compute worker */}
      <g transform="translate(245, 60)">
        <rect width="65" height="48" rx="6" fill="#1e293b" />
        <text x="32" y="20" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="800">NOVA</text>
        <text x="32" y="34" textAnchor="middle" fill="#94a3b8" fontSize="7.5">Instance Spun</text>
      </g>

      <Character type="trainee" x={30} y={115} label="Click" />
    </g>
  );
}
