"use client"
import React from 'react';
import Navbar from "@/Components/NavBar/Navbar";
import HourlyWeather from "@/Components/WeatherSection/HourlyWeather/HourlyWeather";
import {DarkModeProvider} from '@/Components/NavBar/DarkModeProvider';

export default function WeatherSection() {
    return (
        <DarkModeProvider>
            <Navbar/>
            <HourlyWeather/>
        </DarkModeProvider>
    );
}