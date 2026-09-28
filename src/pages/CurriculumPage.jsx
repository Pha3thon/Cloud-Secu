import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import { COURSE_SUMMARY, MODULES_DATA } from '../data/courseData';
import { ModuleCard } from '../components/ModuleCard';
import { useCourse } from '../context/CourseContext';

export const CurriculumPage = () => {
  const { unlockedModules, completedModules, navigateTo } = useCourse();
  const [collapsedPhases, setCollapsedPhases] = useState({});

  const togglePhase = (phaseId) => {
    setCollapsedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const completedCount = completedModules.length;
  const progressPercent = Math.round((completedCount / 13) * 100);

  const handleSelectModule = (moduleId) => {
    if (moduleId === 'm4') {
      navigateTo('module-m4');
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner & Sticky Progress Indicator */}
      <section
        className="animate-pop-in"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px 28px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#0284c7',
                  backgroundColor: '#e0f2fe',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}
              >
                90-Hour Learning Path
              </span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                55T + 35L = 90 Total Hours
              </span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '6px', letterSpacing: '-0.02em' }}>
              Training Curriculum & Course Modules
            </h1>
          </div>

          {/* Quick Demo Module Direct Jump Button */}
          <button
            type="button"
            onClick={() => navigateTo('module-m4')}
            style={{
              backgroundColor: '#0284c7',
              color: '#ffffff',
              padding: '10px 18px',
              borderRadius: '10px',
              fontSize: '13.5px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 4px rgba(2, 132, 199, 0.25)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0369a1')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0284c7')}
          >
            <Sparkles size={15} />
            <span>Launch Demo: Module M4</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Global Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
            <span>Curriculum Progress: {completedCount} / 13 modules complete</span>
            <span style={{ color: '#0284c7', fontWeight: '700' }}>{progressPercent}%</span>
          </div>

          <div
            style={{
              width: '100%',
              height: '10px',
              backgroundColor: '#f1f5f9',
              borderRadius: '9999px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${Math.max(progressPercent, 4)}%`,
                height: '100%',
                backgroundColor: completedCount > 0 ? '#10b981' : '#0284c7',
                borderRadius: '9999px',
                transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </div>
        </div>
      </section>

      {/* 5 Phases with Distinct Visual Bands */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {COURSE_SUMMARY.learningPhases.map((phase) => {
          const isCollapsed = !!collapsedPhases[phase.id];
          const phaseModules = MODULES_DATA.filter((m) => m.phaseId === phase.id);

          return (
            <section
              key={phase.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}
            >
              {/* Phase Header Band */}
              <div
                onClick={() => togglePhase(phase.id)}
                style={{
                  padding: '18px 24px',
                  backgroundColor: '#f8fafc',
                  borderBottom: isCollapsed ? 'none' : '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: phase.badgeColor,
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    P{phase.number}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                        Phase {phase.number} — {phase.title}
                      </h2>
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#64748b',
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontWeight: '600'
                        }}
                      >
                        {phase.hoursTheory}T + {phase.hoursLab}L = {phase.totalHours} Hrs
                      </span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
                      {phase.tagline}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                  <span style={{ fontSize: '12px' }}>{phaseModules.length} Modules</span>
                  {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                </div>
              </div>

              {/* Module Cards Grid */}
              {!isCollapsed && (
                <div
                  style={{
                    padding: '24px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px',
                    backgroundColor: '#fafbfc'
                  }}
                >
                  {phaseModules.map((module) => {
                    const isUnlocked = unlockedModules.includes(module.id);
                    const isCompleted = completedModules.includes(module.id);

                    return (
                      <ModuleCard
                        key={module.id}
                        module={module}
                        isUnlocked={isUnlocked}
                        isCompleted={isCompleted}
                        onSelectModule={handleSelectModule}
                      />
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};
