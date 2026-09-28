import React, { useState } from 'react';
import { Shield, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

export const LoginPage = () => {
  const { login } = useCourse();
  const [username, setUsername] = useState('student');
  const [password, setPassword] = useState('cloudsec123');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // // TODO: connect real backend authentication
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(username, password);
      setIsSubmitting(false);
    }, 350);
  };

  const handleFillDemo = () => {
    setUsername('student');
    setPassword('cloudsec123');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative'
      }}
    >
      {/* Background Decorative Cloud Animation */}
      <div
        className="animate-gentle-bob"
        style={{
          position: 'absolute',
          top: '8%',
          opacity: 0.45,
          pointerEvents: 'none'
        }}
      >
        <svg width="220" height="110" viewBox="0 0 220 110" fill="none">
          <path
            d="M 50 85 C 20 85 10 65 20 45 C 15 25 35 15 55 22 C 70 8 115 8 135 25 C 155 20 180 35 175 60 C 190 75 170 90 145 85 Z"
            fill="#e0f2fe"
            stroke="#bae6fd"
            strokeWidth="2"
          />
          <path
            d="M 120 45 Q 140 30 160 50"
            stroke="#0284c7"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Main Login Card */}
      <div
        className="animate-pop-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
          padding: '36px 32px',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.3)'
            }}
          >
            <Shield size={28} />
          </div>

          <span
            style={{
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#0284c7',
              backgroundColor: '#f0f9ff',
              padding: '3px 10px',
              borderRadius: '12px',
              border: '1px solid #bae6fd'
            }}
          >
            CloudSec Academy
          </span>

          <h1
            style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#0f172a',
              marginTop: '10px',
              marginBottom: '6px',
              letterSpacing: '-0.02em'
            }}
          >
            Cloud Sec Course
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748b' }}>
            Sign in to access your hands-on training cloud
          </p>
        </div>

        {/* Demo Access Helper Box */}
        <div
          style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '10px',
            padding: '12px 14px',
            marginBottom: '22px',
            fontSize: '12.5px',
            color: '#166534',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '8px'
          }}
        >
          <div>
            <div style={{ fontWeight: '700', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={14} color="#16a34a" />
              <span>Demo Access Credentials</span>
            </div>
            <div style={{ color: '#15803d', fontSize: '12px' }}>
              Username: <code style={{ fontWeight: '700', backgroundColor: '#dcfce7', padding: '1px 5px', borderRadius: '4px' }}>student</code> / Password: <code style={{ fontWeight: '700', backgroundColor: '#dcfce7', padding: '1px 5px', borderRadius: '4px' }}>cloudsec123</code>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFillDemo}
            style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#15803d',
              backgroundColor: '#dcfce7',
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid #86efac',
              whiteSpace: 'nowrap'
            }}
          >
            Auto-fill
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#334155',
                marginBottom: '6px'
              }}
            >
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }}>
                <User size={16} />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#0284c7')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#334155',
                marginBottom: '6px'
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }}>
                <Lock size={16} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#0284c7')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: '8px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.3)',
              transition: 'all 0.2s ease',
              cursor: isSubmitting ? 'wait' : 'pointer'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0369a1')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0284c7')}
          >
            <span>{isSubmitting ? 'Signing In...' : 'Sign In to Dashboard'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '11.5px', color: '#94a3b8' }}>
          Vendor-Neutral Hands-On Cloud Security Training Platform
        </div>
      </div>
    </div>
  );
};
