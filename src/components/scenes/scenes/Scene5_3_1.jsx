import React from 'react';

/**
 * Scene5_3_1: Instance Name (Details tab)
 * Visual: Horizon Launch Instance modal Details step, showing Instance Name
 * typed as "qm-web-01" and Count left at 1.
 */
export default function Scene5_3_1({ currentStep }) {
  return (
    <g>
      {/* Dialog Window */}
      <rect x="35" y="15" width="270" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="35" y="15" width="270" height="26" rx="8" fill="#f8fafc" />
      <text x="50" y="32" fill="#0f172a" fontSize="8.5" fontWeight="800">
        Launch Instance · Details
      </text>

      {/* Tabs */}
      <g transform="translate(50, 48)">
        <rect x="0" y="0" width="55" height="18" rx="3" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
        <text x="27" y="12" textAnchor="middle" fill="#0284c7" fontSize="7.5" fontWeight="800">
          Details
        </text>
        <rect x="62" y="0" width="50" height="18" rx="3" fill="#f8fafc" stroke="#e2e8f0" />
        <text x="87" y="12" textAnchor="middle" fill="#64748b" fontSize="7">
          Source
        </text>
        <rect x="119" y="0" width="50" height="18" rx="3" fill="#f8fafc" stroke="#e2e8f0" />
        <text x="144" y="12" textAnchor="middle" fill="#64748b" fontSize="7">
          Flavor
        </text>
        <rect x="176" y="0" width="55" height="18" rx="3" fill="#f8fafc" stroke="#e2e8f0" />
        <text x="203" y="12" textAnchor="middle" fill="#64748b" fontSize="7">
          Networks
        </text>
      </g>

      {/* Form Content */}
      <g transform="translate(50, 78)">
        <text x="0" y="8" fill="#334155" fontSize="7.5" fontWeight="700">
          Instance Name *
        </text>
        <rect x="0" y="14" width="235" height="22" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
        <text x="10" y="29" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="800">
          {currentStep >= 1 ? 'qm-web-01' : ''}
        </text>

        <text x="0" y="52" fill="#334155" fontSize="7.5" fontWeight="700">
          Count
        </text>
        <rect x="0" y="58" width="50" height="20" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="25" y="72" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
          1
        </text>
        <text x="60" y="72" fill="#64748b" fontSize="7">
          (Launch one machine per role)
        </text>
      </g>
    </g>
  );
}
