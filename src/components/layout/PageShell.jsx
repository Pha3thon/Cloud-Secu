import React from 'react';
import useStore from '@/hooks/useStore';
import TopBar from './TopBar';
import Toast from '@/components/common/Toast';

/**
 * PageShell wraps pages with TopBar, standard layout constraints, and Toast notifications.
 */
export default function PageShell({ children, noPadding = false, maxWidth = '1360px' }) {
  const { toastMessage, hideToast } = useStore();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-app, #f8fafc)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <TopBar />

      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: noPadding ? '100%' : maxWidth,
          margin: '0 auto',
          padding: noPadding ? 0 : '24px'
        }}
      >
        {children}
      </main>

      {/* Global Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={hideToast}
        />
      )}
    </div>
  );
}
