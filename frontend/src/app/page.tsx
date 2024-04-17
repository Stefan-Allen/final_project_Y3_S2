'use client'
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from "./page.module.css";
import Navbar from "../Components/NavBar/navbar";

interface WeatherData {
    list: {
        dt: number;
        main: {
            temp: number;
        };
        weather: {
            description: string;
            icon: string;
        }[];
    }[];
}

const WeatherApp: React.FC = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<number>(0); // Selected day index

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                if (latitude && longitude) {
                    const response = await axios.get<WeatherData>(
                        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=289920f16647a4382e9f290b6771c30c`
                    );
                    setWeatherData(response.data);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setError('Error fetching weather data. Please try again later.');
            }
        };

        if (latitude !== null && longitude !== null) {
            fetchWeatherData();
        }
    }, [latitude, longitude]);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                    },
                    (error) => {
                        console.error('Error getting geolocation:', error);
                        setError('Error getting geolocation. Please enter latitude and longitude manually.');
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
                setError('Geolocation is not supported by this browser. Please enter latitude and longitude manually.');
            }
        };

        getLocation();
    }, []);

    const kelvinToCelsius = (kelvin: number) => {
        return kelvin - 273.15;
    };

    const formatDate = (timestamp: number): string => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-UK', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
    };

    const formatTime = (timestamp: number): string => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
    };

    const handlePrevDay = () => {
        if (selectedDay > 0) {
            setSelectedDay(selectedDay - 1);
        }
    };

    const handleNextDay = () => {
        if (selectedDay < weatherData!.list.length - 1) {
            setSelectedDay(selectedDay + 1);
        }
    };

    const getDailyWeather = () => {
        const selectedDate = new Date(weatherData!.list[selectedDay].dt * 1000).getDate();
        return weatherData!.list.filter(
            forecast => new Date(forecast.dt * 1000).getDate() === selectedDate
        );
    };

    return (
        <div className={`${styles["weather-app"]} `}>
            <Navbar/>
            <div className={styles["weather-container"]}>
                {error && <p>{error}</p>}
                {weatherData && (
                    <>
                        <h2 className={styles["app-title"]}>Weather Forecast</h2>
                        <div className={styles["day-navigation"]}>
                            <button onClick={handlePrevDay} disabled={selectedDay === 0}>
                                &lt; Prev
                            </button>
                            <div className={styles["selected-day"]}>
                                <p>{formatDate(weatherData.list[selectedDay].dt)}</p>
                                <p>{kelvinToCelsius(weatherData.list[selectedDay].main.temp).toFixed(1)}°C</p>
                                <p className={styles.time}>{formatTime(weatherData.list[selectedDay].dt)}</p>
                            </div>
                            <div className={styles["button-container"]}>
                                <button onClick={handleNextDay} disabled={selectedDay === weatherData.list.length - 1}>
                                    Next &gt;
                                </button>
                            </div>
                        </div>
                        <div className={styles["selected-day-info"]}>
                            <h3 className={styles["selected-day-title"]}>3 Hourly Weather</h3>
                            <div className={`${styles["hourly-weather"]}`}>
                                {getDailyWeather().map((forecast, index) => (
                                    <div key={index} className={styles["hourly-forecast"]}>
                                        <p>{new Date(forecast.dt * 1000).toLocaleTimeString([], {
                                            hour: 'numeric',
                                            minute: '2-digit'
                                        })}</p>
                                        <img
                                            className={styles["weather-icon"]}
                                            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                            alt={forecast.weather[0].description}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </>
                )}
            </div>
        </div>
    );
};

export default WeatherApp;
