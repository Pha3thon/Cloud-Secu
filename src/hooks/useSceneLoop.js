import { useState, useEffect, useRef, useCallback } from 'react';
import useReducedMotion from './useReducedMotion';

/**
 * useSceneLoop: requestAnimationFrame-driven continuous animation timeline.
 *
 * Supports both signatures:
 *   1) useSceneLoop(durationMs, { loop, reducedMotion })
 *   2) useSceneLoop({ stepCount, stepDurationMs, loopPauseMs, durationMs, loop, activeStepOverride, onStepChange })
 *
 * Returns:
 *   progress        - continuous 0.0 to 1.0 float representing timeline position
 *   elapsedMs       - current playback time in ms
 *   totalMs         - total active cycle duration in ms
 *   currentTimeMs   - alias to elapsedMs (for backward compatibility)
 *   totalTimeMs     - alias to totalMs (for backward compatibility)
 *   currentStep     - derived integer step index (0 .. stepCount - 1)
 *   isPaused        - whether playback is currently paused
 *   isReducedMotion - whether reduced motion preference is active
 *   play() / resume() - start or resume playback
 *   pause()         - pause playback
 *   seek(progress)  - instantly position timeline at progress (0..1)
 *   seekTo(val)     - seek by progress float or step index
 */
export default function useSceneLoop(durationOrOptions = 9600, maybeOptions = {}) {
  const systemReducedMotion = useReducedMotion();

  // Normalize options
  let totalDurationMs = 9600;
  let loopPauseMs = 800;
  let stepCount = 4;
  let loop = true;
  let activeStepOverride = null;
  let onStepChange = null;
  let explicitReducedMotion = null;

  if (typeof durationOrOptions === 'number') {
    totalDurationMs = durationOrOptions;
    if (maybeOptions.loop !== undefined) loop = maybeOptions.loop;
    if (maybeOptions.reducedMotion !== undefined) explicitReducedMotion = maybeOptions.reducedMotion;
    if (maybeOptions.loopPauseMs !== undefined) loopPauseMs = maybeOptions.loopPauseMs;
    if (maybeOptions.stepCount !== undefined) stepCount = maybeOptions.stepCount;
  } else if (typeof durationOrOptions === 'object' && durationOrOptions !== null) {
    const opts = durationOrOptions;
    stepCount = opts.stepCount || 4;
    const stepDurationMs = opts.stepDurationMs || 2400;
    totalDurationMs = opts.durationMs || (stepCount * stepDurationMs);
    loopPauseMs = opts.loopPauseMs !== undefined ? opts.loopPauseMs : 800;
    if (opts.loop !== undefined) loop = opts.loop;
    if (opts.reducedMotion !== undefined) explicitReducedMotion = opts.reducedMotion;
    if (opts.activeStepOverride !== undefined) activeStepOverride = opts.activeStepOverride;
    if (opts.onStepChange) onStepChange = opts.onStepChange;
  }

  const isReducedMotion = explicitReducedMotion !== null ? explicitReducedMotion : systemReducedMotion;

  const [progress, setProgress] = useState(isReducedMotion ? 1 : 0);
  const [elapsedMs, setElapsedMs] = useState(isReducedMotion ? totalDurationMs : 0);
  const [isPaused, setIsPaused] = useState(false);

  const rafIdRef = useRef(null);
  const lastTimeRef = useRef(null);
  const elapsedRef = useRef(0);
  const lastStepReportedRef = useRef(0);
  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  const isOverridden = activeStepOverride !== null && activeStepOverride !== undefined;

  // Handle sentence hover activeStepOverride
  useEffect(() => {
    if (isReducedMotion) return;
    if (isOverridden) {
      const targetProgress = Math.max(0, Math.min(1, activeStepOverride / Math.max(1, stepCount - 1)));
      elapsedRef.current = targetProgress * totalDurationMs;
      setProgress(targetProgress);
      setElapsedMs(Math.round(elapsedRef.current));
      lastTimeRef.current = null;
    } else {
      // Resumed from hover: keep current elapsedRef and reset timestamp
      lastTimeRef.current = null;
    }
  }, [isOverridden, activeStepOverride, stepCount, totalDurationMs, isReducedMotion]);

  // RequestAnimationFrame main loop
  useEffect(() => {
    if (isReducedMotion) {
      setProgress(1);
      setElapsedMs(totalDurationMs);
      return;
    }

    if (isOverridden || isPaused) {
      lastTimeRef.current = null;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    const cycleDuration = totalDurationMs + loopPauseMs;

    const tick = (now) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      let nextElapsed = elapsedRef.current + delta;

      if (loop) {
        if (nextElapsed >= cycleDuration) {
          nextElapsed = nextElapsed % cycleDuration;
        }
      } else {
        if (nextElapsed >= totalDurationMs) {
          nextElapsed = totalDurationMs;
        }
      }

      elapsedRef.current = nextElapsed;

      // Active timeline progress from 0..1 (holds at 1 during loopPause)
      const currentProgress = Math.min(1, Math.max(0, nextElapsed / totalDurationMs));
      setProgress(currentProgress);
      setElapsedMs(Math.round(nextElapsed));

      // Report step change if callback provided
      if (onStepChange) {
        const derivedStep = Math.min(stepCount - 1, Math.floor(currentProgress * stepCount));
        if (derivedStep !== lastStepReportedRef.current) {
          lastStepReportedRef.current = derivedStep;
          onStepChange(derivedStep);
        }
      }

      if (!isPausedRef.current && (!loop ? nextElapsed < totalDurationMs : true)) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lastTimeRef.current = null;
    };
  }, [isReducedMotion, isOverridden, isPaused, totalDurationMs, loopPauseMs, loop, stepCount, onStepChange]);

  // Controls
  const pause = useCallback(() => {
    setIsPaused(true);
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    lastTimeRef.current = null;
  }, []);

  const play = useCallback(() => {
    lastTimeRef.current = null;
    setIsPaused(false);
  }, []);

  const seek = useCallback((progressValue) => {
    const clamped = Math.max(0, Math.min(1, Number(progressValue) || 0));
    elapsedRef.current = clamped * totalDurationMs;
    lastTimeRef.current = null;
    setProgress(clamped);
    setElapsedMs(Math.round(elapsedRef.current));

    if (onStepChange) {
      const derivedStep = Math.min(stepCount - 1, Math.floor(clamped * stepCount));
      lastStepReportedRef.current = derivedStep;
      onStepChange(derivedStep);
    }
  }, [totalDurationMs, stepCount, onStepChange]);

  const seekTo = useCallback((val) => {
    if (typeof val === 'number') {
      if (val >= 0 && val <= 1) {
        seek(val);
      } else {
        const stepProgress = Math.max(0, Math.min(stepCount - 1, val)) / Math.max(1, stepCount - 1);
        seek(stepProgress);
      }
    }
  }, [seek, stepCount]);

  const effectiveStep = isReducedMotion
    ? Math.max(0, stepCount - 1)
    : isOverridden
    ? activeStepOverride
    : Math.min(stepCount - 1, Math.floor(progress * stepCount));

  return {
    progress: isReducedMotion ? 1 : progress,
    elapsedMs,
    totalMs: totalDurationMs,
    currentTimeMs: elapsedMs,
    totalTimeMs: totalDurationMs,
    currentStep: effectiveStep,
    stepCount,
    isPaused,
    isReducedMotion,
    play,
    resume: play,
    pause,
    seek,
    seekTo
  };
}
