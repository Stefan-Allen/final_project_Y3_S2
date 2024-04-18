'use client'
import {useEffect, useState, useCallback, useMemo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLightbulb} from '@fortawesome/free-solid-svg-icons';
import styles from "./page.module.css";
import Link from 'next/link';

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState<string[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                setDarkMode(true);
            }
        }
    }, []);

    const toggleDarkMode = useCallback(() => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
        }

        const message = newMode ? 'Dark mode enabled!' : 'Light mode enabled!';
        setNotifications([message, ...notifications]);
    }, [darkMode, notifications]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const color = useMemo(() => darkMode ? "white" : "black", [darkMode]);

    return (
        <main className={`${styles.main} ${darkMode ? 'dark' : ''}`}>
            <div className={styles.navbar}>
                <Link href="/">
                    <div className={styles.logo}>EcoApplication</div>
                </Link>

                <Link href="/">
                    <div className={styles.coordinates}>Coordinates Locator</div>
                </Link>
                <Link href="/">
                    <div className={styles.Auth}>Login</div>
                </Link>
                <button className={`${styles.toggle}`} onClick={toggleDarkMode}>
                    <FontAwesomeIcon icon={faLightbulb} color={color}/>
                </button>
            </div>
        </main>
    );
}