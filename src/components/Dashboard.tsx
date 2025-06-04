import { useEffect, useState } from "react";
import type {
  FavoriteLocation,
  TemperatureUnit,
  WeatherData,
  WeatherForecastData,
} from "../types";
import { getWeather, getWeatherFiveDayForecast } from "../service/weatherAPI";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { getPreferredUnit } from "../utils/storage";
import { useFavorites } from "../hooks/useFavorites";
import ForecastList from "./ForecastList";

export default function Dashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecastData | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { favorites, add, remove, isFavorite } = useFavorites();
  const [unit, setUnit] = useState<TemperatureUnit>(getPreferredUnit());

  useEffect(() => {
    getWeather("dublin").then(setWeather).catch(console.error);
    getWeatherFiveDayForecast("dublin").then(setForecast).catch(console.error);
  }, []);

  const handleSearch = async (city: string) => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getWeather(city);
      const data1 = await getWeatherFiveDayForecast(city);
      setWeather(data);
      setForecast(data1);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occured");
      setWeather(null);
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    if (!weather) return;
    const location: FavoriteLocation = {
      id: weather.name.toLocaleLowerCase(),
      name: weather.name,
    };

    if (isFavorite(location.id)) {
      remove(location.id);
    } else {
      add(location);
    }
  };

  return (
    <main className="w-full h-full m-2">
      <div className="space-y-4">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        {!isLoading && error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}
      </div>

      <div className="w-full mb-4">
        {isLoading && <LoadingSkeleton />}
        {!isLoading && weather && (
          <WeatherCard
            unit={unit}
            data={weather}
            isFavorite={favorites.some(
              (fav) => fav.id === weather.name.toLowerCase()
            )}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
      {forecast && <ForecastList forecast={forecast} itemsPerPage={4} />}
    </main>
  );
}
