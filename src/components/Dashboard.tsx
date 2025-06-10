import { useState } from "react";
import type { FavoriteLocation, TemperatureUnit } from "../types";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { getPreferredUnit } from "../utils/storage";
import { useFavorites } from "../hooks/useFavorites";
import ForecastList from "./ForecastList";
import { useWeatherData } from "../hooks/useWeatherData";
import DashWidget from "./DashWidget";



export default function Dashboard() {
  const { isLoading, searchCity, error, forecast, weather } = useWeatherData();
  const { favorites, add, remove, isFavorite } = useFavorites();
  const [unit, setUnit] = useState<TemperatureUnit>(getPreferredUnit());

 

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

  const list = forecast?.list.slice(0, 8);
  const labels = list?.map((e) => e.dt_txt.split(" ")[1].slice(0, 5));
  const temperatureData = list?.map((e) => e.main.temp);
  const feelsLikeData = list?.map((e) => e.main.feels_like);
  const minTempData = list?.map((e) => e.main.temp_min);
  const maxTempData = list?.map((e) => e.main.temp_max);

  return (
    <main className="w-full h-full m-2">
      <div className="space-y-4">
        <SearchBar onSearch={searchCity} isLoading={isLoading} />
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
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashWidget
          title="Temperature Trend"
          type="line"
          data={{
            labels,
            datasets: [
              {
                label: "Temp (°C)",
                data: list?.map((e) => e.main.temp),
                borderColor: "red",
                tension: 0.3,
              },
            ],
          }}
        />

        <DashWidget
          title="Humidity Levels"
          type="bar"
          data={{
            labels,
            datasets: [
              {
                label: "Humidity (%)",
                data: list?.map((e) => e.main.humidity),
                backgroundColor: "blue",
              },
            ],
          }}
        />

        <DashWidget
          title="Temperature Forecast"
          type="line"
          data={{
            labels,
            datasets: [
              {
                label: "Temperature",
                data: temperatureData,
                borderColor: "#60a5fa",
                fill: false,
              },
              {
                label: "Feels Like",
                data: feelsLikeData,
                borderColor: "#fbbf24",
                fill: false,
              },
              {
                label: "Min Temp",
                data: minTempData,
                borderColor: "#10b981",
                borderDash: [5, 5],
                fill: false,
              },
              {
                label: "Max Temp",
                data: maxTempData,
                borderColor: "#ef4444",
                borderDash: [5, 5],
                fill: false,
              },
            ],
          }}
        />

        <DashWidget
          title="Cloudiness"
          type="scatter"
          data={{
            datasets: [
              {
                label: "Clouds (%)",
                data: list?.map((e, i) => ({
                  x: i,
                  y: e.clouds.all,
                })),
                backgroundColor: "gray",
              },
            ],
          }}
        />
      </div>
      {forecast && <ForecastList forecast={forecast} itemsPerPage={4} />}
    </main>
  );
}
