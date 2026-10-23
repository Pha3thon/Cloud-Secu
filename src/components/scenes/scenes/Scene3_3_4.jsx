import React from 'react';

/**
 * Scene3_3_4: Network Topology
 * Visual: Horizon live Network Topology map: orange public-net bar on the left,
 * connected via qm-router to blue qm-net on the right with animated link pulses.
 */
export default function Scene3_3_4({ currentStep }) {
  const isPulseActive = currentStep >= 1;

  return (
    <g>
      {/* Background canvas of Topology View */}
      <rect x="20" y="10" width="300" height="160" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="35" y="26" fill="#64748b" fontSize="8" fontWeight="800">
        HORIZON LIVE NETWORK TOPOLOGY
      </text>

      {/* Left: public-net vertical bus bar */}
      <g transform="translate(45, 45)">
        <rect x="0" y="0" width="16" height="105" rx="3" fill="#ea580c" />
        <text
          x="8"
          y="58"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="7"
          fontWeight="900"
          transform="rotate(-90, 8, 58)"
        >
          public-net
        </text>
      </g>

      {/* Middle: qm-router node */}
      <g transform="translate(150, 97)">
        <circle cx="0" cy="0" r="22" fill="#ffffff" stroke="#0d9488" strokeWidth="2.5" />
        <rect x="-8" y="-8" width="16" height="16" rx="2" fill="#0d9488" />
        <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="900">
          R
        </text>
        <text x="0" y="32" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="800">
          qm-router
        </text>
      </g>

      {/* Right: qm-net vertical bus bar */}
      <g transform="translate(255, 45)">
        <rect x="0" y="0" width="16" height="105" rx="3" fill="#0284c7" />
        <text
          x="8"
          y="58"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="7"
          fontWeight="900"
          transform="rotate(-90, 8, 58)"
        >
          qm-net (10.20.1.0/24)
        </text>
      </g>

      {/* Connecting Wire Lines */}
      <line x1="61" y1="97" x2="128" y2="97" stroke="#ea580c" strokeWidth="2.5" />
      <line x1="172" y1="97" x2="255" y2="97" stroke="#0284c7" strokeWidth="2.5" />

      {/* Animated Packet / Signal Pulse */}
      {isPulseActive && (
        <circle
          cx={currentStep % 2 === 1 ? 95 : 210}
          cy={97}
          r="4.5"
          fill="#f59e0b"
          style={{ transition: 'all 500ms ease' }}
        />
      )}

      {/* Legend Badge */}
      <rect x="105" y="148" width="130" height="16" rx="3" fill="#ffffff" stroke="#cbd5e1" />
      <text x="170" y="159" textAnchor="middle" fill="#334155" fontSize="6.5" fontWeight="700">
        Lines verify physical connectivity
      </text>
    </g>
  );
}
