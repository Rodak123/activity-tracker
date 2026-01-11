import { createContext } from 'react';
import type { Theme } from '../types/theme';

interface ThemeContextType {
    theme: Theme;
    changeTheme: (theme: Theme) => void;
    cycleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

