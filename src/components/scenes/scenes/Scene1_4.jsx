import React from 'react';

export default function Scene1_4({ currentStep }) {
  return (
    <g>
      {/* Dashboard wireframe */}
      <rect x="30" y="25" width="280" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      {/* Topbar */}
      <rect x="30" y="25" width="280" height="24" rx="8" fill="#0f172a" />
      {/* Project selector */}
      <rect x="40" y="29" width="70" height="16" rx="4" fill={currentStep === 0 ? 'var(--brand-primary, #0284c7)' : '#1e293b'} />
      <text x="75" y="40" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">quickmart ▾</text>

      {/* Left Nav */}
      <rect x="30" y="49" width="60" height="116" fill="#f8fafc" stroke="#e2e8f0" />
      <text x="36" y="65" fill="var(--brand-primary, #0284c7)" fontSize="7.5" fontWeight="700">Compute</text>
      <text x="40" y="78" fill="#64748b" fontSize="7">Instances</text>
      <text x="36" y="94" fill="var(--brand-primary, #0284c7)" fontSize="7.5" fontWeight="700">Network</text>
      <text x="40" y="107" fill="#64748b" fontSize="7">Networks</text>

      {/* Identity Dimmed / Admin only */}
      <g transform="translate(32, 125)">
        <rect width="56" height="18" rx="2" fill="#fee2e2" />
        <text x="4" y="12" fill="#991b1b" fontSize="6.5" fontWeight="700">Identity (Admin)</text>
      </g>

      {/* Right main table area */}
      <rect x="100" y="60" width="195" height="90" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
      <rect x="220" y="66" width="65" height="16" rx="3" fill="var(--brand-primary, #0284c7)" />
      <text x="252" y="77" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="700">+ Launch Instance</text>

      {/* Table rows */}
      <line x1="105" y1="92" x2="290" y2="92" stroke="#e2e8f0" strokeWidth="1.5" />
      <line x1="105" y1="110" x2="290" y2="110" stroke="#e2e8f0" strokeWidth="1.5" />
      <line x1="105" y1="128" x2="290" y2="128" stroke="#e2e8f0" strokeWidth="1.5" />
    </g>
  );
}
