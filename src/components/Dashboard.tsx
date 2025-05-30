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
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import WeatherForecastCard from "./WeatherForecastCard";
import {
  addFavorite,
  getFavorites,
  getPreferredUnit,
  removeFavorite,
} from "../utils/storage";
import FavoriteList from "./FavoriteList";

export default function Dashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecastData | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [favorites, setFavorites] = useState<FavoriteLocation[]>(
    getFavorites()
  );
  const [unit, setUnit] = useState<TemperatureUnit>(getPreferredUnit());
  const itemsPerPage: number = 4;

  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

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

    if (favorites.some((fav) => fav.id === location.id)) {
      removeFavorite(location.id);
      setFavorites(getFavorites());
    } else {
      addFavorite(location);
      setFavorites(getFavorites());
    }
  };
  const totalItems = forecast?.list?.length ?? 0;
  const paginatedForecastData = forecast?.list.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Sidebar isOpen={isSidebarOpen} />

      <section className="grid h-full w-full grid-cols-12 grid-rows-[auto_1fr]">
        <div className="col-span-full row-span-1 h-full">
          <TopBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div className="col-span-full row-span-1 h-full">
          <div className="grid h-full w-full grid-cols-12 grid-rows-12">
            <div className="col-span-12 row-span-full flex justify-center items-center">
              <main className="w-full h-full m-2">
                <div className="space-y-4">
                  {/* search component */}
                  <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                  {!isLoading && error && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}
                </div>

                {/* dayly highlights*/}

                <div className="flex items-center gap-2 justify-between w-full">
                  {isLoading && <LoadingSkeleton />}
                  {!isLoading && weather && (
                    <WeatherCard
                      data={weather}
                      isFavorite={favorites.some(
                        (fav) => fav.id === weather.name.toLowerCase()
                      )}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  )}
                  <FavoriteList
                    favorites={favorites}
                    onSelect={(location) => getWeather(location.name)}
                    onRemove={(id) => removeFavorite(id)}
                  />
                </div>

                {/* forecast data */}
                <div className="flex flex-col py-4 w-full">
                  <h2 className="text-xl font-bold ">
                    5 day / 3 hour forecast data
                  </h2>
                  {forecast && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 ">
                      {paginatedForecastData?.map((entry) => (
                        <WeatherForecastCard
                          key={entry.dt}
                          date={entry.dt_txt}
                          temp={entry.main.temp}
                          humidity={entry.main.humidity}
                          icon={entry.weather[0].icon}
                          description={entry.weather[0].description}
                          feels_like={entry.main.feels_like}
                          pressure={entry.main.pressure}
                          speed={entry.wind.speed}
                        />
                      ))}
                    </div>
                  )}
                  {/* Pagination Controls */}
                  <div className="flex justify-center items-center gap-4 mt-4">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 0))
                      }
                      disabled={currentPage === 0}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <span className="text-sm font-medium">
                      Page {currentPage + 1} of{" "}
                      {Math.ceil(totalItems / itemsPerPage)}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          (prev + 1) * itemsPerPage < totalItems
                            ? prev + 1
                            : prev
                        )
                      }
                      disabled={(currentPage + 1) * itemsPerPage >= totalItems}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
