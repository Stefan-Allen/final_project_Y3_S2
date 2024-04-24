import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import DarkModeContext from './DarkModeContext';

interface DarkModeProviderProps {
    children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({children}) => {
    const [darkMode, setDarkMode] = useState(false);
    const [hasThemeLoaded, setHasThemeLoaded] = useState(false);

    const setTheme = (mode: boolean) => {
        setDarkMode(mode);
        if (typeof window !== 'undefined') {
            document.documentElement.classList.add(mode ? 'dark' : 'light');
            document.documentElement.classList.remove(mode ? 'light' : 'dark');
        }
    };

    const toggleDarkMode = useCallback(() => {
        const newMode = !darkMode;
        setTheme(newMode);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
        }
    }, [darkMode]);

    useEffect(() => {
        const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
        const isDarkMode = savedTheme ? savedTheme === 'dark' : false;
        setTheme(isDarkMode);
        setHasThemeLoaded(true);
    }, []);

    if (!hasThemeLoaded) {
        return null;
    }

    return (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
};