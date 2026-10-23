/**
 * LabSessionGuard Component
 * CDAC Cloud Security Training Platform
 * Scoped wrapper that mounts the Host Safety Guard strictly while a lab workstation
 * is open and actively running. Unmounts and detaches all listeners immediately when
 * the lab stops running, completes, or user navigates back to course slides.
 */

import React from 'react';
import useHostSafetyGuard from '@/hooks/useHostSafetyGuard';

export default function LabSessionGuard({
  isRunning = false,
  onEndLab,
  showToast,
  children
}) {
  const { GuardDialog } = useHostSafetyGuard({
    onEndLab,
    active: isRunning,
    showToast
  });

  return (
    <>
      {children}
      {isRunning && <GuardDialog />}
    </>
  );
}
