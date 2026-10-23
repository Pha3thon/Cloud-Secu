import React from 'react';
import { interpolate } from '@/utils/interpolate';

/**
 * Scene0_3: Why "cloud security" and not just "cloud"?
 * Visual: Paired concept comparison:
 * Traditional Firewall Appliance (left) vs Cloud Security Group (right).
 * Smooth transition highlights identical underlying packet filtering logic.
 */
export default function Scene0_3({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;

  const leftOp = interpolate(p, [0.35, 0.65], [1, 0.45], { ease: 'easeInOut' });
  const rightOp = interpolate(p, [0.35, 0.65], [0.45, 1], { ease: 'easeInOut' });
  const leftBorder = interpolate(p, [0.35, 0.65], ['#0284c7', '#cbd5e1']);
  const rightBorder = interpolate(p, [0.35, 0.65], ['#cbd5e1', '#0284c7']);

  const beamX = interpolate(p, [0.3, 0.68], [140, 180], { ease: 'easeInOut' });
  const beamOp = interpolate(p, [0.28, 0.38, 0.62, 0.7], [0, 1, 1, 0]);

  return (
    <g>
      {/* Title */}
      <rect x="25" y="8" width="290" height="20" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
      <text x="170" y="21" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="800">
        SAME CORE LOGIC · DIFFERENT INTERFACE & LABELS
      </text>

      {/* Left Card: Traditional Firewall Appliance */}
      <g transform="translate(25, 36)" style={{ opacity: isReducedMotion ? 1 : leftOp }}>
        <rect
          x="0"
          y="0"
          width="135"
          height="115"
          rx="6"
          fill="#ffffff"
          stroke={leftBorder}
          strokeWidth="1.8"
        />
        <rect x="0" y="0" width="135" height="24" rx="6" fill="#f1f5f9" />
        <text x="67" y="16" textAnchor="middle" fill="#334155" fontSize="8" fontWeight="800">
          TRADITIONAL IT
        </text>

        {/* Physical 1U Firewall Rack unit */}
        <g transform="translate(12, 32)">
          <rect x="0" y="0" width="111" height="22" rx="3" fill="#1e293b" />
          <circle cx="8" cy="11" r="2.5" fill="#10b981" />
          <circle cx="16" cy="11" r="2" fill="#38bdf8" />
          <rect x="25" y="6" width="14" height="10" rx="1.5" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <rect x="43" y="6" width="14" height="10" rx="1.5" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <text x="85" y="14" fill="#94a3b8" fontSize="6.5" fontFamily="monospace">
            FW-01
          </text>
        </g>

        {/* Rule snippet */}
        <rect x="12" y="62" width="111" height="42" rx="3" fill="#fafafa" stroke="#e2e8f0" />
        <text x="18" y="74" fill="#475569" fontSize="6.5" fontFamily="monospace">
          iptables -A INPUT
        </text>
        <text x="18" y="85" fill="#475569" fontSize="6.5" fontFamily="monospace">
          -p tcp --dport 22 -j ACCEPT
        </text>
        <text x="18" y="96" fill="#dc2626" fontSize="6.5" fontFamily="monospace">
          -j DROP (default)
        </text>
      </g>

      {/* Middle Equal Sign & Gliding Bridge Beam */}
      <circle cx="170" cy="94" r="12" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="170" y="98" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="900">
        ≡
      </text>
      {!isReducedMotion && (
        <circle cx={beamX} cy="94" r="3.5" fill="#0284c7" opacity={beamOp} />
      )}

      {/* Right Card: Cloud Security Group */}
      <g transform="translate(180, 36)" style={{ opacity: isReducedMotion ? 1 : rightOp }}>
        <rect
          x="0"
          y="0"
          width="135"
          height="115"
          rx="6"
          fill="#ffffff"
          stroke={rightBorder}
          strokeWidth="1.8"
        />
        <rect x="0" y="0" width="135" height="24" rx="6" fill={p >= 0.55 ? '#e0f2fe' : '#f1f5f9'} />
        <text x="67" y="16" textAnchor="middle" fill={p >= 0.55 ? '#0369a1' : '#64748b'} fontSize="8" fontWeight="800">
          CLOUD SECURITY GROUP
        </text>

        {/* Security Group Virtual Card */}
        <g transform="translate(12, 32)">
          <rect x="0" y="0" width="111" height="22" rx="3" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1" />
          <circle cx="10" cy="11" r="3" fill="#0284c7" />
          <text x="20" y="14" fill="#0369a1" fontSize="7" fontWeight="700">
            qm-web-sg
          </text>
          <text x="78" y="14" fill="#0d9488" fontSize="6" fontWeight="800">
            STATEFUL
          </text>
        </g>

        {/* Rule snippet */}
        <rect x="12" y="62" width="111" height="42" rx="3" fill="#fafafa" stroke="#e2e8f0" />
        <text x="18" y="74" fill="#0284c7" fontSize="6.5" fontFamily="monospace">
          Ingress: TCP 22 (SSH)
        </text>
        <text x="18" y="85" fill="#0284c7" fontSize="6.5" fontFamily="monospace">
          Remote: 0.0.0.0/0
        </text>
        <text x="18" y="96" fill="#64748b" fontSize="6.5" fontFamily="monospace">
          Default Deny Inbound
        </text>
      </g>

      {/* Bottom Summary callout */}
      <text x="170" y="168" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="700">
        Same packet filtering principles — learn the underlying logic once, apply everywhere.
      </text>
    </g>
  );
}
