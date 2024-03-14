import React, {createContext, useEffect, useState} from 'react';

interface Theme {
    [key: string]: Record<string, string>;
}

interface CustomThemeProviderProps {
    children: React.ReactNode;
}

const ThemeContext = createContext<{ theme: Theme }>({theme: {} as Theme}),
    THEME_CONFIG = require("../config/theme.config.json");

const ThemeProvider: React.FC<CustomThemeProviderProps> = ({children}: CustomThemeProviderProps): JSX.Element => {
    const [theme, setTheme] = useState<Theme>(getCurrentTheme());

    useEffect(() => {
        const setCurrentTheme = (): void => setTheme(getCurrentTheme());

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setCurrentTheme);
        return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', setCurrentTheme);
    }, []);

    return <ThemeContext.Provider value={{theme}}>{children}</ThemeContext.Provider>;
};

const getCurrentTheme = (): Theme => {
    const themeName = isDarkMode() ? 'dark' : 'normal';

    return {...THEME_CONFIG[themeName], theme: {themeName}} as Theme;
};

const isDarkMode = (): boolean => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export {ThemeProvider, ThemeContext};
