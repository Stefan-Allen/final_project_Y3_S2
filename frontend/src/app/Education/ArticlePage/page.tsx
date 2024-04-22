"use client"
import React from 'react';
import Navbar from "@/Components/NavBar/Navbar";
import styles from "../../../app/page.module.css";
import {DarkModeProvider} from '@/Components/NavBar/DarkModeProvider';

const ArticlePage: React.FC = () => {
    return (
        <DarkModeProvider>
            <div>
                <Navbar/>
                <div className={styles.content}>
                    <h1 className={styles.content1}>View the latest articles.</h1>
                    <a href="/Education/ArticleOne">
                        <div className={styles.ArticlePage}>Pollution Crisis: A Call to Action for Environmental
                            Conservation
                        </div>
                    </a>
                    <a href="/Education/ArticleTwo">
                        <div className={styles.ArticlePage}>Reversing the Tide: The Path to a Cleaner Environment</div>
                    </a>
                    <a href="/Education/ArticleThree">
                        <div className={styles.ArticlePage}>The Quest for Environmental Restoration</div>
                    </a>
                </div>
            </div>
        </DarkModeProvider>
    );
};

export default ArticlePage;