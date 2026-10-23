/**
 * LocalStorage Helpers
 * Safe read/write wrappers with error handling.
 */

export const safeGet = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null || item === undefined) return fallback;
    return JSON.parse(item);
  } catch (err) {
    console.error(`[Storage] Failed to read key "${key}":`, err);
    return fallback;
  }
};

export const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`[Storage] Failed to write key "${key}":`, err);
    return false;
  }
};

export const safeRemove = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.error(`[Storage] Failed to remove key "${key}":`, err);
    return false;
  }
};
