"use client"
import React from 'react';
import Navbar from "@/Components/NavBar/Navbar";
import styles from "../../app/page.module.css";
import {DarkModeProvider} from '@/Components/NavBar/DarkModeProvider';

const BasicPage: React.FC = () => {
    return (
        <DarkModeProvider>
            <div>
                <Navbar/>
                <div className={styles.content}>
                    <h1 className={styles.content1}>Welcome to EnviroCare Education.</h1>
                    <p className={styles.content2}>Start your learning journey now!</p>
                    <a className={styles.buttonQuiz} href="/Education/Quizzes">
                        <div className={styles.roundedbutton}>Quizzes</div>
                    </a>
                    <a className={styles.buttonQuiz} href="/Education/ArticlePage">
                        <div className={styles.roundedbutton}>Articles</div>
                    </a>
                </div>
            </div>
        </DarkModeProvider>
    );
};

export default BasicPage;