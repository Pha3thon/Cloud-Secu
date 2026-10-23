/**
 * Labs Registry
 * Single authoritative source of lab definitions, check functions, questions, and progression.
 */

// TODO: replace with real lab validation API

import { lab1 } from './lab1';
import { lab2 } from './lab2';
import { lab3 } from './lab3';
import { lab4 } from './lab4';
import { lab5 } from './lab5';
import { lab6 } from './lab6';
import { lab7 } from './lab7';
import { m1Lab1 } from './m1Lab1';
import { m1Lab2 } from './m1Lab2';
import { m1Lab3 } from './m1Lab3';
import { normalizeLabId } from '@/utils/ids';

export const LABS = {
  lab1,
  lab2,
  lab3,
  lab4,
  lab5,
  lab6,
  lab7,
  m1lab1: m1Lab1,
  'm1-lab1': m1Lab1,
  m1lab2: m1Lab2,
  'm1-lab2': m1Lab2,
  m1lab3: m1Lab3,
  'm1-lab3': m1Lab3
};

export const getLabById = (labId) => {
  if (!labId) return null;
  if (LABS[labId]) return LABS[labId];
  const norm = normalizeLabId(labId);
  return LABS[norm] || null;
};

export const getLabByTopic = (topicNumber, moduleId = 'm4') => {
  if (moduleId === 'm1') {
    if (topicNumber === 2) return m1Lab1;
    if (topicNumber === 5) return m1Lab2;
    if (topicNumber === 6) return m1Lab3;
    return null;
  }
  return LABS[`lab${topicNumber}`] || null;
};

export default LABS;
