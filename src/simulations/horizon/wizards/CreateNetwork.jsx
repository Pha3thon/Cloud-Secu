/**
 * Create Network Wizard Modal
 * 3-step wizard: Network, Subnet, and Subnet Details (DHCP).
 * Fully safe simulation: prevents native HTML5 popups, page reloads, and sanitizes input.
 */

import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { sanitizeInput } from '@/utils/sanitize';
import SimErrorBoundary from '@/components/common/SimErrorBoundary';

export const CreateNetwork = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('network'); // 'network' | 'subnet' | 'details'
  const [name, setName] = useState('qm-net');
  const [createSubnet, setCreateSubnet] = useState(true);
  const [subnetName, setSubnetName] = useState('qm-subnet');
  const [cidr, setCidr] = useState('10.20.1.0/24');
  const [gateway, setGateway] = useState('10.20.1.1');
  const [enableDhcp, setEnableDhcp] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanName = sanitizeInput(name);
    const cleanSubnetName = sanitizeInput(subnetName);
    const cleanCidr = sanitizeInput(cidr);
    const cleanGateway = sanitizeInput(gateway);

    if (!cleanName) {
      setError('Network name is required.');
      setActiveTab('network');
      return;
    }

    if (createSubnet) {
      if (!cleanSubnetName) {
        setError('Subnet name is required when Create Subnet is enabled.');
        setActiveTab('subnet');
        return;
      }
      if (!cleanCidr) {
        setError('Network Address (CIDR) is required.');
        setActiveTab('subnet');
        return;
      }
    }

    onSave({
      name: cleanName,
      subnetName: cleanSubnetName,
      cidr: cleanCidr,
      gateway: cleanGateway,
      dhcp: enableDhcp,
      allocationPoolStart: '10.20.1.2',
      allocationPoolEnd: '10.20.1.254'
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 1000
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Create Network</h3>
          <button type="button" onClick={onClose} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        {/* Wizard Tabs Header */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
          <button
            type="button"
            onClick={() => setActiveTab('network')}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '12px',
              fontWeight: '700',
              border: 'none',
              borderBottom: activeTab === 'network' ? '2px solid #0284c7' : '2px solid transparent',
              color: activeTab === 'network' ? '#0284c7' : '#64748b',
              backgroundColor: 'transparent',
              cursor: 'pointer'
            }}
          >
            1. Network
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('subnet')}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '12px',
              fontWeight: '700',
              border: 'none',
              borderBottom: activeTab === 'subnet' ? '2px solid #0284c7' : '2px solid transparent',
              color: activeTab === 'subnet' ? '#0284c7' : '#64748b',
              backgroundColor: 'transparent',
              cursor: 'pointer'
            }}
          >
            2. Subnet
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '12px',
              fontWeight: '700',
              border: 'none',
              borderBottom: activeTab === 'details' ? '2px solid #0284c7' : '2px solid transparent',
              color: activeTab === 'details' ? '#0284c7' : '#64748b',
              backgroundColor: 'transparent',
              cursor: 'pointer'
            }}
          >
            3. Subnet Details
          </button>
        </div>

        {/* Error alert banner */}
        {error && (
          <div style={{ margin: '14px 20px 0', padding: '8px 12px', borderRadius: '6px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', fontSize: '12px', fontWeight: '600' }}>
            <AlertCircle size={15} color="#dc2626" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <SimErrorBoundary onClose={onClose}>
          <form onSubmit={handleSubmit} noValidate style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activeTab === 'network' && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Network Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (error) setError(''); }}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="createSubnetCheck"
                    checked={createSubnet}
                    onChange={(e) => setCreateSubnet(e.target.checked)}
                  />
                  <label htmlFor="createSubnetCheck" style={{ fontSize: '12px', color: '#334155', cursor: 'pointer' }}>Create Subnet</label>
                </div>
              </>
            )}

            {activeTab === 'subnet' && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Subnet Name</label>
                  <input
                    type="text"
                    value={subnetName}
                    onChange={(e) => { setSubnetName(e.target.value); if (error) setError(''); }}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Network Address (CIDR)</label>
                  <input
                    type="text"
                    value={cidr}
                    onChange={(e) => { setCidr(e.target.value); if (error) setError(''); }}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Gateway IP</label>
                  <input
                    type="text"
                    value={gateway}
                    onChange={(e) => setGateway(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </>
            )}

            {activeTab === 'details' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="enableDhcpCheck"
                    checked={enableDhcp}
                    onChange={(e) => setEnableDhcp(e.target.checked)}
                  />
                  <label htmlFor="enableDhcpCheck" style={{ fontSize: '12px', color: '#334155', fontWeight: '600', cursor: 'pointer' }}>Enable DHCP</label>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Allocation Pools (Optional)</label>
                  <input
                    type="text"
                    readOnly
                    value="10.20.1.2,10.20.1.254"
                    style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#64748b' }}
                  />
                </div>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '14px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '600', color: '#475569', backgroundColor: '#ffffff', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ padding: '8px 16px', borderRadius: '6px', backgroundColor: '#0284c7', color: '#ffffff', fontSize: '12px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
              >
                Create
              </button>
            </div>
          </form>
        </SimErrorBoundary>
      </div>
    </div>
  );
};

export default CreateNetwork;
