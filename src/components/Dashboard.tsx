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
    setIsSidebarOpen(!isSidebarOpen);
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
      <section className="grid h-full w-full grid-cols-12 grid-rows-[auto_1fr]">
        <div className="col-span-full row-span-1 h-full">
          <TopBar />
        </div>
        <div className="col-span-full row-span-1 h-full">
          <div className="grid h-full w-full grid-cols-12 grid-rows-12">
            <div className="col-span-2 row-span-full">
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
            <div className="col-span-10 row-span-full flex justify-center items-center">
              <main className="w-full h-full m-2">
                <div className="max-w-md mx-auto space-y-4">
                  <h1 className="text-3xl font-bold text-center mb-8">
                    Weather Dashboard
                  </h1>
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
