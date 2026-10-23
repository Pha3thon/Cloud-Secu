import React from 'react';

/**
 * Scene5_3_5: Security Groups
 * Visual: Launch Instance modal Security Groups tab:
 * Default group pre-allocated; removing it with down-arrow (↓),
 * then allocating only qm-web-sg with up-arrow (↑) to prevent unintended access widening.
 */
export default function Scene5_3_5({ currentStep }) {
  const isDefaultRemoved = currentStep >= 1;
  const isCustomAllocated = currentStep >= 2;

  return (
    <g>
      {/* Dialog Frame */}
      <rect x="35" y="15" width="270" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="35" y="15" width="270" height="26" rx="8" fill="#f8fafc" />
      <text x="50" y="32" fill="#0f172a" fontSize="8.5" fontWeight="800">
        Launch Instance · Security Groups
      </text>

      {/* Allocated Box */}
      <g transform="translate(50, 48)">
        <text x="0" y="10" fill="#0284c7" fontSize="7" fontWeight="800">
          ALLOCATED SECURITY GROUPS
        </text>
        <rect x="0" y="15" width="240" height="28" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />

        {isCustomAllocated ? (
          <g>
            <text x="12" y="32" fill="#0369a1" fontSize="7.5" fontFamily="monospace" fontWeight="800">
              qm-web-sg (Target role clearance)
            </text>
            <rect x="210" y="20" width="20" height="18" rx="3" fill="#cbd5e1" />
            <text x="220" y="32" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="800">
              ↓
            </text>
          </g>
        ) : !isDefaultRemoved ? (
          <g>
            <text x="12" y="32" fill="#dc2626" fontSize="7.5" fontFamily="monospace" fontWeight="700">
              default (Pre-allocated — remove this!)
            </text>
            <rect x="210" y="20" width="20" height="18" rx="3" fill="#ef4444" />
            <text x="220" y="32" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900">
              ↓
            </text>
          </g>
        ) : (
          <text x="12" y="32" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
            (Empty — allocate custom group)
          </text>
        )}
      </g>

      {/* Available Box */}
      <g transform="translate(50, 96)">
        <text x="0" y="10" fill="#64748b" fontSize="7" fontWeight="800">
          AVAILABLE SECURITY GROUPS
        </text>
        <rect x="0" y="15" width="240" height="24" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
        <text x="12" y="30" fill="#334155" fontSize="7" fontFamily="monospace">
          qm-web-sg (Ports: 22, 80, 443)
        </text>
        <rect x="210" y="18" width="20" height="18" rx="3" fill="#0284c7" />
        <text x="220" y="30" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900">
          ↑
        </text>
      </g>

      {/* Bottom Advice */}
      <text x="170" y="154" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="600">
        Groups add together: leaving 'default' attached silently widens internal exposure.
      </text>
    </g>
  );
}
