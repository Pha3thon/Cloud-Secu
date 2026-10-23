import React from 'react';

/**
 * Scene3_2: How routers work and SNAT
 * Visual: Outbound packet from VM (10.20.1.3) reaches router,
 * router rewrites source address to public IP (203.0.113.15) via SNAT,
 * and sends it to the external internet.
 */
export default function Scene3_2({ currentStep }) {
  // Step 0: Packet at VM (10.20.1.3)
  // Step 1: Packet at Router (SNAT rewriting)
  // Step 2: Packet at External Internet (203.0.113.15)
  // Step 3: Return packet via stateful NAT table
  const packetPos = currentStep === 0 ? 60 : currentStep === 1 ? 165 : 270;

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        SOURCE NETWORK ADDRESS TRANSLATION (SNAT)
      </text>

      {/* Left: Private VM */}
      <g transform="translate(25, 45)">
        <rect x="0" y="0" width="75" height="75" rx="6" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="37" y="18" textAnchor="middle" fill="#0369a1" fontSize="7.5" fontWeight="800">
          qm-web-01
        </text>
        <rect x="8" y="26" width="59" height="18" rx="3" fill="#ffffff" stroke="#bae6fd" />
        <text x="37" y="38" textAnchor="middle" fill="#0f172a" fontSize="7" fontFamily="monospace">
          10.20.1.3
        </text>
        <text x="37" y="62" textAnchor="middle" fill="#64748b" fontSize="6.5">
          Private Subnet
        </text>
      </g>

      {/* Middle: Virtual Router (qm-router) */}
      <g transform="translate(130, 40)">
        <circle cx="40" cy="42" r="32" fill="#ffffff" stroke="#0d9488" strokeWidth="2.5" />
        <text x="40" y="36" textAnchor="middle" fill="#0d9488" fontSize="8" fontWeight="800">
          qm-router
        </text>
        <rect x="18" y="42" width="44" height="15" rx="3" fill="#ccfbf1" />
        <text x="40" y="52" textAnchor="middle" fill="#0f766e" fontSize="6.5" fontWeight="800">
          SNAT ENGINE
        </text>
      </g>

      {/* Right: Public Internet */}
      <g transform="translate(240, 45)">
        <rect x="0" y="0" width="75" height="75" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="37" y="18" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="800">
          PUBLIC-NET
        </text>
        <text x="37" y="34" textAnchor="middle" fill="#0f172a" fontSize="7" fontFamily="monospace">
          203.0.113.15
        </text>
        <text x="37" y="62" textAnchor="middle" fill="#64748b" fontSize="6.5">
          Public Gateway
        </text>
      </g>

      {/* Connecting Wire */}
      <line x1="100" y1="82" x2="135" y2="82" stroke="#cbd5e1" strokeWidth="3" />
      <line x1="200" y1="82" x2="240" y2="82" stroke="#cbd5e1" strokeWidth="3" />

      {/* Moving Packet */}
      <g transform={`translate(${packetPos}, 82)`} style={{ transition: 'all 500ms ease' }}>
        <circle cx="0" cy="0" r="8" fill="#f59e0b" />
        <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="900">
          IP
        </text>
      </g>

      {/* Header Inspection Tag */}
      <rect x="45" y="132" width="250" height="32" rx="4" fill="#faf5ff" stroke="#d8b4fe" />
      <text x="170" y="146" textAnchor="middle" fill="#6b21a8" fontSize="7.5" fontWeight="700">
        {currentStep === 0 && 'Source IP on wire: 10.20.1.3 (private inside qm-net)'}
        {currentStep === 1 && 'Router rewrites Source IP: 10.20.1.3 → 203.0.113.15'}
        {currentStep >= 2 && 'Public internet sees router gateway 203.0.113.15 (private IP hidden)'}
      </text>
    </g>
  );
}
