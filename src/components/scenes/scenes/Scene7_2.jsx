import React from 'react';

/**
 * Scene7_2: How it works, and why access changes go through a request
 * Visual: Keystone generates signed authentication token with role claims;
 * Services (Nova, Neutron) verify token before processing requests;
 * Access changes require Priya's review so nobody self-escalates.
 */
export default function Scene7_2({ currentStep }) {
  const isTokenIssued = currentStep >= 1;

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        KEYSTONE TOKEN ISSUANCE & LEAST PRIVILEGE GOVERNANCE
      </text>

      {/* Trainee Login Box */}
      <g transform="translate(30, 42)">
        <rect x="0" y="0" width="70" height="85" rx="6" fill="#f0f9ff" stroke="#0284c7" />
        <circle cx="35" cy="22" r="10" fill="#0284c7" />
        <text x="35" y="44" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="700">
          trainee
        </text>
        <text x="35" y="56" textAnchor="middle" fill="#64748b" fontSize="6.5">
          Role: member
        </text>
        <rect x="8" y="64" width="54" height="14" rx="2" fill="#e0f2fe" />
        <text x="35" y="74" textAnchor="middle" fill="#0369a1" fontSize="6" fontWeight="800">
          Project: quickmart
        </text>
      </g>

      {/* Keystone Token Factory */}
      <g transform="translate(120, 42)">
        <rect
          x="0"
          y="0"
          width="100"
          height="85"
          rx="6"
          fill="#ffffff"
          stroke={isTokenIssued ? '#8b5cf6' : '#cbd5e1'}
          strokeWidth="2"
        />
        <rect x="0" y="0" width="100" height="20" rx="6" fill={isTokenIssued ? '#f5f3ff' : '#f1f5f9'} />
        <text x="50" y="14" textAnchor="middle" fill={isTokenIssued ? '#6d28d9' : '#64748b'} fontSize="7" fontWeight="800">
          KEYSTONE TOKEN
        </text>

        {/* Token payload */}
        <text x="10" y="34" fill="#475569" fontSize="6" fontFamily="monospace">
          user: "trainee"
        </text>
        <text x="10" y="45" fill="#475569" fontSize="6" fontFamily="monospace">
          role: "member"
        </text>
        <text x="10" y="56" fill="#475569" fontSize="6" fontFamily="monospace">
          expires: "1h"
        </text>
        <rect x="10" y="63" width="80" height="14" rx="2" fill="#ecfdf5" />
        <text x="50" y="73" textAnchor="middle" fill="#065f46" fontSize="6.5" fontWeight="800">
          CRYPTOGRAPHIC SIGNATURE
        </text>
      </g>

      {/* Target Service Inspection Gates */}
      <g transform="translate(240, 42)">
        <rect x="0" y="0" width="70" height="38" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
        <text x="35" y="16" textAnchor="middle" fill="#0284c7" fontSize="7" fontWeight="800">
          Nova / Neutron
        </text>
        <text x="35" y="28" textAnchor="middle" fill="#16a34a" fontSize="6.5" fontWeight="700">
          Allowed (Member)
        </text>

        <rect x="0" y="47" width="70" height="38" rx="4" fill="#ffffff" stroke="#ef4444" strokeWidth="1" />
        <text x="35" y="63" textAnchor="middle" fill="#dc2626" fontSize="7" fontWeight="800">
          Keystone Admin
        </text>
        <text x="35" y="75" textAnchor="middle" fill="#dc2626" fontSize="6.5" fontWeight="700">
          Denied (HTTP 403)
        </text>
      </g>

      {/* Footer policy */}
      <text x="170" y="165" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        Access changes go through Priya's team so nobody grants themselves elevated access.
      </text>
    </g>
  );
}
