import React, {useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLightbulb} from '@fortawesome/free-solid-svg-icons';
import styles from "../../app/page.module.css";
import Link from 'next/link';
import DarkModeContext from "@/Components/NavBar/DarkModeContext";

export default function Navbar() {
    const {darkMode, toggleDarkMode} = useContext(DarkModeContext);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    const color = darkMode ? "white" : "black";


    return (
        <div className={styles.navbar}>
            <Link href="/">
                <div className={styles.logo}>EnviroCare</div>
            </Link>
            <Link href="/MapPage">
                <div className={styles.coordinates}>RealTime Data</div>
            </Link>
            <Link href="/WeatherPage">
                <div className={styles.WeatherPage}>Forecast Tracker</div>
            </Link>
            <Link href="/EnviroCareAI">
                <div className={styles.EnviroCareAI}>EnviroCareAI</div>
            </Link>
            <div className={styles.rightItems}>
                <button className={styles.toggle} onClick={toggleDarkMode}>
                    <FontAwesomeIcon icon={faLightbulb} color={darkMode ? "white" : "black"}/>
                </button>
            </div>
        </div>
    );
}