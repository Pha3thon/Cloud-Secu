import React from 'react';

/**
 * Scene2_3_3: Gateway IP
 * Visual: Subnet boundaries showing Gateway IP 10.20.1.1 as the exit doorway,
 * with outbound packets destined outside the subnet routing toward it.
 */
export default function Scene2_3_3({ currentStep }) {
  const isPacketMoving = currentStep >= 1;

  return (
    <g>
      {/* Subnet Room Floor */}
      <rect x="25" y="25" width="200" height="135" rx="8" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2" />
      <text x="35" y="42" fill="#0369a1" fontSize="9" fontWeight="800">
        qm-subnet (10.20.1.0/24)
      </text>

      {/* Internal VMs */}
      <g transform="translate(45, 60)">
        <rect x="0" y="0" width="65" height="40" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <circle cx="10" cy="12" r="3" fill="#10b981" />
        <text x="18" y="15" fill="#0f172a" fontSize="7" fontWeight="700">
          qm-web-01
        </text>
        <text x="18" y="28" fill="#64748b" fontSize="6.5" fontFamily="monospace">
          10.20.1.3
        </text>
      </g>

      {/* Gateway Doorway (10.20.1.1) */}
      <g transform="translate(205, 70)">
        {/* Door frame */}
        <rect x="0" y="0" width="30" height="50" rx="3" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
        {/* Door door */}
        <rect x="3" y="3" width="24" height="44" rx="2" fill="#e0f2fe" />
        <circle cx="8" cy="25" r="2" fill="#0284c7" />
        <text x="15" y="-6" textAnchor="middle" fill="#0284c7" fontSize="7.5" fontWeight="800">
          GATEWAY IP
        </text>
        <text x="15" y="58" textAnchor="middle" fill="#0369a1" fontSize="7" fontFamily="monospace" fontWeight="800">
          10.20.1.1
        </text>
      </g>

      {/* Router Outside Room */}
      <g transform="translate(265, 80)">
        <circle cx="18" cy="18" r="18" fill="#ffffff" stroke="#0d9488" strokeWidth="2" />
        <text x="18" y="22" textAnchor="middle" fill="#0d9488" fontSize="8" fontWeight="800">
          ROUTER
        </text>
      </g>

      {/* Outbound Packet Travel */}
      {isPacketMoving && (
        <g>
          <path
            d="M 115 80 L 205 95 L 265 98"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeDasharray="4,4"
          />
          <circle cx={currentStep === 1 ? 160 : 235} cy={currentStep === 1 ? 88 : 96} r="4.5" fill="#f59e0b" />
        </g>
      )}

      {/* Footer message */}
      <text x="170" y="174" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        Exit door for all outbound packets: 10.20.1.1 takes the router interface in Lab 3.
      </text>
    </g>
  );
}
