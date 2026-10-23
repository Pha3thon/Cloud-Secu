/**
 * Kali Session State Slice
 * Manages simulated Kali desktop session, open windows, files, and browser history.
 */

export const INITIAL_KALI_STATE = {
  activeWindow: 'firefox', // 'firefox' | 'files' | null
  isMaximized: false,
  firefoxUrl: 'http://horizon.quickmart.lab/dashboard',
  activeTabId: 'tab-1'
};

export const kaliReducer = (state, action) => {
  switch (action.type) {
    case 'KALI/SET_WINDOW': {
      return {
        ...state,
        kaliSession: {
          ...(state.kaliSession || INITIAL_KALI_STATE),
          activeWindow: action.payload
        }
      };
    }

    case 'KALI/SET_FIREFOX_URL': {
      return {
        ...state,
        kaliSession: {
          ...(state.kaliSession || INITIAL_KALI_STATE),
          firefoxUrl: action.payload
        }
      };
    }

    default:
      return state;
  }
};
