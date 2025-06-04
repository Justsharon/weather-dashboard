import axios from 'axios';
import type { WeatherData, WeatherForecastData } from '../types';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const MAP_URL = import.meta.env.VITE_MAP_URL

export const getWeather = async (city: string = "dublin"): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Weather API error:', error.response); // Add this line
      throw new Error(error.response?.data.message || 'Failed to fetch weather data');
    }
    throw error;
  }
};

export const getWeatherFiveDayForecast = async (city:string = "dublin"): Promise<WeatherForecastData>  => {
  try {
    const response = await axios.get(`${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Weather API error:', error.response); // Add this line
      throw new Error(error.response?.data.message || 'Failed to fetch weather data');
    }
    throw error;
  }
}

export const getMaps = async (layer: string, y: string, x: string, z: string) => {
  try {
    const response = await axios.get(`${MAP_URL}/${layer}/${z}/${x}/${y}.png?appid=${API_KEY}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Weather API error:', error.response); // Add this line
      throw new Error(error.response?.data.message || 'Failed to fetch weather data');
    }
    throw error;
  }
}