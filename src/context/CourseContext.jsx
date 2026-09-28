import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext(null);

const STORAGE_KEY = 'cloudsec_academy_state_v1';

const INITIAL_STATE = {
  user: null, // { username: 'student', name: 'Cloud Intern' }
  completedModules: [],
  unlockedModules: ['m4'], // M4 is the unlocked demo module
  currentView: 'login', // 'login' | 'dashboard' | 'curriculum' | 'module-m4'
  slideProgress: {
    m4: {
      currentSlide: 1,
      maxSlideVisited: 1,
      completed: false
    }
  },
  labProgress: {
    m4: {
      isLaunched: false,
      isRunning: false,
      startTime: null,
      elapsedSeconds: 0,
      activeTaskId: 'task-1',
      completedTasks: [],
      answers: {},
      isCompleted: false
    }
  }
};

export const CourseProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure initial unlocked modules include m4
        if (!parsed.unlockedModules?.includes('m4')) {
          parsed.unlockedModules = ['m4', ...(parsed.unlockedModules || [])];
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    }
    return INITIAL_STATE;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [state]);

  // Lab timer effect
  useEffect(() => {
    let interval = null;
    if (state.labProgress?.m4?.isRunning) {
      interval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          labProgress: {
            ...prev.labProgress,
            m4: {
              ...prev.labProgress.m4,
              elapsedSeconds: (prev.labProgress.m4.elapsedSeconds || 0) + 1
            }
          }
        }));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.labProgress?.m4?.isRunning]);

  // // TODO: connect real backend authentication
  const login = (username, _password) => {
    const userObj = {
      username: username.trim() || 'student',
      name: 'Cloud Intern',
      role: 'Student Trainee',
      avatar: 'CI'
    };
    setState((prev) => ({
      ...prev,
      user: userObj,
      currentView: 'dashboard'
    }));
    return true;
  };

  const logout = () => {
    setState((prev) => ({
      ...prev,
      user: null,
      currentView: 'login'
    }));
  };

  const navigateTo = (view) => {
    setState((prev) => ({
      ...prev,
      currentView: view
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update slide visited progress
  const updateSlideVisited = (moduleId, slideNumber, totalSlides) => {
    setState((prev) => {
      const moduleSlideState = prev.slideProgress[moduleId] || {
        currentSlide: 1,
        maxSlideVisited: 1,
        completed: false
      };

      const newMax = Math.max(moduleSlideState.maxSlideVisited, slideNumber);
      const isCompleted = newMax >= totalSlides || moduleSlideState.completed;

      return {
        ...prev,
        slideProgress: {
          ...prev.slideProgress,
          [moduleId]: {
            ...moduleSlideState,
            currentSlide: slideNumber,
            maxSlideVisited: newMax,
            completed: isCompleted
          }
        }
      };
    });
  };

  // Mark theory slides completed
  const markSlidesCompleted = (moduleId) => {
    setState((prev) => ({
      ...prev,
      slideProgress: {
        ...prev.slideProgress,
        [moduleId]: {
          ...(prev.slideProgress[moduleId] || {}),
          completed: true
        }
      }
    }));
  };

  // // TODO: connect real lab provisioning API
  const startLab = (moduleId) => {
    setState((prev) => ({
      ...prev,
      labProgress: {
        ...prev.labProgress,
        [moduleId]: {
          ...(prev.labProgress[moduleId] || {}),
          isLaunched: true,
          isRunning: true,
          startTime: Date.now()
        }
      }
    }));
  };

  const endLab = (moduleId) => {
    setState((prev) => ({
      ...prev,
      labProgress: {
        ...prev.labProgress,
        [moduleId]: {
          ...(prev.labProgress[moduleId] || {}),
          isRunning: false
        }
      }
    }));
  };

  // Submit and validate answer for a task
  const submitTaskAnswer = (moduleId, taskId, answer, correctAnswers, nextTaskId) => {
    const cleanAnswer = answer.trim().toLowerCase();
    const isCorrect = correctAnswers.some(
      (valid) => valid.toLowerCase() === cleanAnswer
    );

    if (isCorrect) {
      setState((prev) => {
        const currentLab = prev.labProgress[moduleId] || {
          completedTasks: [],
          answers: {}
        };

        const alreadyCompleted = currentLab.completedTasks.includes(taskId);
        const newCompletedTasks = alreadyCompleted
          ? currentLab.completedTasks
          : [...currentLab.completedTasks, taskId];

        return {
          ...prev,
          labProgress: {
            ...prev.labProgress,
            [moduleId]: {
              ...currentLab,
              completedTasks: newCompletedTasks,
              answers: {
                ...currentLab.answers,
                [taskId]: answer
              },
              activeTaskId: nextTaskId || currentLab.activeTaskId
            }
          }
        };
      });
      return { success: true };
    }

    return {
      success: false,
      message: 'Not quite — check your configuration and try again.'
    };
  };

  // Mark entire module complete -> unlocks next module (e.g. M5)
  const completeModule = (moduleId, nextModuleId = 'm5') => {
    setState((prev) => {
      const completedModules = prev.completedModules.includes(moduleId)
        ? prev.completedModules
        : [...prev.completedModules, moduleId];

      const unlockedModules = prev.unlockedModules.includes(nextModuleId)
        ? prev.unlockedModules
        : [...prev.unlockedModules, nextModuleId];

      return {
        ...prev,
        completedModules,
        unlockedModules,
        labProgress: {
          ...prev.labProgress,
          [moduleId]: {
            ...(prev.labProgress[moduleId] || {}),
            isCompleted: true
          }
        }
      };
    });
  };

  // Reset entire state to default for testing/grading demo
  const resetDemoState = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(INITIAL_STATE);
  };

  return (
    <CourseContext.Provider
      value={{
        ...state,
        login,
        logout,
        navigateTo,
        updateSlideVisited,
        markSlidesCompleted,
        startLab,
        endLab,
        submitTaskAnswer,
        completeModule,
        resetDemoState
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
