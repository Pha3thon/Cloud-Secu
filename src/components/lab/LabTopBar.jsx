import React from 'react';
import { Clock, RotateCcw, LogOut } from 'lucide-react';
import { formatTimer } from '@/utils/format';

/**
 * LabTopBar component displaying lab status, timer, reset trigger, and exit button.
 */
export default function LabTopBar({
  isRunning = true,
  elapsedSeconds = 0,
  onResetClick,
  onEndLabClick
}) {
  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: 'var(--radius-lg, 10px)',
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-subtle, #e2e8f0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Pulsing Status Dot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: isRunning ? 'var(--color-success, #10b981)' : 'var(--text-muted, #94a3b8)'
            }}
            className={isRunning ? 'animate-pulse' : ''}
          />
          <span
            style={{
              fontSize: '12px',
              fontWeight: '800',
              color: isRunning ? '#065f46' : 'var(--text-muted, #64748b)'
            }}
          >
            {isRunning ? 'Lab Running' : 'Lab Paused'}
          </span>
        </div>

        {/* Timer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#f1f5f9',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '700',
            fontFamily: 'monospace',
            color: 'var(--text-main, #334155)'
          }}
        >
          <Clock size={12} />
          <span>{formatTimer(elapsedSeconds)}</span>
        </div>
      </div>

      {/* Lab Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          onClick={onResetClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11.5px',
            color: 'var(--color-danger, #dc2626)',
            fontWeight: '600',
            padding: '4px 8px',
            borderRadius: '6px',
            border: '1px solid #fecaca',
            backgroundColor: '#fef2f2',
            cursor: 'pointer'
          }}
        >
          <RotateCcw size={12} />
          <span>Reset Lab</span>
        </button>

        <button
          type="button"
          onClick={onEndLabClick}
          title="Leave workstation and return to course slides"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11.5px',
            color: 'var(--text-main, #334155)',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            cursor: 'pointer'
          }}
        >
          <LogOut size={12} />
          <span>End Lab</span>
        </button>
      </div>
    </div>
  );
}
