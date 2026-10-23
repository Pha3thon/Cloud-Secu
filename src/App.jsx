import React, { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { StoreProvider } from '@/state/store';
import { AccessibilityProvider, useAccessibility } from '@/state/AccessibilityContext';
import useStore from '@/hooks/useStore';
import PageShell from '@/components/layout/PageShell';
import AccessibilityPanel from '@/components/accessibility/AccessibilityPanel';
import Login from '@/routes/Login';
import Dashboard from '@/routes/Dashboard';
import Curriculum from '@/routes/Curriculum';
import Module from '@/routes/Module';
import AdminEditor from '@/routes/AdminEditor';

/** Shared context so any slide component can register itself as the "current slide" for TTS. */
export const ActiveSlideContext = createContext(null);

export function useActiveSlide() {
  return useContext(ActiveSlideContext);
}

function AppContent() {
  const { user, currentView, navigateTo } = useStore();
  const { prefs } = useAccessibility();
  const [activeSlide, setActiveSlide] = useState(null);

  // Sync hash routing so deep links survive page refresh in static hosts
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash === 'login') navigateTo('login');
      else if (hash === 'dashboard') navigateTo('dashboard');
      else if (hash === 'curriculum') navigateTo('curriculum');
      else if (hash === 'module/m0' || hash === 'module-m0') navigateTo('module-m0');
      else if (hash === 'module/m1' || hash === 'module-m1') navigateTo('module-m1');
      else if (hash === 'module/m4' || hash === 'module-m4') navigateTo('module-m4');
      else if (hash === 'admin' || hash === 'admin-dashboard') navigateTo('admin');
    };

    if (window.location.hash) handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [navigateTo]);

  // Keep window hash synced with currentView
  useEffect(() => {
    const viewToHash = {
      login: '#/login',
      dashboard: '#/dashboard',
      curriculum: '#/curriculum',
      'module-m0': '#/module/m0',
      'module-m1': '#/module/m1',
      'module-m4': '#/module/m4',
      admin: '#/admin'
    };
    if (viewToHash[currentView] && window.location.hash !== viewToHash[currentView]) {
      window.location.hash = viewToHash[currentView];
    }
  }, [currentView]);

  // Unauthenticated view
  if (!user || currentView === 'login') {
    return <Login />;
  }

  // Admin CMS editor
  if (user?.role === 'admin' || currentView === 'admin' || currentView === 'admin-dashboard') {
    return <AdminEditor />;
  }

  const moduleView = currentView === 'module-m4' || currentView === 'module-m1' || currentView === 'module-m0';

  return (
    <ActiveSlideContext.Provider value={{ activeSlide, setActiveSlide }}>
      {/* Global Accessibility Panel — mounted once, non-blocking, outside PageShell */}
      <AccessibilityPanel currentSlide={activeSlide} />

      {moduleView ? (
        <PageShell noPadding>
          <Module />
        </PageShell>
      ) : (
        <PageShell>
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'curriculum' && <Curriculum />}

          <footer
            style={{
              borderTop: '1px solid var(--border-default, #e2e8f0)',
              backgroundColor: 'var(--bg-card, #ffffff)',
              padding: '24px 20px',
              textAlign: 'center',
              fontSize: '12.5px',
              color: 'var(--text-muted, #64748b)',
              marginTop: '40px'
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <strong>CDAC</strong> — Cloud Security Training Program
            </div>
          </footer>
        </PageShell>
      )}
    </ActiveSlideContext.Provider>
  );
}

/**
 * App root with StoreProvider + AccessibilityProvider
 */
export default function App() {
  return (
    <StoreProvider>
      <AccessibilityProvider>
        <AppContent />
      </AccessibilityProvider>
    </StoreProvider>
  );
}
