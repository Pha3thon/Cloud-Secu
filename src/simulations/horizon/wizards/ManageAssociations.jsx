/**
 * Allocate & Associate Floating IP Modals
 * Fully safe simulation: prevents native HTML5 popups, page reloads, and sanitizes input.
 */

import React, { useState } from 'react';
import { X } from 'lucide-react';
import SimErrorBoundary from '@/components/common/SimErrorBoundary';

export const AllocateFloatingIp = ({ onClose, onAllocate }) => {
  const [pool, setPool] = useState('public-net');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAllocate({
      ip: '203.0.113.27',
      pool,
      instanceId: null,
      portIp: null
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
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Allocate Floating IP</h3>
          <button type="button" onClick={onClose} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        <SimErrorBoundary onClose={onClose}>
          <form onSubmit={handleSubmit} noValidate style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Pool</label>
              <select
                value={pool}
                onChange={(e) => setPool(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="public-net">public-net (External Pool)</option>
              </select>
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
                Allocate IP
              </button>
            </div>
          </form>
        </SimErrorBoundary>
      </div>
    </div>
  );
};

export const ManageAssociations = ({ targetFip, instances = [], onClose, onAssociate }) => {
  const [selectedPort, setSelectedPort] = useState('qm-web-01: 10.20.1.3');

  const handleSubmit = (e) => {
    e.preventDefault();
    const isWeb = selectedPort.includes('qm-web-01');
    onAssociate(targetFip, {
      instanceId: isWeb ? 'qm-web-01' : 'qm-db-01',
      portIp: isWeb ? '10.20.1.3' : '10.20.1.4'
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
          maxWidth: '460px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Manage Floating IP Associations</h3>
          <button type="button" onClick={onClose} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        <SimErrorBoundary onClose={onClose}>
          <form onSubmit={handleSubmit} noValidate style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>IP Address</label>
              <input
                type="text"
                readOnly
                value={targetFip?.ip || '203.0.113.27'}
                style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#0f172a', fontWeight: '700' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Port to be associated</label>
              <select
                value={selectedPort}
                onChange={(e) => setSelectedPort(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="qm-web-01: 10.20.1.3">qm-web-01: 10.20.1.3</option>
                {instances.some((i) => i.name === 'qm-db-01') && (
                  <option value="qm-db-01: 10.20.1.4">qm-db-01: 10.20.1.4</option>
                )}
              </select>
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
                Associate
              </button>
            </div>
          </form>
        </SimErrorBoundary>
      </div>
    </div>
  );
};

export default ManageAssociations;
