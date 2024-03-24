// DailyWeather.tsx
import React from "react";
import styles from "./DailyWeather.module.scss";
import { useSelector } from "react-redux";

const DailyWeather: React.FC = () => {
  const data = useSelector((state: any) => state.forecastWeatherSlice?.data);

  const groupDataByDay = () => {
    if (!data) return {};

    return data.list.reduce((groupedData: any, entry: any) => {
      const date = new Date(entry.dt_txt).toLocaleDateString();
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(entry);
      return groupedData;
    }, {});
  };

  const renderDailyWeather = () => {
    const groupedData = groupDataByDay();

    return Object.keys(groupedData).map((date: string) => {
      const temperature = groupedData[date][0].main.temp;

      return (
        <div key={date} className={styles.dailyBox}>
          <h1>{date}</h1>
          <h2>Temparture: {temperature}°</h2>
        </div>
      );
    });
  };

  return <div className={styles.dailyWeather}>{renderDailyWeather()}</div>;
};

export default DailyWeather;
