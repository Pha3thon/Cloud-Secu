import React, { useState } from 'react';
import {
  Server,
  Shield,
  HardDrive,
  Users,
  Terminal,
  AlertTriangle
} from 'lucide-react';
import { M4_SIMULATED_CONSOLE } from '../data/m4Content';

// // TODO: connect real lab iframe/live connection
export const LabConsole = ({ activeTab = 'vm', onTabChange }) => {
  const [tab, setTab] = useState(activeTab);

  const currentTab = onTabChange ? activeTab : tab;
  const switchTab = (t) => {
    if (onTabChange) onTabChange(t);
    setTab(t);
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #cbd5e1',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '560px',
        overflow: 'hidden'
      }}
    >
      {/* Top Console Navigation Bar */}
      <div
        style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #1e293b'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '12px'
            }}
          >
            ☁
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Nimbus Training Cloud</span>
              <span
                style={{
                  fontSize: '9.5px',
                  fontWeight: '600',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  backgroundColor: '#1e293b',
                  color: '#38bdf8'
                }}
              >
                v1.4 Mock Lab
              </span>
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
              Tenant: <code>student-lab-env-01</code>
            </div>
          </div>
        </div>

        {/* Integration Note badge */}
        <div
          title="// TODO: connect real lab iframe/live connection"
          style={{
            fontSize: '10.5px',
            backgroundColor: '#1e293b',
            color: '#cbd5e1',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1px solid #334155',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Terminal size={11} color="#38bdf8" />
          <span>Simulated Cloud Console</span>
        </div>
      </div>

      {/* Main Console Subheader / Banner */}
      <div
        style={{
          backgroundColor: '#f8fafc',
          padding: '8px 16px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span style={{ fontSize: '11px', color: '#64748b' }}>
          Lab Environment — connected to your deployed training cloud
        </span>
        <span style={{ fontSize: '10.5px', color: '#0284c7', fontWeight: '600' }}>
          Region: us-central-1 (Iowa DC)
        </span>
      </div>

      {/* Console Tab Selector */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          padding: '0 8px'
        }}
      >
        <button
          onClick={() => switchTab('vm')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 14px',
            fontSize: '12.5px',
            fontWeight: currentTab === 'vm' ? '700' : '500',
            color: currentTab === 'vm' ? '#0284c7' : '#64748b',
            borderBottom: currentTab === 'vm' ? '2.5px solid #0284c7' : '2.5px solid transparent',
            transition: 'all 0.15s ease'
          }}
        >
          <Server size={14} />
          <span>Virtual Machines</span>
        </button>

        <button
          onClick={() => switchTab('network')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 14px',
            fontSize: '12.5px',
            fontWeight: currentTab === 'network' ? '700' : '500',
            color: currentTab === 'network' ? '#0284c7' : '#64748b',
            borderBottom: currentTab === 'network' ? '2.5px solid #0284c7' : '2.5px solid transparent',
            transition: 'all 0.15s ease'
          }}
        >
          <Shield size={14} />
          <span>Network & Firewall</span>
        </button>

        <button
          onClick={() => switchTab('storage')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 14px',
            fontSize: '12.5px',
            fontWeight: currentTab === 'storage' ? '700' : '500',
            color: currentTab === 'storage' ? '#0284c7' : '#64748b',
            borderBottom: currentTab === 'storage' ? '2.5px solid #0284c7' : '2.5px solid transparent',
            transition: 'all 0.15s ease'
          }}
        >
          <HardDrive size={14} />
          <span>Storage Buckets</span>
        </button>

        <button
          onClick={() => switchTab('iam')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 14px',
            fontSize: '12.5px',
            fontWeight: currentTab === 'iam' ? '700' : '500',
            color: currentTab === 'iam' ? '#0284c7' : '#64748b',
            borderBottom: currentTab === 'iam' ? '2.5px solid #0284c7' : '2.5px solid transparent',
            transition: 'all 0.15s ease'
          }}
        >
          <Users size={14} />
          <span>IAM & Accounts</span>
        </button>
      </div>

      {/* Console Tab Content Area */}
      <div style={{ padding: '18px', flex: 1, overflowY: 'auto', backgroundColor: '#fbfcfd' }}>
        {/* TAB 1: VIRTUAL MACHINES */}
        {currentTab === 'vm' && (
          <div className="animate-slide-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                  Deployed Compute Instances
                </h4>
                <p style={{ fontSize: '12px', color: '#64748b' }}>
                  Overview of virtual machines running in your isolated tenant VPC.
                </p>
              </div>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#059669',
                  backgroundColor: '#ecfdf5',
                  padding: '3px 10px',
                  borderRadius: '20px'
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981' }} className="animate-pulse-green" />
                1 Instance Active
              </span>
            </div>

            {M4_SIMULATED_CONSOLE.vms.map((vm) => (
              <div
                key={vm.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  padding: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                      <Server size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{vm.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>ID: <code>{vm.id}</code></div>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '4px' }}>
                    ● {vm.status}
                  </span>
                </div>

                {/* Properties Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '10px',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                >
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '10.5px', textTransform: 'uppercase' }}>Region</span>
                    <strong style={{ color: '#0284c7' }}>{vm.region}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '10.5px', textTransform: 'uppercase' }}>Public IP</span>
                    <span style={{ fontFamily: 'monospace', color: '#0f172a' }}>{vm.publicIp}</span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '10.5px', textTransform: 'uppercase' }}>Security Group</span>
                    <strong style={{ color: '#0f172a' }}>{vm.securityGroup}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '10.5px', textTransform: 'uppercase' }}>Image OS</span>
                    <span style={{ color: '#334155' }}>{vm.os}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: NETWORK & FIREWALL */}
        {currentTab === 'network' && (
          <div className="animate-slide-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                Security Group: default-sg
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Inbound traffic firewall rules controlling ingress packets to your VM.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '8px 12px' }}>Direction</th>
                    <th style={{ padding: '8px 12px' }}>Protocol</th>
                    <th style={{ padding: '8px 12px' }}>Port</th>
                    <th style={{ padding: '8px 12px' }}>Source IP</th>
                    <th style={{ padding: '8px 12px' }}>Service</th>
                    <th style={{ padding: '8px 12px' }}>Security Audit</th>
                  </tr>
                </thead>
                <tbody>
                  {M4_SIMULATED_CONSOLE.securityGroups[0].rules.map((rule, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: '600', color: '#0f172a' }}>{rule.direction}</td>
                      <td style={{ padding: '10px 12px', color: '#334155' }}>{rule.protocol}</td>
                      <td style={{ padding: '10px 12px', fontWeight: '700', color: rule.port === '22' ? '#dc2626' : '#0f172a', fontFamily: 'monospace' }}>
                        {rule.port}
                      </td>
                      <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#334155' }}>{rule.source}</td>
                      <td style={{ padding: '10px 12px', color: '#64748b' }}>{rule.service}</td>
                      <td style={{ padding: '10px 12px' }}>
                        {rule.warning ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: '#b45309', backgroundColor: '#fffbeb', padding: '2px 6px', borderRadius: '4px', border: '1px solid #fde68a' }}>
                            <AlertTriangle size={11} /> {rule.warning}
                          </span>
                        ) : (
                          <span style={{ fontSize: '10.5px', color: '#059669' }}>Standard</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: STORAGE BUCKETS */}
        {currentTab === 'storage' && (
          <div className="animate-slide-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                Object Storage Buckets
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Flat cloud object storage for application media, backups, and user uploads.
              </p>
            </div>

            {M4_SIMULATED_CONSOLE.buckets.map((b) => (
              <div
                key={b.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <HardDrive size={18} color="#0284c7" />
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{b.name}</span>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      color: b.visibility === 'public' ? '#dc2626' : '#059669',
                      backgroundColor: b.visibility === 'public' ? '#fef2f2' : '#ecfdf5',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: b.visibility === 'public' ? '1px solid #fecaca' : '1px solid #a7f3d0'
                    }}
                  >
                    ACL: {b.visibility}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fde68a',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '12px',
                    color: '#92400e',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '10px'
                  }}
                >
                  <AlertTriangle size={14} color="#d97706" />
                  <span>Warning: {b.warning}</span>
                </div>

                <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                  Endpoint: <code style={{ color: '#0f172a' }}>{b.accessUrl}</code>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: IAM & ACCOUNTS */}
        {currentTab === 'iam' && (
          <div className="animate-slide-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                Identity & Access Management (IAM)
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Administrative users and credentials provisioned for this cloud instance.
              </p>
            </div>

            {M4_SIMULATED_CONSOLE.iamUsers.map((u) => (
              <div
                key={u.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={18} color="#0284c7" />
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                      Username: <code style={{ color: '#0284c7' }}>{u.username}</code>
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#dc2626', backgroundColor: '#fef2f2', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                    MFA: {u.mfaStatus}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '6px',
                    padding: '10px 12px',
                    fontSize: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div>
                    <span style={{ color: '#64748b' }}>Assigned Policy: </span>
                    <code style={{ fontWeight: '700', color: '#0f172a' }}>{u.policies.join(', ')}</code>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Access Key ID: </span>
                    <code style={{ color: '#0f172a' }}>{u.accessKey}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Console Terminal / Status Footer */}
      <div
        style={{
          padding: '10px 16px',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: '#64748b'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
          Status: Connected to training cloud agent
        </span>
        <span>Latency: 28ms</span>
      </div>
    </div>
  );
};
