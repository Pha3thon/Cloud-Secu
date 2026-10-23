import React from 'react';

/**
 * Scene6_3_1: Allocate IP To Project
 * Visual: Horizon Allocate Floating IP modal dialog:
 * Selecting Pool = public-net, allocating address 203.0.113.27,
 * and showing project Floating IP quota counter update from 0/3 to 1/3.
 */
export default function Scene6_3_1({ currentStep }) {
  const isAllocated = currentStep >= 1;

  return (
    <g>
      {/* Dialog Frame */}
      <rect x="35" y="15" width="270" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="35" y="15" width="270" height="26" rx="8" fill="#f8fafc" />
      <text x="50" y="32" fill="#0f172a" fontSize="8.5" fontWeight="800">
        Allocate Floating IP
      </text>

      {/* Pool Selector */}
      <g transform="translate(50, 52)">
        <text x="0" y="10" fill="#334155" fontSize="7.5" fontWeight="700">
          Pool *
        </text>
        <rect x="0" y="16" width="240" height="24" rx="4" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
        <text x="12" y="32" fill="#0369a1" fontSize="8" fontFamily="monospace" fontWeight="800">
          public-net (External Pool)
        </text>

        {/* Assigned IP result */}
        {isAllocated && (
          <g transform="translate(0, 48)">
            <rect x="0" y="0" width="240" height="28" rx="4" fill="#ecfdf5" stroke="#10b981" />
            <text x="12" y="14" fill="#065f46" fontSize="7" fontWeight="800">
              ALLOCATED PUBLIC IP:
            </text>
            <text x="12" y="24" fill="#047857" fontSize="8" fontFamily="monospace" fontWeight="900">
              203.0.113.27
            </text>
          </g>
        )}
      </g>

      {/* Quota Gauge Indicator */}
      <g transform="translate(50, 134)">
        <text x="0" y="10" fill="#64748b" fontSize="7" fontWeight="700">
          Floating IP Quota Usage:
        </text>
        <rect x="110" y="2" width="70" height="12" rx="3" fill="#e2e8f0" />
        <rect x="110" y="2" width={isAllocated ? '23' : '2'} height="12" rx="3" fill="#0284c7" />
        <text x="190" y="11" fill="#0f172a" fontSize="7.5" fontWeight="800">
          {isAllocated ? '1 of 3 Used' : '0 of 3 Used'}
        </text>
      </g>
    </g>
  );
}
