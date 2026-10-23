import React from 'react';

/**
 * Scene5_3_3: Flavor sizing
 * Visual: Sizing comparison between m1.small (1 vCPU, 2 GB RAM, 20 GB disk)
 * and m1.medium (2 vCPU, 4 GB RAM, 40 GB disk) with allocation up-arrow.
 */
export default function Scene5_3_3({ currentStep }) {
  const isMediumSelected = currentStep >= 2;

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        NOVA FLAVORS: COMPUTE & RAM SIZING
      </text>

      {/* Flavor 1: m1.small */}
      <g transform="translate(30, 40)">
        <rect
          x="0"
          y="0"
          width="130"
          height="105"
          rx="6"
          fill="#ffffff"
          stroke={!isMediumSelected ? '#0284c7' : '#cbd5e1'}
          strokeWidth={!isMediumSelected ? '2' : '1.5'}
          filter={!isMediumSelected ? 'drop-shadow(0 4px 6px rgba(2, 132, 199, 0.1))' : 'none'}
        />
        <rect x="0" y="0" width="130" height="22" rx="6" fill={!isMediumSelected ? '#e0f2fe' : '#f1f5f9'} />
        <text x="65" y="15" textAnchor="middle" fill={!isMediumSelected ? '#0369a1' : '#64748b'} fontSize="8" fontWeight="800">
          m1.small (Web Storefront)
        </text>

        {/* Spec bars */}
        <text x="15" y="38" fill="#334155" fontSize="7" fontWeight="700">
          vCPU: 1 Core
        </text>
        <rect x="15" y="42" width="50" height="6" rx="3" fill="#0284c7" />

        <text x="15" y="60" fill="#334155" fontSize="7" fontWeight="700">
          RAM: 2048 MB (2 GB)
        </text>
        <rect x="15" y="64" width="50" height="6" rx="3" fill="#0d9488" />

        <text x="15" y="82" fill="#334155" fontSize="7" fontWeight="700">
          Root Disk: 20 GB
        </text>
        <rect x="15" y="86" width="50" height="6" rx="3" fill="#64748b" />
      </g>

      {/* Flavor 2: m1.medium */}
      <g transform="translate(180, 40)">
        <rect
          x="0"
          y="0"
          width="130"
          height="105"
          rx="6"
          fill="#ffffff"
          stroke={isMediumSelected ? '#d97706' : '#cbd5e1'}
          strokeWidth={isMediumSelected ? '2' : '1.5'}
          filter={isMediumSelected ? 'drop-shadow(0 4px 6px rgba(217, 119, 6, 0.12))' : 'none'}
        />
        <rect x="0" y="0" width="130" height="22" rx="6" fill={isMediumSelected ? '#fef3c7' : '#f1f5f9'} />
        <text x="65" y="15" textAnchor="middle" fill={isMediumSelected ? '#b45309' : '#64748b'} fontSize="8" fontWeight="800">
          m1.medium (Database)
        </text>

        {/* Spec bars */}
        <text x="15" y="38" fill="#334155" fontSize="7" fontWeight="700">
          vCPU: 2 Cores
        </text>
        <rect x="15" y="42" width="100" height="6" rx="3" fill="#d97706" />

        <text x="15" y="60" fill="#334155" fontSize="7" fontWeight="700">
          RAM: 4096 MB (4 GB)
        </text>
        <rect x="15" y="64" width="100" height="6" rx="3" fill="#0d9488" />

        <text x="15" y="82" fill="#334155" fontSize="7" fontWeight="700">
          Root Disk: 40 GB
        </text>
        <rect x="15" y="86" width="100" height="6" rx="3" fill="#64748b" />
      </g>

      {/* Footer advice */}
      <text x="170" y="165" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        Choose the smallest flavor that fits the job to conserve project hardware quota.
      </text>
    </g>
  );
}
