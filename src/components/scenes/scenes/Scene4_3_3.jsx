import React from 'react';

/**
 * Scene4_3_3: Remote: CIDR or Security Group
 * Visual: Comparison between Remote = CIDR (0.0.0.0/0 entire globe can knock)
 * vs Remote = Security Group (only instances wearing the qm-web-sg badge).
 */
export default function Scene4_3_3({ currentStep }) {
  const isSgMode = currentStep >= 2;

  return (
    <g>
      {/* Title */}
      <rect x="25" y="10" width="290" height="20" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="23" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        REMOTE SOURCE: CIDR VS SECURITY GROUP MEMBERSHIP
      </text>

      {/* Left: CIDR 0.0.0.0/0 (Open World) */}
      <g transform="translate(30, 42)">
        <rect
          x="0"
          y="0"
          width="130"
          height="105"
          rx="6"
          fill="#ffffff"
          stroke={!isSgMode ? '#ea580c' : '#cbd5e1'}
          strokeWidth={!isSgMode ? '2' : '1.5'}
        />
        <rect x="0" y="0" width="130" height="24" rx="6" fill="#fff7ed" />
        <text x="65" y="16" textAnchor="middle" fill="#c2410c" fontSize="8" fontWeight="800">
          REMOTE: CIDR (0.0.0.0/0)
        </text>

        {/* Globe icon */}
        <circle cx="65" cy="52" r="16" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
        <text x="65" y="56" textAnchor="middle" fill="#c2410c" fontSize="8" fontWeight="900">
          WWW
        </text>

        <rect x="15" y="78" width="100" height="18" rx="3" fill="#f8fafc" />
        <text x="65" y="90" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="700">
          Open to the entire internet
        </text>
      </g>

      {/* Right: Remote Security Group (qm-web-sg badge) */}
      <g transform="translate(180, 42)">
        <rect
          x="0"
          y="0"
          width="130"
          height="105"
          rx="6"
          fill="#ffffff"
          stroke={isSgMode ? '#0284c7' : '#cbd5e1'}
          strokeWidth={isSgMode ? '2' : '1.5'}
          filter={isSgMode ? 'drop-shadow(0 4px 8px rgba(2, 132, 199, 0.12))' : 'none'}
        />
        <rect x="0" y="0" width="130" height="24" rx="6" fill={isSgMode ? '#e0f2fe' : '#f1f5f9'} />
        <text x="65" y="16" textAnchor="middle" fill={isSgMode ? '#0369a1' : '#64748b'} fontSize="8" fontWeight="800">
          REMOTE: SECURITY GROUP
        </text>

        {/* Badge icon */}
        <g transform="translate(45, 38)">
          <rect x="0" y="0" width="40" height="28" rx="4" fill="#0284c7" />
          <circle cx="20" cy="10" r="4" fill="#ffffff" />
          <text x="20" y="22" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="800">
            qm-web-sg
          </text>
        </g>

        <rect x="15" y="78" width="100" height="18" rx="3" fill="#ecfdf5" />
        <text x="65" y="90" textAnchor="middle" fill="#065f46" fontSize="6.5" fontWeight="700">
          Only trusted peer members
        </text>
      </g>

      {/* Footer advice */}
      <text x="170" y="166" textAnchor="middle" fill="#475569" fontSize="7.5" fontWeight="600">
        Naming a group is safer: IPs can change, but security group badges follow instances.
      </text>
    </g>
  );
}
