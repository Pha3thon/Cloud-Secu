import React from 'react';

/**
 * Scene7_3_4: The Access Request portal
 * Visual: Internal Access Request portal web form (http://access.quickmart.lab):
 * Fields: User, Requested Role, Business Justification, and workflow review status
 * transitioning from "Under review" to "Approved".
 */
export default function Scene7_3_4({ currentStep }) {
  const isApproved = currentStep >= 2;

  return (
    <g>
      {/* Browser Window Frame */}
      <rect x="30" y="12" width="280" height="152" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* Browser Chrome Header */}
      <rect x="30" y="12" width="280" height="24" rx="8" fill="#f8fafc" />
      <circle cx="42" cy="24" r="3" fill="#ef4444" />
      <circle cx="50" cy="24" r="3" fill="#f59e0b" />
      <circle cx="58" cy="24" r="3" fill="#10b981" />
      <rect x="75" y="16" width="160" height="15" rx="3" fill="#ffffff" stroke="#e2e8f0" />
      <text x="155" y="27" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">
        http://access.quickmart.lab
      </text>

      {/* Form Content */}
      <g transform="translate(45, 46)">
        <text x="0" y="8" fill="#334155" fontSize="7" fontWeight="700">
          User:
        </text>
        <rect x="65" y="0" width="180" height="16" rx="3" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="72" y="11" fill="#0f172a" fontSize="7" fontFamily="monospace">
          ravi-employee (Store Ops)
        </text>

        <text x="0" y="28" fill="#334155" fontSize="7" fontWeight="700">
          Requested Role:
        </text>
        <rect x="65" y="20" width="180" height="16" rx="3" fill="#f0f9ff" stroke="#0284c7" />
        <text x="72" y="31" fill="#0284c7" fontSize="7" fontFamily="monospace" fontWeight="800">
          member (Manage daily store instances)
        </text>

        <text x="0" y="48" fill="#334155" fontSize="7" fontWeight="700">
          Justification:
        </text>
        <rect x="65" y="40" width="180" height="20" rx="3" fill="#ffffff" stroke="#cbd5e1" />
        <text x="72" y="52" fill="#475569" fontSize="6.5">
          "Store operations lead requires instance management"
        </text>

        {/* Status transition badge */}
        <g transform="translate(0, 68)">
          <text x="0" y="12" fill="#64748b" fontSize="7" fontWeight="700">
            Review Status:
          </text>
          <rect
            x="65"
            y="2"
            width="80"
            height="18"
            rx="3"
            fill={isApproved ? '#ecfdf5' : '#fef3c7'}
            stroke={isApproved ? '#10b981' : '#f59e0b'}
          />
          <text
            x="105"
            y="14"
            textAnchor="middle"
            fill={isApproved ? '#065f46' : '#b45309'}
            fontSize="7"
            fontWeight="850"
          >
            {isApproved ? '✓ APPROVED' : 'UNDER REVIEW'}
          </text>
          <text x="155" y="14" fill="#64748b" fontSize="6.5">
            {isApproved ? 'Signed off by Priya' : 'Waiting for security team'}
          </text>
        </g>
      </g>

      {/* Footer */}
      <text x="170" y="156" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        Formal ticketing enforces auditability and blocks unapproved privilege escalation.
      </text>
    </g>
  );
}
