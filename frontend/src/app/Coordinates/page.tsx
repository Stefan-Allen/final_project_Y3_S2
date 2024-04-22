"use client"
import React, {useState} from 'react';
import Navbar from "@/Components/NavBar/Navbar";
import Coordinates from "@/Components/CoordinatesLocator/Coordinates/Coordinates";
import MapComponent from "@/Components/CoordinatesLocator/CorrdinatesMap/MapComponent";
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
                    <Coordinates selectedCoordinates={selectedCoordinates}
                                 setSelectedCoordinates={setSelectedCoordinates}/>
                    <MapComponent selectedCoordinates={selectedCoordinates}
                                  setSelectedCoordinates={setSelectedCoordinates}/>
                </div>
            </DarkModeProvider>
        </>
    );
}