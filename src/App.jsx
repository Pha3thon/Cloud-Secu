import React from 'react';
import { CourseProvider, useCourse } from './context/CourseContext';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CurriculumPage } from './pages/CurriculumPage';
import { ModuleDetailPage } from './pages/ModuleDetailPage';
import './styles/theme.css';
import './styles/animations.css';
import './App.css';

const AppContent = () => {
  const { user, currentView } = useCourse();

  // If user is not authenticated, render Login Page
  if (!user || currentView === 'login') {
    return <LoginPage />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {currentView === 'dashboard' && <DashboardPage />}
        {currentView === 'curriculum' && <CurriculumPage />}
        {currentView === 'module-m4' && <ModuleDetailPage />}
      </main>
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
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <strong>CloudSec Academy</strong> — Academic Cloud Security Training Platform (Vendor-Neutral)
          </div>
          <div>
            TryHackMe-Style Learning Path UX · Light Academic Theme
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
