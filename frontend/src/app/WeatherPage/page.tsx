import React from 'react';
import Navbar from "@/Components/NavBar/Navbar";
import HourlyWeather from "@/Components/WeatherSection/HourlyWeather/HourlyWeather";

export default function WeatherSection() {
    return (
        <>
            <Navbar/>
            <HourlyWeather/>

        </>
    );
}