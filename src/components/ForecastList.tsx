import React from "react";
import type { WeatherForecastData } from "../types";
import WeatherForecastCard from "./WeatherForecastCard";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ForecastListProp {
  forecast: WeatherForecastData;
  itemsPerPage: number;
}
const ForecastList = ({ forecast, itemsPerPage }: ForecastListProp) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const totalItems = forecast.list.length;
  const paginatedForecast = forecast.list.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
        5-Day / 3-Hour Forecast
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {paginatedForecast.map((entry) => (
          <WeatherForecastCard
            key={entry.dt}
            date={entry.dt_txt}
            temp={entry.main.temp}
            icon={entry.weather[0].icon}
            description={entry.weather[0].description}
            humidity={entry.main.humidity}
            feels_like={entry.main.feels_like}
            pressure={entry.main.pressure}
            speed={entry.wind.speed}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          <Icon icon="grommet-icons:previous" width="10" height="10" />
        </button>
        <span className="text-sm font-medium">
          Page {currentPage + 1} of {Math.ceil(totalItems / itemsPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              (prev + 1) * itemsPerPage < totalItems ? prev + 1 : prev
            )
          }
          disabled={(currentPage + 1) * itemsPerPage >= totalItems}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          <Icon icon="grommet-icons:next" width="10" height="10" />
        </button>
      </div>
    </section>
  );
};

export default ForecastList;
