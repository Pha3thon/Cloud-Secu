import React from 'react';
import { CourseProvider, useCourse } from './context/CourseContext';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CurriculumPage } from './pages/CurriculumPage';
import { ModuleDetailPage } from './pages/ModuleDetailPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import './styles/theme.css';
import './styles/animations.css';
import './App.css';

const AppContent = () => {
  const { user, currentView, toastMessage } = useCourse();

  // If user is not authenticated, render Login Page
  if (!user || currentView === 'login') {
    return <LoginPage />;
  }

  // If logged in as Admin, route exclusively to the Admin Dashboard
  if (user?.role === 'admin' || currentView === 'admin-dashboard') {
    return <AdminDashboardPage />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)', position: 'relative' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {currentView === 'dashboard' && <DashboardPage />}
        {currentView === 'curriculum' && <CurriculumPage />}
        {currentView === 'module-m4' && <ModuleDetailPage />}
      </main>

      {/* Global Toast */}
      {toastMessage && (
        <div
          className="animate-pop-in"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 10000,
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.25)',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#38bdf8' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      <footer
        style={{
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          padding: '24px 20px',
          textAlign: 'center',
          fontSize: '12.5px',
          color: '#64748b'
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <div>
            <strong>CDAC</strong> — Cloud Security Training Program
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <CourseProvider>
      <AppContent />
    </CourseProvider>
  );
}
