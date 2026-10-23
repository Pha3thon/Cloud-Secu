/**
 * Authentication Slice
 * Manages trainee and administrator session state.
 */

// TODO: connect real backend

export const INITIAL_AUTH_STATE = {
  user: null // { username: string, name: string, role: 'student' | 'admin', avatar: string }
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH/LOGIN': {
      const { username, password } = action.payload || {};
      const trimmedUser = (username || '').trim().toLowerCase();
      const trimmedPass = (password || '').trim();

      if (trimmedUser === 'admin' && (trimmedPass === 'admin@cdac' || trimmedPass === 'admin')) {
        return {
          ...state,
          user: {
            username: 'admin',
            name: 'CDAC Administrator',
            role: 'admin',
            avatar: 'AD'
          },
          currentView: 'admin-dashboard'
        };
      }

      return {
        ...state,
        user: {
          username: username.trim() || 'student',
          name: 'Trainee Cloud Engineer',
          role: 'student',
          avatar: 'TR'
        },
        currentView: 'dashboard'
      };
    }

    case 'AUTH/LOGOUT': {
      return {
        ...state,
        user: null,
        currentView: 'login'
      };
    }

    default:
      return state;
  }
};
