import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, RotateCcw } from 'lucide-react';
import { COURSE_SUMMARY, MODULES_DATA } from '../data/courseData';
import { ModuleCard } from '../components/ModuleCard';
import { useCourse } from '../context/CourseContext';
import { ResetCourseModal } from '../components/ResetCourseModal';

export const CurriculumPage = () => {
  const { unlockedModules, completedModules, navigateTo } = useCourse();
  const [collapsedPhases, setCollapsedPhases] = useState({});
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const togglePhase = (phaseId) => {
    setCollapsedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const handleSelectModule = (moduleId) => {
    if (moduleId === 'm4') {
      navigateTo('module-m4');
    }
  };

  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px'
      }}
    >
      {/* Top Header */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px 28px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
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
              40T + 50L = 90 Total Hours
            </span>
          </div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#0f172a',
              marginTop: '6px',
              letterSpacing: '-0.02em'
            }}
          >
            Training Curriculum & Course Modules
          </h1>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            style={{
              backgroundColor: '#ffffff',
              color: '#64748b',
              border: '1px solid #cbd5e1',
              padding: '10px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={14} />
            <span>Reset Course</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('module-m4')}
            style={{
              backgroundColor: '#0284c7',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '13.5px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(2, 132, 199, 0.25)',
              cursor: 'pointer'
            }}
          >
            <span>Open Module M4</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Course Reset Confirmation Modal */}
      <ResetCourseModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
      />

      {/* 5 Collapsible Phases */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {COURSE_SUMMARY.phases.map((phase) => {
          const isCollapsed = collapsedPhases[phase.id];
          const phaseModules = MODULES_DATA.filter((m) => m.phaseId === phase.id);

          return (
            <div
              key={phase.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
              }}
            >
              {/* Collapsible Phase Band Header */}
              <div
                onClick={() => togglePhase(phase.id)}
                style={{
                  padding: '16px 24px',
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
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      color: phase.badgeColor,
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    Phase {phase.number}
                  </span>
                  <div>
                    <span style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                      {phase.title}
                    </span>
                    <span style={{ fontSize: '13px', color: '#64748b', marginLeft: '10px' }}>
                      — {phase.tagline}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                    {phase.hoursTheory}T + {phase.hoursLab}L = {phase.totalHours} Hours
                  </span>
                  {isCollapsed ? <ChevronDown size={18} color="#64748b" /> : <ChevronUp size={18} color="#64748b" />}
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
                    backgroundColor: '#ffffff'
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
