import React from 'react';

/**
 * Scene3_3_1: Router Name and External Network
 * Visual: Horizon Create Router modal dialog setting Name = qm-router
 * and selecting External Network = public-net from the dropdown.
 */
export default function Scene3_3_1({ currentStep }) {
  const isSelected = currentStep >= 1;

  return (
    <g>
      {/* Dialog Frame */}
      <rect x="40" y="15" width="260" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="40" y="15" width="260" height="28" rx="8" fill="#f8fafc" />
      <text x="56" y="33" fill="#0f172a" fontSize="8.5" fontWeight="800">
        Create Router
      </text>

      {/* Form Fields */}
      <g transform="translate(56, 55)">
        {/* Router Name Field */}
        <text x="0" y="0" fill="#334155" fontSize="7.5" fontWeight="700">
          Router Name *
        </text>
        <rect x="0" y="8" width="228" height="24" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
        <text x="10" y="24" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="700">
          qm-router
        </text>

        {/* External Network Dropdown */}
        <text x="0" y="52" fill="#334155" fontSize="7.5" fontWeight="700">
          External Network
        </text>
        <rect
          x="0"
          y="60"
          width="228"
          height="24"
          rx="4"
          fill={isSelected ? '#f0fdf4' : '#ffffff'}
          stroke={isSelected ? '#16a34a' : '#cbd5e1'}
          strokeWidth="1.5"
        />
        <text
          x="10"
          y="76"
          fill={isSelected ? '#15803d' : '#94a3b8'}
          fontSize="8"
          fontFamily="monospace"
          fontWeight="700"
        >
          {isSelected ? 'public-net (External Uplink)' : 'Select an external network...'}
        </text>
        {/* Dropdown Chevron */}
        <path d="M 215 70 L 220 75 L 225 70" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Submit Button */}
      <rect x="220" y="138" width="64" height="20" rx="4" fill="#0284c7" />
      <text x="252" y="151" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="800">
        Create Router
      </text>
    </g>
  );
}
