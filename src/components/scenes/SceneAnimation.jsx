import React, { useState } from 'react';
import useSceneLoop from '@/hooks/useSceneLoop';
import { SCENE_REGISTRY, SceneDefault } from './SceneRegistry';
import SceneScrubBar from './SceneScrubBar';

/**
 * SceneAnimation: ambient, autonomous SVG scene animator.
 * - Centered above slide content (Cisco-style layout).
 * - Dispatches scene rendering to dedicated purpose-built components via SCENE_REGISTRY.
 * - Continuous timeline engine driven by requestAnimationFrame.
 * - Passes `progress` (0.0 .. 1.0 continuous float) and `currentStep` to scenes.
 * - Zero permanently-visible playback buttons.
 * - Hover/tap reveals SceneScrubBar with elapsed/total time and draggable continuous seek handle.
 * - Bi-directional sentence synchronization via activeStepOverride.
 * - Prefers-reduced-motion: locks to static final state (progress=1), hides scrubber.
 * - Non-functional leftover step dots removed per Revision 12.
 */
export default function SceneAnimation({
  sceneId,
  sceneKey,
  stepCount = 4,
  activeStepOverride = null,
  onStepChange
}) {
  const effectiveKey = sceneId || sceneKey;
  const stepDurationMs = 2400;

  const {
    progress,
    elapsedMs,
    totalMs,
    currentStep,
    isReducedMotion,
    isPaused,
    pause,
    play,
    seek,
    seekTo
  } = useSceneLoop({
    stepCount,
    stepDurationMs,
    loopPauseMs: 800,
    activeStepOverride,
    onStepChange
  });

  const [hovered, setHovered] = useState(false);

  const SceneComponent = SCENE_REGISTRY[effectiveKey] || SceneDefault;

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Animation Frame — 16:9 proportional, centered, max-width capped */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '580px',
          borderRadius: '12px',
          backgroundColor: 'var(--bg-card-subtle, #f8fafc)',
          border: '1px solid var(--border-default, #e2e8f0)',
          boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05))',
          overflow: 'hidden'
        }}
      >
        {/* SVG Canvas — 16:9 proportional viewport */}
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
          <svg
            viewBox="0 0 340 192"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label={"Animation scene for " + effectiveKey}
          >
            <SceneComponent
              progress={progress}
              currentStep={currentStep}
              isReducedMotion={isReducedMotion}
            />
          </svg>
        </div>

        {/* Hover-revealed Scrub Bar — only shows on hover/touch */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            opacity: hovered && !isReducedMotion ? 1 : 0,
            pointerEvents: hovered && !isReducedMotion ? 'auto' : 'none',
            transition: 'opacity 200ms ease'
          }}
        >
          <SceneScrubBar
            progress={progress}
            elapsedMs={elapsedMs}
            totalMs={totalMs}
            isPaused={isPaused}
            pause={pause}
            play={play}
            seek={seek}
            seekTo={seekTo}
            isReducedMotion={isReducedMotion}
          />
        </div>
      </div>

      {/* Reduced motion indicator if enabled */}
      {isReducedMotion && (
        <div style={{ paddingTop: '6px', fontSize: '11px', color: 'var(--text-muted, #64748b)', fontWeight: '600' }}>
          Static frame · Reduced motion active
        </div>
      )}
    </div>
  );
}
