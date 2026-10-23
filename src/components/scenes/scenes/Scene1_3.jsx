import React from 'react';

export default function Scene1_3({ currentStep }) {
  return (
    <g>
      {/* Mini Kali Desktop Frame */}
      <rect x="30" y="20" width="280" height="150" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <rect x="30" y="20" width="280" height="18" fill="#0f172a" />
      <text x="42" y="32" fill="#94a3b8" fontSize="8">Kali Linux — QuickMart Workstation</text>

      {/* Firefox Window */}
      <g transform="translate(45, 45)">
        <rect width="250" height="110" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        {/* URL bar */}
        <rect x="10" y="8" width="230" height="16" rx="3" fill="#f1f5f9" stroke="#cbd5e1" />
        <text x="18" y="19" fill="var(--brand-primary, #0284c7)" fontSize="7.5" fontWeight="600">
          http://horizon.quickmart.lab/dashboard
        </text>

        {/* Login form filling in steps */}
        <g transform="translate(45, 32)">
          <rect width="160" height="66" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
          <text x="80" y="14" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="700">OpenStack Sign In</text>

          {/* Domain */}
          <rect x="20" y="20" width="120" height="10" rx="2" fill={currentStep >= 1 ? '#e0f2fe' : '#ffffff'} stroke="#cbd5e1" />
          <text x="24" y="28" fill="#0369a1" fontSize="6.5">Domain: Default</text>

          {/* User */}
          <rect x="20" y="33" width="120" height="10" rx="2" fill={currentStep >= 2 ? '#e0f2fe' : '#ffffff'} stroke="#cbd5e1" />
          <text x="24" y="41" fill="#0369a1" fontSize="6.5">User: trainee</text>

          {/* Password */}
          <rect x="20" y="46" width="120" height="10" rx="2" fill={currentStep >= 3 ? '#e0f2fe' : '#ffffff'} stroke="#cbd5e1" />
          <text x="24" y="54" fill="#0369a1" fontSize="6.5">Pass: •••••••••••</text>
        </g>
      </g>
    </g>
  );
}
