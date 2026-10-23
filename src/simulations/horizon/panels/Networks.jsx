/**
 * Horizon Networks Panel
 * Displays virtual networks, subnets, and Neutron ports.
 */

import React, { useState } from 'react';
import { Plus, ArrowLeft, Radio } from 'lucide-react';
import { canCreateResource } from '../policy';

export const Networks = ({
  simCloud,
  userRole,
  onCreateNetClick,
  onRecordLabEvent
}) => {
  const [activeNetworkDetail, setActiveNetworkDetail] = useState(null);
  const [activeNetworkTab, setActiveNetworkTab] = useState('overview'); // 'overview' | 'subnets' | 'ports'

  const networks = simCloud.networks || [];
  const selectedNet = networks.find((n) => n.name === activeNetworkDetail);

  const handleTabChange = (tab) => {
    setActiveNetworkTab(tab);
    if (tab === 'ports' && onRecordLabEvent) {
      onRecordLabEvent('ports_tab_viewed');
    }
  };

  if (selectedNet) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setActiveNetworkDetail(null)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#0284c7', fontWeight: '600', marginBottom: '14px' }}
        >
          <ArrowLeft size={14} /> Back to Networks
        </button>

        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Network Details: {selectedNet.name}</h2>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Subnet: {selectedNet.subnetName} ({selectedNet.cidr})</p>
        </div>

        {/* Sub-tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => handleTabChange('overview')}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: '700',
              borderBottom: activeNetworkTab === 'overview' ? '2px solid #0284c7' : '2px solid transparent',
              color: activeNetworkTab === 'overview' ? '#0284c7' : '#64748b'
            }}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('subnets')}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: '700',
              borderBottom: activeNetworkTab === 'subnets' ? '2px solid #0284c7' : '2px solid transparent',
              color: activeNetworkTab === 'subnets' ? '#0284c7' : '#64748b'
            }}
          >
            Subnets
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('ports')}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: '700',
              borderBottom: activeNetworkTab === 'ports' ? '2px solid #0284c7' : '2px solid transparent',
              color: activeNetworkTab === 'ports' ? '#0284c7' : '#64748b'
            }}
          >
            Ports
          </button>
        </div>

        {activeNetworkTab === 'overview' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>Network Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
              <div><strong>Name:</strong> {selectedNet.name}</div>
              <div><strong>ID:</strong> net-9f82-a72</div>
              <div><strong>Project:</strong> quickmart</div>
              <div><strong>Status:</strong> Active</div>
              <div><strong>Admin State:</strong> UP</div>
              <div><strong>Shared:</strong> No</div>
            </div>
          </div>
        )}

        {activeNetworkTab === 'subnets' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>Subnets ({selectedNet.subnetName})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
              <div><strong>Name:</strong> {selectedNet.subnetName}</div>
              <div><strong>Network Address:</strong> {selectedNet.cidr}</div>
              <div><strong>IP Version:</strong> IPv4</div>
              <div><strong>Gateway IP:</strong> {selectedNet.gateway}</div>
              <div><strong>DHCP Enabled:</strong> {selectedNet.dhcp ? 'Yes' : 'No'}</div>
              <div><strong>Allocation Pools:</strong> {selectedNet.allocationPoolStart || '10.20.1.2'} - {selectedNet.allocationPoolEnd || '10.20.1.254'}</div>
            </div>
          </div>
        )}

        {activeNetworkTab === 'ports' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
                  <th style={{ padding: '10px 14px' }}>Name / Device</th>
                  <th style={{ padding: '10px 14px' }}>Fixed IP</th>
                  <th style={{ padding: '10px 14px' }}>Attached Device</th>
                  <th style={{ padding: '10px 14px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: '700' }}>network:dhcp</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#0284c7', fontWeight: '700' }}>10.20.1.2</td>
                  <td style={{ padding: '10px 14px', color: '#64748b' }}>Neutron DHCP Agent</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', backgroundColor: '#dcfce7', color: '#166534' }}>
                      ACTIVE
                    </span>
                  </td>
                </tr>
                {simCloud.routers.some((r) => r.interfaces?.includes(selectedNet.subnetName)) && (
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>network:router_interface</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#0284c7' }}>10.20.1.1</td>
                    <td style={{ padding: '10px 14px', color: '#64748b' }}>qm-router</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', backgroundColor: '#dcfce7', color: '#166534' }}>
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                )}
                {(simCloud.instances || []).filter((vm) => vm.network === selectedNet.name).map((vm) => (
                  <tr key={vm.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>compute:nova</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#0284c7' }}>{vm.privateIp}</td>
                    <td style={{ padding: '10px 14px', color: '#64748b' }}>{vm.name}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', backgroundColor: '#dcfce7', color: '#166534' }}>
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Networks</h2>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Neutron private layer-2 network topologies</p>
        </div>
        {canCreateResource(userRole) && (
          <button
            type="button"
            onClick={onCreateNetClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700'
            }}
          >
            <Plus size={14} /> Create Network
          </button>
        )}
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px' }}>Network Name</th>
              <th style={{ padding: '10px 14px' }}>Subnets Associated</th>
              <th style={{ padding: '10px 14px' }}>Shared</th>
              <th style={{ padding: '10px 14px' }}>Status</th>
              <th style={{ padding: '10px 14px' }}>Admin State</th>
            </tr>
          </thead>
          <tbody>
            {networks.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                  No networks available in this project.
                </td>
              </tr>
            ) : (
              networks.map((net) => (
                <tr key={net.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 14px', fontWeight: '700' }}>
                    <button
                      type="button"
                      onClick={() => setActiveNetworkDetail(net.name)}
                      style={{ color: '#0284c7', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Radio size={14} color="#0284c7" />
                      <span>{net.name}</span>
                    </button>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#334155' }}>
                    {net.subnetName} ({net.cidr})
                  </td>
                  <td style={{ padding: '10px 14px', color: '#64748b' }}>No</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', backgroundColor: '#dcfce7', color: '#166534' }}>
                      Active
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#64748b' }}>UP</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Networks;
