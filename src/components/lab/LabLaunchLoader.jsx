import React, { useState, useEffect } from 'react';
import { Character } from '@/components/scenes/parts';

/**
 * LabLaunchLoader component showing startup sequences when entering the lab environment.
 */
export default function LabLaunchLoader({
  mode = 'initial', // 'initial' | 'resume' | 'time_skip'
  onComplete
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [bootingDesktop, setBootingDesktop] = useState(false);
  const [fallbackMessage, setFallbackMessage] = useState(null);

  const initialSteps = [
    'Starting your Kali workstation…',
    "Connecting to QuickMart's training cloud…",
    'Horizon is reachable…',
    'Your workstation is ready'
  ];

  useEffect(() => {
    // 8-second absolute safety fallback
    const safetyTimer = setTimeout(() => {
      setFallbackMessage('Taking longer than expected, entering lab now...');
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 700);
    }, 8000);

    if (mode === 'resume') {
      const resumeTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);
      return () => {
        clearTimeout(resumeTimer);
        clearTimeout(safetyTimer);
      };
    }

    if (mode === 'time_skip') {
      const timeSkipTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 2400);
      return () => {
        clearTimeout(timeSkipTimer);
        clearTimeout(safetyTimer);
      };
    }

    // Mode is 'initial': sequence + boot
    const t0 = setTimeout(() => setCurrentStep(1), 1200);
    const t1 = setTimeout(() => setCurrentStep(2), 2400);
    const t2 = setTimeout(() => setCurrentStep(3), 3600);
    const t3 = setTimeout(() => setBootingDesktop(true), 4600);
    const t4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 6600);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(safetyTimer);
    };
  }, [mode, onComplete]);

  // Mode: time_skip (Next morning, 9:12 AM title card)
  if (mode === 'time_skip') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#0f172a',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff'
        }}
      >
        <div style={{ textAlign: 'center' }} className="animate-pop-in">
          <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: '8px' }}>
            QuickMart Incident Timeline
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '12px' }}>
            Next morning, 9:12 AM
          </h1>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '440px', margin: '0 auto' }}>
            Anomalous overnight role changes detected. The audit scanner has flagged the project.
          </p>
        </div>
      </div>
    );
  }

  // Mode: resume
  if (mode === 'resume') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl, 16px)',
            padding: '32px 40px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-xl)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
          className="animate-pop-in"
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e0f2fe',
              borderTopColor: 'var(--brand-primary, #0284c7)',
              borderRadius: '50%'
            }}
            className="animate-spin"
          />
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main, #0f172a)', marginBottom: '4px' }}>
              Resuming your workstation…
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted, #64748b)', margin: 0 }}>
              Restoring Firefox tabs, session credentials, and cloud state.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Mode: initial
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          width: '100%',
          maxWidth: '480px',
          padding: '32px',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
        className="animate-pop-in"
      >
        {/* Animated Trainee SVG */}
        <div style={{ width: '80px', height: '65px' }}>
          <svg viewBox="0 0 100 80" style={{ width: '100%', height: '100%' }}>
            <Character type="trainee" x={50} y={15} scale={1.1} />
          </svg>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-main, #0f172a)', marginBottom: '6px' }}>
            Preparing Training Workstation
          </h3>
          <p style={{ fontSize: '12.5px', color: 'var(--text-muted, #64748b)', margin: 0 }}>
            Spinning up Kali environment & virtual cloud access
          </p>
        </div>

        {/* Sequential Checkpoints */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {initialSteps.map((stepText, idx) => {
            const isDone = currentStep > idx || bootingDesktop;
            const isCurrent = currentStep === idx && !bootingDesktop;

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: isCurrent ? '#f0f9ff' : isDone ? '#f8fafc' : 'transparent',
                  border: isCurrent ? '1px solid #bae6fd' : '1px solid transparent',
                  transition: 'all 200ms ease'
                }}
              >
                {isDone ? (
                  <span style={{ color: 'var(--color-success, #10b981)', fontSize: '13px', fontWeight: '800' }}>✓</span>
                ) : isCurrent ? (
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      border: '2px solid #bae6fd',
                      borderTopColor: 'var(--brand-primary, #0284c7)',
                      borderRadius: '50%'
                    }}
                    className="animate-spin"
                  />
                ) : (
                  <span style={{ color: '#cbd5e1', fontSize: '12px' }}>○</span>
                )}
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: isCurrent ? '700' : '500',
                    color: isCurrent ? 'var(--brand-primary, #0284c7)' : isDone ? '#334155' : '#94a3b8'
                  }}
                >
                  {stepText}
                </span>
              </div>
            );
          })}
        </div>

        {fallbackMessage && (
          <div style={{ fontSize: '11px', color: '#b45309', backgroundColor: '#fef3c7', padding: '6px 12px', borderRadius: '4px' }}>
            {fallbackMessage}
          </div>
        )}
      </div>
    </div>
  );
}
