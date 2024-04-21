"use client"
import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "../../../app/page.module.css";

type Forecast = {
    dt: number;
    weather: Array<{ icon: string; description: string }>;
    main: { temp: number }; // Add the 'main' property
};

const WeatherApp: React.FC = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [weatherData, setWeatherData] = useState<{ list: Forecast[] } | null>(null);
    const [selectedDay, setSelectedDay] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (Error) => {
                console.error('Error getting geolocation:', Error);
                setError(Error.message);
            }
        );
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=e2dd4710354c781842af884f78b675c0`)
                .then(response => setWeatherData(response.data))
                .catch(Error => {
                    console.error('Error fetching weather data:', Error);
                    setError(Error.message);
                });
        }
    }, [latitude, longitude]);

    const handleDayChange = (increment: number) => setSelectedDay(selectedDay + increment);

    const handlePrevDay = () => handleDayChange(-1); // Define 'handlePrevDay'
    const handleNextDay = () => handleDayChange(1); // Define 'handleNextDay'

    const formatTime = (timestamp: number) => new Date(timestamp * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });


    const kelvinToCelsius = (kelvin: number) => kelvin - 273.15; // Define 'kelvinToCelsius'

    const getDailyWeather = () => {
        if (weatherData && weatherData.list[selectedDay]) {
            const selectedDate = new Date(weatherData.list[selectedDay].dt * 1000).getDate();
            return weatherData.list.filter(
                (forecast: Forecast) => new Date(forecast.dt * 1000).getDate() === selectedDate
            );
        }
        return [];
    };


    return (
        <div className={`${styles["weather-app"]} `}>
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