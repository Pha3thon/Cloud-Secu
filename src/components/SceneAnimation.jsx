import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

// =========================================================================
// Shared Stick Figure & Visual Props
// =========================================================================
export const Character = ({ type = 'trainee', x = 50, y = 100, scale = 1, flip = false, label = '' }) => {
  const transform = `translate(${x}, ${y}) scale(${flip ? -scale : scale}, ${scale})`;
  
  // Specific character colors and accessories
  let headColor = '#0f172a';
  let badgeColor = '#0284c7';
  let accessory = null;

  if (type === 'trainee') {
    badgeColor = '#0284c7';
    accessory = (
      // Laptop in hand
      <rect x="10" y="16" width="16" height="10" rx="1.5" fill="#334155" />
    );
  } else if (type === 'priya') {
    headColor = '#0f766e';
    badgeColor = '#0d9488';
    accessory = (
      // Mentor clipboard / tablet
      <g>
        <rect x="8" y="14" width="12" height="16" rx="2" fill="#0f766e" />
        <line x1="10" y1="18" x2="18" y2="18" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="10" y1="22" x2="18" y2="22" stroke="#ffffff" strokeWidth="1.5" />
      </g>
    );
  } else if (type === 'ravi') {
    badgeColor = '#d97706';
    accessory = (
      // Barcode scanner
      <g>
        <rect x="9" y="18" width="10" height="6" rx="1" fill="#d97706" />
        <line x1="19" y1="21" x2="27" y2="21" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
      </g>
    );
  } else if (type === 'freshfarms') {
    badgeColor = '#16a34a';
    accessory = (
      // Veggie crate
      <g>
        <rect x="6" y="15" width="22" height="14" rx="2" fill="#78350f" />
        <circle cx="12" cy="19" r="3" fill="#16a34a" />
        <circle cx="17" cy="18" r="3.5" fill="#ea580c" />
        <circle cx="22" cy="20" r="2.5" fill="#eab308" />
      </g>
    );
  } else if (type === 'customer') {
    badgeColor = '#64748b';
    accessory = (
      // Mobile app phone
      <g>
        <rect x="10" y="14" width="8" height="14" rx="1.5" fill="#0284c7" />
        <circle cx="14" cy="25" r="1" fill="#ffffff" />
      </g>
    );
  } else if (type === 'rider') {
    badgeColor = '#e11d48';
    accessory = (
      // Helmet & backpack
      <g>
        <circle cx="0" cy="-2" r="9" fill="none" stroke="#e11d48" strokeWidth="2.5" />
        <rect x="-16" y="10" width="10" height="18" rx="2" fill="#e11d48" />
      </g>
    );
  }

  return (
    <g transform={transform}>
      {/* Head */}
      <circle cx="0" cy="0" r="7.5" fill="none" stroke={headColor} strokeWidth="2.5" />
      {/* Torso */}
      <line x1="0" y1="7.5" x2="0" y2="28" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      {/* Legs */}
      <line x1="0" y1="28" x2="-8" y2="46" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="0" y1="28" x2="8" y2="46" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arms */}
      <line x1="0" y1="14" x2="-10" y2="24" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="0" y1="14" x2="12" y2="22" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      {/* Badge / Collar */}
      <circle cx="0" cy="12" r="2.5" fill={badgeColor} />
      {/* Accessory */}
      {accessory}
      {/* Label */}
      {label && (
        <text
          x="0"
          y="56"
          textAnchor="middle"
          fill="#475569"
          fontSize="9.5"
          fontWeight="600"
          fontFamily="inherit"
        >
          {label}
        </text>
      )}
    </g>
  );
};

export const ScooterRider = ({ x = 50, y = 100, scale = 1, speed = 1 }) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Scooter wheels */}
      <circle cx="-25" cy="40" r="10" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
      <circle cx="30" cy="40" r="10" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
      {/* Chassis & Footboard */}
      <path d="M -25 40 L -5 38 L 15 38 L 26 12 L 20 8" fill="none" stroke="#e11d48" strokeWidth="3.5" strokeLinecap="round" />
      {/* QuickMart Delivery Box */}
      <rect x="-24" y="8" width="22" height="22" rx="3" fill="#e11d48" />
      <text x="-13" y="22" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="800">QM</text>
      {/* Rider character sitting */}
      <Character type="rider" x="5" y="0" scale={0.8} />
    </g>
  );
};

export const ServerRack = ({ x = 30, y = 30, width = 60, height = 90, label = 'Host' }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect width={width} height={height} rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
    {/* Units */}
    {[12, 28, 44, 60, 76].map((unitY, idx) => (
      <g key={idx}>
        <rect x="6" y={unitY} width={width - 12} height="10" rx="2" fill="#0f172a" />
        <circle cx="12" cy={unitY + 5} r="2" fill={idx % 2 === 0 ? '#10b981' : '#38bdf8'} />
        <circle cx="18" cy={unitY + 5} r="1.5" fill="#64748b" />
        <line x1="24" y1={unitY + 5} x2={width - 10} y2={unitY + 5} stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
      </g>
    ))}
    <text x={width / 2} y={height + 14} textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600">
      {label}
    </text>
  </g>
);

// =========================================================================
// Main Dynamic Scene Renderer Component
// =========================================================================
export const SceneAnimation = ({
  sceneKey = 'scene_1_1',
  activeStep = 0,
  onStepChange,
  stepCount = 4
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const timerRef = useRef(null);

  // Sync external step if supplied via hover on sentence
  useEffect(() => {
    if (activeStep !== undefined && activeStep !== null && activeStep !== currentStep) {
      setCurrentStep(activeStep);
      setIsPlaying(false);
    }
  }, [activeStep]);

  // Autoplay step timeline (5-8 seconds total across steps)
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % stepCount;
        if (onStepChange) onStepChange(next);
        return next;
      });
    }, 2200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, stepCount, onStepChange]);

  const handleReplay = () => {
    setCurrentStep(0);
    setIsPlaying(true);
    if (onStepChange) onStepChange(0);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Helper renderers for scenes based on sceneKey
  const renderSceneContent = () => {
    switch (sceneKey) {
      // 1.1 What is OpenStack?
      case 'scene_1_1': {
        const nodes = [
          { name: 'Keystone', role: 'Identity', color: '#8b5cf6', icon: 'ID' },
          { name: 'Nova', role: 'Compute', color: '#0284c7', icon: 'VM' },
          { name: 'Neutron', role: 'Network', color: '#0d9488', icon: 'NET' },
          { name: 'Glance', role: 'Images', color: '#f59e0b', icon: 'IMG' },
          { name: 'Horizon', role: 'Dashboard', color: '#10b981', icon: 'UI' }
        ];
        return (
          <g>
            {/* Background cloud bubble */}
            <path
              d="M 90 120 C 60 120 40 90 60 65 C 50 40 80 20 110 30 C 130 10 190 10 220 30 C 250 20 280 40 270 65 C 290 90 270 120 240 120 Z"
              fill={currentStep >= 1 ? '#e0f2fe' : '#f1f5f9'}
              stroke="#bae6fd"
              strokeWidth="2"
              style={{ transition: 'all 500ms' }}
            />
            {/* Physical servers fading to cloud */}
            <ServerRack x={40} y={130} width={45} height={60} label="Rack A" />
            <ServerRack x={95} y={130} width={45} height={60} label="Rack B" />

            {/* 5 OpenStack Service Nodes popping in */}
            {nodes.map((node, i) => {
              const posX = 70 + i * 55;
              const posY = 55 + (i % 2 === 0 ? 0 : 15);
              const isActive = currentStep >= 2;
              return (
                <g key={node.name} transform={`translate(${posX}, ${posY})`} style={{ transition: 'all 400ms' }}>
                  <rect
                    x="-22"
                    y="-18"
                    width="44"
                    height="36"
                    rx="6"
                    fill={isActive ? '#ffffff' : '#f8fafc'}
                    stroke={isActive ? node.color : '#cbd5e1'}
                    strokeWidth={isActive ? '2.5' : '1.5'}
                    filter={isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))' : 'none'}
                  />
                  <text x="0" y="-4" textAnchor="middle" fill={node.color} fontSize="8" fontWeight="800">
                    {node.icon}
                  </text>
                  <text x="0" y="8" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="700">
                    {node.name}
                  </text>
                </g>
              );
            })}

            {/* Trainee inspecting */}
            <Character type="trainee" x={300} y={120} label="Trainee" />
          </g>
        );
      }

      // 1.2 What is Horizon?
      case 'scene_1_2': {
        return (
          <g>
            {/* Dashboard Window */}
            <rect x="50" y="30" width="180" height="110" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
            <rect x="50" y="30" width="180" height="22" rx="8" fill="#0284c7" />
            <circle cx="62" cy="41" r="3" fill="#ffffff" opacity="0.8" />
            <circle cx="72" cy="41" r="3" fill="#ffffff" opacity="0.8" />
            <text x="90" y="44" fill="#ffffff" fontSize="9" fontWeight="700">Horizon: QuickMart Cloud</text>

            {/* Launch Button */}
            <rect x="70" y="70" width="70" height="24" rx="4" fill={currentStep >= 1 ? '#0284c7' : '#e2e8f0'} />
            <text x="105" y="85" textAnchor="middle" fill={currentStep >= 1 ? '#ffffff' : '#64748b'} fontSize="9" fontWeight="700">
              Launch VM
            </text>

            {/* Request arrows flying to Nova */}
            {currentStep >= 2 && (
              <g>
                <path d="M 145 82 L 230 82" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="4,4" />
                <polygon points="235,82 227,78 227,86" fill="#0284c7" />
                <rect x="155" y="66" width="60" height="14" rx="3" fill="#e0f2fe" />
                <text x="185" y="76" textAnchor="middle" fill="#0369a1" fontSize="7.5" fontWeight="700">POST /servers</text>
              </g>
            )}

            {/* Nova compute worker */}
            <g transform="translate(245, 60)">
              <rect width="65" height="48" rx="6" fill="#1e293b" />
              <text x="32" y="20" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="800">NOVA</text>
              <text x="32" y="34" textAnchor="middle" fill="#94a3b8" fontSize="7.5">Instance Spun</text>
            </g>

            <Character type="trainee" x={30} y={115} label="Click" />
          </g>
        );
      }

      // 1.3 How to access Horizon
      case 'scene_1_3': {
        return (
          <g>
            {/* Mini Kali Desktop Frame */}
            <rect x="30" y="20" width="280" height="150" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <rect x="30" y="20" width="280" height="18" fill="#0f172a" />
            <text x="42" y="32" fill="#94a3b8" fontSize="8">Kali Linux — QuickMart Workstation</text>

            {/* Firefox Window */}
            <g transform="translate(45, 45)">
              <rect width="250" height="110" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
              {/* URL bar */}
              <rect x="10" y="8" width="230" height="16" rx="3" fill="#f1f5f9" stroke="#cbd5e1" />
              <text x="18" y="19" fill="#0284c7" fontSize="7.5" fontWeight="600">
                http://horizon.quickmart.lab/dashboard
              </text>

              {/* Login form filling in steps */}
              <g transform="translate(45, 32)">
                <rect width="160" height="66" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
                <text x="80" y="14" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="700">OpenStack Sign In</text>

                {/* Domain */}
                <rect x="20" y="20" width="120" height="10" rx="2" fill={currentStep >= 1 ? '#e0f2fe' : '#ffffff'} stroke="#cbd5e1" />
                <text x="24" y="28" fill="#0369a1" fontSize="6.5">Domain: Default</text>

                {/* User */}
                <rect x="20" y="33" width="120" height="10" rx="2" fill={currentStep >= 2 ? '#e0f2fe' : '#ffffff'} stroke="#cbd5e1" />
                <text x="24" y="41" fill="#0369a1" fontSize="6.5">User: trainee</text>

                {/* Password */}
                <rect x="20" y="46" width="120" height="10" rx="2" fill={currentStep >= 3 ? '#e0f2fe' : '#ffffff'} stroke="#cbd5e1" />
                <text x="24" y="54" fill="#0369a1" fontSize="6.5">Pass: •••••••••••</text>
              </g>
            </g>
          </g>
        );
      }

      // 1.4 A quick tour of the dashboard
      case 'scene_1_4': {
        return (
          <g>
            {/* Dashboard wireframe */}
            <rect x="30" y="25" width="280" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            {/* Topbar */}
            <rect x="30" y="25" width="280" height="24" rx="8" fill="#0f172a" />
            {/* Project selector */}
            <rect x="40" y="29" width="70" height="16" rx="4" fill={currentStep === 0 ? '#0284c7' : '#1e293b'} />
            <text x="75" y="40" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">quickmart ▾</text>

            {/* Left Nav */}
            <rect x="30" y="49" width="60" height="116" fill="#f8fafc" stroke="#e2e8f0" />
            <text x="36" y="65" fill="#0284c7" fontSize="7.5" fontWeight="700">Compute</text>
            <text x="40" y="78" fill="#64748b" fontSize="7">Instances</text>
            <text x="36" y="94" fill="#0284c7" fontSize="7.5" fontWeight="700">Network</text>
            <text x="40" y="107" fill="#64748b" fontSize="7">Networks</text>

            {/* Identity Dimmed / Admin only */}
            <g transform="translate(32, 125)">
              <rect width="56" height="18" rx="2" fill="#fee2e2" />
              <text x="4" y="12" fill="#991b1b" fontSize="6.5" fontWeight="700">Identity (Admin)</text>
            </g>

            {/* Right main table area */}
            <rect x="100" y="60" width="195" height="90" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
            <rect x="220" y="66" width="65" height="16" rx="3" fill="#0284c7" />
            <text x="252" y="77" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="700">+ Launch Instance</text>

            {/* Table rows */}
            <line x1="105" y1="92" x2="290" y2="92" stroke="#e2e8f0" strokeWidth="1.5" />
            <line x1="105" y1="110" x2="290" y2="110" stroke="#e2e8f0" strokeWidth="1.5" />
            <line x1="105" y1="128" x2="290" y2="128" stroke="#e2e8f0" strokeWidth="1.5" />
          </g>
        );
      }

      // 1.5 Projects and quotas
      case 'scene_1_5': {
        const quotas = [
          { label: 'Instances', used: 2, max: 10, pct: 20 },
          { label: 'VCPUs', used: 3, max: 20, pct: 15 },
          { label: 'RAM (GB)', used: 6, max: 50, pct: 12 },
          { label: 'Floating IPs', used: currentStep >= 2 ? 3 : 1, max: 3, pct: currentStep >= 2 ? 100 : 33 }
        ];
        return (
          <g transform="translate(40, 30)">
            <text x="0" y="10" fill="#0f172a" fontSize="12" fontWeight="800">Limit Summary (quickmart)</text>
            {quotas.map((q, idx) => (
              <g key={q.label} transform={`translate(0, ${28 + idx * 30})`}>
                <text x="0" y="10" fill="#334155" fontSize="9" fontWeight="600">{q.label}</text>
                <text x="230" y="10" textAnchor="end" fill="#64748b" fontSize="8.5">{q.used} of {q.max} Used</text>
                {/* Bar track */}
                <rect x="0" y="14" width="230" height="8" rx="4" fill="#e2e8f0" />
                {/* Bar fill */}
                <rect
                  x="0"
                  y="14"
                  width={(230 * q.pct) / 100}
                  height="8"
                  rx="4"
                  fill={q.pct >= 100 ? '#ef4444' : '#0284c7'}
                  style={{ transition: 'all 500ms' }}
                />
              </g>
            ))}
            {currentStep >= 2 && (
              <g transform="translate(150, 120)">
                <rect width="90" height="20" rx="4" fill="#fee2e2" stroke="#ef4444" />
                <text x="45" y="13" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="700">Limit Reached!</text>
              </g>
            )}
          </g>
        );
      }

      // 2.1 Networks and subnets in OpenStack
      case 'scene_2_1': {
        return (
          <g>
            {/* Warehouse floor outline (qm-net) */}
            <rect
              x="50"
              y="30"
              width="240"
              height="120"
              rx="12"
              fill="#f0fdf4"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeDasharray="6,4"
            />
            <text x="65" y="48" fill="#047857" fontSize="10" fontWeight="800">qm-net (Private Network)</text>

            {/* Subnet shelf divisions */}
            <line x1="60" y1="85" x2="280" y2="85" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="3,3" />
            <text x="65" y="78" fill="#059669" fontSize="8">qm-subnet: 10.20.1.0/24</text>

            {/* Shelf rows */}
            <rect x="70" y="95" width="45" height="28" rx="3" fill="#ffffff" stroke="#10b981" />
            <text x="92" y="112" textAnchor="middle" fill="#065f46" fontSize="7.5">10.20.1.3 (Web)</text>

            <rect x="140" y="95" width="45" height="28" rx="3" fill="#ffffff" stroke="#10b981" />
            <text x="162" y="112" textAnchor="middle" fill="#065f46" fontSize="7.5">10.20.1.4 (DB)</text>

            {/* Rider plugging cable */}
            <ScooterRider x={220} y={75} scale={0.75} />
          </g>
        );
      }

      // 2.2 Virtual switches & ports
      case 'scene_2_2': {
        return (
          <g>
            {/* Virtual Switch */}
            <rect x="110" y="25" width="120" height="30" rx="6" fill="#1e293b" />
            <text x="170" y="44" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="700">Neutron vSwitch</text>

            {/* VM 1 */}
            <rect x="50" y="100" width="70" height="45" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
            <text x="85" y="125" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="700">qm-web-01</text>

            {/* VM 2 */}
            <rect x="220" y="100" width="70" height="45" rx="6" fill="#ffffff" stroke="#0d9488" strokeWidth="2" />
            <text x="255" y="125" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="700">qm-db-01</text>

            {/* Connecting cables & port plugs */}
            <path d="M 85 100 L 85 70 L 140 55" fill="none" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="140" cy="55" r="4" fill="#0284c7" />

            <path d="M 255 100 L 255 70 L 200 55" fill="none" stroke="#0d9488" strokeWidth="2.5" />
            <circle cx="200" cy="55" r="4" fill="#0d9488" />

            {/* Animated Packet travelling */}
            {currentStep >= 1 && (
              <circle cx="170" cy="62" r="5" fill="#f59e0b" className="animate-pulse" />
            )}
          </g>
        );
      }

      // 2.3.2 CIDR 10.20.1.0/24
      case 'scene_2_3_2': {
        return (
          <g transform="translate(40, 40)">
            <text x="0" y="10" fill="#0f172a" fontSize="12" fontWeight="800">10.20.1.0 / 24 Subnet Block</text>
            <g transform="translate(0, 30)">
              {/* Blocks */}
              <rect x="0" y="0" width="55" height="36" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <text x="27" y="22" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="800">10.</text>

              <rect x="65" y="0" width="55" height="36" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <text x="92" y="22" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="800">20.</text>

              <rect x="130" y="0" width="55" height="36" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <text x="157" y="22" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="800">1.</text>

              {/* Cycling last octet */}
              <rect x="195" y="0" width="65" height="36" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
              <text x="227" y="22" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="800">
                {currentStep === 0 ? '0' : currentStep === 1 ? '1...254' : '255'}
              </text>
            </g>
            <text x="0" y="95" fill="#64748b" fontSize="9">
              Fixed network prefix (24 bits) + 256 assignable host addresses
            </text>
          </g>
        );
      }

      // 3.1 Routers & Public-net
      case 'scene_3_1': {
        return (
          <g>
            {/* Island qm-net */}
            <circle cx="90" cy="95" r="55" fill="#f0fdf4" stroke="#10b981" strokeWidth="2" />
            <text x="90" y="75" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="800">qm-net Island</text>
            <Character type="trainee" x={90} y={80} scale={0.7} />

            {/* Mainland public-net */}
            <rect x="230" y="40" width="90" height="110" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="275" y="60" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="800">public-net</text>
            <text x="275" y="74" textAnchor="middle" fill="#64748b" fontSize="7.5">203.0.113.0/24</text>

            {/* Bridge (qm-router) */}
            <path d="M 145 95 L 230 95" stroke={currentStep >= 1 ? '#0284c7' : '#cbd5e1'} strokeWidth="5" strokeDasharray={currentStep >= 1 ? 'none' : '4,4'} />
            <rect x="165" y="80" width="46" height="30" rx="4" fill="#1e293b" />
            <text x="188" y="98" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontWeight="700">qm-router</text>
          </g>
        );
      }

      // 4.1 Security Groups
      case 'scene_4_1': {
        return (
          <g>
            {/* Instance room */}
            <rect x="140" y="40" width="140" height="100" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <text x="210" y="65" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="700">Instance Port</text>

            {/* Bouncer / Firewall Guard at door */}
            <g transform="translate(140, 75)">
              <rect x="-8" y="-20" width="16" height="40" rx="3" fill="#0284c7" />
              <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">SG</text>
            </g>

            {/* Inbound visitor stopped */}
            <Character type="customer" x="60" y="90" label="Visitor" />
            <path d="M 75 75 L 125 75" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3,3" />
            <text x="100" y="70" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">DENY (default)</text>

            {/* Outbound allowed */}
            <path d="M 155 110 L 80 110" stroke="#10b981" strokeWidth="2.5" />
            <text x="120" y="125" textAnchor="middle" fill="#059669" fontSize="8" fontWeight="700">ALLOW (egress)</text>
          </g>
        );
      }

      // 4.3.4 QuickMart two-tier layout
      case 'scene_4_4':
      case 'scene_4_3_4': {
        return (
          <g>
            {/* Tier 1: Web */}
            <rect x="50" y="40" width="100" height="90" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="100" y="60" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="800">qm-web-sg</text>
            <text x="100" y="75" textAnchor="middle" fill="#0f172a" fontSize="8">Ports: 22, 80, 443</text>
            <text x="100" y="90" textAnchor="middle" fill="#64748b" fontSize="7.5">Remote: 0.0.0.0/0</text>

            {/* Inter-tier arrow */}
            <path d="M 150 85 L 200 85" stroke="#10b981" strokeWidth="3" />
            <polygon points="205,85 197,81 197,89" fill="#10b981" />

            {/* Tier 2: DB */}
            <rect x="205" y="40" width="100" height="90" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <text x="255" y="60" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="800">qm-db-sg</text>
            <text x="255" y="75" textAnchor="middle" fill="#0f172a" fontSize="8">Port: 3306, 22</text>
            <text x="255" y="90" textAnchor="middle" fill="#b45309" fontSize="7.5">Remote: qm-web-sg</text>

            {/* World traffic blocked at DB */}
            <path d="M 330 85 L 305 85" stroke="#ef4444" strokeWidth="2.5" />
            <text x="320" y="75" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="800">✕</text>
          </g>
        );
      }

      // 6.1 Floating IPs
      case 'scene_6_1': {
        return (
          <g>
            {/* Floating Tag */}
            <g transform={`translate(${currentStep >= 1 ? 160 : 70}, 35)`} style={{ transition: 'all 600ms ease-in-out' }}>
              <rect width="90" height="24" rx="12" fill="#0284c7" filter="drop-shadow(0 3px 6px rgba(2,132,199,0.3))" />
              <text x="45" y="15" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800">203.0.113.27</text>
            </g>

            {/* Instance 1 */}
            <rect x="40" y="80" width="90" height="60" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <text x="85" y="105" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="700">qm-web-01</text>
            <text x="85" y="120" textAnchor="middle" fill="#64748b" fontSize="7.5">10.20.1.3</text>

            {/* Instance 2 */}
            <rect x="160" y="80" width="90" height="60" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <text x="205" y="105" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="700">qm-web-02</text>
            <text x="205" y="120" textAnchor="middle" fill="#64748b" fontSize="7.5">10.20.1.5</text>
          </g>
        );
      }

      // 7.1 Keystone & Domains
      case 'scene_7_1':
      case 'scene_7_3_1': {
        return (
          <g transform="translate(40, 30)">
            <text x="0" y="10" fill="#0f172a" fontSize="12" fontWeight="800">Keystone Role Hierarchy</text>
            {/* Ladder Steps */}
            <g transform="translate(20, 25)">
              {/* Step 1: Reader */}
              <rect x="0" y="70" width="70" height="25" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="35" y="86" textAnchor="middle" fill="#334155" fontSize="8.5" fontWeight="700">reader (View)</text>

              {/* Step 2: Member */}
              <rect x="80" y="40" width="75" height="55" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <text x="117" y="56" textAnchor="middle" fill="#0369a1" fontSize="8.5" fontWeight="800">member</text>
              <text x="117" y="70" textAnchor="middle" fill="#0369a1" fontSize="7">(Build & Run)</text>

              {/* Step 3: Admin */}
              <rect x="165" y="10" width="80" height="85" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
              <text x="205" y="26" textAnchor="middle" fill="#991b1b" fontSize="8.5" fontWeight="800">admin</text>
              <text x="205" y="40" textAnchor="middle" fill="#991b1b" fontSize="7">(Full Cloud Power)</text>
            </g>
          </g>
        );
      }

      // Default generic illustrative scene for other slides
      default: {
        return (
          <g>
            {/* Background workspace blueprint */}
            <rect x="40" y="25" width="260" height="135" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <line x1="40" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1.5" />
            <circle cx="55" cy="38" r="4" fill="#0284c7" />
            <text x="65" y="42" fill="#0f172a" fontSize="9" fontWeight="700">QuickMart Cloud Platform</text>

            {/* Cloud node interaction */}
            <g transform="translate(70, 70)">
              <rect width="80" height="55" rx="6" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.5" />
              <text x="40" y="25" textAnchor="middle" fill="#0284c7" fontSize="8.5" fontWeight="800">OpenStack</text>
              <text x="40" y="40" textAnchor="middle" fill="#64748b" fontSize="7.5">qm-net</text>
            </g>

            {/* Data flow */}
            <path d="M 150 97 L 205 97" stroke="#0d9488" strokeWidth="2" strokeDasharray="3,3" />
            <polygon points="210,97 202,93 202,101" fill="#0d9488" />

            <g transform="translate(210, 70)">
              <rect width="80" height="55" rx="6" fill="#f8fafc" stroke="#0d9488" strokeWidth="1.5" />
              <text x="40" y="25" textAnchor="middle" fill="#0d9488" fontSize="8.5" fontWeight="800">Workload</text>
              <text x="40" y="40" textAnchor="middle" fill="#64748b" fontSize="7.5">qm-web-01</text>
            </g>

            <Character type="trainee" x={50} y={120} scale={0.75} />
            <Character type="priya" x={290} y={120} scale={0.75} flip={true} />
          </g>
        );
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f8fafc',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto'
      }}
    >
      {/* SVG Canvas Area */}
      <div style={{ position: 'relative', width: '100%', height: '185px', overflow: 'hidden' }}>
        <svg
          viewBox="0 0 340 185"
          style={{ width: '100%', height: '100%', display: 'block' }}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`Animation scene for ${sceneKey}`}
        >
          {renderSceneContent()}
        </svg>
      </div>

      {/* Controls Bar: Play / Pause, Replay, Step indicators */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #f1f5f9',
          paddingTop: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={handleTogglePlay}
            title={isPlaying ? 'Pause animation' : 'Play animation'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <button
            type="button"
            onClick={handleReplay}
            title="Replay scene"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={13} />
          </button>
        </div>

        {/* Step dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {Array.from({ length: stepCount }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCurrentStep(idx);
                setIsPlaying(false);
                if (onStepChange) onStepChange(idx);
              }}
              style={{
                width: idx === currentStep ? '18px' : '7px',
                height: '7px',
                borderRadius: '4px',
                backgroundColor: idx === currentStep ? '#0284c7' : '#cbd5e1',
                transition: 'all 200ms ease',
                cursor: 'pointer',
                border: 'none',
                padding: 0
              }}
              title={`Step ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
