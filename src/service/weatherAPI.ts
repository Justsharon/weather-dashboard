import axios from "axios";
import type { WeatherData, WeatherForecastData } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const MAP_URL = import.meta.env.VITE_MAP_URL;
const GEO_URL = import.meta.env.VITE_GEOCODE_URL;

export const getWeather = async (
  city: string = "dublin"
): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Weather API error:", error.response);
      throw new Error(
        error.response?.data.message || "Failed to fetch weather data"
      );
    }
    throw error;
  }
};

export const getWeatherFiveDayForecast = async (
  city: string = "dublin"
): Promise<WeatherForecastData> => {
  try {
    const response = await axios.get(
      `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Weather API error:", error.response);
      throw new Error(
        error.response?.data.message || "Failed to fetch weather data"
      );
    }
    throw error;
  }
};

export const getMaps = async (
  layer: string,
  y: string,
  x: string,
  z: string
) => {
  try {
    const response = await axios.get(
      `${MAP_URL}/${layer}/${z}/${x}/${y}.png?appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Weather API error:", error.response);
      throw new Error(
        error.response?.data.message || "Failed to fetch weather data"
      );
    }
    throw error;
  }
};

export const getAirQuality = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Weather API error:", error.response);
      throw new Error(
        error.response?.data.message || "Failed to fetch air quality data"
      );
    }
    throw error;
  }
};

export const getCityCoordinates = async (city: string) => {
  try {
    const response = await axios.get(
      `${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const data = response.data;
    if (!data || data.length === 0) {
      throw new Error("No results found for city");
    }

    const { lat, lon } = data[0];
    return { lat, lon };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Weather API error:", error.response);
      throw new Error(error.response?.data.message || "Failed to geo code");
    }
    throw error;
  }
};
