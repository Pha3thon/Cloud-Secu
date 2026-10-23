import React from 'react';

/**
 * Scene4_3_4: The QuickMart two-tier layout
 * Visual: Two-tier cloud architecture:
 * Tier 1 (qm-web-sg) accepts public traffic on ports 80/443/22;
 * Tier 2 (qm-db-sg) accepts port 3306 ONLY from qm-web-sg;
 * Outside traffic directly targeting the database is blocked.
 */
export default function Scene4_3_4({ currentStep }) {
  const isWebStep = currentStep === 0;
  const isDbInternalStep = currentStep === 1;
  const isDirectBlocked = currentStep >= 2;

  return (
    <g>
      {/* Title */}
      <rect x="20" y="8" width="300" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="21" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        QUICKMART TWO-TIER SECURITY ARCHITECTURE
      </text>

      {/* Outside Visitors */}
      <g transform="translate(15, 65)">
        <circle cx="15" cy="15" r="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="15" y="18" textAnchor="middle" fill="#475569" fontSize="6.5" fontWeight="800">
          PUBLIC
        </text>
      </g>

      {/* Tier 1: Web Tier (qm-web-sg) */}
      <g transform="translate(65, 38)">
        <rect
          x="0"
          y="0"
          width="105"
          height="100"
          rx="6"
          fill="#f0f9ff"
          stroke="#0284c7"
          strokeWidth="2"
          filter={isWebStep ? 'drop-shadow(0 4px 8px rgba(2, 132, 199, 0.15))' : 'none'}
        />
        <rect x="0" y="0" width="105" height="22" rx="6" fill="#0284c7" />
        <text x="52" y="15" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">
          qm-web-sg
        </text>
        <text x="52" y="38" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="700">
          qm-web-01
        </text>
        <text x="52" y="52" textAnchor="middle" fill="#0369a1" fontSize="7" fontFamily="monospace">
          Ports: 22, 80, 443
        </text>
        <rect x="10" y="66" width="85" height="18" rx="3" fill="#ffffff" stroke="#bae6fd" />
        <text x="52" y="78" textAnchor="middle" fill="#0284c7" fontSize="6.5" fontWeight="700">
          Remote: 0.0.0.0/0
        </text>
      </g>

      {/* Connecting Flow from Public to Web */}
      <line x1="45" y1="80" x2="65" y2="80" stroke="#10b981" strokeWidth="2.5" />
      <polygon points="65,80 57,76 57,84" fill="#10b981" />

      {/* Flow from Web to DB (Internal Authorized) */}
      <line
        x1="170"
        y1="80"
        x2="205"
        y2="80"
        stroke={isDbInternalStep || currentStep >= 3 ? '#10b981' : '#cbd5e1'}
        strokeWidth="3"
      />
      <polygon
        points="205,80 197,76 197,84"
        fill={isDbInternalStep || currentStep >= 3 ? '#10b981' : '#cbd5e1'}
      />
      <text x="187" y="72" textAnchor="middle" fill="#059669" fontSize="6.5" fontWeight="800">
        :3306
      </text>

      {/* Tier 2: Database Tier (qm-db-sg) */}
      <g transform="translate(205, 38)">
        <rect
          x="0"
          y="0"
          width="105"
          height="100"
          rx="6"
          fill="#fefce8"
          stroke="#ca8a04"
          strokeWidth="2"
          filter={isDbInternalStep ? 'drop-shadow(0 4px 8px rgba(202, 138, 4, 0.15))' : 'none'}
        />
        <rect x="0" y="0" width="105" height="22" rx="6" fill="#ca8a04" />
        <text x="52" y="15" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">
          qm-db-sg
        </text>
        <text x="52" y="38" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="700">
          qm-db-01
        </text>
        <text x="52" y="52" textAnchor="middle" fill="#854d0e" fontSize="7" fontFamily="monospace">
          Ports: 3306, 22
        </text>
        <rect x="10" y="66" width="85" height="18" rx="3" fill="#ffffff" stroke="#fde047" />
        <text x="52" y="78" textAnchor="middle" fill="#a16207" fontSize="6.5" fontWeight="800">
          Remote: qm-web-sg
        </text>
      </g>

      {/* Direct Outside Attack Blocked at DB */}
      {isDirectBlocked && (
        <g transform="translate(257, 142)">
          <line x1="-50" y1="0" x2="-5" y2="0" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
          <circle cx="0" cy="0" r="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="0" y="3" textAnchor="middle" fill="#dc2626" fontSize="8" fontWeight="900">
            ✕
          </text>
          <text x="15" y="3" fill="#dc2626" fontSize="6.5" fontWeight="800">
            Direct access to DB blocked
          </text>
        </g>
      )}

      {/* Bottom Subtext */}
      <text x="170" y="172" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        Storefront is open to customers; the database is never reachable from the outside.
      </text>
    </g>
  );
}
