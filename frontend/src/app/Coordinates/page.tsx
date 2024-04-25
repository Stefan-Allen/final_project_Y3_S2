"use client"
import React from 'react';
import CorrdinateLocator from "@/Components/CoordinatesLocator/Coordinates/CorrdinateLocator";
import Navbar from "@/Components/NavBar/Navbar";
import { DarkModeProvider } from '../../Components/NavBar/DarkModeProvider'; // replace with the actual path to DarkModeProvider

const CoordinatesPage: React.FC = () => {
    return (
        <DarkModeProvider>

                <Navbar/>
                <CorrdinateLocator/>

        </DarkModeProvider>
    );
};

export default CoordinatesPage;