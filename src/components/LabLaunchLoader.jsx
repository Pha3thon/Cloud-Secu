import React, { useState, useEffect } from 'react';
import { Character } from './SceneAnimation';

export const LabLaunchLoader = ({
  mode = 'initial', // 'initial' | 'resume' | 'time_skip'
  onComplete
}) => {
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

    // Mode is 'initial': 4-6s sequence + 2s boot
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
            borderRadius: '16px',
            padding: '32px 40px',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
          className="animate-pop-in"
        >
          <div style={{ width: '40px', height: '40px', border: '3px solid #e0f2fe', borderTopColor: '#0284c7', borderRadius: '50%' }} className="animate-spin" />
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
              Resuming your workstation…
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
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
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '20px'
        }}
        className="animate-pop-in"
      >
        {fallbackMessage ? (
          <div style={{ color: '#d97706', fontSize: '13px', fontWeight: '700' }}>
            {fallbackMessage}
          </div>
        ) : bootingDesktop ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#0f172a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#38bdf8', fontWeight: '900', fontSize: '16px' }}>KALI</span>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
                Booting Kali Desktop…
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Initializing display server and opening browser workstation.
              </p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
            {/* Stick figure character animation area */}
            <div style={{ width: '120px', height: '90px' }}>
              <svg viewBox="0 0 100 80" style={{ width: '100%', height: '100%' }}>
                <Character type="trainee" x={50} y={20} scale={1} />
              </svg>
            </div>

            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#0284c7', fontWeight: '800', letterSpacing: '0.04em', marginBottom: '4px' }}>
                QuickMart Training Cloud
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                {initialSteps[currentStep]}
              </h3>
            </div>

            {/* Step Indicators */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              {initialSteps.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: idx === currentStep ? '24px' : '8px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: idx <= currentStep ? '#0284c7' : '#e2e8f0',
                    transition: 'all 300ms ease'
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
