import { createContext } from 'react';
import type { AppState } from '../types/appState';
import type { Activity, ActivityId } from '../types/activity';

interface AppContextType extends AppState {
    changeActivity: (id: ActivityId) => void;
    resetApp: () => void;
    addActivity: (activity: Activity) => void;
    removeActivity: (id: ActivityId) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

