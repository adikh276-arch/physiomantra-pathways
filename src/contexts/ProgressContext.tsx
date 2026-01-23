import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface PathwayProgress {
  [key: string]: boolean;
}

export interface ProgressState {
  // Layer 0: Intern Track (Parallel)
  layer0: {
    welcome: boolean;
    verification: boolean;
    howItWorks: boolean;
    earnings: boolean;
  };
  // Layer 1: Foundation
  layer1: {
    welcome: boolean;
    verification: boolean;
    howItWorks: boolean;
    clinicalTools: boolean;
    earnings: boolean;
  };
  // Layer 2: Earnings & Patient Flow
  layer2: {
    gettingPatients: boolean;
    bringPatients: boolean;
    professionalIdentity: boolean;
    localAwareness: boolean;
  };
  // Layer 3: Network Expansion
  layer3: {
    invitePhysios: boolean;
    clinicConnection: boolean;
    specialistProfile: boolean;
  };
  // Layer 4: Corporate Growth
  layer4: {
    wellnessPartner: boolean;
    corporateReadiness: boolean;
    shareLeads: boolean;
    assistedOnboarding: boolean;
  };
  // Layer 5: Community (Always Active)
  layer5: {
    community: boolean;
    training: boolean;
    recognition: boolean;
  };
  // Layer 6: Mentorship & Leadership
  layer6: {
    becomeMentor: boolean;
    mentorAssignment: boolean;
    internFeedback: boolean;
    internGraduation: boolean;
  };
  // User preferences
  primaryGoal: string | null;
  userName: string;
}

const initialState: ProgressState = {
  layer0: {
    welcome: false,
    verification: false,
    howItWorks: false,
    earnings: false,
  },
  layer1: {
    welcome: false,
    verification: false,
    howItWorks: false,
    clinicalTools: false,
    earnings: false,
  },
  layer2: {
    gettingPatients: false,
    bringPatients: false,
    professionalIdentity: false,
    localAwareness: false,
  },
  layer3: {
    invitePhysios: false,
    clinicConnection: false,
    specialistProfile: false,
  },
  layer4: {
    wellnessPartner: false,
    corporateReadiness: false,
    shareLeads: false,
    assistedOnboarding: false,
  },
  layer5: {
    community: false,
    training: false,
    recognition: false,
  },
  layer6: {
    becomeMentor: false,
    mentorAssignment: false,
    internFeedback: false,
    internGraduation: false,
  },
  primaryGoal: null,
  userName: 'Anika Sharma',
};

interface ProgressContextType {
  progress: ProgressState;
  completePathway: (layer: keyof Omit<ProgressState, 'primaryGoal' | 'userName'>, pathway: string) => void;
  setPrimaryGoal: (goal: string) => void;
  isLayerComplete: (layer: keyof Omit<ProgressState, 'primaryGoal' | 'userName'>) => boolean;
  isLayerUnlocked: (layer: keyof Omit<ProgressState, 'primaryGoal' | 'userName'>) => boolean;
  getLayerProgress: (layer: keyof Omit<ProgressState, 'primaryGoal' | 'userName'>) => { completed: number; total: number };
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const stored = localStorage.getItem('physiomantra_progress');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge with initialState to ensure new layers are present
        return { ...initialState, ...parsed, layer0: parsed.layer0 || initialState.layer0, layer6: parsed.layer6 || initialState.layer6 };
      } catch (e) {
        return initialState;
      }
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem('physiomantra_progress', JSON.stringify(progress));
  }, [progress]);

  const completePathway = (layer: keyof Omit<ProgressState, 'primaryGoal' | 'userName'>, pathway: string) => {
    setProgress((prev) => ({
      ...prev,
      [layer]: {
        ...prev[layer],
        [pathway]: true,
      },
    }));
  };

  const setPrimaryGoal = (goal: string) => {
    setProgress((prev) => ({ ...prev, primaryGoal: goal }));
  };

  const isLayerComplete = (layer: keyof Omit<ProgressState, 'primaryGoal' | 'userName'>) => {
    const layerData = progress[layer];
    return Object.values(layerData).every((v) => v === true);
  };

  const isLayerUnlocked = (layer: keyof Omit<ProgressState, 'primaryGoal' | 'userName'>) => {
    return true; // All layers unlocked by default
  };

  const getLayerProgress = (layer: keyof Omit<ProgressState, 'primaryGoal' | 'userName'>) => {
    const layerData = progress[layer];
    const values = Object.values(layerData);
    const completed = values.filter((v) => v === true).length;
    return { completed, total: values.length };
  };

  const resetProgress = () => {
    setProgress(initialState);
    localStorage.removeItem('physiomantra_progress');
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        completePathway,
        setPrimaryGoal,
        isLayerComplete,
        isLayerUnlocked,
        getLayerProgress,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
