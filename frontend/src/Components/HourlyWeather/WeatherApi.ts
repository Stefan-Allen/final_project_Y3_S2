import { GetServerSidePropsContext } from "next";
import axios from "axios";

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    console.log('getServerSideProps is being called');
    // Get latitude and longitude from the query parameters
    const latitude = parseFloat(context.query.latitude as string);
    const longitude = parseFloat(context.query.longitude as string);

    let weatherData = null;
    let error = null;
    if (latitude && longitude) {
        try {
            console.log(process.env.REACT_APP_WEATHER_API_KEY)
            console.log(process.env)
            console.log("hello")
            const response = await axios.get<WeatherData>(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
            );
            weatherData = response.data;
        } catch (err) {
            error = 'Error fetching weather data. Please try again later.';
        }
    }

    return {
        props: {
            latitude,
            longitude,
            weatherData,
            error,
        },
    };
};