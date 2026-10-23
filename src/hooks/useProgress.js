/**
 * useProgress Hook
 * Focused hook for tracking curriculum progress and navigating course items.
 */

import { useStore } from './useStore';

export const useProgress = () => {
  const {
    completedModules,
    unlockedModules,
    m4State,
    navigateToM4Item,
    returnToFurthestPoint,
    isItemCompleted,
    isItemLocked,
    completeM4Module,
    resetCourse
  } = useStore();

  return {
    completedModules,
    unlockedModules,
    m4State,
    currentTopicIndex: m4State.currentTopicIndex,
    currentItemType: m4State.currentItemType,
    currentSlideIndex: m4State.currentSlideIndex,
    furthestTopicIndex: m4State.furthestTopicIndex,
    furthestItemType: m4State.furthestItemType,
    furthestSlideIndex: m4State.furthestSlideIndex,
    completedItemIds: m4State.completedItemIds,
    passedLabIds: m4State.passedLabIds,
    navigateToM4Item,
    returnToFurthestPoint,
    isItemCompleted,
    isItemLocked,
    completeM4Module,
    resetCourse
  };
};

export default useProgress;
