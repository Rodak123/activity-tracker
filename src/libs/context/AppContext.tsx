import { createContext } from 'react';
import type { AppState } from '../types/appState';
import type { ActivityId } from '../types/activity';

interface AppContextType extends AppState {
    changeActivity: (id: ActivityId) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

