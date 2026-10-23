import React from 'react';

/**
 * Scene2_3_4: Enable DHCP and the Allocation Pool
 * Visual: Horizon Subnet Details dialog showing checked "Enable DHCP"
 * and allocation pool visual bar spanning 10.20.1.2 through 10.20.1.254.
 */
export default function Scene2_3_4({ currentStep }) {
  const isDetailStep = currentStep >= 1;

  return (
    <g>
      {/* Dialog Frame */}
      <rect x="35" y="15" width="270" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="35" y="15" width="270" height="26" rx="8" fill="#f8fafc" />
      <text x="50" y="32" fill="#0f172a" fontSize="8.5" fontWeight="800">
        Create Network · Subnet Details
      </text>

      {/* Checkbox: Enable DHCP */}
      <g transform="translate(50, 52)">
        <rect x="0" y="0" width="13" height="13" rx="2" fill="#0284c7" stroke="#0284c7" strokeWidth="1.5" />
        <path d="M 2.5 6.5 L 5.5 9.5 L 10.5 3.5" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <text x="20" y="10" fill="#0f172a" fontSize="8" fontWeight="700">
          Enable DHCP (Checked by default)
        </text>
      </g>

      {/* Allocation Pool Visualizer */}
      <g transform="translate(50, 82)">
        <text x="0" y="0" fill="#334155" fontSize="7.5" fontWeight="700">
          Allocation Pools
        </text>
        {/* Pool Range Bar */}
        <rect x="0" y="10" width="240" height="24" rx="4" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="1.5" />
        {/* Reserved Gateway .1 */}
        <rect x="2" y="12" width="25" height="20" rx="2" fill="#e2e8f0" />
        <text x="14" y="25" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="700">
          .1 GW
        </text>

        {/* Dynamic Pool .2 to .254 */}
        <rect x="29" y="12" width="208" height="20" rx="2" fill={isDetailStep ? '#bae6fd' : '#e0f2fe'} />
        <text x="133" y="25" textAnchor="middle" fill="#0369a1" fontSize="7.5" fontFamily="monospace" fontWeight="800">
          10.20.1.2 — 10.20.1.254
        </text>
      </g>

      {/* Text note */}
      <text x="170" y="152" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="600">
        Instances automatically draw addresses sequentially from this pool.
      </text>
    </g>
  );
}
