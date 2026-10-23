import React from 'react';

/**
 * Scene3_3_3: Interfaces
 * Visual: Router's Interfaces tab dialog adding an internal interface for qm-subnet,
 * which binds to the subnet gateway IP 10.20.1.1.
 */
export default function Scene3_3_3({ currentStep }) {
  const isBound = currentStep >= 1;

  return (
    <g>
      {/* Modal Dialog */}
      <rect x="35" y="15" width="270" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="35" y="15" width="270" height="26" rx="8" fill="#f8fafc" />
      <text x="50" y="32" fill="#0f172a" fontSize="8.5" fontWeight="800">
        qm-router · Add Interface
      </text>

      {/* Form Fields */}
      <g transform="translate(50, 52)">
        <text x="0" y="10" fill="#334155" fontSize="7.5" fontWeight="700">
          Subnet *
        </text>
        <rect
          x="0"
          y="16"
          width="240"
          height="24"
          rx="4"
          fill="#f0f9ff"
          stroke="#0284c7"
          strokeWidth="1.5"
        />
        <text x="10" y="32" fill="#0369a1" fontSize="7.5" fontFamily="monospace" fontWeight="800">
          qm-subnet: 10.20.1.0/24 (qm-net)
        </text>

        <text x="0" y="58" fill="#334155" fontSize="7.5" fontWeight="700">
          IP Address (Optional)
        </text>
        <rect x="0" y="64" width="240" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="10" y="80" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
          {isBound ? '10.20.1.1 (claimed automatically from subnet)' : 'Leave blank for default subnet gateway'}
        </text>
      </g>

      {/* Submit button */}
      <rect x="225" y="138" width="65" height="20" rx="4" fill="#0d9488" />
      <text x="257" y="151" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="800">
        Submit
      </text>
    </g>
  );
}
