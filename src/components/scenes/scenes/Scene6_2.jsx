import React from 'react';

/**
 * Scene6_2: How it works, and why we need it
 * Visual: 1:1 NAT translation mechanism:
 * Outside customer sends packet to 203.0.113.27; router silently translates
 * destination to private instance 10.20.1.3. The database (10.20.1.4) has no floating IP
 * and is entirely shielded from outside packets.
 */
export default function Scene6_2({ currentStep }) {
  // Step 0: Customer initiates packet to 203.0.113.27
  // Step 1: Router performs 1:1 DNAT mapping
  // Step 2: Packet arrives at private 10.20.1.3
  // Step 3: Outside packet targeting DB at 10.20.1.4 has no route
  const packetPos = currentStep === 0 ? 55 : currentStep === 1 ? 160 : 255;

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        1:1 NAT MAPPING: INBOUND FORWARDING TO PRIVATE INSTANCES
      </text>

      {/* Outside Customer */}
      <g transform="translate(25, 45)">
        <rect x="0" y="0" width="65" height="70" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
        <circle cx="32" cy="25" r="10" fill="#0284c7" />
        <text x="32" y="48" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="700">
          Customer
        </text>
        <text x="32" y="60" textAnchor="middle" fill="#64748b" fontSize="6.5">
          Public Web
        </text>
      </g>

      {/* Router 1:1 NAT Engine */}
      <g transform="translate(125, 40)">
        <rect x="0" y="0" width="80" height="80" rx="8" fill="#ffffff" stroke="#0d9488" strokeWidth="2" />
        <rect x="0" y="0" width="80" height="20" rx="8" fill="#ccfbf1" />
        <text x="40" y="14" textAnchor="middle" fill="#0f766e" fontSize="7.5" fontWeight="800">
          ROUTER 1:1 NAT
        </text>
        <text x="40" y="38" textAnchor="middle" fill="#0284c7" fontSize="7" fontFamily="monospace" fontWeight="800">
          203.0.113.27
        </text>
        <text x="40" y="52" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="900">
          ↓ 1:1
        </text>
        <text x="40" y="68" textAnchor="middle" fill="#0f766e" fontSize="7" fontFamily="monospace" fontWeight="800">
          10.20.1.3
        </text>
      </g>

      {/* Private Instances */}
      <g transform="translate(240, 42)">
        {/* qm-web-01 (Mapped) */}
        <rect x="0" y="0" width="75" height="36" rx="4" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
        <text x="37" y="14" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="800">
          qm-web-01
        </text>
        <text x="37" y="27" textAnchor="middle" fill="#0f172a" fontSize="6.5" fontFamily="monospace">
          10.20.1.3 (Mapped)
        </text>

        {/* qm-db-01 (Unmapped / Private) */}
        <g transform="translate(0, 44)">
          <rect x="0" y="0" width="75" height="36" rx="4" fill="#fefce8" stroke="#ca8a04" strokeWidth="1" />
          <text x="37" y="14" textAnchor="middle" fill="#854d0e" fontSize="7" fontWeight="800">
            qm-db-01
          </text>
          <text x="37" y="27" textAnchor="middle" fill="#64748b" fontSize="6.5" fontFamily="monospace">
            10.20.1.4 (No FIP)
          </text>
        </g>
      </g>

      {/* Moving Packet */}
      <g transform={`translate(${packetPos}, 60)`} style={{ transition: 'all 500ms ease' }}>
        <circle cx="0" cy="0" r="7.5" fill="#f59e0b" />
        <text x="0" y="2.5" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="900">
          HTTP
        </text>
      </g>

      {/* Footer text */}
      <text x="170" y="165" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        Give floating IPs only to instances that must be public. Everything else stays strictly private.
      </text>
    </g>
  );
}
