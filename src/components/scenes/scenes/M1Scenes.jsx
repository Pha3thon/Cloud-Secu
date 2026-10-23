import React from 'react';
import { interpolate } from '@/utils/interpolate';

// ==========================================
// TOPIC 1 SCENES (Computer Architecture & OS)
// ==========================================

export function SceneM1_1_1({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;

  // Outer Ring 3 rotating dashed line
  const ring3Dash = interpolate(p, [0, 1], [0, 48]);
  // Syscall trap packet gliding from user space into ring 0
  const packetY = interpolate(p, [0.15, 0.45], [68, 120], { ease: 'easeInOut' });
  const packetOp = interpolate(p, [0.12, 0.20, 0.42, 0.48], [0, 1, 1, 0]);

  // Ring 0 Kernel pulse / expansion when syscall arrives
  const ring0R = interpolate(p, [0.4, 0.55, 0.7], [42, 45, 42], { ease: 'easeInOut' });
  const ring0Fill = interpolate(p, [0.4, 0.55, 0.7], ['#f0f9ff', '#bae6fd', '#e0f2fe']);

  // Hardware execution pulse from Kernel to physical hardware base
  const hwBeamY = interpolate(p, [0.55, 0.78], [130, 174], { ease: 'easeInOut' });
  const hwBeamOp = interpolate(p, [0.52, 0.58, 0.74, 0.82], [0, 1, 1, 0]);
  const hwBg = interpolate(p, [0.72, 0.88], ['#334155', '#0f172a']);

  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">OPERATING SYSTEM PRIVILEGE RINGS</text>

      {/* Outer Ring 3: User Space */}
      <circle
        cx="170"
        cy="120"
        r="68"
        fill="#f0f9ff"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeDasharray="6 3"
        strokeDashoffset={isReducedMotion ? 0 : ring3Dash}
      />
      <text x="170" y="68" textAnchor="middle" fill="#0369a1" fontSize="9.5" fontWeight="700">Ring 3: User Space (Apps, CLI, Web)</text>

      {/* Syscall trap packet gliding down */}
      {!isReducedMotion && (
        <circle cx="170" cy={packetY} r="4" fill="#0284c7" opacity={packetOp} />
      )}

      {/* Inner Ring 0: Kernel Space */}
      <circle
        cx="170"
        cy="125"
        r={isReducedMotion ? 42 : ring0R}
        fill={isReducedMotion ? '#e0f2fe' : ring0Fill}
        stroke="#0284c7"
        strokeWidth="2.5"
      />
      <text x="170" y="118" textAnchor="middle" fill="#0c4a6e" fontSize="10" fontWeight="800">Ring 0: Kernel</text>
      <text x="170" y="132" textAnchor="middle" fill="#0369a1" fontSize="8.5">Direct Hardware Access</text>

      {/* Hardware execution beam */}
      {!isReducedMotion && (
        <circle cx="170" cy={hwBeamY} r="3" fill="#38bdf8" opacity={hwBeamOp} />
      )}

      {/* Hardware Base */}
      <rect x="70" y="174" width="200" height="20" rx="4" fill={isReducedMotion ? '#0f172a' : hwBg} />
      <text x="170" y="188" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="700">Physical Hardware: CPU • RAM • Devices</text>
    </g>
  );
}

export function SceneM1_1_2({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const parts = [
    { name: 'CPU (Registers)', role: 'Fetch / Decode / Execute', color: '#0284c7', range: [0.05, 0.32] },
    { name: 'RAM (Main Memory)', role: 'Volatile Working Buffer', color: '#0d9488', range: [0.32, 0.64] },
    { name: 'Persistent NVMe', role: 'OS Images & Datastores', color: '#6366f1', range: [0.64, 0.95] }
  ];

  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">VON NEUMANN SUBSYSTEMS</text>
      {parts.map((item, idx) => {
        const y = 58 + idx * 44;
        const [startP, endP] = item.range;
        const active = isReducedMotion || p >= startP;
        const itemOp = interpolate(p, [startP - 0.05, endP], [0.45, 1]);
        const pulseX = interpolate(p, [startP, endP], [45, 290], { ease: 'easeInOut' });
        const pulseOp = interpolate(p, [startP, startP + 0.05, endP - 0.05, endP], [0, 1, 1, 0]);

        return (
          <g key={item.name} transform={`translate(40, ${y})`} style={{ opacity: isReducedMotion ? 1 : itemOp }}>
            <rect x="0" y="0" width="260" height="36" rx="6" fill={active ? '#ffffff' : '#f1f5f9'} stroke={active ? item.color : '#cbd5e1'} strokeWidth={active ? 2 : 1} />
            <circle cx="20" cy="18" r="6" fill={active ? item.color : '#94a3b8'} />
            <text x="36" y="16" fill="#0f172a" fontSize="10" fontWeight="700">{item.name}</text>
            <text x="36" y="28" fill="#64748b" fontSize="8.5">{item.role}</text>
            {!isReducedMotion && (
              <circle cx={pulseX - 40} cy="18" r="2.5" fill={item.color} opacity={pulseOp} />
            )}
          </g>
        );
      })}
    </g>
  );
}

export function SceneM1_1_3({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const trapY = interpolate(p, [0.15, 0.45], [105, 135], { ease: 'easeInOut' });
  const trapOp = interpolate(p, [0.1, 0.18, 0.42, 0.5], [0, 1, 1, 0]);
  const kernelActive = isReducedMotion || p >= 0.45;
  const returnY = interpolate(p, [0.55, 0.85], [135, 105], { ease: 'easeInOut' });
  const returnOp = interpolate(p, [0.52, 0.60, 0.82, 0.88], [0, 1, 1, 0]);

  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">SYSTEM CALL BOUNDARY</text>
      <rect x="35" y="55" width="270" height="50" rx="6" fill="#eff6ff" stroke="#93c5fd" />
      <text x="45" y="74" fill="#1e40af" fontSize="10" fontWeight="700">User Space (Unprivileged)</text>
      <text x="45" y="90" fill="#3b82f6" fontSize="8.5">app.py executes: open('/var/log/access.log')</text>

      {/* Syscall Bridge */}
      <line x1="170" y1="105" x2="170" y2="135" stroke={kernelActive ? '#0284c7' : '#94a3b8'} strokeWidth="2.5" strokeDasharray="3 3" />
      <rect x="110" y="112" width="120" height="18" rx="4" fill="#0284c7" />
      <text x="170" y="125" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800">Syscall Trap (sys_open)</text>

      {/* Syscall downwards packet */}
      {!isReducedMotion && (
        <circle cx="170" cy={trapY} r="3.5" fill="#38bdf8" opacity={trapOp} />
      )}
      {/* Return file descriptor packet */}
      {!isReducedMotion && (
        <circle cx="170" cy={returnY} r="3.5" fill="#10b981" opacity={returnOp} />
      )}

      <rect x="35" y="135" width="270" height="50" rx="6" fill="#f0fdf4" stroke={kernelActive ? '#86efac' : '#cbd5e1'} />
      <text x="45" y="154" fill="#166534" fontSize="10" fontWeight="700">Kernel Space (Privileged Ring 0)</text>
      <text x="45" y="170" fill="#15803d" fontSize="8.5">VFS checks inode permissions → returns file descriptor</text>
    </g>
  );
}

export function SceneM1_1_4({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const pageIdx = isReducedMotion ? 2 : Math.min(2, Math.floor(p * 3));
  const mappingLineY = interpolate(p, [0.1, 0.9], [98, 154]);

  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">VIRTUAL MEMORY & SCHEDULER</text>
      <rect x="40" y="60" width="115" height="120" rx="6" fill="#ffffff" stroke="#cbd5e1" />
      <text x="97" y="78" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="700">Virtual Pages</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x="50" y={88 + i * 28} width="95" height="20" rx="4" fill={pageIdx >= i ? '#e0f2fe' : '#f1f5f9'} stroke="#38bdf8" />
      ))}
      <line x1="155" y1={isReducedMotion ? 120 : mappingLineY} x2="185" y2={isReducedMotion ? 120 : mappingLineY} stroke="#0284c7" strokeWidth="2.5" />
      <rect x="185" y="60" width="115" height="120" rx="6" fill="#ffffff" stroke="#cbd5e1" />
      <text x="242" y="78" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="700">Physical RAM Frames</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x="195" y={88 + i * 28} width="95" height="20" rx="4" fill={pageIdx >= i ? '#f0fdf4' : '#f1f5f9'} stroke="#4ade80" />
      ))}
    </g>
  );
}

export function SceneM1_1_5({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const pulse = interpolate(p, [0, 0.5, 1], [32, 36, 32]);
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="45" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">OS CHECK-IN RECAP</text>
      <circle cx="170" cy="100" r={isReducedMotion ? 34 : pulse} fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="170" y="98" textAnchor="middle" fill="#0369a1" fontSize="14" fontWeight="800">Ring 0</text>
      <text x="170" y="112" textAnchor="middle" fill="#0284c7" fontSize="8">KERNEL</text>
      <rect x="50" y="148" width="240" height="34" rx="6" fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="170" y="169" textAnchor="middle" fill="#065f46" fontSize="9.5" fontWeight="700">✓ Security Isolation Verified via Rings</text>
    </g>
  );
}

// ==========================================
// TOPIC 2 SCENES (Linux & Permissions)
// ==========================================

export function SceneM1_2_1({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const dirs = ['/bin', '/etc', '/home', '/var'];
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">FILESYSTEM HIERARCHY STANDARD</text>
      {/* Root Node */}
      <rect x="145" y="55" width="50" height="24" rx="4" fill="#0f172a" />
      <text x="170" y="71" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="800">/</text>

      {/* Branches */}
      {dirs.map((dir, idx) => {
        const x = 35 + idx * 72;
        const active = isReducedMotion || p >= idx * 0.25;
        const branchOp = interpolate(p, [idx * 0.25, (idx + 1) * 0.25], [0.3, 1]);
        return (
          <g key={dir} transform={`translate(${x}, 105)`} style={{ opacity: isReducedMotion ? 1 : branchOp }}>
            <line x1="30" y1="-26" x2="30" y2="0" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="0" y="0" width="60" height="28" rx="4" fill={active ? '#ffffff' : '#f1f5f9'} stroke={active ? '#0284c7' : '#cbd5e1'} strokeWidth={active ? 2 : 1} />
            <text x="30" y="18" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="700">{dir}</text>
          </g>
        );
      })}
      <rect x="180" y="152" width="130" height="26" rx="4" fill="#fef3c7" stroke="#fcd34d" />
      <text x="245" y="169" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="700">.access_notes (Hidden)</text>
    </g>
  );
}

export function SceneM1_2_2({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const leftOp = interpolate(p, [0.35, 0.65], [1, 0.45]);
  const rightOp = interpolate(p, [0.35, 0.65], [0.45, 1]);
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">USERS, GROUPS & OWNERSHIP</text>
      <rect x="35" y="60" width="125" height="110" rx="6" fill="#eff6ff" stroke="#93c5fd" style={{ opacity: isReducedMotion ? 1 : leftOp }} />
      <text x="97" y="82" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="700">User: trainee (UID 1000)</text>
      <text x="97" y="105" textAnchor="middle" fill="#3b82f6" fontSize="8.5">Group: trainee (GID 1000)</text>
      <text x="97" y="125" textAnchor="middle" fill="#3b82f6" fontSize="8.5">Home: /home/trainee</text>

      <rect x="180" y="60" width="125" height="110" rx="6" fill="#fef2f2" stroke="#fecaca" style={{ opacity: isReducedMotion ? 1 : rightOp }} />
      <text x="242" y="82" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="700">Root Superuser (UID 0)</text>
      <text x="242" y="105" textAnchor="middle" fill="#b91c1c" fontSize="8.5">Unrestricted System Access</text>
      <text x="242" y="125" textAnchor="middle" fill="#b91c1c" fontSize="8.5">Overrides All POSIX Bits</text>
    </g>
  );
}

export function SceneM1_2_3({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const blocks = [
    { title: 'Owner (u)', octal: '6', text: 'rw- (4+2)', color: '#0284c7', range: [0.05, 0.35] },
    { title: 'Group (g)', octal: '4', text: 'r-- (4)', color: '#0d9488', range: [0.35, 0.65] },
    { title: 'Others (o)', octal: '0', text: '--- (0)', color: '#e11d48', range: [0.65, 0.95] }
  ];
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">OCTAL PERMISSION CALCULATION</text>
      {blocks.map((b, idx) => {
        const x = 35 + idx * 95;
        const [startP, endP] = b.range;
        const active = isReducedMotion || p >= startP;
        const bOp = interpolate(p, [startP - 0.05, endP], [0.4, 1]);
        return (
          <g key={b.title} transform={`translate(${x}, 65)`} style={{ opacity: isReducedMotion ? 1 : bOp }}>
            <rect x="0" y="0" width="80" height="75" rx="6" fill={active ? '#ffffff' : '#f1f5f9'} stroke={active ? b.color : '#cbd5e1'} strokeWidth={active ? 2 : 1} />
            <text x="40" y="22" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="700">{b.title}</text>
            <text x="40" y="48" textAnchor="middle" fill={b.color} fontSize="20" fontWeight="800">{b.octal}</text>
            <text x="40" y="66" textAnchor="middle" fill="#64748b" fontSize="8.5">{b.text}</text>
          </g>
        );
      })}
      <rect x="50" y="152" width="240" height="26" rx="4" fill="#0f172a" />
      <text x="170" y="169" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="800">Result Mode: 640 (-rw-r-----)</text>
    </g>
  );
}

export function SceneM1_2_4({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const pulse = interpolate(p, [0, 0.5, 1], [0.85, 1, 0.85]);
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">SPECIAL PERMISSIONS & SUID</text>
      <rect x="40" y="60" width="260" height="48" rx="6" fill="#fef2f2" stroke="#f87171" />
      <text x="50" y="80" fill="#991b1b" fontSize="10" fontWeight="700">SUID (Set User ID) Bit: 4755</text>
      <text x="50" y="96" fill="#b91c1c" fontSize="8.5">-rwsr-xr-x 1 root root /usr/bin/passwd</text>
      <rect x="40" y="120" width="260" height="48" rx="6" fill="#fffbeb" stroke="#fcd34d" style={{ opacity: isReducedMotion ? 1 : pulse }} />
      <text x="50" y="140" fill="#92400e" fontSize="10" fontWeight="700">Risk: World-Writable 777</text>
      <text x="50" y="156" fill="#b45309" fontSize="8.5">-rwxrwxrwx allows any local user to modify or inject commands</text>
    </g>
  );
}

export function SceneM1_2_5() {
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="45" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">PERMISSIONS CHECK-IN</text>
      <rect x="60" y="65" width="220" height="60" rx="6" fill="#f0f9ff" stroke="#38bdf8" />
      <text x="170" y="92" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="800">chmod 740 script.sh</text>
      <text x="170" y="110" textAnchor="middle" fill="#0284c7" fontSize="9">Owner: rwx | Group: r-- | Others: ---</text>
      <rect x="60" y="138" width="220" height="30" rx="4" fill="#ecfdf5" stroke="#86efac" />
      <text x="170" y="157" textAnchor="middle" fill="#166534" fontSize="9.5" fontWeight="700">✓ Ready for Lab 1 Terminal Tasks</text>
    </g>
  );
}

// ==========================================
// TOPIC 3 SCENES (Networking & CIDR)
// ==========================================

export function SceneM1_3_1({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const layers = ['7. Application (HTTP/DNS)', '4. Transport (TCP/UDP)', '3. Network (IPv4/Routing)', '2. Data Link (Ethernet)'];
  const packetY = interpolate(p, [0.1, 0.9], [68, 158], { ease: 'easeInOut' });

  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">NETWORK PROTOCOL LAYERS</text>
      {layers.map((l, idx) => {
        const y = 56 + idx * 30;
        const active = isReducedMotion || p >= idx * 0.25;
        return (
          <g key={l} transform={`translate(40, ${y})`}>
            <rect x="0" y="0" width="260" height="24" rx="4" fill={active ? '#0284c7' : '#f1f5f9'} stroke="#0369a1" />
            <text x="130" y="16" textAnchor="middle" fill={active ? '#ffffff' : '#64748b'} fontSize="9" fontWeight="700">{l}</text>
          </g>
        );
      })}
      {!isReducedMotion && (
        <circle cx="280" cy={packetY} r="4" fill="#f59e0b" />
      )}
    </g>
  );
}

export function SceneM1_3_2() {
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">IPV4 32-BIT ANATOMY</text>
      <rect x="40" y="65" width="260" height="40" rx="6" fill="#ffffff" stroke="#cbd5e1" />
      <text x="170" y="90" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="800">10 . 20 . 1 . 15</text>

      <rect x="40" y="115" width="195" height="35" rx="4" fill="#eff6ff" stroke="#93c5fd" />
      <text x="137" y="136" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="700">Network ID (24 bits)</text>

      <rect x="240" y="115" width="60" height="35" rx="4" fill="#fef2f2" stroke="#fecaca" />
      <text x="270" y="136" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="700">Host (8b)</text>
    </g>
  );
}

export function SceneM1_3_3() {
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">CIDR /24 SUBNET CALCULATION</text>
      <rect x="40" y="60" width="260" height="70" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
      <text x="50" y="82" fill="#0f172a" fontSize="10" fontWeight="700">Subnet: 10.20.1.0 / 24</text>
      <text x="50" y="100" fill="#0284c7" fontSize="9">Total addresses: 2^(32-24) = 2^8 = 256</text>
      <text x="50" y="116" fill="#16a34a" fontSize="9" fontWeight="700">Usable Hosts: 256 - 2 = 254 IPs (10.20.1.1 – 10.20.1.254)</text>

      <rect x="40" y="142" width="125" height="26" rx="4" fill="#f1f5f9" />
      <text x="102" y="159" textAnchor="middle" fill="#64748b" fontSize="8.5">Net ID: 10.20.1.0</text>
      <rect x="175" y="142" width="125" height="26" rx="4" fill="#f1f5f9" />
      <text x="237" y="159" textAnchor="middle" fill="#64748b" fontSize="8.5">Bcast: 10.20.1.255</text>
    </g>
  );
}

export function SceneM1_3_4({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const rfc = [
    { net: '10.0.0.0 / 8', scope: '16.7M hosts (Enterprises/VPCs)', range: [0.05, 0.35] },
    { net: '172.16.0.0 / 12', scope: '1.04M hosts (Container subnets)', range: [0.35, 0.65] },
    { net: '192.168.0.0 / 16', scope: '65K hosts (Branch / Office)', range: [0.65, 0.95] }
  ];
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">RFC 1918 PRIVATE RANGES</text>
      {rfc.map((r, idx) => {
        const y = 58 + idx * 40;
        const [startP, endP] = r.range;
        const active = isReducedMotion || p >= startP;
        const itemOp = interpolate(p, [startP - 0.05, endP], [0.4, 1]);
        return (
          <g key={r.net} transform={`translate(40, ${y})`} style={{ opacity: isReducedMotion ? 1 : itemOp }}>
            <rect x="0" y="0" width="260" height="32" rx="4" fill={active ? '#f0fdf4' : '#f1f5f9'} stroke={active ? '#16a34a' : '#cbd5e1'} />
            <text x="15" y="20" fill="#15803d" fontSize="10" fontWeight="800">{r.net}</text>
            <text x="120" y="20" fill="#64748b" fontSize="8.5">{r.scope}</text>
          </g>
        );
      })}
    </g>
  );
}

export function SceneM1_3_5() {
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="45" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">SUBNET FORMULA RECAP</text>
      <rect x="40" y="65" width="260" height="50" rx="6" fill="#eff6ff" stroke="#3b82f6" />
      <text x="170" y="95" textAnchor="middle" fill="#1d4ed8" fontSize="13" fontWeight="800">2^(32 - Prefix) - 2</text>
      <rect x="40" y="128" width="260" height="36" rx="6" fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="170" y="150" textAnchor="middle" fill="#065f46" fontSize="9.5" fontWeight="700">✓ /26 = 64 - 2 = 62 Usable Hosts</text>
    </g>
  );
}

// ==========================================
// TOPIC 4 SCENES (Protocols & Ports)
// ==========================================

export function SceneM1_4_1({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const tcpOp = interpolate(p, [0.35, 0.65], [1, 0.5]);
  const udpOp = interpolate(p, [0.35, 0.65], [0.5, 1]);
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">TCP VS. UDP PROTOCOLS</text>
      <rect x="35" y="60" width="125" height="110" rx="6" fill="#eff6ff" stroke="#93c5fd" style={{ opacity: isReducedMotion ? 1 : tcpOp }} />
      <text x="97" y="82" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="800">TCP (Reliable)</text>
      <text x="97" y="102" textAnchor="middle" fill="#3b82f6" fontSize="8.5">• 3-Way Handshake</text>
      <text x="97" y="118" textAnchor="middle" fill="#3b82f6" fontSize="8.5">• Packet ACKs</text>
      <text x="97" y="134" textAnchor="middle" fill="#3b82f6" fontSize="8.5">• HTTP, SSH, MySQL</text>

      <rect x="180" y="60" width="125" height="110" rx="6" fill="#faf5ff" stroke="#d8b4fe" style={{ opacity: isReducedMotion ? 1 : udpOp }} />
      <text x="242" y="82" textAnchor="middle" fill="#6b21a8" fontSize="11" fontWeight="800">UDP (Fast)</text>
      <text x="242" y="102" textAnchor="middle" fill="#9333ea" fontSize="8.5">• Connectionless</text>
      <text x="242" y="118" textAnchor="middle" fill="#9333ea" fontSize="8.5">• No Handshake</text>
      <text x="242" y="134" textAnchor="middle" fill="#9333ea" fontSize="8.5">• DNS, Streaming</text>
    </g>
  );
}

export function SceneM1_4_2({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;

  // 1. SYN packet: client (70) -> server (260)
  const synX = interpolate(p, [0.08, 0.32], [70, 260], { ease: 'easeInOut' });
  const synOp = interpolate(p, [0.05, 0.12, 0.30, 0.35], [0, 1, 1, 0]);

  // 2. SYN-ACK packet: server (260) -> client (70)
  const synAckX = interpolate(p, [0.38, 0.65], [260, 70], { ease: 'easeInOut' });
  const synAckOp = interpolate(p, [0.35, 0.42, 0.62, 0.68], [0, 1, 1, 0]);

  // 3. ACK packet: client (70) -> server (260)
  const ackX = interpolate(p, [0.68, 0.92], [70, 260], { ease: 'easeInOut' });
  const ackOp = interpolate(p, [0.65, 0.72, 0.90, 0.95], [0, 1, 1, 0]);

  const established = isReducedMotion || p >= 0.85;

  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="40" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">TCP THREE-WAY HANDSHAKE</text>
      {/* Client and Server Pillars */}
      <rect x="40" y="55" width="60" height="24" rx="4" fill="#0284c7" />
      <text x="70" y="71" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">Client</text>
      <rect x="240" y="55" width="60" height="24" rx="4" fill="#0f172a" />
      <text x="270" y="71" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">Server</text>

      {/* 1. SYN */}
      <line x1="70" y1="95" x2="260" y2="105" stroke={p >= 0.1 ? '#0284c7' : '#cbd5e1'} strokeWidth="2" />
      <text x="165" y="96" textAnchor="middle" fill="#0284c7" fontSize="8.5" fontWeight="700">1. SYN (seq=x)</text>
      {!isReducedMotion && <circle cx={synX} cy={95 + ((synX - 70) / 190) * 10} r="3.5" fill="#0284c7" opacity={synOp} />}

      {/* 2. SYN-ACK */}
      <line x1="260" y1="120" x2="70" y2="130" stroke={p >= 0.4 ? '#0d9488' : '#cbd5e1'} strokeWidth="2" />
      <text x="165" y="122" textAnchor="middle" fill="#0d9488" fontSize="8.5" fontWeight="700">2. SYN-ACK (ack=x+1, seq=y)</text>
      {!isReducedMotion && <circle cx={synAckX} cy={120 + ((260 - synAckX) / 190) * 10} r="3.5" fill="#0d9488" opacity={synAckOp} />}

      {/* 3. ACK */}
      <line x1="70" y1="145" x2="260" y2="155" stroke={p >= 0.7 ? '#16a34a' : '#cbd5e1'} strokeWidth="2" />
      <text x="165" y="148" textAnchor="middle" fill="#16a34a" fontSize="8.5" fontWeight="700">3. ACK (ack=y+1)</text>
      {!isReducedMotion && <circle cx={ackX} cy={145 + ((ackX - 70) / 190) * 10} r="3.5" fill="#16a34a" opacity={ackOp} />}

      <text x="170" y="178" textAnchor="middle" fill={established ? '#15803d' : '#94a3b8'} fontSize="9" fontWeight="800">
        {established ? '✓ Connection ESTABLISHED' : 'Negotiating Session...'}
      </text>
    </g>
  );
}

export function SceneM1_4_3() {
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">SOCKET MULTIPLEXING</text>
      <rect x="35" y="60" width="110" height="110" rx="6" fill="#ffffff" stroke="#cbd5e1" />
      <text x="90" y="80" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="700">IP: 10.20.1.10</text>

      {[':22 (SSH)', ':80 (HTTP)', ':3306 (MySQL)'].map((port, idx) => (
        <rect key={port} x="45" y={92 + idx * 24} width="90" height="18" rx="3" fill="#e0f2fe" stroke="#38bdf8" />
      ))}
      {[':22 (SSH)', ':80 (HTTP)', ':3306 (MySQL)'].map((port, idx) => (
        <text key={idx} x="90" y={105 + idx * 24} textAnchor="middle" fill="#0369a1" fontSize="8" fontWeight="700">{port}</text>
      ))}

      <rect x="175" y="60" width="130" height="110" rx="6" fill="#eff6ff" stroke="#93c5fd" />
      <text x="240" y="80" textAnchor="middle" fill="#1e40af" fontSize="9.5" fontWeight="700">Security Group Rules</text>
      <text x="240" y="105" textAnchor="middle" fill="#15803d" fontSize="8.5">Allow 80 (0.0.0.0/0)</text>
      <text x="240" y="125" textAnchor="middle" fill="#15803d" fontSize="8.5">Allow 22 (Bastion IP)</text>
      <text x="240" y="145" textAnchor="middle" fill="#b91c1c" fontSize="8.5">DENY 3306 to Public</text>
    </g>
  );
}

export function SceneM1_4_4() {
  const ports = [
    { port: '22', name: 'SSH', risk: 'Restricted Bastion only' },
    { port: '80 / 443', name: 'HTTP / HTTPS', risk: 'Public Ingress storefront' },
    { port: '3306', name: 'MySQL Database', risk: 'CRITICAL: Keep internal only' }
  ];
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">WELL-KNOWN PORTS & RISKS</text>
      {ports.map((p, idx) => {
        const y = 58 + idx * 40;
        const isDb = idx === 2;
        return (
          <g key={p.port} transform={`translate(40, ${y})`}>
            <rect x="0" y="0" width="260" height="32" rx="4" fill={isDb ? '#fef2f2' : '#ffffff'} stroke={isDb ? '#f87171' : '#cbd5e1'} />
            <text x="15" y="20" fill={isDb ? '#991b1b' : '#0f172a'} fontSize="10" fontWeight="800">Port {p.port}</text>
            <text x="95" y="20" fill="#64748b" fontSize="8.5">{p.name}</text>
            <text x="250" y="20" textAnchor="end" fill={isDb ? '#dc2626' : '#16a34a'} fontSize="8" fontWeight="700">{p.risk}</text>
          </g>
        );
      })}
    </g>
  );
}

export function SceneM1_4_5() {
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="45" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">PORT EXPOSURE CHECK-IN</text>
      <rect x="50" y="65" width="240" height="50" rx="6" fill="#fef2f2" stroke="#f87171" />
      <text x="170" y="90" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="800">Port 3306 ❌ 0.0.0.0/0</text>
      <text x="170" y="106" textAnchor="middle" fill="#b91c1c" fontSize="8.5">Never expose raw databases to the Internet</text>
      <rect x="50" y="130" width="240" height="35" rx="6" fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="170" y="152" textAnchor="middle" fill="#065f46" fontSize="9.5" fontWeight="700">✓ Use Private Subnets & Jump Hosts</text>
    </g>
  );
}

// ==========================================
// TOPIC 5 SCENES (CIA Triad & Least Privilege)
// ==========================================

export function SceneM1_5_1({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const pulse = interpolate(p, [0, 0.5, 1], [15, 18, 15]);

  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">THE CIA TRIAD</text>
      {/* Triangle */}
      <polygon points="170,60 70,165 270,165" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
      <circle cx="170" cy="60" r={isReducedMotion ? 16 : pulse} fill="#0284c7" />
      <text x="170" y="64" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">C</text>
      <text x="170" y="38" textAnchor="middle" fill="#0369a1" fontSize="8.5" fontWeight="700">Confidentiality</text>

      <circle cx="70" cy="165" r="16" fill="#0d9488" />
      <text x="70" y="169" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">I</text>
      <text x="70" y="190" textAnchor="middle" fill="#0f766e" fontSize="8.5" fontWeight="700">Integrity</text>

      <circle cx="270" cy="165" r="16" fill="#6366f1" />
      <text x="270" y="169" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">A</text>
      <text x="270" y="190" textAnchor="middle" fill="#4338ca" fontSize="8.5" fontWeight="700">Availability</text>
    </g>
  );
}

export function SceneM1_5_2({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const steps = [
    { title: 'Authentication', sub: 'MFA / Keypair (Who are you?)', range: [0.05, 0.35] },
    { title: 'Authorization', sub: 'Keystone RBAC (What can you do?)', range: [0.35, 0.65] },
    { title: 'Accounting', sub: 'Audit Logs (What did you do?)', range: [0.65, 0.95] }
  ];
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">AAA SECURITY FRAMEWORK</text>
      {steps.map((s, idx) => {
        const y = 58 + idx * 40;
        const [startP, endP] = s.range;
        const active = isReducedMotion || p >= startP;
        const sOp = interpolate(p, [startP - 0.05, endP], [0.4, 1]);
        return (
          <g key={s.title} transform={`translate(40, ${y})`} style={{ opacity: isReducedMotion ? 1 : sOp }}>
            <rect x="0" y="0" width="260" height="32" rx="4" fill={active ? '#ffffff' : '#f1f5f9'} stroke={active ? '#0284c7' : '#cbd5e1'} strokeWidth={active ? 2 : 1} />
            <text x="15" y="20" fill="#0f172a" fontSize="10" fontWeight="700">{s.title}</text>
            <text x="120" y="20" fill="#64748b" fontSize="8.5">{s.sub}</text>
          </g>
        );
      })}
    </g>
  );
}

export function SceneM1_5_3() {
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">PRINCIPLE OF LEAST PRIVILEGE</text>
      <circle cx="170" cy="118" r="54" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="170" y="80" textAnchor="middle" fill="#b91c1c" fontSize="8.5">Excessive Admin Role</text>

      <circle cx="170" cy="122" r="30" fill="#ecfdf5" stroke="#4ade80" strokeWidth="2" />
      <text x="170" y="120" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="800">PoLP Role</text>
      <text x="170" y="132" textAnchor="middle" fill="#166534" fontSize="7.5">Minimum Needed</text>
      <text x="170" y="186" textAnchor="middle" fill="#64748b" fontSize="8.5">Confine Blast Radius of Leaked Keys</text>
    </g>
  );
}

export function SceneM1_5_4() {
  const controls = [
    { type: 'Preventative', desc: 'MFA, Firewalls, WAF, Encryption', color: '#0284c7' },
    { type: 'Detective', desc: 'SIEM, IDS/IPS, Audit Log Grep', color: '#d97706' },
    { type: 'Corrective', desc: 'Snapshots, Backups, Patching', color: '#16a34a' }
  ];
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">SECURITY CONTROLS TIMELINE</text>
      {controls.map((c, idx) => {
        const y = 58 + idx * 40;
        return (
          <g key={c.type} transform={`translate(40, ${y})`}>
            <rect x="0" y="0" width="260" height="32" rx="4" fill="#ffffff" stroke={c.color} strokeWidth="1.5" />
            <text x="15" y="20" fill={c.color} fontSize="9.5" fontWeight="800">{c.type}</text>
            <text x="100" y="20" fill="#475569" fontSize="8.5">{c.desc}</text>
          </g>
        );
      })}
    </g>
  );
}

export function SceneM1_5_5() {
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="45" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">CIA INCIDENT CLASSIFICATION</text>
      <rect x="40" y="65" width="260" height="45" rx="6" fill="#fef2f2" stroke="#f87171" />
      <text x="50" y="85" fill="#991b1b" fontSize="9.5" fontWeight="700">Incident: Ransomware alters database records</text>
      <text x="50" y="100" fill="#b91c1c" fontSize="8.5">Violates: Integrity (tampering) & Availability (lockout)</text>
      <rect x="40" y="125" width="260" height="35" rx="6" fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="170" y="147" textAnchor="middle" fill="#065f46" fontSize="9.5" fontWeight="700">✓ Ready for Lab 3 CIA Classification</text>
    </g>
  );
}

// ==========================================
// TOPIC 6 SCENES (VAPT)
// ==========================================

export function SceneM1_6_1({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const flowX = interpolate(p, [0.1, 0.85], [40, 275], { ease: 'easeInOut' });
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">VULNERABILITY LIFECYCLE</text>
      <rect x="40" y="65" width="80" height="50" rx="4" fill="#ffffff" stroke="#cbd5e1" />
      <text x="80" y="88" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="700">Flaw</text>
      <text x="80" y="102" textAnchor="middle" fill="#64748b" fontSize="8">Discovery</text>

      <line x1="120" y1="90" x2="145" y2="90" stroke="#0284c7" strokeWidth="2" />
      <rect x="145" y="65" width="80" height="50" rx="4" fill="#eff6ff" stroke="#38bdf8" />
      <text x="185" y="88" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="700">CVE ID</text>
      <text x="185" y="102" textAnchor="middle" fill="#0284c7" fontSize="8">Catalog</text>

      <line x1="225" y1="90" x2="250" y2="90" stroke="#0284c7" strokeWidth="2" />
      <rect x="250" y="65" width="50" height="50" rx="4" fill="#fef2f2" stroke="#f87171" />
      <text x="275" y="88" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="800">CVSS</text>
      <text x="275" y="102" textAnchor="middle" fill="#b91c1c" fontSize="8">0 – 10.0</text>

      {!isReducedMotion && <circle cx={flowX} cy="90" r="3.5" fill="#ef4444" />}

      <rect x="40" y="130" width="260" height="34" rx="4" fill="#0f172a" />
      <text x="170" y="152" textAnchor="middle" fill="#38bdf8" fontSize="9.5" fontWeight="700">Remediation: Vendor Patch / Mitigating Controls</text>
    </g>
  );
}

export function SceneM1_6_2({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const angle = interpolate(p, [0, 1], [0, 360]);
  const rad = (angle * Math.PI) / 180;
  const sweepX = 170 + 40 * Math.cos(rad);
  const sweepY = 115 + 40 * Math.sin(rad);

  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">VULNERABILITY ASSESSMENT (VA)</text>
      <circle cx="170" cy="115" r="45" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="170" y1="115" x2={isReducedMotion ? 210 : sweepX} y2={isReducedMotion ? 90 : sweepY} stroke="#38bdf8" strokeWidth="2.5" />
      <circle cx="170" cy="115" r="4" fill="#0284c7" />
      <text x="170" y="176" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="700">Automated Radar Sweep: Nessus / OpenVAS</text>
      <text x="170" y="70" textAnchor="middle" fill="#64748b" fontSize="8">Broad Inventory • Known CVE Signatures</text>
    </g>
  );
}

export function SceneM1_6_3({ progress = 0, isReducedMotion = false }) {
  const p = isReducedMotion ? 1 : progress;
  const pulseX = interpolate(p, [0.1, 0.9], [72, 272], { ease: 'easeInOut' });

  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">PENETRATION TESTING (PT)</text>
      <rect x="35" y="65" width="75" height="40" rx="4" fill="#ffffff" stroke="#cbd5e1" />
      <text x="72" y="88" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="700">Recon</text>

      <line x1="110" y1="85" x2="135" y2="85" stroke="#ef4444" strokeWidth="2" />
      <rect x="135" y="65" width="75" height="40" rx="4" fill="#fef2f2" stroke="#f87171" />
      <text x="172" y="88" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="700">Exploit</text>

      <line x1="210" y1="85" x2="235" y2="85" stroke="#ef4444" strokeWidth="2" />
      <rect x="235" y="65" width="75" height="40" rx="4" fill="#450a0a" />
      <text x="272" y="88" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="800">Escalate</text>

      {!isReducedMotion && <circle cx={pulseX} cy="85" r="4" fill="#dc2626" />}

      <rect x="35" y="125" width="275" height="40" rx="6" fill="#eff6ff" stroke="#93c5fd" />
      <text x="172" y="145" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="700">Objective: Prove Real Business Risk & Impact</text>
      <text x="172" y="158" textAnchor="middle" fill="#3b82f6" fontSize="8">Chaining Flaws to Breach Internal Networks</text>
    </g>
  );
}

export function SceneM1_6_4() {
  const items = ['OWASP Top 10 Web Vulnerabilities', 'NIST SP 800-115 Assessment Guidelines', 'Rules of Engagement (Scope, Non-Destructive)'];
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">INDUSTRY FRAMEWORKS & METHODOLOGY</text>
      {items.map((it, idx) => {
        const y = 58 + idx * 40;
        return (
          <g key={it} transform={`translate(40, ${y})`}>
            <rect x="0" y="0" width="260" height="32" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="15" cy="16" r="5" fill="#0284c7" />
            <text x="30" y="20" fill="#0f172a" fontSize="8.5" fontWeight="700">{it}</text>
          </g>
        );
      })}
    </g>
  );
}

export function SceneM1_6_5() {
  return (
    <g>
      <rect x="20" y="20" width="300" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="45" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="800">VAPT DISTINCTION RECAP</text>
      <rect x="40" y="65" width="125" height="55" rx="6" fill="#f0fdf4" stroke="#86efac" />
      <text x="102" y="86" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="800">VA (Breadth)</text>
      <text x="102" y="104" textAnchor="middle" fill="#15803d" fontSize="8">Automated Scanner</text>

      <rect x="175" y="65" width="125" height="55" rx="6" fill="#eff6ff" stroke="#93c5fd" />
      <text x="237" y="86" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="800">PT (Depth)</text>
      <text x="237" y="104" textAnchor="middle" fill="#3b82f6" fontSize="8">Active Exploitation</text>

      <rect x="40" y="132" width="260" height="34" rx="6" fill="#0f172a" />
      <text x="170" y="153" textAnchor="middle" fill="#38bdf8" fontSize="9.5" fontWeight="700">✓ Module 1 Theory Foundations Complete!</text>
    </g>
  );
}
