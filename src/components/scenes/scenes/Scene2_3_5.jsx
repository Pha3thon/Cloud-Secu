import React from 'react';

/**
 * Scene2_3_5: The DHCP port
 * Visual: Network's Ports table showing Port 1 claimed by Neutron DHCP service
 * taking IP 10.20.1.2, while the next free slot (10.20.1.3) waits for the first VM.
 */
export default function Scene2_3_5({ currentStep }) {
  const isSecondPortAllocated = currentStep >= 2;

  return (
    <g>
      {/* Title */}
      <rect x="25" y="12" width="290" height="22" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="40" y="26" fill="#0f172a" fontSize="8" fontWeight="800">
        Project → Network → Networks → qm-net → Ports Tab
      </text>

      {/* Ports Table */}
      <g transform="translate(25, 42)">
        {/* Table Header */}
        <rect x="0" y="0" width="290" height="20" fill="#f1f5f9" />
        <text x="12" y="13" fill="#64748b" fontSize="7" fontWeight="800">
          NAME / DEVICE OWNER
        </text>
        <text x="140" y="13" fill="#64748b" fontSize="7" fontWeight="800">
          FIXED IP
        </text>
        <text x="235" y="13" fill="#64748b" fontSize="7" fontWeight="800">
          STATUS
        </text>

        {/* Row 1: DHCP Port */}
        <rect x="0" y="22" width="290" height="32" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="15" cy="38" r="4" fill="#0d9488" />
        <text x="26" y="36" fill="#0f172a" fontSize="7.5" fontWeight="700">
          network:dhcp
        </text>
        <text x="26" y="47" fill="#64748b" fontSize="6.5">
          Neutron internal agent
        </text>
        <text x="140" y="42" fill="#0d9488" fontSize="8" fontFamily="monospace" fontWeight="800">
          10.20.1.2
        </text>
        <rect x="235" y="32" width="42" height="15" rx="3" fill="#ecfdf5" />
        <text x="256" y="43" textAnchor="middle" fill="#065f46" fontSize="6.5" fontWeight="800">
          ACTIVE
        </text>

        {/* Row 2: Future VM Port */}
        <rect
          x="0"
          y="56"
          width="290"
          height="32"
          fill={isSecondPortAllocated ? '#ffffff' : '#fafbfc'}
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <circle cx="15" cy="72" r="4" fill={isSecondPortAllocated ? '#0284c7' : '#cbd5e1'} />
        <text x="26" y="70" fill={isSecondPortAllocated ? '#0f172a' : '#94a3b8'} fontSize="7.5" fontWeight="700">
          compute:nova (qm-web-01)
        </text>
        <text x="26" y="81" fill="#64748b" fontSize="6.5">
          {isSecondPortAllocated ? 'First deployed instance' : 'Next free allocation'}
        </text>
        <text
          x="140"
          y="76"
          fill={isSecondPortAllocated ? '#0284c7' : '#94a3b8'}
          fontSize="8"
          fontFamily="monospace"
          fontWeight="800"
        >
          10.20.1.3
        </text>
        <rect x="235" y="66" width="42" height="15" rx="3" fill={isSecondPortAllocated ? '#e0f2fe' : '#f1f5f9'} />
        <text
          x="256"
          y="77"
          textAnchor="middle"
          fill={isSecondPortAllocated ? '#0369a1' : '#64748b'}
          fontSize="6.5"
          fontWeight="800"
        >
          {isSecondPortAllocated ? 'ACTIVE' : 'NEXT'}
        </text>
      </g>

      {/* Footer Insight */}
      <text x="170" y="165" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        DHCP takes .2, so your instances begin sequentially from 10.20.1.3 onwards.
      </text>
    </g>
  );
}
