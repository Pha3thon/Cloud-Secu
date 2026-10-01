import React, { useState } from 'react';
import { Shield, Plus, Clock, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

export const AccessPortal = () => {
  const { simCloud, updateSimCloud } = useCourse();
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'new'

  const [targetUser, setTargetUser] = useState('ravi-employee');
  const [requestedRole, setRequestedRole] = useState('member');
  const [justification, setJustification] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requests = simCloud.accessRequests || [];

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!justification || justification.trim().length < 10) {
      setErrorMsg('Justification is required and must be at least 10 characters.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const newReqId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const pendingRequest = {
      id: newReqId,
      user: targetUser,
      requestedRole: requestedRole,
      justification: justification.trim(),
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
      let isApproved = false;
      let returnReason = '';

      if (requestedRole === 'admin') {
        returnReason = 'Admin is reserved for the platform team.';
      } else if (targetUser === 'ravi-employee') {
        if (requestedRole === 'member') {
          isApproved = true;
        } else if (requestedRole === 'reader') {
          returnReason = 'Ravi runs store operations and must create and manage resources.';
        } else {
          returnReason = 'Store operations requires member role access.';
        }
      } else if (targetUser === 'freshfarms-vendor') {
        if (requestedRole === 'reader') {
          isApproved = true;
        } else if (requestedRole === 'member' || requestedRole === 'admin') {
          returnReason = 'Suppliers only need to view stock reports.';
        } else {
          returnReason = 'Vendor requires read-only role.';
        }
      } else if (targetUser === 'customer-test') {
        if (requestedRole === 'No access') {
          isApproved = true;
        } else {
          returnReason = 'Customers use the app, never the cloud.';
        }
      }

      updateSimCloud((prev) => {
        const updatedList = (prev.accessRequests || []).map((req) => {
          if (req.id === newReqId) {
            return {
              ...req,
              status: isApproved ? 'Approved' : 'Returned',
              reason: returnReason
            };
          }
          return req;
        });

        // If approved, immediately apply role into userRoles in cloud
        const nextRoles = { ...prev.userRoles };
        if (isApproved) {
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
          borderBottom: '1px solid #1e293b'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={18} color="#38bdf8" />
          <span style={{ fontSize: '13.5px', fontWeight: '800', letterSpacing: '0.02em' }}>
            QuickMart Access Request Portal
          </span>
          <span
            style={{
              fontSize: '10px',
              backgroundColor: '#1e293b',
              color: '#38bdf8',
              padding: '2px 8px',
              borderRadius: '12px',
              border: '1px solid #334155'
            }}
          >
            Internal SSO
          </span>
        </div>
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
          Authenticated as: <strong style={{ color: '#ffffff' }}>trainee (member)</strong>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Navigation / Actions Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                backgroundColor: activeTab === 'list' ? '#e0f2fe' : '#f1f5f9',
                color: activeTab === 'list' ? '#0369a1' : '#475569',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              My Requests ({requests.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('new')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                backgroundColor: activeTab === 'new' ? '#0284c7' : '#0284c7',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Plus size={14} />
              <span>New Request</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Requests Table */}
        {activeTab === 'list' && (
          <div
            style={{
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              backgroundColor: '#ffffff'
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '10px 14px', fontWeight: '600' }}>Request ID</th>
                  <th style={{ padding: '10px 14px', fontWeight: '600' }}>User Persona</th>
                  <th style={{ padding: '10px 14px', fontWeight: '600' }}>Requested Role</th>
                  <th style={{ padding: '10px 14px', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '10px 14px', fontWeight: '600' }}>Justification / Reason</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '32px 14px', textAlign: 'center', color: '#94a3b8' }}>
                      No access requests submitted yet. Click <strong>'+ New Request'</strong> to begin.
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontWeight: '700' }}>{req.id}</td>
                      <td style={{ padding: '10px 14px', fontWeight: '600', color: '#0f172a' }}>{req.user}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '700',
                            backgroundColor:
                              req.requestedRole === 'admin'
                                ? '#fee2e2'
                                : req.requestedRole === 'member'
                                ? '#e0f2fe'
                                : req.requestedRole === 'reader'
                                ? '#f1f5f9'
                                : '#f3f4f6',
                            color:
                              req.requestedRole === 'admin'
                                ? '#991b1b'
                                : req.requestedRole === 'member'
                                ? '#0369a1'
                                : '#334155'
                          }}
                        >
                          {req.requestedRole}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        {req.status === 'Approved' ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: '#059669',
                              fontWeight: '700'
                            }}
                          >
                            <CheckCircle2 size={13} />
                            Approved
                          </span>
                        ) : req.status === 'Returned' ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: '#dc2626',
                              fontWeight: '700'
                            }}
                          >
                            <XCircle size={13} />
                            Returned
                          </span>
                        ) : (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: '#d97706',
                              fontWeight: '700'
                            }}
                          >
                            <Clock size={13} className="animate-spin" />
                            Under review
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '10px 14px', color: req.reason ? '#b91c1c' : '#475569' }}>
                        {req.reason ? <strong>{req.reason}</strong> : req.justification}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: New Request Form */}
        {activeTab === 'new' && (
          <form
            onSubmit={handleCreateRequest}
            style={{
              maxWidth: '560px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800' }}>Submit New Access Request</h3>
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  color: '#64748b'
                }}
              >
                <ArrowLeft size={12} />
                Cancel
              </button>
            </div>

            {errorMsg && (
              <div
                style={{
                  backgroundColor: '#fee2e2',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '11.5px',
                  color: '#991b1b'
                }}
              >
                {errorMsg}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '700', marginBottom: '6px' }}>
                User Persona:
              </label>
              <select
                value={targetUser}
                onChange={(e) => setTargetUser(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="ravi-employee">ravi-employee (Store operations lead)</option>
                <option value="freshfarms-vendor">freshfarms-vendor (Produce supplier)</option>
                <option value="customer-test">customer-test (Customer testing)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '700', marginBottom: '6px' }}>
                Requested Access Level:
              </label>
              <select
                value={requestedRole}
                onChange={(e) => setRequestedRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="reader">reader (View only)</option>
                <option value="member">member (Create and manage workloads)</option>
                <option value="admin">admin (Full cloud administration)</option>
                <option value="No access">No access (Zero cloud console role)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '700', marginBottom: '6px' }}>
                Business Justification (min 10 characters):
              </label>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                rows={3}
                placeholder="State the specific operational requirement..."
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px',
                  fontFamily: 'inherit',
                  backgroundColor: '#ffffff'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '9px 18px',
                borderRadius: '6px',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                alignSelf: 'flex-start'
              }}
            >
              Submit for Platform Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
