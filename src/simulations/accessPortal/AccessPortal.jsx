/**
 * Access Request Portal UI
 * CDAC Cloud Security Training Platform (Lab 7)
 * Fully safe simulation: prevents native HTML5 popups, page reloads, and sanitizes input.
 */

import React, { useState } from 'react';
import { Shield, Plus, Clock, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { evaluateAccessRequest } from './requestRules';
import { generateRequestId } from '@/utils/ids';
import { sanitizeInput } from '@/utils/sanitize';
import SimErrorBoundary from '@/components/common/SimErrorBoundary';

export const AccessPortal = () => {
  const { simCloud, updateSimCloud } = useStore();
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'new'

  const [targetUser, setTargetUser] = useState('ravi-employee');
  const [requestedRole, setRequestedRole] = useState('member');
  const [justification, setJustification] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requests = simCloud.accessRequests || [];

  const handleCreateRequest = (e) => {
    e.preventDefault();
    const cleanJustification = sanitizeInput(justification);

    if (!cleanJustification || cleanJustification.length < 10) {
      setErrorMsg('Justification is required and must be at least 10 characters.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const newReqId = generateRequestId();
    const pendingRequest = {
      id: newReqId,
      user: targetUser,
      requestedRole: requestedRole,
      justification: cleanJustification,
      status: 'Under review',
      reason: null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    updateSimCloud((prev) => ({
      accessRequests: [pendingRequest, ...(prev.accessRequests || [])]
    }));

    setActiveTab('list');
    setJustification('');
    setIsSubmitting(false);

    // Simulate approval evaluation after 2 seconds
    setTimeout(() => {
      const evaluation = evaluateAccessRequest(targetUser, requestedRole);

      updateSimCloud((prev) => {
        const updatedList = (prev.accessRequests || []).map((req) => {
          if (req.id === newReqId) {
            return {
              ...req,
              status: evaluation.approved ? 'Approved' : 'Returned',
              reason: evaluation.reason
            };
          }
          return req;
        });

        const nextRoles = { ...prev.userRoles };
        if (evaluation.approved) {
          nextRoles[targetUser] = requestedRole === 'No access' ? null : requestedRole;
        }

        return {
          accessRequests: updatedList,
          userRoles: nextRoles
        };
      });
    }, 2000);
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'inherit',
        color: '#0f172a',
        overflowY: 'auto'
      }}
    >
      {/* Top Header */}
      <div
        style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #0284c7'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={20} color="#38bdf8" />
          <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>
            QUICKMART IDENTITY & ACCESS PORTAL
          </span>
        </div>
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
          Trainee Session • Policy Engine Active
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '24px', maxWidth: '880px', margin: '0 auto', width: '100%' }}>
        {activeTab === 'list' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Access Requests</h2>
                <p style={{ fontSize: '12px', color: '#64748b' }}>
                  Manage and request role assignments for team members, vendors, and services.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('new')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Plus size={14} />
                <span>+ New Request</span>
              </button>
            </div>

            {/* Requests Table */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px' }}>Request ID</th>
                    <th style={{ padding: '10px 14px' }}>User</th>
                    <th style={{ padding: '10px 14px' }}>Requested Role</th>
                    <th style={{ padding: '10px 14px' }}>Justification</th>
                    <th style={{ padding: '10px 14px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                        No access requests submitted yet. Click <strong>+ New Request</strong> to begin.
                      </td>
                    </tr>
                  ) : (
                    requests.map((req) => (
                      <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontWeight: '700' }}>{req.id}</td>
                        <td style={{ padding: '10px 14px', fontWeight: '600' }}>{req.user}</td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', backgroundColor: '#e0f2fe', color: '#0369a1' }}>
                            {req.requestedRole}
                          </span>
                        </td>
                        <td style={{ padding: '10px 14px', color: '#475569', maxWidth: '240px' }}>{req.justification}</td>
                        <td style={{ padding: '10px 14px' }}>
                          {req.status === 'Approved' && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: '700' }}>
                              <CheckCircle2 size={13} /> Approved
                            </span>
                          )}
                          {req.status === 'Returned' && (
                            <span title={req.reason} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#dc2626', fontWeight: '700', cursor: 'help' }}>
                              <XCircle size={13} /> Returned
                            </span>
                          )}
                          {req.status === 'Under review' && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#d97706', fontWeight: '700' }}>
                              <Clock size={13} /> Under review
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'new' && (
          <div style={{ maxWidth: '520px', margin: '0 auto' }}>
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#0284c7', fontWeight: '600', marginBottom: '16px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <ArrowLeft size={14} /> Back to Requests
            </button>

            <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '24px', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px' }}>Submit Role Access Request</h2>

              {errorMsg && (
                <div style={{ padding: '8px 12px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontSize: '11.5px', marginBottom: '16px', border: '1px solid #fecaca' }}>
                  {errorMsg}
                </div>
              )}

              <SimErrorBoundary onClose={() => setActiveTab('list')}>
                <form onSubmit={handleCreateRequest} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Select User</label>
                    <select
                      value={targetUser}
                      onChange={(e) => setTargetUser(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    >
                      <option value="ravi-employee">ravi-employee (Store operations lead)</option>
                      <option value="freshfarms-vendor">freshfarms-vendor (Produce supplier)</option>
                      <option value="customer-test">customer-test (Customer testing)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Requested Role</label>
                    <select
                      value={requestedRole}
                      onChange={(e) => setRequestedRole(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    >
                      <option value="member">member (Read + Write + Manage resources)</option>
                      <option value="reader">reader (Read-only)</option>
                      <option value="admin">admin (Full cloud administration)</option>
                      <option value="No access">No access (Revoke/Block access)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Business Justification</label>
                    <textarea
                      rows={3}
                      value={justification}
                      onChange={(e) => { setJustification(e.target.value); if (errorMsg) setErrorMsg(''); }}
                      placeholder="Describe why this user requires this specific access level..."
                      style={{ width: '100%', padding: '8px 10px', fontSize: '12.5px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ marginTop: '8px', padding: '10px', backgroundColor: '#0284c7', color: '#ffffff', borderRadius: '6px', fontSize: '12.5px', fontWeight: '700', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Access Request'}
                  </button>
                </form>
              </SimErrorBoundary>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessPortal;
