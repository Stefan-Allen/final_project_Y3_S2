"use client"
import {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLightbulb} from '@fortawesome/free-solid-svg-icons';
import styles from "./page.module.css";
import Link from 'next/link';

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState<string[]>([]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');

        const message = newMode ? 'Dark mode enabled!' : 'Light mode enabled!';
        setNotifications([message, ...notifications]);
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <main className={`${styles.main} ${darkMode ? 'dark' : ''}`}>
            <div className={styles.navbar}>
                <Link href="/">
                    <div className={styles.logo}>EcoApplication</div>
                </Link>

                <button className={`${styles.toggle}`} onClick={toggleDarkMode}>
                    <FontAwesomeIcon icon={faLightbulb} color={darkMode ? "white" : "black"}/>
                </button>
            </div>
        </main>
    );
}