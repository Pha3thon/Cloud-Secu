import React from 'react';

/**
 * Scene3_3_2: External Gateway
 * Visual: Router Overview dashboard panel showing External Gateway section
 * displaying assigned public IP 203.0.113.15 and public-net uplink status.
 */
export default function Scene3_3_2({ currentStep }) {
  const isUplinkActive = currentStep >= 1;

  return (
    <g>
      {/* Overview Panel Frame */}
      <rect x="30" y="15" width="280" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="30" y="15" width="280" height="26" rx="8" fill="#f8fafc" />
      <text x="45" y="32" fill="#0f172a" fontSize="8.5" fontWeight="800">
        Project → Network → Routers → qm-router → Overview
      </text>

      {/* Grid of details */}
      <g transform="translate(45, 52)">
        {/* Router Details */}
        <text x="0" y="10" fill="#64748b" fontSize="7" fontWeight="700">
          Name:
        </text>
        <text x="45" y="10" fill="#0f172a" fontSize="7.5" fontWeight="800">
          qm-router
        </text>

        <text x="0" y="28" fill="#64748b" fontSize="7" fontWeight="700">
          ID:
        </text>
        <text x="45" y="28" fill="#64748b" fontSize="6.5" fontFamily="monospace">
          b7e28a94-419b-43de...
        </text>

        <text x="0" y="46" fill="#64748b" fontSize="7" fontWeight="700">
          Status:
        </text>
        <rect x="45" y="37" width="38" height="13" rx="2" fill="#ecfdf5" />
        <text x="64" y="46" textAnchor="middle" fill="#065f46" fontSize="6.5" fontWeight="850">
          ACTIVE
        </text>

        {/* External Gateway Box */}
        <g transform="translate(0, 58)">
          <rect
            x="0"
            y="0"
            width="250"
            height="34"
            rx="4"
            fill={isUplinkActive ? '#f0fdf4' : '#f8fafc'}
            stroke={isUplinkActive ? '#22c55e' : '#cbd5e1'}
            strokeWidth="1.5"
          />
          <text x="12" y="14" fill="#15803d" fontSize="7" fontWeight="800">
            EXTERNAL GATEWAY INFO
          </text>
          <text x="12" y="26" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="800">
            External Network: public-net | IP: 203.0.113.15
          </text>
        </g>
      </g>

      {/* Bottom Subtext */}
      <text x="170" y="156" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        This is the external address QuickMart uses when reaching outside the cloud.
      </text>
    </g>
  );
}
