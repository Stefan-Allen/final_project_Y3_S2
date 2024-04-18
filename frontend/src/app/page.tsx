import {getServerSideProps as getWeatherData } from "../Components/HourlyWeather/WeatherApi";
import HourlyWeather, {WeatherAppProps} from "../Components/HourlyWeather/HourlyWeather";
import Navbar from "@/Components/NavBar/navbar";


const HomePage: React.FC<WeatherAppProps> = ({ latitude, longitude, weatherData, error }) => {
  // You can use the fetched data here...
  return (
    <div>
        <Navbar/>
      <HourlyWeather
          latitude={latitude}
          longitude={longitude}
          weatherData={weatherData}
          error={error}
      />
    </div>
  );
};

export { getWeatherData as getServerSideProps };

export default HomePage;