import React from 'react';
import styles from "./page.module.css";

export interface WeatherAppProps {
    latitude: number | null;
    longitude: number | null;
    weatherData: WeatherData | null;
    error: string | null;
}

export interface WeatherData {
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

const HourlyWeather: React.FC<WeatherAppProps> = ({ latitude, longitude, weatherData, error }) => {

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

    const getDailyWeather = (selectedDay: number) => {
        if (!weatherData) {
            return [];
        }
        const selectedDate = new Date(weatherData.list[selectedDay].dt * 1000).getDate();
        return weatherData.list.filter(
            forecast => new Date(forecast.dt * 1000).getDate() === selectedDate
        );
    };

    // Use the first day as the selected day
    const selectedDay = 0;
    const dailyWeather = getDailyWeather(selectedDay);

    return (
        <div className={`${styles["weather-app"]} `}>
            <div className={styles["weather-container"]}>
                {error && <p>{error}</p>}
                {weatherData && (
                    <>
                        <h2 className={styles["app-title"]}>Weather Forecast</h2>
                        <div className={styles["day-navigation"]}>
                            <div className={styles["selected-day"]}>
                                <p>{formatDate(weatherData.list[selectedDay].dt)}</p>
                                <p>{kelvinToCelsius(weatherData.list[selectedDay].main.temp).toFixed(1)}°C</p>
                                <p className={styles.time}>{formatTime(weatherData.list[selectedDay].dt)}</p>
                            </div>
                            <div className={styles["button-container"]}>
                            </div>
                        </div>
                        <div className={styles["selected-day-info"]}>
                            <h3 className={styles["selected-day-title"]}>3 Hourly Weather</h3>
                            <div className={`${styles["hourly-weather"]}`}>
                                {dailyWeather.map((forecast: { dt: number; main: { temp: number }; weather: { description: string; icon: string }[] }, index: number) => (
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

export default HourlyWeather;