"use client"
import React from 'react';
import Navbar from "@/Components/NavBar/Navbar";
import styles from "../../app/page.module.css";

const BasicPage: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <div className={styles.content}>
                <h1 className={styles.content1}>Welcome to EnviroCare Education.</h1>
                <p className={styles.content2}>Start your learning journey now!</p>
                <a className={styles.buttonQuiz} href="/Education/Quizzes">
                    <div className={styles.roundedbutton}>Quizzes</div>
                </a>
                <a className={styles.buttonQuiz} href="/Education/Articles">
                    <div className={styles.roundedbutton}>Articles</div>
                </a>
            </div>
        </div>
    );
};

export default BasicPage;