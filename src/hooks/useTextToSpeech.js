/**
 * useTextToSpeech
 * Wraps window.speechSynthesis cleanly:
 * - Async voice list loading (onvoiceschanged pattern)
 * - Preferred en-IN voice selection with English fallback
 * - speak / stop / isSpeaking with cancellation on unmount
 * - Never throws; graceful noop when API unavailable
 * Must NOT interact with useHostSafetyGuard.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAccessibility } from '@/state/AccessibilityContext';

function getSynth() {
  return typeof window !== 'undefined' ? window.speechSynthesis : null;
}

function pickVoice(voices, preferredLang) {
  if (!voices || voices.length === 0) return null;
  // Prefer exact match for en-IN (or whatever preferredLang is)
  const exact = voices.find((v) => v.lang === preferredLang);
  if (exact) return exact;
  // Fallback: any en-IN prefix
  const prefix = voices.find((v) => v.lang.startsWith(preferredLang.split('-')[0] + '-IN'));
  if (prefix) return prefix;
  // Fallback: any English voice
  const anyEn = voices.find((v) => v.lang.startsWith('en'));
  return anyEn || voices[0];
}

export default function useTextToSpeech() {
  const synth = getSynth();
  const { prefs } = useAccessibility();
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [indianVoiceAvailable, setIndianVoiceAvailable] = useState(null); // null = unknown, bool after load
  const utteranceRef = useRef(null);

  // Load voices (async on most browsers)
  useEffect(() => {
    if (!synth) return;
    const load = () => {
      const v = synth.getVoices();
      if (v.length > 0) {
        setVoices(v);
        const hasIN = v.some((vx) => vx.lang.startsWith('en-IN'));
        setIndianVoiceAvailable(hasIN);
      }
    };
    load();
    synth.addEventListener('voiceschanged', load);
    return () => synth.removeEventListener('voiceschanged', load);
  }, [synth]);

  // Cancel on unmount
  useEffect(() => {
    return () => {
      if (synth) synth.cancel();
      setIsSpeaking(false);
    };
  }, [synth]);

  const stop = useCallback(() => {
    if (synth) synth.cancel();
    setIsSpeaking(false);
  }, [synth]);

  const speak = useCallback((text) => {
    if (!synth || !text) return;
    synth.cancel();
    setIsSpeaking(false);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = prefs.speechRate ?? 1.0;

    const chosenVoice = pickVoice(voices, prefs.voiceLang ?? 'en-IN');
    if (chosenVoice) utterance.voice = chosenVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    synth.speak(utterance);
    setIsSpeaking(true);
  }, [synth, voices, prefs.speechRate, prefs.voiceLang]);

  return { speak, stop, isSpeaking, indianVoiceAvailable };
}
