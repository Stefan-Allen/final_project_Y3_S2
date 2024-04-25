"use client"
import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "../../../app/page.module.css";

type Forecast = {
    dt: number;
    weather: Array<{ icon: string; description: string }>;
    main: { temp: number };
};

const WeatherApp: React.FC = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [inputLat, setInputLat] = useState('');
    const [inputLng, setInputLng] = useState('');
    const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(false);
    const [weatherData, setWeatherData] = useState<{ list: Forecast[] } | null>(null);
    const [selectedDay, setSelectedDay] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [pollutionData, setPollutionData] = useState<PollutionData | null>(null);


    const handleSetCoordinates = () => {
        setLatitude(parseFloat(inputLat));
        setLongitude(parseFloat(inputLng));
    };

    type PollutionData = {
        index: number;
        category: {
            co: number;
            no: number;
            no2: number;
            o3: number;
            so2: number;
            pm2_5: number;
            pm10: number;
            nh3: number;
        };
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setInputLat(position.coords.latitude.toString());
                setInputLng(position.coords.longitude.toString());
                setIsGeolocationEnabled(true);
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

    useEffect(() => {
        if (latitude && longitude) {
            axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=e2dd4710354c781842af884f78b675c0`)
                .then(response => {
                    const pollution = response.data.list[0];
                    setPollutionData({
                        index: pollution.main.aqi,
                        category: pollution.components
                    });
                })
                .catch(Error => {
                    console.error('Error fetching pollution data:', Error);
                });
        }
    }, [latitude, longitude]);

    const handleDayChange = (increment: number) => setSelectedDay(selectedDay + increment);

    const handlePrevDay = () => handleDayChange(-1);
    const handleNextDay = () => handleDayChange(1);

    const formatTime = (timestamp: number) => new Date(timestamp * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const kelvinToCelsius = (kelvin: number) => kelvin - 273.15;

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
                {error && <p className={styles.geoerror}>{error}</p>}
                {!isGeolocationEnabled && (
                    <div className={styles.geoerrorinput}>
                        <div className={styles["coordinatesinput"]}>
                            <input
                                type="text"
                                value={inputLat}
                                onChange={(e) => setInputLat(e.target.value)}
                                placeholder="Enter Latitude"
                                className={styles.input}
                            />
                            <input
                                type="text"
                                value={inputLng}
                                onChange={(e) => setInputLng(e.target.value)}
                                placeholder="Enter Longitude"
                                className={styles.input}
                            />
                            <button onClick={handleSetCoordinates} className={styles.button}>Set Coordinates</button>
                        </div>
                    </div>
                )}
                {weatherData && (
                    <>
                        <h2 className={styles["app-title"]}>Weather Forecast</h2>
                        <div className={styles["day-navigation"]}>
                            <button className={styles["buttoncontainer"]} onClick={handlePrevDay}
                                    disabled={selectedDay === 0}>
                                &lt; Prev
                            </button>
                            <div className={styles["selected-day"]}>
                                <p>{formatDate(weatherData.list[selectedDay].dt)}</p>
                                <p>{kelvinToCelsius(weatherData.list[selectedDay].main.temp).toFixed(1)}°C</p>
                                <p className={styles.time}>{formatTime(weatherData.list[selectedDay].dt)}</p>
                            </div>
                            <div>
                                <button className={styles["buttoncontainer"]} onClick={handleNextDay}
                                        disabled={selectedDay === weatherData.list.length - 1}>
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
                        {pollutionData && (
                            <div className={styles.weatherpollution}>
                                <h2>Current Pollution Data - Current Air Quality: {pollutionData.index}</h2>
                                <p>0 to 50: Good | 51 to 100: Moderate | 101 to 150: Unhealthy | 151 to 200: Unhealthy |
                                    201 to 300: Very Unhealthy | 301 and higher: Hazardous</p>
                                <h2 className={styles.weathercomponents}>Components:</h2>
                                <p>Carbon Monoxide (CO): {pollutionData.category.co}</p>
                                <p>Nitric Oxide (NO): {pollutionData.category.no}</p>
                                <p>Nitrogen Dioxide (NO2): {pollutionData.category.no2}</p>
                                <p>Ozone (O3): {pollutionData.category.o3}</p>
                                <p>Sulfur Dioxide (SO2): {pollutionData.category.so2}</p>
                                <p>Particulate Matter (PM2.5): {pollutionData.category.pm2_5}</p>
                                <p>Particulate Matter (PM10): {pollutionData.category.pm10}</p>
                                <p>Ammonia (NH3): {pollutionData.category.nh3}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
export default WeatherApp;