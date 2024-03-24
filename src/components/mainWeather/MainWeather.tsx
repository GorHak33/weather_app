import React from "react";
import styles from "./MainWeather.module.scss";
import { useSelector } from "react-redux";

const MainWeather: React.FC = () => {
  const weatherData = useSelector((state: any) => state.currentWeather?.data);
  console.log(weatherData);
  const src = `https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}.png`;

  return (
    <div className={styles.mainWeather}>
      <div className={styles.weatherBox}>
        <h1>{weatherData?.name}</h1>
        <h1>Temparture: {weatherData?.main?.temp}°</h1>
        {/* <img src={weatherData?.weather[0]?.icon} alt="" /> */}
        <img src={src} alt="" />
        <h2>{weatherData?.weather[0].main}</h2>
      </div>
    </div>
  );
};

export default MainWeather;
