import React, { useState, useEffect } from 'react';

export const LabLaunchLoader = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(15);

  const steps = [
    {
      step: 1,
      title: 'Waking up your training cloud...',
      description: 'Provisioning isolated cloud tenant container'
    },
    {
      step: 2,
      title: 'Packing your virtual machine...',
      description: 'Allocating compute cores, RAM, and base operating image'
    },
    {
      step: 3,
      title: 'Setting up your network...',
      description: 'Assigning software-defined VPC and security group rules'
    },
    {
      step: 4,
      title: 'Almost there...',
      description: 'Establishing secure browser tunnel to lab console'
    },
    {
      step: 5,
      title: 'Your lab is ready! 🎉',
      description: 'Redirecting to your active Nimbus training environment...'
    }
  ];

  useEffect(() => {
    // Timing progression: ~5.2s total
    const timer1 = setTimeout(() => {
      setCurrentStep(2);
      setProgress(40);
    }, 1100);

    const timer2 = setTimeout(() => {
      setCurrentStep(3);
      setProgress(68);
    }, 2300);

    const timer3 = setTimeout(() => {
      setCurrentStep(4);
      setProgress(88);
    }, 3600);

    const timer4 = setTimeout(() => {
      setCurrentStep(5);
      setProgress(100);
    }, 4600);

    const timer5 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="animate-pop-in"
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '540px',
          padding: '32px 28px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}
      >
        {/* Animated Stick-Figure & Cloud Canvas */}
        <div
          style={{
            height: '190px',
            width: '100%',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #f1f5f9',
            marginBottom: '24px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg viewBox="0 0 460 190" style={{ width: '100%', height: '100%' }}>
            {/* Ground Line */}
            <line x1="30" y1="160" x2="430" y2="160" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

            {/* Cloud Outline in the Center / Right */}
            <g transform="translate(190, 20)">
              {/* Cloud drawing in */}
              <path
                d="M 60 110 C 25 110 10 90 20 65 C 10 40 40 20 65 30 C 85 10 135 10 155 35 C 180 30 205 50 195 80 C 210 105 180 120 155 110 Z"
                fill={currentStep >= 5 ? '#e0f2fe' : '#ffffff'}
                stroke={currentStep >= 5 ? '#0284c7' : '#0284c7'}
                strokeWidth={currentStep >= 1 ? '3' : '1'}
                strokeDasharray={currentStep === 1 ? '350' : 'none'}
                strokeDashoffset={currentStep === 1 ? '100' : '0'}
                className={currentStep >= 5 ? 'animate-glow' : ''}
                style={{
                  transition: 'all 0.6s cubic-bezier(0.34, 1.2, 0.64, 1)'
                }}
              />

              {/* Step 2 & above: Virtual Machine box inside the cloud */}
              {currentStep >= 2 && (
                <g
                  style={{
                    transform: currentStep >= 2 ? 'translate(65px, 45px)' : 'translate(0px, 45px)',
                    transition: 'transform 0.7s cubic-bezier(0.34, 1.2, 0.64, 1)'
                  }}
                >
                  <rect x="0" y="0" width="70" height="42" rx="6" fill="#1e293b" />
                  <rect x="8" y="8" width="54" height="26" rx="3" fill="#0f172a" />
                  <circle cx="16" cy="16" r="2.5" fill="#10b981" className="animate-pulse-green" />
                  <circle cx="24" cy="16" r="2.5" fill="#38bdf8" />
                  <text x="35" y="27" fontSize="8" fontFamily="JetBrains Mono" fill="#38bdf8">
                    VM-01
                  </text>
                </g>
              )}

              {/* Step 3 & above: Network lines wrapping around cloud */}
              {currentStep >= 3 && (
                <g style={{ animation: 'popFadeIn 0.4s ease' }}>
                  <circle cx="25" cy="50" r="5" fill="#0284c7" />
                  <circle cx="180" cy="40" r="5" fill="#0284c7" />
                  <circle cx="110" cy="120" r="5" fill="#0284c7" />
                  <path
                    d="M 25 50 Q 80 5 180 40 Q 190 90 110 120"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </g>
              )}

              {/* Step 5: Large checkmark badge appearing on cloud */}
              {currentStep >= 5 && (
                <g transform="translate(100, 65)" style={{ animation: 'popFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                  <circle cx="0" cy="0" r="22" fill="#10b981" />
                  <path d="M -8 -1 L -2 6 L 10 -6" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              )}
            </g>

            {/* Stick Figure Intern Character */}
            <g
              transform="translate(100, 50)"
              style={{
                transition: 'all 0.5s ease'
              }}
            >
              {/* Head */}
              <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
              {/* Torso */}
              <line x1="20" y1="34" x2="20" y2="80" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

              {/* Arms based on step */}
              {currentStep === 1 && (
                <>
                  {/* Looking at cloud curiously */}
                  <line x1="20" y1="45" x2="40" y2="35" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="20" y1="45" x2="5" y2="60" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                </>
              )}

              {currentStep === 2 && (
                <>
                  {/* Pushing the VM into the cloud */}
                  <path d="M20 45 L42 42 L65 48" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <line x1="20" y1="45" x2="38" y2="58" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                </>
              )}

              {currentStep === 3 && (
                <>
                  {/* Connecting network cables */}
                  <path d="M20 45 L45 32 L60 25" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <line x1="20" y1="45" x2="10" y2="65" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                </>
              )}

              {currentStep === 4 && (
                <>
                  {/* Checking wrist / watch impatiently */}
                  <path d="M20 45 L32 55 L26 40" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <rect x="23" y="38" width="6" height="5" rx="1" fill="#0284c7" />
                  <line x1="20" y1="45" x2="5" y2="60" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                </>
              )}

              {currentStep >= 5 && (
                <>
                  {/* Fist pump / Thumbs up victory! */}
                  <path d="M20 45 L40 28 L45 12" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <circle cx="45" cy="10" r="4" fill="#0284c7" />
                  <path d="M20 45 L5 55 L0 68" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </>
              )}

              {/* Legs */}
              {currentStep === 4 ? (
                <>
                  {/* Tapping foot */}
                  <line x1="20" y1="80" x2="10" y2="110" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  <line
                    x1="20"
                    y1="80"
                    x2="30"
                    y2="110"
                    stroke="#0f172a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ animation: 'footTap 0.6s ease-in-out infinite' }}
                  />
                </>
              ) : currentStep >= 5 ? (
                <>
                  {/* Victory jump */}
                  <line x1="20" y1="80" x2="8" y2="105" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="20" y1="80" x2="32" y2="105" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="20" y1="80" x2="10" y2="110" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="20" y1="80" x2="30" y2="110" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                </>
              )}
            </g>
          </svg>
        </div>

        {/* Dynamic Title & Subtitle */}
        <div style={{ minHeight: '64px', marginBottom: '20px' }}>
          <h3
            key={currentStep}
            className="animate-pop-in"
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: currentStep >= 5 ? '#059669' : '#0f172a',
              marginBottom: '6px'
            }}
          >
            {steps[currentStep - 1].title}
          </h3>
          <p
            key={`desc-${currentStep}`}
            className="animate-slide-in"
            style={{
              fontSize: '13px',
              color: '#64748b'
            }}
          >
            {steps[currentStep - 1].description}
          </p>
        </div>

        {/* Progress Bar Container */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              fontWeight: '600',
              color: '#64748b',
              marginBottom: '8px'
            }}
          >
            <span>Step {currentStep} of 5</span>
            <span>{progress}%</span>
          </div>

          <div
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#e2e8f0',
              borderRadius: '9999px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: currentStep >= 5 ? '#10b981' : '#0284c7',
                borderRadius: '9999px',
                transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s ease'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
