import React from 'react';

/**
 * Scene7_3_2: Role assignment
 * Visual: Keystone Role Assignment 3-way binding:
 * User (e.g. ravi-employee) + Project (quickmart) + Role (member)
 * = Authorized Cloud Session.
 */
export default function Scene7_3_2({ currentStep }) {
  const isBound = currentStep >= 1;

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        ROLE ASSIGNMENT = USER + PROJECT + ROLE BINDING
      </text>

      {/* 3 Binding Pillars */}
      <g transform="translate(30, 42)">
        {/* Pillar 1: User */}
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="80" height="75" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="0" y="0" width="80" height="20" rx="6" fill="#e0f2fe" />
          <text x="40" y="14" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="800">
            1. USER
          </text>
          <circle cx="40" cy="38" r="10" fill="#0284c7" />
          <text x="40" y="60" textAnchor="middle" fill="#0f172a" fontSize="7" fontFamily="monospace" fontWeight="700">
            ravi-employee
          </text>
        </g>

        {/* Plus 1 */}
        <text x="90" y="42" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="900">
          +
        </text>

        {/* Pillar 2: Project */}
        <g transform="translate(100, 0)">
          <rect x="0" y="0" width="80" height="75" rx="6" fill="#ffffff" stroke="#0d9488" strokeWidth="1.5" />
          <rect x="0" y="0" width="80" height="20" rx="6" fill="#ccfbf1" />
          <text x="40" y="14" textAnchor="middle" fill="#0f766e" fontSize="7" fontWeight="800">
            2. PROJECT
          </text>
          <rect x="25" y="28" width="30" height="20" rx="3" fill="#0d9488" />
          <text x="40" y="60" textAnchor="middle" fill="#0f172a" fontSize="7" fontFamily="monospace" fontWeight="700">
            quickmart
          </text>
        </g>

        {/* Plus 2 */}
        <text x="190" y="42" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="900">
          +
        </text>

        {/* Pillar 3: Role */}
        <g transform="translate(200, 0)">
          <rect x="0" y="0" width="80" height="75" rx="6" fill="#ffffff" stroke="#9333ea" strokeWidth="1.5" />
          <rect x="0" y="0" width="80" height="20" rx="6" fill="#f5f3ff" />
          <text x="40" y="14" textAnchor="middle" fill="#6d28d9" fontSize="7" fontWeight="800">
            3. ROLE
          </text>
          <rect x="20" y="28" width="40" height="20" rx="4" fill="#9333ea" />
          <text x="40" y="41" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="800">
            MEMBER
          </text>
          <text x="40" y="60" textAnchor="middle" fill="#0f172a" fontSize="6.5">
            Clearance
          </text>
        </g>
      </g>

      {/* Resulting Permission Scope */}
      <g transform="translate(45, 128)">
        <rect
          x="0"
          y="0"
          width="250"
          height="28"
          rx="5"
          fill={isBound ? '#f0fdf4' : '#f8fafc'}
          stroke={isBound ? '#16a34a' : '#cbd5e1'}
          strokeWidth="1.5"
        />
        <text
          x="125"
          y="18"
          textAnchor="middle"
          fill={isBound ? '#15803d' : '#64748b'}
          fontSize="7.5"
          fontWeight="800"
        >
          {isBound
            ? '✓ AUTHORIZED: User can manage instances and networks in quickmart'
            : 'Binding in progress...'}
        </text>
      </g>
    </g>
  );
}
