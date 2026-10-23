import React from 'react';

/**
 * Scene7_3_5: Reading a denial in Horizon
 * Visual: Horizon error message notification banner:
 * "Danger: You are not authorized to perform this operation. (HTTP 403 Forbidden)"
 * contrasting 401 (Authentication failure) vs 403 (Authorization permission denial).
 */
export default function Scene7_3_5({ currentStep }) {
  const is403Active = currentStep >= 1;

  return (
    <g>
      {/* Horizon Dashboard Frame */}
      <rect x="25" y="10" width="290" height="154" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="25" y="10" width="290" height="24" rx="8" fill="#f8fafc" />
      <text x="40" y="26" fill="#0f172a" fontSize="8" fontWeight="800">
        Horizon · Identity Administration Attempt
      </text>

      {/* Red Error Banner (HTTP 403 Forbidden) */}
      <g transform="translate(40, 42)">
        <rect
          x="0"
          y="0"
          width="260"
          height="48"
          rx="6"
          fill="#fee2e2"
          stroke="#ef4444"
          strokeWidth="1.5"
          filter="drop-shadow(0 4px 6px rgba(239, 68, 68, 0.15))"
        />
        {/* Warning Icon */}
        <circle cx="20" cy="24" r="10" fill="#dc2626" />
        <text x="20" y="28" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">
          !
        </text>

        <text x="38" y="20" fill="#991b1b" fontSize="8" fontWeight="800">
          Danger: You are not authorized to perform this operation.
        </text>
        <text x="38" y="34" fill="#b91c1c" fontSize="8" fontFamily="monospace" fontWeight="900">
          HTTP 403 Forbidden
        </text>
      </g>

      {/* 401 vs 403 Comparison Card */}
      <g transform="translate(40, 100)">
        <rect x="0" y="0" width="125" height="36" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
        <text x="10" y="14" fill="#64748b" fontSize="7" fontWeight="800">
          HTTP 401 Unauthorized
        </text>
        <text x="10" y="26" fill="#0f172a" fontSize="6.5">
          "I don't know who you are"
        </text>

        <rect
          x="135"
          y="0"
          width="125"
          height="36"
          rx="4"
          fill={is403Active ? '#fef2f2' : '#f8fafc'}
          stroke={is403Active ? '#ef4444' : '#e2e8f0'}
        />
        <text x="145" y="14" fill={is403Active ? '#dc2626' : '#64748b'} fontSize="7" fontWeight="800">
          HTTP 403 Forbidden
        </text>
        <text x="145" y="26" fill="#0f172a" fontSize="6.5">
          "I know you, but not allowed"
        </text>
      </g>

      {/* Footer */}
      <text x="170" y="156" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        You will observe this 403 error in Lab 7 when testing permission boundaries.
      </text>
    </g>
  );
}
