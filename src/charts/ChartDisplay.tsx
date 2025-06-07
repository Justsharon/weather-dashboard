import { useWeatherData } from "../hooks/useWeatherData";
import { Line, Bar, Pie, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const ChartDisplay = () => {
  const { forecast, weather, isLoading, error, searchCity } = useWeatherData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!forecast) return <p>No forecast data</p>;

  const list = forecast.list;
  const labels = list.map((e) => e.dt_txt);

  const temps = list.map((e) => e.main.temp);
  const feelsLike = list.map((e) => e.main.feels_like);
  const minTemp = list.map((e) => e.main.temp_min);
  const maxTemp = list.map((e) => e.main.temp_max);

  const humidity = list.map((e) => e.main.humidity);
  const seaLevel = list.map((e) => e.main.sea_level || 0);
  const grndLevel = list.map((e) => e.main.grnd_level || 0);

  const pressure = list[0].main.pressure;
  const windSpeed = list[0].wind.speed;

  const windDeg = list.map((e) => e.wind.deg);

  const cloudData = list.map((e) => ({
    x: e.dt_txt,
    y: e.clouds.all,
  }));
  return (
    <div className="p-4 grid gap-10">
      <h2 className="text-xl font-bold">
        Weather Charts for {forecast.city.name}
      </h2>

      <Line
        data={{
          labels,
          datasets: [
            { label: "Temp", data: temps, borderColor: "red" },
            { label: "Feels Like", data: feelsLike, borderColor: "orange" },
            { label: "Min Temp", data: minTemp, borderColor: "blue" },
            { label: "Max Temp", data: maxTemp, borderColor: "green" },
          ],
        }}
      />
      <Bar
        data={{
          labels,
          datasets: [
            { label: "Humidity", data: humidity, backgroundColor: "teal" },
            { label: "Sea Level", data: seaLevel, backgroundColor: "navy" },
            { label: "Ground Level", data: grndLevel, backgroundColor: "gray" },
          ],
        }}
      />
      <Pie
        data={{
          labels: ["Pressure", "Wind Speed"],
          datasets: [
            {
              data: [pressure, windSpeed],
              backgroundColor: ["gold", "lightblue"],
            },
          ],
        }}
      />
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Wind Degree",
              data: windDeg,
              backgroundColor: "purple",
            },
          ],
        }}
      />

      <Scatter
        data={{
          datasets: [
            {
              label: "Cloudiness (%)",
              data: cloudData,
              backgroundColor: "skyblue",
            },
          ],
        }}
      />
    </div>
  );
};

export default ChartDisplay;
