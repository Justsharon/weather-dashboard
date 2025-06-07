import { useEffect, useState } from "react";
import type { WeatherForecastData, WeatherData } from "../types";
import {  getWeather, getWeatherFiveDayForecast } from "../service/weatherAPI";

export const useWeatherData = (city: string = "dublin") => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    searchCity(city);
  }, []);

  const searchCity = async (city: string) => {
    try {
      setIsLoading(true);
      setError("");

      const currentWeather = await getWeather(city);
      const fiveDayForecast = await getWeatherFiveDayForecast(city);

      setWeather(currentWeather)
      setForecast(fiveDayForecast)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setWeather(null);
      setForecast(null);
    }  finally {
      setIsLoading(false);
    }
  };

  return {
    weather, forecast, isLoading, error, searchCity
  }
};
