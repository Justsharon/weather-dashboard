import React from "react";

interface ForecastCardProps {
  date: string;
  temp: number;
  icon: string;
  description: string;
  feels_like: number;
  humidity: number;
  pressure: number;
  speed: number;
}

const WeatherForecastCard: React.FC<ForecastCardProps> = ({
  date,
  temp,
  icon,
  description,
  feels_like,
  humidity,
  pressure,
  speed,
}) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow p-4 flex flex-col items-center gap-2">
      <p className="text-sm flex font-medium text-gray-700">{formattedDate}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="w-12 h-12"
      />
      <p className="text-lg font-semibold">Forecasted temperature: {Math.round(temp)}°C</p>
      <p className="text-xs text-gray-500 ">{description}</p>
      <p className="text-xs text-gray-500 ">Forecasted wind speed: {speed}</p>
      <p className="text-xs text-gray-500">Forecasted pressure: {pressure}</p>
      <p className="text-xs text-gray-500">Feels like: {feels_like}</p>
      <p className="text-xs text-gray-500">Forecasted humidity: {humidity}</p>
   
    </div>
  );
};

export default WeatherForecastCard;
