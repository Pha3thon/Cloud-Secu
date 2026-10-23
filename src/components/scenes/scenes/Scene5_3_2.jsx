import React from 'react';

/**
 * Scene5_3_2: Image (Source tab)
 * Visual: Launch Instance modal Source tab, showing Select Boot Source = Image,
 * Create New Volume = No, and picking ubuntu-22.04 / mysql-8-server with up-arrow.
 */
export default function Scene5_3_2({ currentStep }) {
  const isImageSelected = currentStep >= 1;

  return (
    <g>
      {/* Dialog Window */}
      <rect x="35" y="15" width="270" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="35" y="15" width="270" height="26" rx="8" fill="#f8fafc" />
      <text x="50" y="32" fill="#0f172a" fontSize="8.5" fontWeight="800">
        Launch Instance · Source Tab
      </text>

      {/* Select Boot Source Controls */}
      <g transform="translate(50, 48)">
        <text x="0" y="10" fill="#64748b" fontSize="7" fontWeight="700">
          Boot Source:
        </text>
        <rect x="60" y="0" width="70" height="16" rx="3" fill="#e0f2fe" stroke="#38bdf8" />
        <text x="95" y="11" textAnchor="middle" fill="#0284c7" fontSize="7" fontWeight="800">
          Image
        </text>

        <text x="145" y="10" fill="#64748b" fontSize="7" fontWeight="700">
          Create Volume:
        </text>
        <rect x="205" y="0" width="30" height="16" rx="3" fill="#f1f5f9" stroke="#cbd5e1" />
        <text x="220" y="11" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="800">
          No
        </text>
      </g>

      {/* Available Images List */}
      <g transform="translate(50, 72)">
        <text x="0" y="10" fill="#334155" fontSize="7" fontWeight="800">
          AVAILABLE GLANCE IMAGES
        </text>

        {/* ubuntu-22.04 row */}
        <g transform="translate(0, 16)">
          <rect
            x="0"
            y="0"
            width="235"
            height="26"
            rx="4"
            fill={isImageSelected ? '#f0fdf4' : '#ffffff'}
            stroke={isImageSelected ? '#22c55e' : '#e2e8f0'}
            strokeWidth="1.5"
          />
          <text x="10" y="16" fill="#0f172a" fontSize="7.5" fontWeight="700">
            ubuntu-22.04 (Ubuntu Server Linux)
          </text>
          <rect x="205" y="4" width="22" height="18" rx="3" fill="#0284c7" />
          <text x="216" y="16" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">
            ↑
          </text>
        </g>

        {/* mysql-8-server row */}
        <g transform="translate(0, 46)">
          <rect x="0" y="0" width="235" height="26" rx="4" fill="#ffffff" stroke="#e2e8f0" />
          <text x="10" y="16" fill="#64748b" fontSize="7.5" fontWeight="700">
            mysql-8-server (Pre-installed MySQL DB)
          </text>
          <rect x="205" y="4" width="22" height="18" rx="3" fill="#cbd5e1" />
          <text x="216" y="16" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">
            ↑
          </text>
        </g>
      </g>
    </g>
  );
}
