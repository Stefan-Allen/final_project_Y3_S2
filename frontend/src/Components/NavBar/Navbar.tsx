"use client"
import React, {useCallback, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLightbulb} from '@fortawesome/free-solid-svg-icons';
import styles from "../../app/page.module.css";
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
                <Link href="/">
                    <div className={styles.logo}>EnviroCare</div>
                </Link>
                <Link href="/Coordinates">
                    <div className={styles.coordinates}>Coordinates Locator</div>
                </Link>
                <Link href="/WeatherPage">
                    <div className={styles.WeatherPage}>Weather Tracker</div>
                </Link>
                <Link href="/RealtimePollution">
                    <div className={styles.RealtimePollution}>Realtime Pollution</div>
                </Link>
                <Link href="/Education">
                    <div className={styles.Education}>Education</div>
                </Link>
                <div className={styles.rightItems}>
                    <Link href="/">
                        <div className={styles.Auth}>Login</div>
                    </Link>
                    <button className={styles.toggle} onClick={toggleDarkMode}>
                        <FontAwesomeIcon icon={faLightbulb} color={color}/>
                    </button>

                </div>
            </div>
        </main>
    );
}