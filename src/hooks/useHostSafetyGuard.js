/**
 * Host Safety Guard Hook
 * CDAC Cloud Security Training Platform
 * ⚠️ CRITICAL SAFETY REQUIREMENT:
 * Intercepts host browser navigation, reload, and editing shortcuts (Ctrl+Z, F5, Alt+Left, Backspace outside input)
 * and traps the real browser Back button with a confirm dialog to prevent accidental loss of student work.
 * Scoped strictly to running simulations/labs.
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import ConfirmDialog from '@/components/common/ConfirmDialog';

/**
 * Checks whether an element is an active text input or editable field.
 */
const isInsideEditable = (el) => {
  if (!el) return false;
  const tag = el.tagName ? el.tagName.toUpperCase() : '';
  if (tag === 'INPUT' || tag === 'TEXTAREA') return true;
  if (el.isContentEditable) return true;
  if (el.getAttribute && el.getAttribute('contenteditable') === 'true') return true;
  return false;
};

export const useHostSafetyGuard = ({ onEndLab, active = true, showToast = null }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const lastToastTimeRef = useRef(0);

  const triggerThrottledToast = useCallback((msg) => {
    const now = Date.now();
    if (now - lastToastTimeRef.current > 3000) {
      lastToastTimeRef.current = now;
      if (showToast) {
        showToast(msg);
      }
    }
  }, [showToast]);

  // Cleanly dismiss any open dialog if the guard becomes inactive
  useEffect(() => {
    if (!active) {
      setShowConfirmDialog(false);
    }
  }, [active]);

  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

    // 1. Capture-phase Keydown Interception
    const handleKeyDown = (e) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const key = e.key;

      let shouldBlock = false;

      // Undo / Redo: Ctrl/Cmd+Z, Ctrl/Cmd+Y, Ctrl/Cmd+Shift+Z
      if (isCtrlOrCmd && (key === 'z' || key === 'Z' || key === 'y' || key === 'Y')) {
        shouldBlock = true;
      }
      // Browser History Back/Forward: Alt+Left / Alt+Right
      else if (e.altKey && (key === 'ArrowLeft' || key === 'ArrowRight')) {
        shouldBlock = true;
      }
      // Reload: F5, Ctrl/Cmd+R
      else if (key === 'F5' || (isCtrlOrCmd && (key === 'r' || key === 'R'))) {
        shouldBlock = true;
      }
      // Backspace outside of real input / textarea
      else if (key === 'Backspace' && !isInsideEditable(e.target)) {
        shouldBlock = true;
      }

      if (shouldBlock) {
        e.preventDefault();
        e.stopPropagation();
        triggerThrottledToast('Browser shortcuts are disabled here. Use the on-screen controls, Reset Lab, or End Lab instead.');
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });

    // 2. Real Browser Back Button Interception (History Guard)
    try {
      window.history.pushState({ hostSafetyGuard: true }, '');
    } catch {
      // Ignore if pushState is restricted
    }

    const handlePopState = () => {
      // Immediately push guard back to prevent browser from leaving
      try {
        window.history.pushState({ hostSafetyGuard: true }, '');
      } catch {
        // Ignore
      }
      setShowConfirmDialog(true);
    };

    window.addEventListener('popstate', handlePopState);

    // 3. BeforeUnload Listener (Alert student on hard tab close or browser exit)
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // 4. Clean Teardown on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [active, triggerThrottledToast]);

  const handleConfirmLeave = useCallback(() => {
    setShowConfirmDialog(false);
    if (onEndLab) {
      onEndLab();
    }
  }, [onEndLab]);

  const handleCancelLeave = useCallback(() => {
    setShowConfirmDialog(false);
  }, []);

  const GuardDialog = useCallback(() => {
    return React.createElement(ConfirmDialog, {
      isOpen: showConfirmDialog,
      onClose: handleCancelLeave,
      onConfirm: handleConfirmLeave,
      title: 'Leave this lab?',
      message: 'Your progress is saved, but the workstation will pause.',
      confirmText: 'Leave Lab',
      cancelText: 'Stay in Lab',
      danger: false
    });
  }, [showConfirmDialog, handleCancelLeave, handleConfirmLeave]);

  return {
    showConfirmDialog,
    handleConfirmLeave,
    handleCancelLeave,
    GuardDialog
  };
};

export default useHostSafetyGuard;
