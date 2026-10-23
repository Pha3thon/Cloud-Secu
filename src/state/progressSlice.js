/**
 * Progress & Navigation Slice
 * Manages completed items, furthest-reached pointers, and module access.
 */

// TODO: replace real backend progress API

import { M4_TOPICS } from '@/content/m4';

export const INITIAL_PROGRESS_STATE = {
  completedModules: [],
  unlockedModules: ['m0', 'm4'],
  currentView: 'login', // 'login' | 'dashboard' | 'curriculum' | 'module-m0' | 'module-m1' | 'module-m4' | 'admin-dashboard'
  m1State: {
    currentTopicIndex: 0,
    currentItemType: 'slide', // 'slide' | 'briefing' | 'lab'
    currentSlideIndex: 0,
    furthestTopicIndex: 0,
    furthestItemType: 'slide',
    furthestSlideIndex: 0,
    completedItemIds: [],
    passedLabIds: []
  },
  m4State: {
    currentTopicIndex: 0,
    currentItemType: 'slide', // 'slide' | 'briefing' | 'lab'
    currentSlideIndex: 0,
    furthestTopicIndex: 0,
    furthestItemType: 'slide',
    furthestSlideIndex: 0,
    completedItemIds: [],
    passedLabIds: []
  }
};

export const getItemRank = (topicIndex, itemType, slideIndex = 0, topics = M4_TOPICS) => {
  const topic = topics[topicIndex];
  const slideCount = topic?.slides?.length || 1;
  if (itemType === 'slide') {
    return slideIndex;
  }
  if (itemType === 'briefing') {
    return slideCount;
  }
  if (itemType === 'lab') {
    return slideCount + 1;
  }
  return 0;
};

export const isItemCompleted = (m4State, itemId, previewUnlockAll = false) => {
  if (previewUnlockAll) return true;
  if (m4State.completedItemIds.includes(itemId)) return true;
  if (itemId.startsWith('lab')) {
    const normalized = itemId.replace('-', '');
    const alt = itemId.includes('-') ? itemId : `lab-${itemId.replace('lab', '')}`;
    return m4State.passedLabIds.includes(normalized) || m4State.passedLabIds.includes(alt);
  }
  return false;
};

export const isItemLocked = (m4State, topicIndex, itemType, slideIndex = 0, previewUnlockAll = false, topics = M4_TOPICS) => {
  if (previewUnlockAll) return false;
  const { furthestTopicIndex, furthestItemType, furthestSlideIndex } = m4State;
  if (topicIndex < furthestTopicIndex) return false;
  if (topicIndex > furthestTopicIndex) return true;

  const curRank = getItemRank(topicIndex, itemType, slideIndex, topics);
  const furRank = getItemRank(furthestTopicIndex, furthestItemType, furthestSlideIndex, topics);

  return curRank > furRank;
};

export const progressReducer = (state, action, topics = M4_TOPICS) => {
  switch (action.type) {
    case 'NAV/NAVIGATE_TO': {
      return {
        ...state,
        currentView: action.payload
      };
    }

    case 'PROGRESS/NAVIGATE_M4_ITEM': {
      const { topicIndex, itemType, slideIndex = 0 } = action.payload;
      const cur = state.m4State;
      let newCompleted = [...cur.completedItemIds];

      let currentKey = '';
      if (itemType === 'briefing') {
        currentKey = `t${topicIndex + 1}-briefing`;
      } else if (itemType === 'slide') {
        const slide = topics[topicIndex]?.slides[slideIndex];
        if (slide) currentKey = slide.id;
      }

      if (currentKey && !newCompleted.includes(currentKey)) {
        newCompleted.push(currentKey);
      }

      let newFurthestTopic = cur.furthestTopicIndex;
      let newFurthestItemType = cur.furthestItemType;
      let newFurthestSlide = cur.furthestSlideIndex;

      const curRank = getItemRank(topicIndex, itemType, slideIndex, topics);
      const furRank = getItemRank(cur.furthestTopicIndex, cur.furthestItemType, cur.furthestSlideIndex, topics);

      if (topicIndex > cur.furthestTopicIndex) {
        newFurthestTopic = topicIndex;
        newFurthestItemType = itemType;
        newFurthestSlide = slideIndex;
      } else if (topicIndex === cur.furthestTopicIndex) {
        if (curRank > furRank) {
          newFurthestItemType = itemType;
          newFurthestSlide = slideIndex;
        }
      }

      return {
        ...state,
        m4State: {
          ...cur,
          currentTopicIndex: topicIndex,
          currentItemType: itemType,
          currentSlideIndex: slideIndex,
          furthestTopicIndex: newFurthestTopic,
          furthestItemType: newFurthestItemType,
          furthestSlideIndex: newFurthestSlide,
          completedItemIds: newCompleted
        }
      };
    }

    case 'PROGRESS/RETURN_TO_FURTHEST': {
      return {
        ...state,
        m4State: {
          ...state.m4State,
          currentTopicIndex: state.m4State.furthestTopicIndex,
          currentItemType: state.m4State.furthestItemType,
          currentSlideIndex: state.m4State.furthestSlideIndex
        }
      };
    }

    case 'PROGRESS/COMPLETE_M0_MODULE': {
      return {
        ...state,
        completedModules: state.completedModules.includes('m0')
          ? state.completedModules
          : [...state.completedModules, 'm0'],
        unlockedModules: state.unlockedModules.includes('m1')
          ? state.unlockedModules
          : [...state.unlockedModules, 'm1']
      };
    }

    case 'PROGRESS/NAVIGATE_M1_ITEM': {
      const { topicIndex, itemType, slideIndex = 0, topics = [] } = action.payload || {};
      const cur = state.m1State || {
        currentTopicIndex: 0,
        currentItemType: 'slide',
        currentSlideIndex: 0,
        furthestTopicIndex: 0,
        furthestItemType: 'slide',
        furthestSlideIndex: 0,
        completedItemIds: [],
        passedLabIds: []
      };
      let newCompleted = [...cur.completedItemIds];

      let currentKey = '';
      if (itemType === 'briefing') {
        currentKey = `m1-t${topicIndex + 1}-briefing`;
      } else if (itemType === 'slide') {
        const slide = topics[topicIndex]?.slides?.[slideIndex];
        if (slide) currentKey = slide.id;
      }

      if (currentKey && !newCompleted.includes(currentKey)) {
        newCompleted.push(currentKey);
      }

      let newFurthestTopic = Math.max(cur.furthestTopicIndex, topicIndex);
      let newFurthestItemType = cur.furthestItemType;
      let newFurthestSlide = cur.furthestSlideIndex;

      if (topicIndex > cur.furthestTopicIndex) {
        newFurthestTopic = topicIndex;
        newFurthestItemType = itemType;
        newFurthestSlide = slideIndex;
      } else if (topicIndex === cur.furthestTopicIndex) {
        const curRank = itemType === 'slide' ? slideIndex : (itemType === 'briefing' ? (topics[topicIndex]?.slides?.length || 1) : 99);
        const furRank = cur.furthestItemType === 'slide' ? cur.furthestSlideIndex : (cur.furthestItemType === 'briefing' ? (topics[topicIndex]?.slides?.length || 1) : 99);
        if (curRank > furRank) {
          newFurthestItemType = itemType;
          newFurthestSlide = slideIndex;
        }
      }

      return {
        ...state,
        m1State: {
          ...cur,
          currentTopicIndex: topicIndex,
          currentItemType: itemType,
          currentSlideIndex: slideIndex,
          furthestTopicIndex: newFurthestTopic,
          furthestItemType: newFurthestItemType,
          furthestSlideIndex: newFurthestSlide,
          completedItemIds: newCompleted
        }
      };
    }

    case 'PROGRESS/RETURN_TO_FURTHEST_M1': {
      return {
        ...state,
        m1State: {
          ...state.m1State,
          currentTopicIndex: state.m1State.furthestTopicIndex,
          currentItemType: state.m1State.furthestItemType,
          currentSlideIndex: state.m1State.furthestSlideIndex
        }
      };
    }

    case 'PROGRESS/COMPLETE_M1_MODULE': {
      return {
        ...state,
        completedModules: state.completedModules.includes('m1')
          ? state.completedModules
          : [...state.completedModules, 'm1'],
        unlockedModules: state.unlockedModules.includes('m2')
          ? state.unlockedModules
          : [...state.unlockedModules, 'm2']
      };
    }

    case 'PROGRESS/COMPLETE_M4_MODULE': {
      return {
        ...state,
        completedModules: state.completedModules.includes('m4')
          ? state.completedModules
          : [...state.completedModules, 'm4'],
        unlockedModules: state.unlockedModules.includes('m5')
          ? state.unlockedModules
          : [...state.unlockedModules, 'm5']
      };
    }

    default:
      return state;
  }
};
