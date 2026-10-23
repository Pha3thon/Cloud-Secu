/**
 * Input Sanitization Utility
 * CDAC Cloud Security Training Platform
 *
 * Strips script tags, active HTML markup, and dangerous attribute injections
 * before values are stored in state or rendered in diagrams/review screens.
 */

export function sanitizeInput(value) {
  if (value === null || value === undefined) return '';
  if (typeof value !== 'string') return String(value);

  let cleaned = value;

  // 1. Strip script, style, iframe blocks and contents
  cleaned = cleaned
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  // 2. Strip all remaining HTML tags
  cleaned = cleaned.replace(/<[^>]*>?/gm, '');

  // 3. Strip dangerous inline event handlers and schemes
  cleaned = cleaned.replace(/(onerror|onload|onclick|onmouseover|onfocus|onblur|javascript:)\s*=/gi, '');

  return cleaned.trim();
}

export default sanitizeInput;
