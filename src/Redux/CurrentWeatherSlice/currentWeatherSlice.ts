import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface WeatherState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherAPIKey = "4f854dff31c2e1ca2516bffdbe8c42c1";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

interface FetchWeatherDataParams {
  location: string;
  unit: string;
}

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async ({ location, unit }: FetchWeatherDataParams) => {
    try {
      const response = await axios.get(
        `${API_URL}${location}&appid=${weatherAPIKey}&units=${unit}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch weather data");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeatherData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message || "Failed to fetch weather data";
      });
  },
});

export default weatherSlice.reducer;
