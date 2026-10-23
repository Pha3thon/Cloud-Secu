/**
 * Admin / CMS Content Slice
 * Manages custom module content, editor draft states, and preview overrides.
 */

// TODO: replace with real CMS API

import { M4_TOPICS } from '@/content/m4';
import { M1_TOPICS } from '@/content/m1';
import { M0_TOPICS } from '@/content/m0';

export const ADMIN_CONTENT_KEY = 'cdac_admin_content_v3';

export const INITIAL_ADMIN_STATE = {
  customContent: {},
  previewUnlockAll: false
};

export const adminReducer = (state, action) => {
  switch (action.type) {
    case 'ADMIN/SAVE_CONTENT': {
      const { moduleId, content } = action.payload;
      return {
        ...state,
        customContent: {
          ...state.customContent,
          [moduleId]: {
            ...content,
            lastUpdated: new Date().toISOString()
          }
        }
      };
    }

    case 'ADMIN/SET_PREVIEW_UNLOCK_ALL': {
      return {
        ...state,
        previewUnlockAll: action.payload
      };
    }

    default:
      return state;
  }
};

export const getModuleTopicsFromState = (customContent = {}, moduleId = 'm4') => {
  if (customContent[moduleId]?.topics?.length > 0) {
    return customContent[moduleId].topics;
  }
  if (moduleId === 'm0') {
    return M0_TOPICS;
  }
  if (moduleId === 'm1') {
    return M1_TOPICS;
  }
  return M4_TOPICS;
};
