import React from 'react';

/**
 * Scene5_1: What are instances, and which OpenStack service handles them?
 * Visual: Nova compute controller managing two distinct virtual machines:
 * qm-web-01 (storefront VM) and qm-db-01 (database VM) on top of the physical hypervisor layer.
 */
export default function Scene5_1({ currentStep }) {
  const isSecondVmActive = currentStep >= 2;

  return (
    <g>
      {/* Nova Compute Header Badge */}
      <rect x="30" y="10" width="280" height="26" rx="6" fill="#0284c7" />
      <text x="170" y="27" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">
        NOVA COMPUTE CONTROLLER · INSTANCE ORCHESTRATION
      </text>

      {/* Two Instances */}
      <g transform="translate(40, 48)">
        {/* qm-web-01 VM */}
        <g transform="translate(0, 0)">
          <rect
            x="0"
            y="0"
            width="115"
            height="85"
            rx="6"
            fill="#ffffff"
            stroke="#0284c7"
            strokeWidth="2"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.06))"
          />
          <rect x="0" y="0" width="115" height="22" rx="6" fill="#e0f2fe" />
          <circle cx="12" cy="11" r="3" fill="#10b981" />
          <text x="20" y="15" fill="#0369a1" fontSize="7.5" fontWeight="800">
            qm-web-01
          </text>
          <text x="57" y="38" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="700">
            Storefront Workload
          </text>
          <text x="57" y="52" textAnchor="middle" fill="#64748b" fontSize="6.5">
            m1.small (1 vCPU, 2GB)
          </text>
          <rect x="15" y="60" width="85" height="16" rx="3" fill="#ecfdf5" />
          <text x="57" y="71" textAnchor="middle" fill="#065f46" fontSize="6.5" fontWeight="800">
            ACTIVE · 10.20.1.3
          </text>
        </g>

        {/* qm-db-01 VM */}
        <g transform="translate(145, 0)" style={{ opacity: isSecondVmActive ? 1 : 0.45, transition: 'all 350ms' }}>
          <rect
            x="0"
            y="0"
            width="115"
            height="85"
            rx="6"
            fill="#ffffff"
            stroke={isSecondVmActive ? '#ca8a04' : '#cbd5e1'}
            strokeWidth={isSecondVmActive ? '2' : '1.5'}
            filter={isSecondVmActive ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.06))' : 'none'}
          />
          <rect x="0" y="0" width="115" height="22" rx="6" fill={isSecondVmActive ? '#fef9c3' : '#f1f5f9'} />
          <circle cx="12" cy="11" r="3" fill={isSecondVmActive ? '#10b981' : '#94a3b8'} />
          <text x="20" y="15" fill={isSecondVmActive ? '#854d0e' : '#64748b'} fontSize="7.5" fontWeight="800">
            qm-db-01
          </text>
          <text x="57" y="38" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="700">
            Database Workload
          </text>
          <text x="57" y="52" textAnchor="middle" fill="#64748b" fontSize="6.5">
            m1.medium (2 vCPU, 4GB)
          </text>
          <rect x="15" y="60" width="85" height="16" rx="3" fill={isSecondVmActive ? '#ecfdf5' : '#f8fafc'} />
          <text
            x="57"
            y="71"
            textAnchor="middle"
            fill={isSecondVmActive ? '#065f46' : '#94a3b8'}
            fontSize="6.5"
            fontWeight="800"
          >
            {isSecondVmActive ? 'ACTIVE · 10.20.1.4' : 'PENDING'}
          </text>
        </g>
      </g>

      {/* Hardware Virtualization Hypervisor Layer */}
      <rect x="40" y="142" width="260" height="20" rx="4" fill="#1e293b" />
      <text x="170" y="155" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="700">
        PHYSICAL HARDWARE POOL / KVM HYPERVISOR LAYER
      </text>
    </g>
  );
}
