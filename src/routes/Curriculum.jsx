import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, RotateCcw, Lock, Unlock, CheckCircle2 } from 'lucide-react';
import { COURSE_SUMMARY, MODULES_DATA } from '@/content/modules';
import useStore from '@/hooks/useStore';
import useReducedMotion from '@/hooks/useReducedMotion';
import ConfirmDialog from '@/components/common/ConfirmDialog';

function ModuleCard({ module, isUnlocked, isCompleted, onSelectModule }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isDemoActive = module.isAvailableDemo;

  const handleClick = () => {
    if (isUnlocked || isDemoActive) {
      onSelectModule(module.id);
    } else {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2400);
    }
  };

  const isM0 = module.id === 'm0';

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => !isUnlocked && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl, 14px)',
        border: isM0
          ? '1.5px solid #c7d2fe'
          : isCompleted
          ? '1.5px solid var(--color-success, #10b981)'
          : isDemoActive
          ? '2px solid var(--brand-primary, #0284c7)'
          : isUnlocked
          ? '1.5px solid #bae6fd'
          : '1px solid var(--border-subtle, #e2e8f0)',
        padding: '20px',
        cursor: isUnlocked || isDemoActive ? 'pointer' : 'not-allowed',
        opacity: isUnlocked || isDemoActive ? 1 : 0.7,
        boxShadow: isM0
          ? '0 4px 6px -1px rgba(99, 102, 241, 0.08)'
          : isDemoActive
          ? '0 4px 6px -1px rgba(2, 132, 199, 0.1)'
          : 'var(--shadow-xs)',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minWidth: 0,
        overflowWrap: 'break-word'
      }}
    >
      <div style={{ minWidth: 0 }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: isM0 ? '#e0e7ff' : isDemoActive ? '#e0f2fe' : '#f1f5f9',
                color: isM0 ? '#4338ca' : isDemoActive ? 'var(--brand-primary, #0284c7)' : '#475569',
                whiteSpace: 'nowrap'
              }}
            >
              {module.code}
            </span>

            {isM0 ? (
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: '700',
                  color: '#4338ca',
                  backgroundColor: '#e0e7ff',
                  border: '1px solid #c7d2fe',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  whiteSpace: 'nowrap'
                }}
              >
                Orientation · Standalone
              </span>
            ) : isDemoActive ? (
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: '700',
                  color: '#0369a1',
                  backgroundColor: '#e0f2fe',
                  border: '1px solid #bae6fd',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  whiteSpace: 'nowrap'
                }}
              >
                Demo Module — Available Now
              </span>
            ) : null}
          </div>

          <div style={{ flexShrink: 0 }}>
            {isM0 ? (
              <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#e0e7ff', color: '#4338ca', padding: '3px 10px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                <Unlock size={12} />
                Start Here
              </span>
            ) : isCompleted ? (
              <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#ecfdf5', color: '#065f46', padding: '3px 10px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                <CheckCircle2 size={12} />
                Completed
              </span>
            ) : isUnlocked ? (
              <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                <Unlock size={12} />
                {module.id === 'm2' ? 'Next Up (Stub)' : 'Unlocked'}
              </span>
            ) : (
              <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#f1f5f9', color: '#64748b', padding: '3px 10px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                <Lock size={12} />
                Locked
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '6px', lineHeight: '1.35', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
          {module.title}
        </h3>
        <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '1.55', margin: '0 0 14px 0', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
          {module.oneLiner || module.description}
        </p>
      </div>

      {/* Footer hours */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '12px', fontSize: '11.5px', color: '#64748b' }}>
        <span>{isM0 ? '~8 mins · Ungraded preview' : `${module.hoursTheory}h Theory + ${module.hoursLab}h Lab`}</span>
        {(isUnlocked || isDemoActive) && (
          <span style={{ color: isM0 ? '#4f46e5' : 'var(--brand-primary, #0284c7)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Enter <ArrowRight size={13} />
          </span>
        )}
      </div>

      {/* Locked tooltip */}
      {showTooltip && (
        <div
          onClick={(e) => {
            if (module.id === 'm1') {
              e.stopPropagation();
              onSelectModule('m0');
            }
          }}
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            right: '10px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '8px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            textAlign: 'center',
            zIndex: 10,
            cursor: module.id === 'm1' ? 'pointer' : 'default',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)'
          }}
        >
          {module.id === 'm1' ? (
            <div>
              <span>Complete Course Orientation to unlock.</span>
              <div style={{ color: '#38bdf8', fontWeight: '700', marginTop: '2px', textDecoration: 'underline' }}>
                Click here to start Orientation →
              </div>
            </div>
          ) : (
            'Complete the previous module to unlock.'
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Curriculum route screen.
 */
export default function Curriculum() {
  const { user, unlockedModules = [], completedModules = [], navigateTo, resetCourse, showToast, previewUnlockAll } = useStore();
  const [collapsedPhases, setCollapsedPhases] = useState({});
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [hoveredPhaseId, setHoveredPhaseId] = useState(null);
  const hoverTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && hoveredPhaseId) {
        setHoveredPhaseId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hoveredPhaseId]);

  const clearHoverTimers = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const handlePhaseHoverEnter = (phaseId) => {
    clearHoverTimers();
    if (hoveredPhaseId && hoveredPhaseId !== phaseId) {
      setHoveredPhaseId(phaseId);
    } else {
      hoverTimerRef.current = setTimeout(() => {
        setHoveredPhaseId(phaseId);
      }, 150);
    }
  };

  const handlePhaseHoverLeave = () => {
    clearHoverTimers();
    closeTimerRef.current = setTimeout(() => {
      setHoveredPhaseId(null);
    }, 200);
  };

  const togglePhase = (phaseId) => {
    setCollapsedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
    setHoveredPhaseId(null);
  };

  const handleSelectModule = (moduleId) => {
    if (moduleId === 'm0') {
      navigateTo('module-m0');
    } else if (moduleId === 'm1') {
      navigateTo('module-m1');
    } else if (moduleId === 'm4') {
      navigateTo('module-m4');
    } else if (moduleId === 'm2') {
      showToast?.('Module 2: Cloud Computing Concepts & Architecture is coming next (Stub). M1 is complete!');
    }
  };

  const handleConfirmReset = () => {
    resetCourse?.();
    setResetModalOpen(false);
    showToast?.('Course reset. Start again from M4.');
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Header */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl, 16px)',
          border: '1px solid var(--border-subtle, #e2e8f0)',
          padding: '24px 28px',
          boxShadow: 'var(--shadow-xs)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-primary, #0284c7)', backgroundColor: '#e0f2fe', padding: '2px 8px', borderRadius: '12px' }}>
              90-Hour Learning Path
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted, #64748b)' }}>
              40T + 50L = 90 Total Hours
            </span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main, #0f172a)', marginTop: '6px', letterSpacing: '-0.02em', margin: '6px 0 0 0' }}>
            Training Curriculum & Course Modules
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            style={{ backgroundColor: '#ffffff', color: '#64748b', border: '1px solid #cbd5e1', padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          >
            <RotateCcw size={14} />
            <span>Reset Course</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('module-m4')}
            style={{ backgroundColor: 'var(--brand-primary, #0284c7)', color: '#ffffff', padding: '10px 20px', borderRadius: '10px', fontSize: '13.5px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 4px rgba(2, 132, 199, 0.25)' }}
          >
            <span>Open Module M4</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Course Phases (Phase 0 through Phase 5) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {COURSE_SUMMARY.phases.map((phase) => {
          const isCollapsed = collapsedPhases[phase.id];
          const phaseModules = MODULES_DATA.filter((m) => m.phaseId === phase.id);

          return (
            <div
              key={phase.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-xl, 16px)',
                border: '1px solid var(--border-subtle, #e2e8f0)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div
                onClick={() => togglePhase(phase.id)}
                onMouseEnter={() => handlePhaseHoverEnter(phase.id)}
                onMouseLeave={handlePhaseHoverLeave}
                role="button"
                tabIndex={0}
                aria-expanded={!isCollapsed}
                aria-controls={`phase-content-${phase.id}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePhase(phase.id);
                  } else if (e.key === 'Escape') {
                    setHoveredPhaseId(null);
                  }
                }}
                style={{
                  padding: '16px 24px',
                  backgroundColor: phase.number === 0 ? '#faf5ff' : '#f8fafc',
                  borderBottom: isCollapsed && hoveredPhaseId !== phase.id ? 'none' : '1px solid var(--border-subtle, #e2e8f0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none',
                  outline: 'none',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', minWidth: 0 }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      color: phase.badgeColor || '#64748b',
                      border: '1px solid #e2e8f0',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                  >
                    {phase.number === 0 ? 'Orientation' : `Phase ${phase.number}`}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', minWidth: 0 }}>
                    <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main, #0f172a)' }}>
                      {phase.title}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted, #64748b)' }}>
                      — {phase.tagline}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted, #64748b)', fontWeight: '600', whiteSpace: 'nowrap' }}>
                    {phase.number === 0 ? '~8 mins · Ungraded' : `${phase.hoursTheory}T + ${phase.hoursLab}L = ${phase.totalHours} Hours`}
                  </span>
                  {isCollapsed ? <ChevronDown size={18} color="#64748b" /> : <ChevronUp size={18} color="#64748b" />}
                </div>
              </div>

              {/* Additive hover preview when phase band is collapsed */}
              {isCollapsed && hoveredPhaseId === phase.id && (
                <div
                  role="region"
                  aria-label={`Preview of Phase ${phase.number} modules`}
                  onMouseEnter={() => clearHoverTimers()}
                  onMouseLeave={handlePhaseHoverLeave}
                  style={{
                    padding: '16px 24px',
                    backgroundColor: '#ffffff',
                    borderLeft: `4px solid ${phase.badgeColor || 'var(--brand-primary, #0284c7)'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    animation: prefersReducedMotion ? 'none' : 'popoverDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: phase.badgeColor || 'var(--brand-primary, #0284c7)' }}>
                      {phase.title}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted, #64748b)' }}>
                      Click band to expand full module cards
                    </div>
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted, #64748b)' }}>
                    {phase.tagline}
                  </div>
                  <div style={{ height: '1px', backgroundColor: 'var(--border-subtle, #f1f5f9)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {phaseModules.map((m) => (
                      <div key={m.id} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', fontSize: '13px', color: 'var(--text-main, #1e293b)' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '11.5px', color: phase.badgeColor, width: '30px', flexShrink: 0 }}>
                          {m.code}
                        </span>
                        <span style={{ color: 'var(--border-subtle, #cbd5e1)' }}>—</span>
                        <span style={{ fontWeight: '600' }}>{m.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!isCollapsed && (
                <div
                  id={`phase-content-${phase.id}`}
                  style={{
                    padding: '24px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {phaseModules.map((module) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      isUnlocked={previewUnlockAll || user?.role === 'admin' || unlockedModules.includes(module.id)}
                      isCompleted={completedModules.includes(module.id)}
                      onSelectModule={handleSelectModule}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reset Course confirmation dialog */}
      <ConfirmDialog
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={handleConfirmReset}
        title="Reset Entire Course"
        message="Reset the entire course? This clears all your progress: completed slides, lab flags, your Horizon resources, and your Kali session. This cannot be undone."
        confirmText="Confirm Reset"
        cancelText="Cancel"
        danger
        requiredInput="RESET"
        inputInstruction={<span>To confirm, please type <strong>RESET</strong> in the box below:</span>}
      />
    </div>
  );
}
