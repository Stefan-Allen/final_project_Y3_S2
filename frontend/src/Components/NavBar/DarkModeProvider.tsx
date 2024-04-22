import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import DarkModeContext from './DarkModeContext';

interface DarkModeProviderProps {
    children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({children}) => {
    const savedTheme = localStorage.getItem('theme');
    const [darkMode, setDarkMode] = useState(savedTheme === 'dark');

    const toggleDarkMode = useCallback(() => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        document.documentElement.classList.add('light');
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    return (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
};