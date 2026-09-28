import React, { useState } from 'react';
import { Lock, Unlock, CheckCircle2, Clock, Sparkles, ArrowRight } from 'lucide-react';

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
      {/* Top Header: Code, Badges, Status */}
      <div>
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

            {/* Demo Module Special Badge */}
            {isDemoActive && (
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: '700',
                  color: '#0369a1',
                  backgroundColor: '#e0f2fe',
                  border: '1px solid #bae6fd',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Sparkles size={11} />
                <span>Demo Module — Available Now</span>
              </span>
            )}
          </div>

          {/* Status Badge */}
          <div>
            {isCompleted ? (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#065f46',
                  backgroundColor: '#ecfdf5',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <CheckCircle2 size={13} color="#10b981" />
                <span>Completed ✅</span>
              </span>
            ) : isUnlocked ? (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#0369a1',
                  backgroundColor: '#f0f9ff',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Unlock size={12} color="#0284c7" />
                <span>Unlocked</span>
              </span>
            ) : (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  backgroundColor: '#f8fafc',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Lock size={12} />
                <span>Locked 🔒</span>
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '15.5px',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '8px',
            lineHeight: '1.4'
          }}
        >
          {module.title}
        </h3>

        {/* One line description */}
        <p
          style={{
            fontSize: '12.5px',
            color: '#64748b',
            lineHeight: '1.5',
            marginBottom: '16px'
          }}
        >
          {module.description}
        </p>
      </div>

      {/* Footer Info & Action */}
      <div
        style={{
          borderTop: '1px solid #f1f5f9',
          paddingTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px'
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#475569',
            fontWeight: '500'
          }}
        >
          <Clock size={13} color="#64748b" />
          <span>
            {module.hoursTheory}T + {module.hoursLab}L = {module.totalHours} Hrs
          </span>
        </span>

        {isUnlocked ? (
          <span
            style={{
              color: '#0284c7',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>{isCompleted ? 'Review' : 'Start Module'}</span>
            <ArrowRight size={13} />
          </span>
        ) : (
          <span style={{ color: '#94a3b8', fontSize: '11px' }}>Complete prior module</span>
        )}
      </div>

      {/* Tooltip for locked cards */}
      {showTooltip && !isUnlocked && (
        <div
          className="animate-popover"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '11.5px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 30
          }}
        >
          Complete the previous module to unlock.
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderWidth: '5px',
              borderStyle: 'solid',
              borderColor: '#0f172a transparent transparent transparent'
            }}
          />
        </div>
      )}
    </div>
  );
};
