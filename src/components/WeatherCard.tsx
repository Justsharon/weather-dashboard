import { Icon } from "@iconify/react/dist/iconify.js";
import { type TemperatureUnit, type WeatherData } from "../types";

interface WeatherCardProps {
  data: WeatherData;
  unit: TemperatureUnit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function WeatherCard({
  data,
  isFavorite,
  onToggleFavorite,
  unit,
}: WeatherCardProps) {
  const formatTemperature = (temp: number) => {
    return `${Math.round(temp)}°${unit === "celsius" ? "C" : "F"}`;
  };
  return (
    <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full flex justify-between gap-2">
      <div className="bg-white/20 rounded-lg p-4 w-1/3 ">
        <div className="flex justify-between">
          <div className="">
            <h2 className="text-xl text-white font-bold">{data.name}</h2>
            <button
              onClick={onToggleFavorite}
              className={`p-2 rounded-full ${
                isFavorite ? "text-yellow-500" : "text-white"
              }`}
            >
              <Icon
                icon="material-symbols-light:star-outline"
                width="24"
                height="24"
                className={`${isFavorite ? "currentColor" : "none"}`}
              />
            </button>
            <p className="text-gray-200">{data.weather[0].main}</p>
          </div>

          <div>
            <span className="text-xl font-bold text-white">
              {formatTemperature(data.main.temp)}
            </span>

            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
              className="w-16 h-16"
            />
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <p className="flex justify-between border border-white text-white rounded-lg px-2 w-1/2">
            <span>L</span>
            {data.main.temp_max}
          </p>
          <p className="flex justify-between border border-white text-white rounded-lg px-2 w-1/2">
            <span>H</span>
            {data.main.temp_max}
          </p>
        </div>
      </div>

      <div className="bg-white/20 rounded-lg p-4 w-1/3">
        <div className="flex items-center justify-between p-2 text-white">
          <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
          <Icon icon="carbon:temperature" width="48" height="48" />
        </div>

        <div className="flex items-center justify-between p-2 text-white">
          <p>Humidity: {data.main.humidity}%</p>
          <Icon icon="lets-icons:humidity-light" width="48" height="48" />
        </div>
      </div>

      <div className="bg-white/20 rounded-lg p-4 w-1/3">
        <div className="flex items-center justify-between p-2 text-white">
          <p className="text-white">Wind: {data.wind.speed} m/s</p>
          <Icon icon="arcticons:uv-index" width="48" height="48" />
        </div>
        <div className="flex items-center justify-between p-2 text-white">
          <p className="text-white">Pressure: {data.main.pressure}</p>
          <Icon icon="lets-icons:pressure-light" width="48" height="48" />
        </div>
      </div>
    </div>
  );
}
