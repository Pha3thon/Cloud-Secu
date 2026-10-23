import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import useStore from '@/hooks/useStore';

/**
 * Login route screen.
 */
export default function Login() {
  const { login } = useStore();
  const [username, setUsername] = useState('student');
  const [password, setPassword] = useState('cloudsec123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: connect real backend
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const res = login(username, password);
      if (!res.success) {
        setErrorMsg('Invalid login credentials. Please use the credentials provided in the helper box.');
        setIsSubmitting(false);
      }
    }, 200);
  };

  const fillStudent = () => {
    setUsername('student');
    setPassword('cloudsec123');
    setErrorMsg('');
  };

  const fillAdmin = () => {
    setUsername('admin');
    setPassword('admin@cdac');
    setErrorMsg('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-app, #f8fafc)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative'
      }}
    >
      {/* Centered Login Card */}
      <div
        className="animate-pop-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl, 20px)',
          border: '1px solid var(--border-subtle, #e2e8f0)',
          boxShadow: 'var(--shadow-xl)',
          padding: '36px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontFamily: "'JetBrains Mono', 'IBM Plex Sans', monospace",
              fontSize: '28px',
              fontWeight: '900',
              color: 'var(--brand-primary, #0284c7)',
              letterSpacing: '-0.03em',
              marginBottom: '4px'
            }}
          >
            <span>CDAC</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--brand-primary, #0284c7)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
          </div>
          <div style={{ fontSize: '13.5px', color: 'var(--text-muted, #475569)', fontWeight: '600' }}>
            Cloud Security Training Program
          </div>
        </div>

        {/* Helper Box with Demo Logins */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: 'var(--radius-lg, 10px)',
            padding: '14px 16px',
            fontSize: '11.5px',
            color: 'var(--text-main, #334155)',
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Student Access — Username: <strong>student</strong> Password: <strong>cloudsec123</strong></span>
            <button
              type="button"
              onClick={fillStudent}
              style={{
                fontSize: '10.5px',
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: '#e0f2fe',
                color: 'var(--brand-primary, #0369a1)',
                fontWeight: '700',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              Fill
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #cbd5e1', paddingTop: '6px' }}>
            <span>Admin Access   — Username: <strong>admin</strong> Password: <strong>admin@cdac</strong></span>
            <button
              type="button"
              onClick={fillAdmin}
              style={{
                fontSize: '10.5px',
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: '#fee2e2',
                color: 'var(--color-danger, #991b1b)',
                fontWeight: '700',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              Fill
            </button>
          </div>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#991b1b',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13.5px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13.5px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: '8px',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'var(--brand-primary, #0284c7)',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '700',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(2, 132, 199, 0.2)'
            }}
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Training Cloud'}</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
