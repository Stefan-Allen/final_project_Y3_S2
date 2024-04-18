"use client"
import { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import styles from "./page.module.css";
import Link from 'next/link';

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setDarkMode(savedTheme === 'dark');
    }, []);

    const toggleDarkMode = useCallback(() => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const color = darkMode ? "white" : "black";

    return (
        <main className={`${styles.main} ${darkMode ? 'dark' : ''}`}>
            <div className={styles.navbar}>
                <Link href="/"><div className={styles.logo}>EcoApplication</div></Link>
                <Link href="/"><div className={styles.coordinates}>Coordinates Locator</div></Link>
                <div className={styles.rightItems}>
                    <Link href="/"><div className={styles.Auth}>Login</div></Link>
                    <button className={styles.toggle} onClick={toggleDarkMode}>
                        <FontAwesomeIcon icon={faLightbulb} color={color} />
                    </button>
                </div>
            </div>
        </main>
    );
}