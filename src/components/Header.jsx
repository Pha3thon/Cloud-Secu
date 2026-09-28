import React from 'react';
import { Shield, BookOpen, LayoutDashboard, RotateCcw, LogOut, ChevronRight } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

export const Header = () => {
  const { user, currentView, navigateTo, logout, resetDemoState } = useCourse();

  if (!user || currentView === 'login') return null;

  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand & Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            type="button"
            onClick={() => navigateTo('dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textAlign: 'left'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(2, 132, 199, 0.25)'
              }}
            >
              <Shield size={20} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                CloudSec Academy
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: '500' }}>
                Cloud Security Training Program
              </div>
            </div>
          </button>

          {/* Breadcrumbs Navigation */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12.5px',
              color: '#64748b',
              paddingLeft: '16px',
              borderLeft: '1px solid #e2e8f0'
            }}
            className="md-breadcrumb-show"
          >
            <button
              onClick={() => navigateTo('dashboard')}
              style={{
                color: currentView === 'dashboard' ? '#0284c7' : '#64748b',
                fontWeight: currentView === 'dashboard' ? '700' : '500'
              }}
            >
              Dashboard
            </button>
            <ChevronRight size={13} color="#cbd5e1" />
            <button
              onClick={() => navigateTo('curriculum')}
              style={{
                color: currentView === 'curriculum' ? '#0284c7' : '#64748b',
                fontWeight: currentView === 'curriculum' ? '700' : '500'
              }}
            >
              Curriculum
            </button>
            {currentView === 'module-m4' && (
              <>
                <ChevronRight size={13} color="#cbd5e1" />
                <span style={{ color: '#0284c7', fontWeight: '700' }}>
                  Module M4 (Build Cloud)
                </span>
              </>
            )}
          </nav>
        </div>

        {/* Right Nav & User Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Main Nav Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => navigateTo('dashboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: currentView === 'dashboard' ? '700' : '500',
                color: currentView === 'dashboard' ? '#0284c7' : '#475569',
                backgroundColor: currentView === 'dashboard' ? '#f0f9ff' : 'transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <LayoutDashboard size={15} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigateTo('curriculum')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: currentView === 'curriculum' ? '700' : '500',
                color: currentView === 'curriculum' ? '#0284c7' : '#475569',
                backgroundColor: currentView === 'curriculum' ? '#f0f9ff' : 'transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <BookOpen size={15} />
              <span>Curriculum</span>
            </button>
          </div>

          {/* Reset Demo State Button */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset demo progress back to initial state?')) {
                resetDemoState();
              }
            }}
            title="Reset progress to default demo state"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: '500',
              color: '#64748b',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#dc2626';
              e.currentTarget.style.borderColor = '#fecaca';
              e.currentTarget.style.backgroundColor = '#fef2f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#64748b';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.backgroundColor = '#f8fafc';
            }}
          >
            <RotateCcw size={13} />
            <span>Reset Demo</span>
          </button>

          {/* User Profile Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 10px',
              backgroundColor: '#f1f5f9',
              borderRadius: '20px',
              border: '1px solid #e2e8f0'
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {user.avatar || 'ST'}
            </div>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#0f172a' }}>
              {user.username}
            </span>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={logout}
            title="Sign out"
            style={{
              padding: '7px',
              borderRadius: '8px',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ef4444';
              e.currentTarget.style.backgroundColor = '#fef2f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#64748b';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
