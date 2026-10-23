/**
 * Launch Instance Wizard & Create Keypair Dialog
 * 6-step instance creation matching OpenStack Horizon.
 * Fully safe simulation: prevents native HTML5 popups, page reloads, and sanitizes input.
 */

import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { sanitizeInput } from '@/utils/sanitize';
import SimErrorBoundary from '@/components/common/SimErrorBoundary';

export const LaunchInstance = ({ onClose, onLaunch }) => {
  const [tab, setTab] = useState('details'); // 'details' | 'source' | 'flavor' | 'networks' | 'securitygroups' | 'keypair'
  const [name, setName] = useState('qm-web-01');
  const [image, setImage] = useState('ubuntu-22.04');
  const [flavor, setFlavor] = useState('m1.small');
  const [allocatedNets] = useState(['qm-net']);
  const [allocatedSgs, setAllocatedSgs] = useState(['default']); // Default starts allocated per Horizon
  const [keyName, setKeyName] = useState('qm-key');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanName = sanitizeInput(name);
    if (!cleanName) {
      setError('Instance name is required.');
      setTab('details');
      return;
    }

    if (allocatedSgs.length === 0) {
      setError('At least one security group must be allocated.');
      setTab('securitygroups');
      return;
    }

    onLaunch({
      name: cleanName,
      image,
      flavor,
      network: allocatedNets[0] || 'qm-net',
      securityGroups: allocatedSgs,
      keyName: sanitizeInput(keyName) || 'qm-key',
      privateIp: cleanName === 'qm-web-01' ? '10.20.1.3' : '10.20.1.4',
      status: 'ACTIVE'
    });
  };

  const toggleSg = (sgName, isAllocated) => {
    if (isAllocated) {
      setAllocatedSgs((prev) => prev.filter((s) => s !== sgName));
    } else {
      setAllocatedSgs((prev) => [...prev, sgName]);
    }
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
          maxWidth: '620px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Launch Instance</h3>
          <button type="button" onClick={onClose} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        {/* Wizard Step Nav */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', overflowX: 'auto' }}>
          {['details', 'source', 'flavor', 'networks', 'securitygroups', 'keypair'].map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => setTab(step)}
              style={{
                padding: '9px 12px',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'capitalize',
                border: 'none',
                borderBottom: tab === step ? '2px solid #0284c7' : '2px solid transparent',
                color: tab === step ? '#0284c7' : '#64748b',
                backgroundColor: 'transparent',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {step === 'securitygroups' ? 'Security Groups' : (step === 'keypair' ? 'Key Pair' : step)}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ margin: '14px 20px 0', padding: '8px 12px', borderRadius: '6px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', fontSize: '12px', fontWeight: '600' }}>
            <AlertCircle size={15} color="#dc2626" />
            <span>{error}</span>
          </div>
        )}

        <SimErrorBoundary onClose={onClose}>
          <form onSubmit={handleSubmit} noValidate style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
            {tab === 'details' && (
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Instance Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (error) setError(''); }}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
            )}

            {tab === 'source' && (
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Select Image</label>
                <select
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="ubuntu-22.04">ubuntu-22.04 (Linux server)</option>
                  <option value="mysql-8-server">mysql-8-server (Database server)</option>
                </select>
              </div>
            )}

            {tab === 'flavor' && (
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Flavor</label>
                <select
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="m1.small">m1.small (1 vCPU, 2 GB RAM, 20 GB Disk)</option>
                  <option value="m1.medium">m1.medium (2 vCPU, 4 GB RAM, 40 GB Disk)</option>
                </select>
              </div>
            )}

            {tab === 'networks' && (
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Allocated Network</label>
                <div style={{ padding: '8px 12px', backgroundColor: '#f1f5f9', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                  qm-net (10.20.1.0/24)
                </div>
              </div>
            )}

            {tab === 'securitygroups' && (
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                  Security Groups (Remove default if assigning dedicated rules!)
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['default', 'qm-web-sg', 'qm-db-sg'].map((sg) => {
                    const isAllocated = allocatedSgs.includes(sg);
                    return (
                      <div
                        key={sg}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          backgroundColor: isAllocated ? '#f0fdf4' : '#ffffff'
                        }}
                      >
                        <span style={{ fontSize: '12px', fontWeight: '700', color: isAllocated ? '#166534' : '#334155' }}>{sg}</span>
                        <button
                          type="button"
                          onClick={() => toggleSg(sg, isAllocated)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '700',
                            backgroundColor: isAllocated ? '#fee2e2' : '#e0f2fe',
                            color: isAllocated ? '#991b1b' : '#0369a1',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {isAllocated ? 'Remove ↓' : 'Allocate ↑'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === 'keypair' && (
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Key Pair</label>
                <select
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="qm-key">qm-key</option>
                </select>
              </div>
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
                Launch Instance
              </button>
            </div>
          </form>
        </SimErrorBoundary>
      </div>
    </div>
  );
};

export const CreateKeypair = ({ onClose, onSave }) => {
  const [name, setName] = useState('qm-key');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanName = sanitizeInput(name);
    if (!cleanName) {
      setError('Key pair name is required.');
      return;
    }

    onSave(cleanName);
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
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Create Key Pair</h3>
          <button type="button" onClick={onClose} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        {error && (
          <div style={{ margin: '14px 20px 0', padding: '8px 12px', borderRadius: '6px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', fontSize: '12px', fontWeight: '600' }}>
            <AlertCircle size={15} color="#dc2626" />
            <span>{error}</span>
          </div>
        )}

        <SimErrorBoundary onClose={onClose}>
          <form onSubmit={handleSubmit} noValidate style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Key Pair Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (error) setError(''); }}
                style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
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
                Create Key Pair
              </button>
            </div>
          </form>
        </SimErrorBoundary>
      </div>
    </div>
  );
};

export default LaunchInstance;
