/**
 * Accessibility Slice
 * CDAC Cloud Security Training Platform
 * Independent slice persisted to its own localStorage key (cdac_accessibility_prefs).
 * Separate from the main store to avoid coupling accessibility settings to course progress resets.
 */

const ACCESSIBILITY_KEY = 'cdac_accessibility_prefs';

export const ACCESSIBILITY_DEFAULTS = {
  voiceoverEnabled: false,
  autoReadEnabled:  false,
  voiceLang:        'en-IN',
  speechRate:       1.0,
  textScale:        1,       // 1 = Normal, 1.2 = Large, 1.45 = Extra Large
  highContrast:     false,
  theme:            'light', // 'light' | 'dark'
};

/**
 * Load persisted accessibility preferences from localStorage.
 * Always merges with defaults so new fields are never undefined.
 */
export function loadAccessibilityPrefs() {
  try {
    const raw = localStorage.getItem(ACCESSIBILITY_KEY);
    if (!raw) return { ...ACCESSIBILITY_DEFAULTS };
    const parsed = JSON.parse(raw);
    return { ...ACCESSIBILITY_DEFAULTS, ...parsed };
  } catch {
    return { ...ACCESSIBILITY_DEFAULTS };
  }
}

/**
 * Persist accessibility preferences to localStorage.
 */
export function saveAccessibilityPrefs(prefs) {
  try {
    localStorage.setItem(ACCESSIBILITY_KEY, JSON.stringify(prefs));
  } catch {
    // silently ignore quota errors
  }
}
