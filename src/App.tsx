import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "./Redux/CurrentWeatherSlice/currentWeatherSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Search from "./components/Search/Search";
import MainWeather from "./components/mainWeather/MainWeather";
import HourlyWeather from "./components/hourlyWeather/HourlyWeather";
import styles from "./App.module.scss";
import DailyWeather from "./components/dailyWeather/DailyWeather";
import ErrorModal from "./components/ErrorModal/ErrorModal";

function App() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const weatherData = useSelector((state: any) => state.currentWeather?.data);
  const loading = useSelector((state: any) => state.currentWeather?.loading);
  const error = useSelector((state: any) => state.currentWeather?.error);

  const [params, setParams] = useState({
    location: "Yerevan",
    unit: "metric",
  });

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchWeatherData(params))
      .then((response: any) => {
        if (response.error) {
          setShowErrorModal(true);
          setErrorMessage(
            response.error.message || "Failed to fetch weather data"
          );
        }
      })
      .catch((error: any) => {
        console.error("Error fetching weather data:", error);
      });
  }, [dispatch, params]);

  const onSearch = (newLocation: string, propsUnit: string) => {
    setParams({
      location: newLocation || params.location,
      unit: propsUnit || params.unit,
    });
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setErrorMessage(null);
  };

  return (
    <>
      <Search onSearch={onSearch} />
      <div className={styles.container}>
        {loading && <p>Loading...</p>}
        {!loading && error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!loading && !error && weatherData && (
          <>
            <MainWeather />
            <HourlyWeather params={params} />
          </>
        )}
      </div>
      <DailyWeather />

      {showErrorModal && (
        <ErrorModal message={errorMessage} onClose={closeModal} />
      )}
    </>
  );
}

export default App;
