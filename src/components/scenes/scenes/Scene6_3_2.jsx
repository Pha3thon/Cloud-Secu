import React from 'react';

/**
 * Scene6_3_2: Manage Associations
 * Visual: Manage Floating IP Association modal dialog:
 * Selecting IP Address = 203.0.113.27 and Port to be associated = qm-web-01: 10.20.1.3.
 */
export default function Scene6_3_2({ currentStep }) {
  const isPortSelected = currentStep >= 1;

  return (
    <g>
      {/* Dialog Frame */}
      <rect x="35" y="15" width="270" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="35" y="15" width="270" height="26" rx="8" fill="#f8fafc" />
      <text x="50" y="32" fill="#0f172a" fontSize="8.5" fontWeight="800">
        Manage Floating IP Association
      </text>

      {/* Form Fields */}
      <g transform="translate(50, 52)">
        <text x="0" y="10" fill="#334155" fontSize="7.5" fontWeight="700">
          IP Address *
        </text>
        <rect x="0" y="16" width="240" height="24" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="12" y="32" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="800">
          203.0.113.27 (public-net)
        </text>

        <text x="0" y="56" fill="#334155" fontSize="7.5" fontWeight="700">
          Port to be associated *
        </text>
        <rect
          x="0"
          y="62"
          width="240"
          height="24"
          rx="4"
          fill={isPortSelected ? '#f0fdf4' : '#ffffff'}
          stroke={isPortSelected ? '#16a34a' : '#0284c7'}
          strokeWidth="1.5"
        />
        <text
          x="12"
          y="78"
          fill={isPortSelected ? '#15803d' : '#94a3b8'}
          fontSize="7.5"
          fontFamily="monospace"
          fontWeight="800"
        >
          {isPortSelected ? 'qm-web-01: 10.20.1.3 (Active)' : 'Select instance port...'}
        </text>
      </g>

      {/* Associate Button */}
      <rect x="220" y="136" width="70" height="20" rx="4" fill="#0284c7" />
      <text x="255" y="149" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="800">
        Associate
      </text>
    </g>
  );
}
