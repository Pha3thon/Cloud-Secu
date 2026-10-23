/**
 * AccessibilityContext
 * Provides accessibility preferences and setters app-wide, mounted once at root.
 * Must NOT interact with useHostSafetyGuard - purely display/TTS settings.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadAccessibilityPrefs, saveAccessibilityPrefs, ACCESSIBILITY_DEFAULTS } from '@/state/accessibilitySlice';

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  const [prefs, setPrefs] = useState(loadAccessibilityPrefs);

  // Persist on every change
  useEffect(() => {
    saveAccessibilityPrefs(prefs);
  }, [prefs]);

  // Apply theme to <html> data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', prefs.theme);
  }, [prefs.theme]);

  // Apply high-contrast class to <html>
  useEffect(() => {
    if (prefs.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [prefs.highContrast]);

  // Apply text-scale CSS custom property
  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(prefs.textScale));
  }, [prefs.textScale]);

  const update = useCallback((partial) => {
    setPrefs((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetAll = useCallback(() => {
    setPrefs({ ...ACCESSIBILITY_DEFAULTS });
  }, []);

  return (
    <AccessibilityContext.Provider value={{ prefs, update, resetAll }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used inside AccessibilityProvider');
  return ctx;
}

export default AccessibilityContext;
