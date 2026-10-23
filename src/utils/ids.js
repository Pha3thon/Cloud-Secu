/**
 * Stable ID & Slug Helpers
 */

export const normalizeLabId = (idOrNum) => {
  if (!idOrNum) return 'lab1';
  const str = String(idOrNum).toLowerCase().trim();
  if (str.startsWith('m1-lab') || str.startsWith('m1lab')) {
    return str.replace('-', '');
  }
  if (str.startsWith('lab')) {
    return str.replace('-', '');
  }
  return `lab${str}`;
};

export const getLabTopicNumber = (labId) => {
  const norm = normalizeLabId(labId);
  const num = parseInt(norm.replace('lab', ''), 10);
  return isNaN(num) ? 1 : num;
};

export const slugify = (text = '') => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const generateRequestId = () => {
  return `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
};
