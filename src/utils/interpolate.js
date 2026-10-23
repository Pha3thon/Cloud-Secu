/**
 * src/utils/interpolate.js
 * Continuous timeline interpolation utility for smooth SVG and CSS animations.
 *
 * Examples:
 *   const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
 *   const xPos    = interpolate(progress, [0, 1], [startX, endX], { ease: 'easeInOut' });
 *   const color   = interpolate(progress, [0, 0.5, 1], ['#cbd5e1', '#38bdf8', '#0284c7']);
 */

export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

const EASING_FNS = {
  linear: (t) => t,
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  easeIn: (t) => t * t,
  easeOut: (t) => 1 - Math.pow(1 - t, 2),
  cubicEaseInOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
};

function parseHexColor(hex) {
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16)
    };
  }
  if (clean.length >= 6) {
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16)
    };
  }
  return { r: 0, g: 0, b: 0 };
}

function lerpHex(c1, c2, t) {
  const p1 = parseHexColor(c1);
  const p2 = parseHexColor(c2);
  const r = Math.round(lerp(p1.r, p2.r, t));
  const g = Math.round(lerp(p1.g, p2.g, t));
  const b = Math.round(lerp(p1.b, p2.b, t));
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Maps an input value in inputRange to a corresponding value in outputRange.
 *
 * @param {number} val - input value (e.g. progress 0..1)
 * @param {number[]} inputRange - array of monotonically increasing input numbers
 * @param {(number|string)[]} outputRange - array of output numbers or hex color strings
 * @param {object} [options]
 * @param {'linear'|'easeInOut'|'easeIn'|'easeOut'|'cubicEaseInOut'} [options.ease='linear']
 * @param {boolean} [options.clamp=true]
 * @returns {number|string}
 */
export function interpolate(val, inputRange, outputRange, options = {}) {
  if (!Array.isArray(inputRange) || !Array.isArray(outputRange) || inputRange.length < 2) {
    return outputRange ? outputRange[0] : 0;
  }

  const { ease = 'linear', clamp: shouldClamp = true } = options;
  const easingFn = EASING_FNS[ease] || EASING_FNS.linear;

  const minIn = inputRange[0];
  const maxIn = inputRange[inputRange.length - 1];

  let v = Number(val);
  if (isNaN(v)) v = minIn;

  if (shouldClamp) {
    v = clamp(v, minIn, maxIn);
  }

  // Find the sub-segment
  let segIdx = 0;
  for (let i = 0; i < inputRange.length - 1; i++) {
    if (v >= inputRange[i] && v <= inputRange[i + 1]) {
      segIdx = i;
      break;
    }
    if (v > inputRange[i + 1]) {
      segIdx = i;
    }
  }

  const inStart = inputRange[segIdx];
  const inEnd = inputRange[segIdx + 1];
  const outStart = outputRange[segIdx];
  const outEnd = outputRange[segIdx + 1];

  const span = inEnd - inStart;
  const rawRatio = span === 0 ? 0 : (v - inStart) / span;
  const clampedRatio = shouldClamp ? clamp(rawRatio, 0, 1) : rawRatio;
  const easedRatio = easingFn(clampedRatio);

  // If output is hex colors
  if (
    typeof outStart === 'string' &&
    typeof outEnd === 'string' &&
    (outStart.startsWith('#') || outStart.startsWith('rgb'))
  ) {
    return lerpHex(outStart, outEnd, easedRatio);
  }

  // If output is numbers
  if (typeof outStart === 'number' && typeof outEnd === 'number') {
    return lerp(outStart, outEnd, easedRatio);
  }

  // Fallback for direct string swap if not interpolatable
  return easedRatio >= 0.5 ? outEnd : outStart;
}

export default interpolate;
