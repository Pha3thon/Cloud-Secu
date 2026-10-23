import React from 'react';

/**
 * Scene5_3_4: Networks
 * Visual: Launch Instance modal Networks tab:
 * Moving qm-net from Available Networks to Allocated table,
 * which unlocks the active blue "Launch Instance" button.
 */
export default function Scene5_3_4({ currentStep }) {
  const isNetAllocated = currentStep >= 1;

  return (
    <g>
      {/* Dialog Frame */}
      <rect x="35" y="15" width="270" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="35" y="15" width="270" height="26" rx="8" fill="#f8fafc" />
      <text x="50" y="32" fill="#0f172a" fontSize="8.5" fontWeight="800">
        Launch Instance · Networks Tab
      </text>

      {/* Allocated Networks Box */}
      <g transform="translate(50, 48)">
        <text x="0" y="10" fill="#0284c7" fontSize="7" fontWeight="800">
          ALLOCATED NETWORKS (PLUGGED)
        </text>
        <rect
          x="0"
          y="15"
          width="240"
          height="28"
          rx="4"
          fill={isNetAllocated ? '#f0f9ff' : '#f8fafc'}
          stroke={isNetAllocated ? '#0284c7' : '#cbd5e1'}
          strokeWidth="1.5"
        />
        <text
          x="12"
          y="32"
          fill={isNetAllocated ? '#0369a1' : '#94a3b8'}
          fontSize="7.5"
          fontFamily="monospace"
          fontWeight="700"
        >
          {isNetAllocated ? 'qm-net: 10.20.1.0/24 (Allocated via ↑)' : 'No network selected (Launch blocked)'}
        </text>
      </g>

      {/* Available Networks Box */}
      <g transform="translate(50, 96)">
        <text x="0" y="10" fill="#64748b" fontSize="7" fontWeight="800">
          AVAILABLE NETWORKS
        </text>
        <rect x="0" y="15" width="240" height="24" rx="4" fill="#ffffff" stroke="#e2e8f0" />
        <text x="12" y="30" fill="#64748b" fontSize="7" fontFamily="monospace">
          qm-net (Subnets: qm-subnet)
        </text>
        <rect x="210" y="18" width="22" height="18" rx="3" fill="#0284c7" />
        <text x="221" y="30" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">
          ↑
        </text>
      </g>

      {/* Launch Instance Button at bottom-right */}
      <rect
        x="200"
        y="140"
        width="90"
        height="20"
        rx="4"
        fill={isNetAllocated ? '#0284c7' : '#94a3b8'}
      />
      <text x="245" y="153" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="800">
        Launch Instance
      </text>
    </g>
  );
}
