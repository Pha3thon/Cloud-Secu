/**
 * Create Security Group & Add Rule Modals
 * Fully safe simulation: prevents native HTML5 popups, page reloads, and sanitizes input.
 */

import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { sanitizeInput } from '@/utils/sanitize';
import SimErrorBoundary from '@/components/common/SimErrorBoundary';

export const CreateSecurityGroup = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanName = sanitizeInput(name);
    const cleanDesc = sanitizeInput(description);

    if (!cleanName) {
      setError('Security group name is required.');
      return;
    }

    onSave({
      id: `sg-${cleanName.toLowerCase()}`,
      name: cleanName,
      description: cleanDesc,
      rules: [
        { id: `r-${Date.now()}-1`, direction: 'egress', protocol: 'ALL', port: 'ALL', remote: '0.0.0.0/0' }
      ]
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
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Create Security Group</h3>
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
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (error) setError(''); }}
                placeholder="e.g. qm-web-sg"
                style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. QuickMart Web Security Group"
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
                Create Security Group
              </button>
            </div>
          </form>
        </SimErrorBoundary>
      </div>
    </div>
  );
};

export const AddRule = ({ targetSg, onClose, onSave }) => {
  const [rulePreset, setRulePreset] = useState('HTTP');
  const [direction, setDirection] = useState('ingress');
  const [port, setPort] = useState('80');
  const [remoteType, setRemoteType] = useState('CIDR'); // 'CIDR' | 'SG'
  const [remoteValue, setRemoteValue] = useState('0.0.0.0/0');
  const [error, setError] = useState('');

  const handlePresetChange = (preset) => {
    setRulePreset(preset);
    if (error) setError('');
    if (preset === 'HTTP') {
      setPort('80');
      setDirection('ingress');
      setRemoteType('CIDR');
      setRemoteValue('0.0.0.0/0');
    } else if (preset === 'HTTPS') {
      setPort('443');
      setDirection('ingress');
      setRemoteType('CIDR');
      setRemoteValue('0.0.0.0/0');
    } else if (preset === 'SSH') {
      setPort('22');
      setDirection('ingress');
      setRemoteType('CIDR');
      setRemoteValue('0.0.0.0/0');
    } else if (preset === 'MYSQL') {
      setPort('3306');
      setDirection('ingress');
      setRemoteType('SG');
      setRemoteValue('qm-web-sg');
    } else if (preset === 'CUSTOM') {
      setPort('');
    }
  };

  const handleRemoteTypeChange = (type) => {
    setRemoteType(type);
    if (error) setError('');
    if (type === 'CIDR') {
      setRemoteValue('0.0.0.0/0');
    } else {
      setRemoteValue('qm-web-sg');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanPort = sanitizeInput(port);
    const cleanRemote = sanitizeInput(remoteValue);

    if (!cleanPort) {
      setError('Port is required.');
      return;
    }

    if (!cleanRemote) {
      setError('Remote CIDR or Security Group is required.');
      return;
    }

    onSave({
      id: `r-${Date.now()}`,
      direction,
      protocol: 'tcp',
      port: cleanPort,
      remote: cleanRemote
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
          maxWidth: '480px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Add Rule to {targetSg?.name}</h3>
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
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Rule Preset</label>
              <select
                value={rulePreset}
                onChange={(e) => handlePresetChange(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="HTTP">HTTP (TCP 80)</option>
                <option value="HTTPS">HTTPS (TCP 443)</option>
                <option value="SSH">SSH (TCP 22)</option>
                <option value="MYSQL">MySQL (TCP 3306)</option>
                <option value="CUSTOM">Custom TCP Rule</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Direction</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="ingress">Ingress (Inbound)</option>
                <option value="egress">Egress (Outbound)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Port</label>
              <input
                type="text"
                value={port}
                onChange={(e) => { setPort(e.target.value); if (error) setError(''); }}
                style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Remote Type</label>
              <select
                value={remoteType}
                onChange={(e) => handleRemoteTypeChange(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="CIDR">CIDR IP Range</option>
                <option value="SG">Security Group</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                {remoteType === 'CIDR' ? 'CIDR (e.g. 0.0.0.0/0)' : 'Security Group Name'}
              </label>
              {remoteType === 'CIDR' ? (
                <input
                  type="text"
                  value={remoteValue}
                  onChange={(e) => { setRemoteValue(e.target.value); if (error) setError(''); }}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              ) : (
                <select
                  value={remoteValue}
                  onChange={(e) => { setRemoteValue(e.target.value); if (error) setError(''); }}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="qm-web-sg">qm-web-sg</option>
                  <option value="default">default</option>
                </select>
              )}
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
                Add Rule
              </button>
            </div>
          </form>
        </SimErrorBoundary>
      </div>
    </div>
  );
};

export default AddRule;
