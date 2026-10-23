import React from 'react';

/**
 * Scene2_3_1: Network Name
 * Visual: Horizon Create Network modal highlighting the "Network" tab,
 * typing the name "qm-net" and verifying "Create Subnet" checkbox is checked.
 */
export default function Scene2_3_1({ currentStep }) {
  const isChecked = currentStep >= 2;

  return (
    <g>
      {/* Modal Dialog Window */}
      <rect x="35" y="15" width="270" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* Modal Title Bar */}
      <rect x="35" y="15" width="270" height="26" rx="8" fill="#f8fafc" />
      <text x="50" y="32" fill="#0f172a" fontSize="8.5" fontWeight="800">
        Create Network
      </text>

      {/* Tabs */}
      <g transform="translate(50, 48)">
        <rect x="0" y="0" width="60" height="18" rx="3" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
        <text x="30" y="12" textAnchor="middle" fill="#0284c7" fontSize="7.5" fontWeight="800">
          Network
        </text>

        <rect x="68" y="0" width="55" height="18" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <text x="95" y="12" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="600">
          Subnet
        </text>

        <rect x="131" y="0" width="75" height="18" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <text x="168" y="12" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="600">
          Subnet Details
        </text>
      </g>

      {/* Form Fields */}
      <g transform="translate(50, 78)">
        <text x="0" y="8" fill="#334155" fontSize="7.5" fontWeight="700">
          Network Name
        </text>
        <rect x="0" y="14" width="220" height="22" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
        <text x="8" y="29" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="700">
          {currentStep >= 1 ? 'qm-net' : ''}
        </text>

        {/* Checkbox: Create Subnet */}
        <g transform="translate(0, 46)">
          <rect
            x="0"
            y="0"
            width="12"
            height="12"
            rx="2"
            fill={isChecked ? '#0284c7' : '#ffffff'}
            stroke="#0284c7"
            strokeWidth="1.5"
          />
          {isChecked && (
            <path d="M 2 6 L 5 9 L 10 3" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          )}
          <text x="18" y="9" fill="#0f172a" fontSize="7.5" fontWeight="700">
            Create Subnet (Keep checked)
          </text>
        </g>
      </g>
    </g>
  );
}
