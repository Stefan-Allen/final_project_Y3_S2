import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import DarkModeContext from './DarkModeContext';

interface DarkModeProviderProps {
    children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({children}) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const toggleDarkMode = useCallback(() => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
        }
    }, [darkMode]);

    useEffect(() => {
        let savedTheme: string | null = null;
        if (typeof window !== 'undefined') {
            savedTheme = localStorage.getItem('theme');
        }
        setDarkMode(savedTheme === 'dark');
        document.documentElement.classList.add('light');
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    return (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
};