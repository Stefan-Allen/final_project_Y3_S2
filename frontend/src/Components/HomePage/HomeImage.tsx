import React from 'react';
import styles from '../../app/page.module.css';

const HomeImage: React.FC = () => {
    return (
        <div className={`${styles.homePage} ${styles.noScroll}`}>
            <div className={styles.heroSection}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h1 className={styles.mainHeading}>Pollution tracker for the internet</h1>
                    <div className={styles.blackSquare}>
                        <img src="/AirQuality.png" alt="placeholder" width={900}/>
                    </div>
                </div>
                <p className={styles.mainContentSection}>The Pollution Tracker is a user-friendly application that
                    provides real-time environmental pollution updates. It offers an intuitive interface, detailed
                    pollutant reports, and a feature for users to report pollution incidents.</p>
            </div>
        </div>
    );
}

export default HomeImage;