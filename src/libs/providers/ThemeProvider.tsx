import { useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Themes, type Theme } from '../types/theme';

interface ThemeProviderProps {
    defaultTheme?: Theme;
    themeLSKey?: string;
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme = 'dark', themeLSKey = 'stored-theme' }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedKey = localStorage.getItem(themeLSKey);
        return (storedKey && storedKey in Themes)
            ? Themes[storedKey as keyof typeof Themes]
            : defaultTheme;
    });

    useEffect(() => {
        const body = document.body;
        Object.values(Themes).forEach((val) => body.classList.remove(val));
        body.classList.add(theme);

        const themeKey = Object.entries(Themes).find(([, val]) => val === theme)?.[0];
        if (themeKey) localStorage.setItem(themeLSKey, themeKey);
    }, [theme, themeLSKey]);

    const changeTheme = (theme: Theme) => setTheme(theme);
    const cycleTheme = () => {
        const themes = Object.values(Themes);
        const curent = themes.findIndex((t) => t === theme);
        setTheme(themes[(curent + 1) % themes.length]);
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            changeTheme,
            cycleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
};
