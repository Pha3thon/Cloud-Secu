import React from 'react';

/**
 * Scene4_3_1: Direction: ingress and egress
 * Visual: Split comparison showing Ingress (coming in) vs Egress (going out).
 * Highlights that a brand-new group starts with Egress allowed (IPv4 & IPv6)
 * and zero Ingress rules.
 */
export default function Scene4_3_1({ currentStep }) {
  const isEgressHighlight = currentStep === 1 || currentStep >= 2;

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        DIRECTION: INGRESS (INBOUND) VS EGRESS (OUTBOUND)
      </text>

      {/* Left Card: Ingress (Inbound) */}
      <g transform="translate(30, 42)">
        <rect
          x="0"
          y="0"
          width="130"
          height="105"
          rx="6"
          fill="#ffffff"
          stroke={!isEgressHighlight ? '#0284c7' : '#cbd5e1'}
          strokeWidth={!isEgressHighlight ? '2' : '1.5'}
        />
        <rect x="0" y="0" width="130" height="24" rx="6" fill="#f1f5f9" />
        <text x="65" y="16" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
          INGRESS (INBOUND)
        </text>

        {/* Incoming Arrow */}
        <g transform="translate(65, 52)">
          <path d="M 0 -18 L 0 14" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
          <path d="M -6 8 L 0 15 L 6 8" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Status text */}
        <rect x="15" y="75" width="100" height="20" rx="3" fill="#fee2e2" />
        <text x="65" y="88" textAnchor="middle" fill="#991b1b" fontSize="6.5" fontWeight="800">
          NEW GROUP: 0 RULES (DENIED)
        </text>
      </g>

      {/* Right Card: Egress (Outbound) */}
      <g transform="translate(180, 42)">
        <rect
          x="0"
          y="0"
          width="130"
          height="105"
          rx="6"
          fill="#ffffff"
          stroke={isEgressHighlight ? '#10b981' : '#cbd5e1'}
          strokeWidth={isEgressHighlight ? '2' : '1.5'}
          filter={isEgressHighlight ? 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.12))' : 'none'}
        />
        <rect x="0" y="0" width="130" height="24" rx="6" fill={isEgressHighlight ? '#ecfdf5' : '#f1f5f9'} />
        <text x="65" y="16" textAnchor="middle" fill={isEgressHighlight ? '#065f46' : '#64748b'} fontSize="8" fontWeight="800">
          EGRESS (OUTBOUND)
        </text>

        {/* Outgoing Arrow */}
        <g transform="translate(65, 52)">
          <path d="M 0 14 L 0 -18" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          <path d="M -6 -12 L 0 -19 L 6 -12" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Status text */}
        <rect x="15" y="75" width="100" height="20" rx="3" fill="#ecfdf5" />
        <text x="65" y="88" textAnchor="middle" fill="#065f46" fontSize="6.5" fontWeight="800">
          NEW GROUP: ALL OUT ALLOWED
        </text>
      </g>

      {/* Footer message */}
      <text x="170" y="166" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        Always check the Direction column before adding rules to avoid upside-down firewalls.
      </text>
    </g>
  );
}
