import React from 'react';
import useStore from '@/hooks/useStore';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import UserMenu from './UserMenu';

/**
 * TopBar component for global navigation and branding.
 * Contains:
 * - Logo wordmark text
 * - Breadcrumbs navigation
 * - User profile menu and logout
 */
export default function TopBar() {
  const { user, currentView, navigateTo } = useStore();

  if (!user || currentView === 'login') return null;

  // Build breadcrumb items based on current view
  const breadcrumbItems = [
    {
      label: 'Dashboard',
      active: currentView === 'dashboard',
      onClick: () => navigateTo('dashboard')
    }
  ];

  if (currentView === 'curriculum' || currentView === 'module-m4') {
    breadcrumbItems.push({
      label: 'Curriculum',
      active: currentView === 'curriculum',
      onClick: () => navigateTo('curriculum')
    });
  }

  if (currentView === 'module-m4') {
    breadcrumbItems.push({
      label: 'Module M4 (QuickMart)',
      active: true
    });
  }

  if (currentView === 'admin') {
    breadcrumbItems.push({
      label: 'Admin CMS Editor',
      active: true
    });
  }

  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-subtle, #e2e8f0)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-xs)'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand Wordmark & Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            type="button"
            onClick={() => navigateTo('dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textAlign: 'left',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0
            }}
          >
            {/* Logo wordmark text */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', 'IBM Plex Sans', monospace",
                fontSize: '20px',
                fontWeight: '900',
                color: 'var(--brand-primary, #0284c7)',
                letterSpacing: '-0.03em',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>CDAC</span>
              <svg
                width="18"
                height="18"
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
            <div
              style={{
                borderLeft: '1px solid #cbd5e1',
                paddingLeft: '8px',
                fontSize: '11px',
                color: 'var(--text-muted, #64748b)',
                fontWeight: '600'
              }}
            >
              Cloud Security Training Program
            </div>
          </button>

          {/* Breadcrumbs Navigation */}
          <div
            style={{
              paddingLeft: '16px',
              borderLeft: '1px solid var(--border-subtle, #e2e8f0)'
            }}
          >
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        {/* User profile & actions */}
        <UserMenu />
      </div>
    </header>
  );
}
