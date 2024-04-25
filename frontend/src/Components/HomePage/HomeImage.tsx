import React from 'react';
import styles from '../../app/page.module.css';
import Link from "next/link";

const HomeImage = () => (
    <div className={`${styles.homePage} ${styles.noScroll}`}>
        <div className={styles.heroSection}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h1 className={styles.mainHeading}>Pollution tracker for the internet</h1>
                <div className={styles.blackSquare}>
                    <img src="/image.png" alt="placeholder" width={800}/>
                </div>
            </div>
            <p className={styles.mainContentSection}>
                The Pollution Tracker is a user-friendly application that provides real-time environmental pollution
                updates.
                It offers an intuitive interface, detailed pollutant updates, and features including artificial
                intelligence and a mapping service.
            </p>
            <div className={styles.HomeButton}>
                <Link className={styles.HomepageButton} href={'MapPage'}>RealTimeData</Link>
                <Link className={styles.HomepageButton} href={'WeatherPage'}>Forecast</Link>
                <Link className={styles.HomepageButton} href={'EnviroCareAI'}>EnviroCareAI</Link>
                <Link className={styles.HomepageButton} href={'MapPage'}>Coordinates</Link>
                <Link className={styles.HomepageButton} href={'MapPage'}>News</Link>
            </div>
        </div>
    </div>
);

export default HomeImage;