import { configureStore } from "@reduxjs/toolkit";
import currentWeatherSlice from "./CurrentWeatherSlice/currentWeatherSlice";
import forecastWeatherSlice from "./forecastWeatherSlice/forecastWeatherSlice";

const store = configureStore({
  reducer: {
    currentWeather: currentWeatherSlice,
    forecastWeatherSlice: forecastWeatherSlice,
  },
});

export default store;
