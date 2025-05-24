import { useState } from "react";
import type { WeatherData } from "../types";
import { getWeather } from "../service/weatherAPI";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import LoadingSkeleton from "./LoadingSkeleton";
import Sidebar from "./Sidebar";
import React from "react";
import TopBar from "./TopBar";

export default function Dashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSearch = async (city: string) => {
    try {
      setIsLoading(true);
      setError("");
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occured");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Sidebar isOpen={isSidebarOpen} />

      <section className="grid h-full w-full grid-cols-12 grid-rows-[auto_1fr]">
        <div className="col-span-full row-span-1 h-full">
          <TopBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div className="col-span-full row-span-1 h-full">
          <div className="grid h-full w-full grid-cols-12 grid-rows-12">
            <div className="col-span-12 md:col-span-10 row-span-full flex justify-center items-center">
              <main className="w-full h-full m-2">
                <div className="max-w-md mx-auto space-y-4">
                  <SearchBar onSearch={handleSearch} isLoading={isLoading} />

                  {!isLoading && error && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}
                  {isLoading && <LoadingSkeleton />}
                  {!isLoading && weather && <WeatherCard data={weather} />}
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
