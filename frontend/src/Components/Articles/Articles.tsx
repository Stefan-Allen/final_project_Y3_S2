import React from 'react';
import styles from '../../app/page.module.css';
import Link from "next/link";

const Articles: React.FC = () => {
    return (
        <div>
            <Link className={styles.button} href="Article/ArticleOne">
                <div className={styles.roundedbutton}>Pollution Crisis: A Call to Action for Environmental
                    Conservation.
                </div>
            </Link>
            <Link className={styles.button} href="/Article/ArticleTwo">
                <div className={styles.roundedbutton}>Reversing the Tide: The Path to a Cleaner Environment.</div>
            </Link>
            <Link className={styles.button} href="/Article/ArticleThree">
                <div className={styles.roundedbutton}>The Quest for Environmental Restoration.</div>
            </Link>

        </div>
    );
}

export default Articles;