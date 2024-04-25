"use client"
import React, {useState} from 'react';
import Navbar from "@/Components/NavBar/Navbar";
import MapComponent from "@/Components/CoordinatesLocator/Map/MapComponent";
import styles from "../page.module.css";
import {DarkModeProvider} from '@/Components/NavBar/DarkModeProvider';

interface Coordinates {
    lat: number;
    lng: number;
}

export default function CoordinatesSection() {
    const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates | null>(null);

    return (
        <>
            <DarkModeProvider>
                <div className={styles.CoordinatesHeight}>
                    <Navbar/>
                    <div className={styles.MapAlign}>
                        <h1 className={styles.mainheading}>RealTime Pollution Map</h1>
                        <h3 className={styles.heading}>Click on any marker to see pollution for that area.</h3></div>

                    <MapComponent/>
                </div>
            </DarkModeProvider>
        </>
    );
}