/**
 * Horizon Login Panel
 */

import React, { useState } from 'react';

export const Login = ({ onLogin }) => {
  const [loginDomain, setLoginDomain] = useState('Default');
  const [loginUsername, setLoginUsername] = useState('trainee');
  const [loginPassword, setLoginPassword] = useState('Quick@Mart1');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const u = loginUsername.trim().toLowerCase();
    const p = loginPassword.trim();

    if (u === 'trainee' && p === 'Quick@Mart1') {
      onLogin('trainee');
      return;
    }
    if (u === 'ravi-employee' && p === 'Welcome@123') {
      onLogin('ravi-employee');
      return;
    }
    if (u === 'freshfarms-vendor' && p === 'Welcome@123') {
      onLogin('freshfarms-vendor');
      return;
    }
    if (u === 'customer-test' && p === 'Welcome@123') {
      onLogin('customer-test');
      return;
    }

    setLoginError('Invalid credentials. Please verify Domain, Username, and Password.');
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f5f9',
        padding: '20px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #cbd5e1',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>OpenStack Horizon</h2>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Training Edition — QuickMart Cloud</p>
        </div>

        {loginError && (
          <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '6px', padding: '8px 12px', fontSize: '11px', color: '#991b1b' }}>
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Domain</label>
            <input
              type="text"
              value={loginDomain}
              onChange={(e) => setLoginDomain(e.target.value)}
              style={{ width: '100%', padding: '7px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>User Name</label>
            <input
              type="text"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              style={{ width: '100%', padding: '7px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Password</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={{ width: '100%', padding: '7px 10px', fontSize: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>
          <button
            type="submit"
            style={{
              marginTop: '8px',
              padding: '9px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              fontSize: '12.5px',
              fontWeight: '700',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
