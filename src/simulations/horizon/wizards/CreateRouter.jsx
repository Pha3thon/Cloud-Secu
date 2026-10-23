/**
 * Create Router & Add Interface Dialogs
 * Fully safe simulation: prevents native HTML5 popups, page reloads, and sanitizes input.
 */

import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { sanitizeInput } from '@/utils/sanitize';
import SimErrorBoundary from '@/components/common/SimErrorBoundary';

export const CreateRouter = ({ onClose, onSave }) => {
  const [name, setName] = useState('qm-router');
  const [externalNet, setExternalNet] = useState('public-net');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanName = sanitizeInput(name);
    if (!cleanName) {
      setError('Router name is required.');
      return;
    }

    onSave({
      name: cleanName,
      externalNetwork: externalNet,
      externalIp: '203.0.113.15',
      interfaces: []
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
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Create Router</h3>
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
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Router Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (error) setError(''); }}
                style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>External Network</label>
              <select
                value={externalNet}
                onChange={(e) => setExternalNet(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="public-net">public-net (External Gateway)</option>
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
                Create Router
              </button>
            </div>
          </form>
        </SimErrorBoundary>
      </div>
    </div>
  );
};

export const AddInterface = ({ onClose, onSave }) => {
  const [subnet, setSubnet] = useState('qm-subnet');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(subnet);
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
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Add Interface</h3>
          <button type="button" onClick={onClose} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        <SimErrorBoundary onClose={onClose}>
          <form onSubmit={handleSubmit} noValidate style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Subnet</label>
              <select
                value={subnet}
                onChange={(e) => setSubnet(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="qm-subnet">qm-subnet: 10.20.1.0/24 (qm-net)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>IP Address (Optional)</label>
              <input
                type="text"
                placeholder="10.20.1.1 (gateway auto-assigned)"
                readOnly
                style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#64748b' }}
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
                Submit
              </button>
            </div>
          </form>
        </SimErrorBoundary>
      </div>
    </div>
  );
};

export default CreateRouter;
