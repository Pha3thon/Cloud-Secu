/**
 * Horizon Security Groups Panel
 * Displays firewall security groups and rules management view.
 */

import React, { useState } from 'react';
import { Plus, ArrowLeft, Shield } from 'lucide-react';
import { canCreateResource } from '../policy';

export const SecurityGroups = ({
  simCloud,
  userRole,
  onCreateSgClick,
  onAddRuleClick,
  onRecordLabEvent
}) => {
  const [activeSgDetail, setActiveSgDetail] = useState(null);

  const securityGroups = simCloud.securityGroups || [];
  const selectedSg = securityGroups.find((s) => s.id === activeSgDetail?.id || s.name === activeSgDetail?.name);

  const handleOpenManageRules = (sg) => {
    setActiveSgDetail(sg);
    if (onRecordLabEvent) {
      onRecordLabEvent('rules_viewed');
    }
  };

  if (selectedSg) {
    const rules = selectedSg.rules || [];

    return (
      <div>
        <button
          type="button"
          onClick={() => setActiveSgDetail(null)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#0284c7', fontWeight: '600', marginBottom: '14px' }}
        >
          <ArrowLeft size={14} /> Back to Security Groups
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Manage Rules: {selectedSg.name}</h2>
            <p style={{ fontSize: '12px', color: '#64748b' }}>{selectedSg.description || 'Firewall packet filtering rules'}</p>
          </div>
          {canCreateResource(userRole) && (
            <button
              type="button"
              onClick={() => onAddRuleClick(selectedSg)}
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
              <Plus size={14} /> Add Rule
            </button>
          )}
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
                <th style={{ padding: '10px 14px' }}>Direction</th>
                <th style={{ padding: '10px 14px' }}>Ether Type</th>
                <th style={{ padding: '10px 14px' }}>IP Protocol</th>
                <th style={{ padding: '10px 14px' }}>Port Range</th>
                <th style={{ padding: '10px 14px' }}>Remote</th>
              </tr>
            </thead>
            <tbody>
              {rules.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                    No rules defined for this security group.
                  </td>
                </tr>
              ) : (
                rules.map((rule, idx) => (
                  <tr key={rule.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700', textTransform: 'capitalize' }}>
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          backgroundColor: rule.direction === 'ingress' ? '#f0fdf4' : '#f8fafc',
                          color: rule.direction === 'ingress' ? '#166534' : '#475569'
                        }}
                      >
                        {rule.direction}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', color: '#64748b' }}>IPv4</td>
                    <td style={{ padding: '10px 14px', textTransform: 'uppercase', color: '#334155' }}>
                      {rule.protocol || 'TCP'}
                    </td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#0f172a' }}>
                      {rule.port || 'ALL'}
                    </td>
                    <td style={{ padding: '10px 14px', color: '#0284c7', fontWeight: '600' }}>
                      {rule.remote}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Security Groups</h2>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Stateful virtual firewall rulesets for instances</p>
        </div>
        {canCreateResource(userRole) && (
          <button
            type="button"
            onClick={onCreateSgClick}
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
            <Plus size={14} /> Create Security Group
          </button>
        )}
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px' }}>Name</th>
              <th style={{ padding: '10px 14px' }}>Description</th>
              <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {securityGroups.map((sg) => (
              <tr key={sg.id || sg.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: '700' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={14} color="#0284c7" />
                    <span>{sg.name}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>{sg.description}</td>
                <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => handleOpenManageRules(sg)}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#e0f2fe',
                      color: '#0369a1',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}
                  >
                    Manage Rules
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecurityGroups;
