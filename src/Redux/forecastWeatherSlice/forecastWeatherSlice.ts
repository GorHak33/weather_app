// hourlyWeatherSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ForecastWeatherState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ForecastWeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherAPIKey = "4f854dff31c2e1ca2516bffdbe8c42c1";
const API_URL = "https://api.openweathermap.org/data/2.5/forecast/?q=";

interface FetchForecastWeatherDataParams {
  location: string;
  unit: string;
}

export const fetchForecastWeatherData = createAsyncThunk(
  "hourlyWeather/fetchHourlyWeatherData",
  async ({ location, unit }: FetchForecastWeatherDataParams) => {
    try {
      const response = await axios.get(
        `${API_URL}${location}&appid=${weatherAPIKey}&units=${unit}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch hourly weather data");
    }
  }
);

const forecastWeatherSlice = createSlice({
  name: "forecastWeather",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchForecastWeatherData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecastWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchForecastWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error =
          action.error.message || "Failed to fetch hourly weather data";
      });
  },
});

export default forecastWeatherSlice.reducer;
