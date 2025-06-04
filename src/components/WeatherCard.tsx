import { Icon } from "@iconify/react/dist/iconify.js";
import { type TemperatureUnit, type WeatherData } from "../types";

interface WeatherCardProps {
  data: WeatherData;
  unit: TemperatureUnit;
  isFavorite: boolean;
  onToggleFavorite: () => void
}

export default function WeatherCard({ data, isFavorite, onToggleFavorite, unit }: WeatherCardProps) {
  const formatTemperature = (temp: number) => {
    return `${Math.round(temp)}°${unit === 'celsius' ? 'C' : 'F'}`
  }
  return (
    <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-1/2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-white font-bold">{data.name} Today</h2>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-16 h-16"
        />
       
      </div>

    <button
      onClick={onToggleFavorite}
        className={`p-2 rounded-full ${
            isFavorite ? 'text-yellow-500' : 'text-white'
          }`}
    >
      <Icon icon="material-symbols-light:star-outline" width="24" height="24" className={`${isFavorite ? 'currentColor' : 'none' }`} />
    </button>
      <div className="grid grid-cols-2 gap-4">
        <div>
           <span className="text-5xl font-bold text-white">
          {formatTemperature(data.main.temp)}
        </span>
          <p className="text-gray-200">{data.weather[0].main}</p>
        </div>
        <div className="space-y-2">
          <p className="text-white">
            Feels like: {Math.round(data.main.feels_like)}°C
          </p>
          <p className="text-white">Humidity: {data.main.humidity}%</p>
          <p className="text-white">Wind: {data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}
