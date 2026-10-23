import React from 'react';

/**
 * Scene4_2: How rules are evaluated, and why
 * Visual: Inbound packet hits firewall wall and gets blocked (red cross) unless
 * matching allow rule exists. Stateful return packets pass back automatically.
 */
export default function Scene4_2({ currentStep }) {
  // Step 0: Inbound unknown packet arrives -> Denied (Default Deny)
  // Step 1: Outbound packet allowed (Stateful connection established)
  // Step 2: Inbound reply packet allowed back automatically (Stateful return)
  // Step 3: Multi-group union illustration
  const isAllowedIn = currentStep >= 2;

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        STATEFUL RULE EVALUATION · DEFAULT DENY INBOUND
      </text>

      {/* Outside Traffic */}
      <g transform="translate(30, 45)">
        <rect x="0" y="0" width="65" height="90" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="32" y="16" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="700">
          OUTSIDE
        </text>
        <circle cx="32" cy="45" r="8" fill="#f59e0b" />
        <text x="32" y="48" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="900">
          PKT
        </text>
        <text x="32" y="75" textAnchor="middle" fill="#64748b" fontSize="6.5">
          TCP SYN
        </text>
      </g>

      {/* Firewall Wall */}
      <g transform="translate(145, 35)">
        <rect x="0" y="0" width="22" height="110" rx="4" fill="#1e293b" />
        {/* State tracking LED */}
        <circle cx="11" cy="20" r="3.5" fill={currentStep >= 1 ? '#10b981' : '#ef4444'} />
        <text
          x="11"
          y="70"
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="6"
          fontWeight="800"
          transform="rotate(-90, 11, 70)"
        >
          SECURITY GROUP
        </text>
      </g>

      {/* Protected VM (Inside) */}
      <g transform="translate(225, 45)">
        <rect x="0" y="0" width="85" height="90" rx="6" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
        <text x="42" y="16" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="800">
          PROTECTED VM
        </text>
        <text x="42" y="32" textAnchor="middle" fill="#0f172a" fontSize="7" fontFamily="monospace">
          10.20.1.3
        </text>
        <rect x="10" y="45" width="65" height="30" rx="3" fill="#ffffff" stroke="#bae6fd" />
        <text x="42" y="58" textAnchor="middle" fill="#0284c7" fontSize="6" fontWeight="700">
          State Table:
        </text>
        <text x="42" y="68" textAnchor="middle" fill="#10b981" fontSize="6" fontFamily="monospace" fontWeight="800">
          {currentStep >= 1 ? 'ESTABLISHED' : 'EMPTY'}
        </text>
      </g>

      {/* Packet Evaluation Outcome */}
      <g transform="translate(115, 80)">
        {currentStep === 0 ? (
          <g>
            <circle cx="0" cy="0" r="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <text x="0" y="3.5" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="900">
              ✕
            </text>
          </g>
        ) : (
          <g>
            <circle cx="45" cy="0" r="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
            <text x="45" y="3.5" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="900">
              ✓
            </text>
          </g>
        )}
      </g>

      {/* Bottom Subtext */}
      <text x="170" y="165" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        {currentStep === 0 && 'Inbound traffic without matching allow rule is denied.'}
        {currentStep === 1 && 'Outbound connections are allowed by default.'}
        {currentStep >= 2 && 'Return packets flow back automatically via stateful tracking.'}
      </text>
    </g>
  );
}
