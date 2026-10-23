import React from 'react';

/**
 * Scene5_3_6: Key Pair
 * Visual: Asymmetric key generation:
 * Public lock injected into instance qm-web-01, while private key file (qm-key.pem)
 * downloads safely onto Kali Linux workstation.
 */
export default function Scene5_3_6({ currentStep }) {
  const isKeySaved = currentStep >= 1;

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        ASYMMETRIC SSH KEY PAIR: PUBLIC LOCK & PRIVATE KEY
      </text>

      {/* Center Key Generation Generator Icon */}
      <circle cx="170" cy="55" r="16" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="170" y="59" textAnchor="middle" fill="#b45309" fontSize="9" fontWeight="900">
        qm-key
      </text>

      {/* Left: Cloud Instance (Gets Public Key Lock) */}
      <g transform="translate(30, 80)">
        <rect x="0" y="0" width="115" height="75" rx="6" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
        <rect x="0" y="0" width="115" height="20" rx="6" fill="#0284c7" />
        <text x="57" y="14" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="800">
          CLOUD INSTANCE
        </text>

        {/* Lock Icon */}
        <g transform="translate(48, 30)">
          <rect x="2" y="8" width="16" height="14" rx="2" fill="#0284c7" />
          <path d="M 5 8 L 5 4 C 5 1 15 1 15 4 L 15 8" fill="none" stroke="#0284c7" strokeWidth="2" />
        </g>
        <text x="57" y="62" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="700">
          Public Key (.pub) Injected
        </text>
      </g>

      {/* Right: Kali Workstation (Receives Private Key .pem) */}
      <g transform="translate(195, 80)">
        <rect
          x="0"
          y="0"
          width="115"
          height="75"
          rx="6"
          fill="#ffffff"
          stroke={isKeySaved ? '#16a34a' : '#cbd5e1'}
          strokeWidth="1.5"
        />
        <rect x="0" y="0" width="115" height="20" rx="6" fill={isKeySaved ? '#16a34a' : '#f1f5f9'} />
        <text x="57" y="14" textAnchor="middle" fill={isKeySaved ? '#ffffff' : '#64748b'} fontSize="7.5" fontWeight="800">
          KALI WORKSTATION
        </text>

        {/* Key File Icon */}
        <g transform="translate(45, 26)">
          <rect x="0" y="0" width="24" height="28" rx="2" fill="#f8fafc" stroke="#cbd5e1" />
          <path d="M 6 12 L 18 12 M 6 17 L 15 17" stroke="#94a3b8" strokeWidth="1.5" />
        </g>
        <text
          x="57"
          y="64"
          textAnchor="middle"
          fill={isKeySaved ? '#15803d' : '#64748b'}
          fontSize="7"
          fontFamily="monospace"
          fontWeight="700"
        >
          {isKeySaved ? 'qm-key.pem saved' : 'Downloading...'}
        </text>
      </g>

      {/* Branching arrows */}
      <path d="M 158 66 L 95 80" stroke="#0284c7" strokeWidth="2" strokeDasharray="3,3" />
      <path d="M 182 66 L 245 80" stroke="#16a34a" strokeWidth="2" strokeDasharray="3,3" />

      {/* Footer caution */}
      <text x="170" y="172" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        Private key is downloaded once. If lost, it cannot be recovered from OpenStack.
      </text>
    </g>
  );
}
