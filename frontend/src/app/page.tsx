"use client"
import React from 'react';
import Navbar from "@/Components/NavBar/Navbar";
import HomeImage from "@/Components/HomePage/HomeImage";
import styles from "./page.module.css";
import {DarkModeProvider} from '../Components/NavBar/DarkModeProvider';

export default function App() {
    return (
        <DarkModeProvider>
            <div className={styles.noScrollY}>
                <Navbar/>
                <HomeImage/>
            </div>
        </DarkModeProvider>
    );
}