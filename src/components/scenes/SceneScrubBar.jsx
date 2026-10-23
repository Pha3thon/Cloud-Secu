import React, { useState, useRef, useCallback } from 'react';

/**
 * SceneScrubBar
 * Hover-revealed Cisco-style player controls for SceneAnimation.
 * - Only visible on hover (desktop) or tap-once (touch).
 * - Shows live elapsed / total time from requestAnimationFrame loop.
 * - Draggable scrub handle calls seek(progress) for real-time interpolated visual rendering.
 * - Play/Pause icon toggles playback immediately.
 * - prefers-reduced-motion: returns null (nothing rendered).
 */
function formatTime(ms) {
  const safeMs = Math.max(0, Number(ms) || 0);
  const totalSec = Math.floor(safeMs / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function SceneScrubBar({
  progress = 0,
  currentTimeMs = 0,
  totalTimeMs = 9600,
  elapsedMs,
  totalMs,
  isPaused = false,
  pause,
  resume,
  play,
  seek,
  seekTo,
  isReducedMotion = false
}) {
  const barRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  if (isReducedMotion) return null;

  const effectiveElapsed = elapsedMs !== undefined ? elapsedMs : currentTimeMs;
  const effectiveTotal = totalMs !== undefined ? totalMs : totalTimeMs;
  const effectiveProgress = progress !== undefined ? progress : (effectiveTotal > 0 ? effectiveElapsed / effectiveTotal : 0);

  const handleSeekFromEvent = useCallback((e) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    if (seek) {
      seek(ratio);
    } else if (seekTo) {
      seekTo(ratio);
    }
  }, [seek, seekTo]);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setDragging(true);
    if (pause) pause();
    handleSeekFromEvent(e);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    handleSeekFromEvent(e);
  };

  const handlePointerUp = (e) => {
    if (!dragging) return;
    setDragging(false);
    handleSeekFromEvent(e);
    if (resume) resume();
    else if (play) play();
  };

  const togglePlayback = () => {
    if (isPaused) {
      if (resume) resume();
      else if (play) play();
    } else {
      if (pause) pause();
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '10px 14px 8px',
        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.4) 70%, transparent 100%)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '0 0 12px 12px',
        userSelect: 'none',
        zIndex: 10
      }}
    >
      {/* Play / Pause button — inside hover bar only */}
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPaused ? 'Resume scene animation' : 'Pause scene animation'}
        style={{
          background: 'none',
          border: 'none',
          color: '#ffffff',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          opacity: 0.95,
          transition: 'transform 100ms ease'
        }}
      >
        {isPaused ? (
          /* Play triangle */
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
            <polygon points="4,2 14,8 4,14" />
          </svg>
        ) : (
          /* Pause double bars */
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
            <rect x="3" y="2" width="3.5" height="12" rx="1" />
            <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
          </svg>
        )}
      </button>

      {/* Scrub track */}
      <div
        ref={barRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(effectiveProgress * 100)}
        aria-label="Scene animation timeline scrubber"
        tabIndex={0}
        style={{
          flex: 1,
          height: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.28)',
          borderRadius: '3px',
          position: 'relative',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={dragging ? handlePointerUp : undefined}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') seek && seek(Math.min(1, effectiveProgress + 0.05));
          if (e.key === 'ArrowLeft') seek && seek(Math.max(0, effectiveProgress - 0.05));
          if (e.key === ' ') {
            e.preventDefault();
            togglePlayback();
          }
        }}
      >
        {/* Filled progress bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${Math.min(100, Math.max(0, effectiveProgress * 100))}%`,
            backgroundColor: '#38bdf8',
            borderRadius: '3px',
            pointerEvents: 'none'
          }}
        />
        {/* Scrub handle knob */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${Math.min(100, Math.max(0, effectiveProgress * 100))}%`,
            transform: 'translate(-50%, -50%)',
            width: dragging ? '14px' : '11px',
            height: dragging ? '14px' : '11px',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            pointerEvents: 'none',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.45)',
            transition: dragging ? 'none' : 'transform 150ms ease'
          }}
        />
      </div>

      {/* Elapsed / Total time display */}
      <span
        style={{
          fontSize: '11px',
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 0.9)',
          flexShrink: 0,
          fontVariantNumeric: 'tabular-nums',
          fontFamily: 'monospace'
        }}
      >
        {formatTime(effectiveElapsed)}&nbsp;/&nbsp;{formatTime(effectiveTotal)}
      </span>
    </div>
  );
}
