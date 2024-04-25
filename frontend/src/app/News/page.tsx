"use client"
import React from 'react';
import {DarkModeProvider} from '@/Components/NavBar/DarkModeProvider';
import Navbar from "@/Components/NavBar/Navbar";
import News from "@/Components/NewsOutlet/News";

const MyComponent: React.FC = () => {
    return (
        <DarkModeProvider>
            <div>
                <Navbar/>
                <News/>
            </div>
        </DarkModeProvider>
    );
}

export default MyComponent;