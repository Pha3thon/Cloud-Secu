/**
 * Phase Timeline Component
 * CDAC Cloud Security Training Platform
 * Connected horizontal stepper on desktop, vertical accordion on mobile.
 * Hover/tap reveals modules inside the phase from modules.js.
 */

import React, { useState, useRef, useEffect } from 'react';
import useReducedMotion from '@/hooks/useReducedMotion';

export default function PhaseTimeline({ phases = [], modules = [] }) {
  const [activePhaseId, setActivePhaseId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile viewport (< 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard navigation: Escape closes reveal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activePhaseId) {
        setActivePhaseId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhaseId]);

  const clearTimers = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const handleMouseEnter = (phaseId) => {
    if (isMobile) return;
    clearTimers();
    if (activePhaseId && activePhaseId !== phaseId) {
      // Swapping between phases is instantaneous
      setActivePhaseId(phaseId);
    } else {
      // Short ~150ms delay to avoid flicker on fast sweep
      hoverTimerRef.current = setTimeout(() => {
        setActivePhaseId(phaseId);
      }, 150);
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    clearTimers();
    closeTimerRef.current = setTimeout(() => {
      setActivePhaseId(null);
    }, 200);
  };

  const handleToggle = (phaseId) => {
    clearTimers();
    setActivePhaseId((prev) => (prev === phaseId ? null : phaseId));
  };

  const handleKeyDownNode = (e, phaseId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(phaseId);
    } else if (e.key === 'Escape') {
      setActivePhaseId(null);
    }
  };

  const activePhase = phases.find((p) => p.id === activePhaseId);
  const activePhaseModules = activePhase ? modules.filter((m) => m.phaseId === activePhase.id) : [];

  return (
    <div
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main, #0f172a)', margin: 0 }}>
          Course Phases at a Glance
        </h2>
        <span style={{ fontSize: '12px', color: 'var(--text-muted, #64748b)' }}>
          {isMobile ? 'Tap a phase to explore modules' : 'Hover a phase to preview modules inside'}
        </span>
      </div>

      {/* Desktop Stepper / Timeline */}
      {!isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Connected Horizontal Timeline Bar */}
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: `repeat(${phases.length}, 1fr)`,
              gap: '12px',
              paddingTop: '6px'
            }}
          >
            {/* Continuous background connecting line */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '10%',
                right: '10%',
                height: '2px',
                backgroundColor: 'var(--border-subtle, #e2e8f0)',
                zIndex: 0
              }}
            />

            {phases.map((phase) => {
              const isActive = activePhaseId === phase.id;
              const panelId = `phase-reveal-panel-${phase.id}`;

              return (
                <div
                  key={phase.id}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  aria-haspopup="true"
                  onMouseEnter={() => handleMouseEnter(phase.id)}
                  onFocus={() => handleMouseEnter(phase.id)}
                  onClick={() => handleToggle(phase.id)}
                  onKeyDown={(e) => handleKeyDownNode(e, phase.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 1,
                    outline: 'none',
                    padding: '6px 4px',
                    borderRadius: 'var(--radius-lg, 10px)',
                    transition: prefersReducedMotion ? 'none' : 'background-color 0.15s ease'
                  }}
                >
                  {/* Numbered Stepper Circle */}
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? (phase.badgeColor || 'var(--brand-primary, #0284c7)') : '#ffffff',
                      color: isActive ? '#ffffff' : 'var(--text-main, #0f172a)',
                      border: `2px solid ${isActive ? (phase.badgeColor || 'var(--brand-primary, #0284c7)') : 'var(--border-subtle, #cbd5e1)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '800',
                      boxShadow: isActive ? '0 0 0 4px rgba(2, 132, 199, 0.18)' : 'var(--shadow-xs)',
                      transition: prefersReducedMotion ? 'none' : 'all 0.2s ease',
                      marginBottom: '10px'
                    }}
                  >
                    {phase.number}
                  </div>

                  {/* Title & Tagline under node */}
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '800',
                      color: isActive ? (phase.badgeColor || 'var(--brand-primary, #0284c7)') : 'var(--text-main, #0f172a)',
                      marginBottom: '4px',
                      transition: 'color 0.15s ease'
                    }}
                  >
                    {phase.title}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-muted, #64748b)',
                      lineHeight: '1.4',
                      maxWidth: '180px'
                    }}
                  >
                    {phase.tagline}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shared Reveal Panel beneath the desktop timeline */}
          {activePhase && (
            <div
              id={`phase-reveal-panel-${activePhase.id}`}
              role="region"
              aria-label={`Modules in Phase ${activePhase.number}: ${activePhase.title}`}
              onMouseEnter={() => clearTimers()}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-subtle, #e2e8f0)',
                borderLeft: `4px solid ${activePhase.badgeColor || 'var(--brand-primary, #0284c7)'}`,
                borderRadius: 'var(--radius-lg, 12px)',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: 'var(--shadow-sm)',
                animation: prefersReducedMotion ? 'none' : 'popoverDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      color: activePhase.badgeColor || 'var(--brand-primary, #0284c7)'
                    }}
                  >
                    Phase {activePhase.number} · {activePhase.title}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted, #64748b)' }}>
                  {activePhase.tagline}
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: 'var(--border-subtle, #f1f5f9)' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activePhaseModules.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '10px',
                      fontSize: '13.5px',
                      color: 'var(--text-main, #1e293b)'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontWeight: '700',
                        fontSize: '12px',
                        color: activePhase.badgeColor || 'var(--brand-primary, #0284c7)',
                        width: '32px',
                        flexShrink: 0
                      }}
                    >
                      {m.code}
                    </span>
                    <span style={{ color: 'var(--border-subtle, #cbd5e1)' }}>—</span>
                    <span style={{ fontWeight: '600' }}>{m.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Mobile Vertical Accordion Stepper */
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            position: 'relative',
            paddingLeft: '16px',
            borderLeft: '2px solid var(--border-subtle, #e2e8f0)'
          }}
        >
          {phases.map((phase) => {
            const isActive = activePhaseId === phase.id;
            const phaseModules = modules.filter((m) => m.phaseId === phase.id);

            return (
              <div key={phase.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleToggle(phase.id)}
                  aria-expanded={isActive}
                  aria-controls={`phase-mobile-reveal-${phase.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    background: 'none',
                    border: 'none',
                    padding: '8px 0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? (phase.badgeColor || 'var(--brand-primary, #0284c7)') : '#ffffff',
                      color: isActive ? '#ffffff' : 'var(--text-main, #0f172a)',
                      border: `2px solid ${isActive ? (phase.badgeColor || 'var(--brand-primary, #0284c7)') : 'var(--border-subtle, #cbd5e1)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '800',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    {phase.number}
                  </div>
                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-main, #0f172a)' }}>
                      {phase.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted, #64748b)', lineHeight: '1.4' }}>
                      {phase.tagline}
                    </div>
                  </div>
                </button>

                {isActive && (
                  <div
                    id={`phase-mobile-reveal-${phase.id}`}
                    role="region"
                    style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: 'var(--radius-md, 8px)',
                      border: '1px solid var(--border-subtle, #e2e8f0)',
                      padding: '12px 14px',
                      marginLeft: '40px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    {phaseModules.map((m) => (
                      <div
                        key={m.id}
                        style={{
                          fontSize: '12.5px',
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '6px'
                        }}
                      >
                        <span style={{ fontFamily: 'monospace', fontWeight: '700', color: phase.badgeColor }}>
                          {m.code}
                        </span>
                        <span style={{ color: '#94a3b8' }}>—</span>
                        <span style={{ color: 'var(--text-main, #1e293b)', fontWeight: '600' }}>{m.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
