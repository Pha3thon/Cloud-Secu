import React, { useState } from 'react';
import { ChevronRight, LogOut, LayoutDashboard, BookOpen, RotateCcw } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { ResetCourseModal } from './ResetCourseModal';

export const Header = () => {
  const { user, currentView, navigateTo, logout } = useCourse();
  const [resetModalOpen, setResetModalOpen] = useState(false);

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
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 24px',
          height: '60px',
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
              gap: '8px',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', 'IBM Plex Sans', monospace",
                fontSize: '20px',
                fontWeight: '900',
                color: '#0284c7',
                letterSpacing: '-0.03em',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>CDAC</span>
              {/* Small cloud icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
            </div>
            <div style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '8px', fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
              Cloud Security Training Program
            </div>
          </button>

          {/* Breadcrumbs Navigation */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#64748b',
              paddingLeft: '16px',
              borderLeft: '1px solid #e2e8f0'
            }}
          >
            <button
              type="button"
              onClick={() => navigateTo('dashboard')}
              style={{
                color: currentView === 'dashboard' ? '#0284c7' : '#64748b',
                fontWeight: currentView === 'dashboard' ? '700' : '500',
                cursor: 'pointer'
              }}
            >
              Dashboard
            </button>
            {(currentView === 'curriculum' || currentView === 'module-m4') && (
              <>
                <ChevronRight size={13} color="#cbd5e1" />
                <button
                  type="button"
                  onClick={() => navigateTo('curriculum')}
                  style={{
                    color: currentView === 'curriculum' ? '#0284c7' : '#64748b',
                    fontWeight: currentView === 'curriculum' ? '700' : '500',
                    cursor: 'pointer'
                  }}
                >
                  Curriculum
                </button>
              </>
            )}
            {currentView === 'module-m4' && (
              <>
                <ChevronRight size={13} color="#cbd5e1" />
                <span style={{ color: '#0f172a', fontWeight: '700' }}>
                  Module M4 (QuickMart)
                </span>
              </>
            )}
          </nav>
        </div>

        {/* User Profile & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '11px'
              }}
            >
              {user.avatar || 'CD'}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'capitalize' }}>
                {user.role} Access
              </div>
            </div>
          </div>

          {user.role === 'student' && (
            <button
              type="button"
              onClick={() => setResetModalOpen(true)}
              title="Reset course progress"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                color: '#64748b',
                fontSize: '11.5px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={12} />
              <span>Reset Course</span>
            </button>
          )}

          <button
            type="button"
            onClick={logout}
            title="Log out of CDAC platform"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#f8fafc',
              color: '#334155',
              fontSize: '11.5px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Course Reset Confirmation Modal */}
      <ResetCourseModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
      />
    </header>
  );
};
