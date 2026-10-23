import React from 'react';
import { Character } from '../parts';

export default function Scene4_1({ currentStep: _currentStep }) {
  return (
    <g>
      {/* Instance room */}
      <rect x="140" y="40" width="140" height="100" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="210" y="65" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="700">Instance Port</text>

      {/* Bouncer / Firewall Guard at door */}
      <g transform="translate(140, 75)">
        <rect x="-8" y="-20" width="16" height="40" rx="3" fill="var(--brand-primary, #0284c7)" />
        <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">SG</text>
      </g>

      {/* Inbound visitor stopped */}
      <Character type="customer" x={60} y={90} label="Visitor" />
      <path d="M 75 75 L 125 75" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3,3" />
      <text x="100" y="70" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">DENY (default)</text>

      {/* Outbound allowed */}
      <path d="M 155 110 L 80 110" stroke="#10b981" strokeWidth="2.5" />
      <text x="120" y="125" textAnchor="middle" fill="#059669" fontSize="8" fontWeight="700">ALLOW (egress)</text>
    </g>
  );
}
