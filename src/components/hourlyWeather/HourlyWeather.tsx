// HourlyWeather.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchForecastWeatherData } from "../../Redux/forecastWeatherSlice/forecastWeatherSlice";
import styles from "./HourlyWeather.module.scss";

interface HourlyWeatherProps {
  params: any;
}

const HourlyWeather: React.FC<HourlyWeatherProps> = ({ params }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const data = useSelector((state: any) => state.forecastWeatherSlice?.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchForecastWeatherData(params));
      } catch (error) {
        console.error("Error fetching hourly weather data:", error);
      }
    };

    fetchData();
  }, [dispatch, params]);

  const filterTodayData = () => {
    if (data) {
      const currentDate = new Date().toLocaleDateString();
      return data.list.filter((entry: any) => {
        const entryDate = new Date(entry.dt_txt).toLocaleDateString();
        return currentDate === entryDate;
      });
    }
    return [];
  };
  const filteredData = filterTodayData();

  return (
    <div className={styles.hourlyWeather}>
      <h2>Hourly Weather Component</h2>
      <div className={styles.hourlyWeatherBlock}>
        {filteredData.map((entry: any) => (
          <div className={styles.hourlyEntry} key={entry.dt}>
            <p>Time: {new Date(entry.dt_txt).toLocaleTimeString()}</p>
            <p>Temperature: {entry.main.temp}°</p>
            <p>Weather: {entry.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${entry?.weather[0]?.icon}.png`}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyWeather;
