import React from 'react';

/**
 * Scene5_4: Reading the result: status and private IP
 * Visual: Horizon Instances list row showing qm-web-01 moving to status Active,
 * with assigned private IP 10.20.1.3 from DHCP on qm-net.
 */
export default function Scene5_4({ currentStep }) {
  const isActive = currentStep >= 1;

  return (
    <g>
      {/* Title */}
      <rect x="25" y="12" width="290" height="22" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="40" y="27" fill="#0f172a" fontSize="8" fontWeight="800">
        Project → Compute → Instances Table
      </text>

      {/* Instances Table */}
      <g transform="translate(25, 44)">
        {/* Table Header */}
        <rect x="0" y="0" width="290" height="20" fill="#f1f5f9" />
        <text x="12" y="13" fill="#64748b" fontSize="7" fontWeight="800">
          INSTANCE NAME
        </text>
        <text x="105" y="13" fill="#64748b" fontSize="7" fontWeight="800">
          IMAGE
        </text>
        <text x="175" y="13" fill="#64748b" fontSize="7" fontWeight="800">
          IP ADDRESS
        </text>
        <text x="245" y="13" fill="#64748b" fontSize="7" fontWeight="800">
          STATUS
        </text>

        {/* Row 1: qm-web-01 */}
        <rect x="0" y="24" width="290" height="34" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="15" cy="41" r="4" fill={isActive ? '#10b981' : '#f59e0b'} />
        <text x="26" y="38" fill="#0f172a" fontSize="7.5" fontWeight="800">
          qm-web-01
        </text>
        <text x="26" y="49" fill="#64748b" fontSize="6.5">
          m1.small · 1 vCPU
        </text>

        <text x="105" y="44" fill="#334155" fontSize="7">
          ubuntu-22.04
        </text>

        <text x="175" y="44" fill="#0284c7" fontSize="7.5" fontFamily="monospace" fontWeight="800">
          {isActive ? '10.20.1.3' : 'Allocating...'}
        </text>

        <rect x="240" y="34" width="42" height="16" rx="3" fill={isActive ? '#ecfdf5' : '#fed7aa'} />
        <text
          x="261"
          y="45"
          textAnchor="middle"
          fill={isActive ? '#065f46' : '#9a3412'}
          fontSize="6.5"
          fontWeight="850"
        >
          {isActive ? 'ACTIVE' : 'BUILD'}
        </text>
      </g>

      {/* Observation Callout */}
      <g transform="translate(35, 115)">
        <rect x="0" y="0" width="270" height="36" rx="6" fill="#f0f9ff" stroke="#bae6fd" />
        <text x="12" y="15" fill="#0369a1" fontSize="7" fontWeight="800">
          PRIVATE NETWORK SCOPE
        </text>
        <text x="12" y="27" fill="#0f172a" fontSize="7">
          Address 10.20.1.3 is internal to qm-net. Outside visitors cannot reach it yet.
        </text>
      </g>

      {/* Footer hint */}
      <text x="170" y="168" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="600">
        In Topic 6, we attach a Floating IP to allow customer traffic into the storefront.
      </text>
    </g>
  );
}
