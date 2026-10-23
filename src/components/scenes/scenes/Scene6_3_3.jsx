import React from 'react';

/**
 * Scene6_3_3: Attack surface
 * Visual: Perimeter radar scanner:
 * QuickMart web server (203.0.113.27) sits in the exposed perimeter circle;
 * Database server (10.20.1.4) is shielded deep inside the dark protected zone.
 */
export default function Scene6_3_3({ currentStep }) {
  const isRadarSweep = currentStep >= 1;

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        CLOUD ATTACK SURFACE: MINIMIZING EXPOSED SHORELINE
      </text>

      {/* Radar Target Rings (Public Attack Zone) */}
      <g transform="translate(100, 95)">
        <circle cx="0" cy="0" r="55" fill="#fef2f2" stroke="#fecaca" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="38" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" strokeDasharray="3,3" />

        {/* Exposed Storefront Instance */}
        <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
        <text x="0" y="-2" textAnchor="middle" fill="#dc2626" fontSize="7" fontWeight="900">
          EXPOSED
        </text>
        <text x="0" y="8" textAnchor="middle" fill="#0f172a" fontSize="6.5" fontFamily="monospace">
          .113.27
        </text>
        <text x="0" y="28" textAnchor="middle" fill="#b91c1c" fontSize="6.5" fontWeight="700">
          qm-web-01 (Port 80/443)
        </text>

        {/* Radar beam if active */}
        {isRadarSweep && (
          <line x1="0" y1="0" x2="48" y2="-28" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        )}
      </g>

      {/* Shielded Stealth Zone (Database Tier) */}
      <g transform="translate(235, 95)">
        <circle cx="0" cy="0" r="50" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
        <text x="0" y="-2" textAnchor="middle" fill="#15803d" fontSize="7" fontWeight="900">
          SHIELDED
        </text>
        <text x="0" y="8" textAnchor="middle" fill="#0f172a" fontSize="6.5" fontFamily="monospace">
          10.20.1.4
        </text>
        <text x="0" y="28" textAnchor="middle" fill="#15803d" fontSize="6.5" fontWeight="700">
          qm-db-01 (Private)
        </text>
      </g>

      {/* Arrow / Barrier between them */}
      <line x1="160" y1="95" x2="180" y2="95" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="2,2" />

      {/* Footer explanation */}
      <text x="170" y="166" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        Every public IP and open port adds surface. A good design exposes as little as possible.
      </text>
    </g>
  );
}
