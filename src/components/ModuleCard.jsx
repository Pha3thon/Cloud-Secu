import React, { useState } from 'react';
import { Lock, Unlock, CheckCircle2, ArrowRight } from 'lucide-react';

export const ModuleCard = ({ module, isUnlocked, isCompleted, onSelectModule }) => {
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

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => !isUnlocked && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        border: isCompleted
          ? '1.5px solid #10b981'
          : isDemoActive
          ? '2px solid #0284c7'
          : isUnlocked
          ? '1.5px solid #bae6fd'
          : '1px solid #e2e8f0',
        padding: '20px',
        cursor: isUnlocked || isDemoActive ? 'pointer' : 'not-allowed',
        opacity: isUnlocked || isDemoActive ? 1 : 0.65,
        boxShadow: isDemoActive
          ? '0 10px 15px -3px rgba(2, 132, 199, 0.1), 0 4px 6px -4px rgba(2, 132, 199, 0.05)'
          : '0 1px 3px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}
      onMouseOver={(e) => {
        if (isUnlocked || isDemoActive) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow =
            '0 12px 20px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)';
        }
      }}
      onMouseOut={(e) => {
        if (isUnlocked || isDemoActive) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = isDemoActive
            ? '0 10px 15px -3px rgba(2, 132, 199, 0.1), 0 4px 6px -4px rgba(2, 132, 199, 0.05)'
            : '0 1px 3px rgba(0, 0, 0, 0.05)';
        }
      }}
    >
      <div>
        {/* Top Header: Code, Badges, Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: isDemoActive ? '#e0f2fe' : '#f1f5f9',
                color: isDemoActive ? '#0284c7' : '#475569'
              }}
            >
              {module.code}
            </span>

            {/* Small Demo Badge */}
            {isDemoActive && (
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: '700',
                  color: '#0369a1',
                  backgroundColor: '#e0f2fe',
                  border: '1px solid #bae6fd',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}
              >
                Demo Module — Available Now
              </span>
            )}
          </div>

          {/* Module Status Badge: Locked / Unlocked / Completed */}
          <div>
            {isCompleted ? (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  backgroundColor: '#ecfdf5',
                  color: '#065f46',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <CheckCircle2 size={12} />
                Completed
              </span>
            ) : isUnlocked ? (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Unlock size={12} />
                Unlocked
              </span>
            ) : (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  backgroundColor: '#f1f5f9',
                  color: '#64748b',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Lock size={12} />
                Locked
              </span>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '700',
            color: isUnlocked || isDemoActive ? '#0f172a' : '#64748b',
            lineHeight: '1.35',
            marginBottom: '6px'
          }}
        >
          {module.title}
        </h3>

        <p
          style={{
            fontSize: '12.5px',
            color: '#64748b',
            lineHeight: '1.5',
            marginBottom: '14px'
          }}
        >
          {module.description}
        </p>
      </div>

      {/* Footer: Theory + Lab Hours Split & Action */}
      <div
        style={{
          borderTop: '1px solid #f1f5f9',
          paddingTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto'
        }}
      >
        <span style={{ fontSize: '11.5px', color: '#475569', fontWeight: '600' }}>
          {module.hoursTheory}T + {module.hoursLab}L = {module.totalHours} Hours
        </span>

        {(isUnlocked || isDemoActive) && (
          <span
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#0284c7',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>{isCompleted ? 'Review' : 'Open'}</span>
            <ArrowRight size={13} />
          </span>
        )}
      </div>

      {/* Locked Tooltip Popover */}
      {showTooltip && !isUnlocked && !isDemoActive && (
        <div
          style={{
            position: 'absolute',
            bottom: '105%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            fontSize: '11.5px',
            fontWeight: '600',
            padding: '6px 12px',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 50,
            pointerEvents: 'none'
          }}
        >
          Complete the previous module to unlock.
        </div>
      )}
    </div>
  );
};
