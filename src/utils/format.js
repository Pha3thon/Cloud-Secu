/**
 * Formatters
 * Helpers for time, durations, and percentages.
 */

export const formatTimer = (totalSeconds = 0) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const formatHours = (hoursTheory = 0, hoursLab = 0) => {
  return `${hoursTheory}h Theory + ${hoursLab}h Lab`;
};

export const formatPercent = (current = 0, total = 1) => {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((current / total) * 100));
};
