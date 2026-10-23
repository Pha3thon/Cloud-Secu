import React from 'react';
import {
  Server,
  Layers,
  Shield,
  Key,
  Globe,
  Radio,
  Share2,
  HardDrive,
  Users
} from 'lucide-react';

/**
 * HorizonNav: Left sidebar navigation for OpenStack Horizon dashboard.
 */
export default function HorizonNav({ currentNav, onSelectNav }) {
  const computeItems = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'instances', label: 'Instances', icon: Server },
    { id: 'images', label: 'Images', icon: HardDrive },
    { id: 'keypairs', label: 'Key Pairs', icon: Key }
  ];

  const networkItems = [
    { id: 'topology', label: 'Network Topology', icon: Share2 },
    { id: 'networks', label: 'Networks', icon: Radio },
    { id: 'routers', label: 'Routers', icon: Share2 },
    { id: 'securitygroups', label: 'Security Groups', icon: Shield },
    { id: 'floatingips', label: 'Floating IPs', icon: Globe }
  ];

  return (
    <div
      style={{
        width: '210px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid var(--border-subtle, #e2e8f0)',
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 8px',
        gap: '4px',
        overflowY: 'auto'
      }}
    >
      <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--text-muted, #94a3b8)', textTransform: 'uppercase', padding: '6px 8px' }}>
        Compute
      </div>
      {computeItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelectNav(item.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: currentNav === item.id ? '700' : '500',
            backgroundColor: currentNav === item.id ? '#e0f2fe' : 'transparent',
            color: currentNav === item.id ? 'var(--brand-primary, #0369a1)' : 'var(--text-main, #334155)',
            textAlign: 'left',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <item.icon size={14} />
          <span>{item.label}</span>
        </button>
      ))}

      <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--text-muted, #94a3b8)', textTransform: 'uppercase', padding: '10px 8px 6px' }}>
        Network
      </div>
      {networkItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelectNav(item.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: currentNav === item.id ? '700' : '500',
            backgroundColor: currentNav === item.id ? '#e0f2fe' : 'transparent',
            color: currentNav === item.id ? 'var(--brand-primary, #0369a1)' : 'var(--text-main, #334155)',
            textAlign: 'left',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <item.icon size={14} />
          <span>{item.label}</span>
        </button>
      ))}

      <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--text-muted, #94a3b8)', textTransform: 'uppercase', padding: '10px 8px 6px' }}>
        Identity
      </div>
      <button
        type="button"
        onClick={() => onSelectNav('identity')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '7px 10px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: currentNav === 'identity' ? '700' : '500',
          backgroundColor: currentNav === 'identity' ? '#fee2e2' : 'transparent',
          color: currentNav === 'identity' ? 'var(--color-danger, #991b1b)' : 'var(--text-main, #334155)',
          textAlign: 'left',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <Users size={14} />
        <span>Projects & Users</span>
      </button>
    </div>
  );
}
