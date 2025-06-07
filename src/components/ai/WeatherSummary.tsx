import { useEffect, useState } from "react";
import { askAI } from "../../utils/askAI";

const WeatherSummary = ({ city, weather }: { city: string; weather: any }) => {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    if (!weather) return;
    const prompt = `Give me a brief, friendly weather summary for ${city}. Current temperature is ${weather.main.temp}°C, humidity is ${weather.main.humidity}%, and wind speed is ${weather.wind.speed} m/s.`;
    askAI(prompt).then(setSummary).catch(console.error);
  }, [city, weather]);
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-2">AI Weather Summary</h2>
      <p>{summary || "Loading..."}</p>
    </div>
  );
};

export default WeatherSummary;
