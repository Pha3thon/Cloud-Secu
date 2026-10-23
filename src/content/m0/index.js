/**
 * Module 0 Aggregator
 * Course Orientation: What to Expect
 * CDAC Cloud Security Training Platform
 */

import { topic1 } from './topic1';

export const M0_TOPICS = [topic1];

export const ALL_M0_SLIDES = M0_TOPICS.flatMap((topic) => topic.slides);

export const M0_MODULE = {
  id: "m0",
  code: "M0",
  phaseId: "phase-0",
  phaseNumber: 0,
  phaseName: "Orientation",
  title: "Course Orientation: What to Expect",
  oneLiner: "A short, plain-language preview before we start — what 'cloud' means and why this course begins with networking and Linux, not cloud tools.",
  description: "A short, plain-language preview before we start — what 'cloud' means and why this course begins with networking and Linux, not cloud tools.",
  hoursTheory: 0,
  hoursLab: 0,
  totalHours: 0,
  estimatedMinutes: 8,
  status: 'Unlocked',
  badge: 'Start Here',
  excludeFromTotals: true,
  isAvailableDemo: true,
  topics: M0_TOPICS,
  slides: ALL_M0_SLIDES,
  lab: null
};

export default M0_MODULE;
