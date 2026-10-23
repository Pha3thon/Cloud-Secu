/**
 * useLabCheck Hook
 * CDAC Cloud Security Training Platform
 * Centralized, authoritative configuration check hook for all lab flags (M1 and M4).
 * Reads live state directly from store, calls registered check(), handles spinner/feedback,
 * and formats failures array into clear diagnostic feedback.
 */

import { useState, useCallback, useRef } from 'react';
import useStore from './useStore';
import { LABS } from '@/labs/registry';

export function useLabCheck(labId, flagNumber) {
  const { simCloud, labEvents } = useStore();
  const [status, setStatus] = useState('idle'); // 'idle' | 'checking' | 'passed' | 'failed'
  const [result, setResult] = useState(null); // { pass: boolean, message: string, failures: string[] }
  const isCheckingRef = useRef(false);

  const runCheck = useCallback(async () => {
    if (isCheckingRef.current) return;
    isCheckingRef.current = true;
    setStatus('checking');

    // Provide immediate tangible visual feedback (spinner animation)
    await new Promise((resolve) => setTimeout(resolve, 280));

    try {
      const normalizedLabId = typeof labId === 'string' && labId.startsWith('m1')
        ? labId
        : (typeof labId === 'string' && labId.startsWith('lab') ? labId.replace('-', '') : `lab${labId}`);

      const labDef = LABS[normalizedLabId] || LABS[labId];
      if (!labDef) {
        const errorResult = {
          pass: false,
          message: `Lab definition '${normalizedLabId}' not found.`,
          failures: []
        };
        setResult(errorResult);
        setStatus('failed');
        isCheckingRef.current = false;
        return errorResult;
      }

      const flagDef = labDef.flags?.[flagNumber - 1];
      if (!flagDef) {
        const errorResult = {
          pass: false,
          message: `Flag ${flagNumber} not found in ${normalizedLabId}.`,
          failures: []
        };
        setResult(errorResult);
        setStatus('failed');
        isCheckingRef.current = false;
        return errorResult;
      }

      const currentEvents = labEvents?.[normalizedLabId] || labEvents?.[labId] || [];
      const checkOutcome = flagDef.check(simCloud, currentEvents);

      if (checkOutcome.pass) {
        const successResult = {
          pass: true,
          message: 'Configuration verified! Answer the question below.',
          failures: []
        };
        setResult(successResult);
        setStatus('passed');
        isCheckingRef.current = false;
        return successResult;
      } else {
        const rawFailures = checkOutcome.failures && checkOutcome.failures.length > 0
          ? checkOutcome.failures
          : ['Configuration check failed. Review your configuration and try again.'];

        const failureResult = {
          pass: false,
          message: rawFailures.length === 1 ? rawFailures[0] : 'Configuration incomplete. Please resolve the following issues:',
          failures: rawFailures.length > 1 ? rawFailures : []
        };
        setResult(failureResult);
        setStatus('failed');
        isCheckingRef.current = false;
        return failureResult;
      }
    } catch (err) {
      console.error('[useLabCheck] Error executing check for', labId, 'flag', flagNumber, err);
      const crashResult = {
        pass: false,
        message: `Diagnostic check error: ${err.message}`,
        failures: []
      };
      setResult(crashResult);
      setStatus('failed');
      isCheckingRef.current = false;
      return crashResult;
    }
  }, [labId, flagNumber, simCloud, labEvents]);

  const resetCheck = useCallback(() => {
    setStatus('idle');
    setResult(null);
  }, []);

  return {
    status, // 'idle' | 'checking' | 'passed' | 'failed'
    checking: status === 'checking',
    checkResult: result,
    runCheck,
    resetCheck
  };
}

export default useLabCheck;
