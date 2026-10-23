/**
 * useStore Hook
 * Exposes root store context values and dispatch actions.
 */

import { useContext } from 'react';
import { StoreContext } from '@/state/store';

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

// Backwards compatibility alias for components written with useCourse
export const useCourse = useStore;

export default useStore;
