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
  const { forecast, isLoading, error } = useWeatherData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!forecast) return <p>No forecast data</p>;

  const list = forecast.list;
  const labels = list.map((e) => e.dt_txt);

  const temps = list.map((e) => e.main.temp);
  const feelsLike = list.map((e) => e.main.feels_like);
  // const minTemp = list.map((e) => e.main.temp_min);
  // const maxTemp = list.map((e) => e.main.temp_max);

  const humidity = list.map((e) => e.main.humidity);
  const seaLevel = list.map((e) => e.main.sea_level || 0);
  const grndLevel = list.map((e) => e.main.grnd_level || 0);

  const pressure = list[0].main.pressure;
  const windSpeed = list[0].wind.speed;

  const windDeg = list.map((e) => e.wind.deg);

  // const cloudData = list.map((e) => ({
  //   x: e.dt_txt,
  //   y: e.clouds.all,
  // }));
  return (
    <section>
      <h2 className="text-xl font-bold text-center">
        6 hour Weather Charts for {forecast.city.name}'s 5 day forecast'
      </h2>
      <div className="w-full p-4 grid lg:grid-cols-2">
        <div>
          <h3 className="font-medium mt-4">
            Line Chart representation of {forecast.city.name}'s temperature vs what it actually feels like
          </h3>

          <Line
            data={{
              labels,
              datasets: [
                {
                  label: "Temp",
                  data: temps,
                  borderColor: "red",
                  borderWidth: 1,
                },
                {
                  label: "Feels Like",
                  data: feelsLike,
                  borderColor: "orange",
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
        <div>
          <h3 className="font-medium mt-4">
            Bar Chart representation of {forecast.city.name}'s humidity  level vs sea_level vs Ground-level
          </h3>

          <Bar
            data={{
              labels,
              datasets: [
                {
                  label: "Humidity",
                  data: humidity,
                  backgroundColor: "teal",
                  borderWidth: 1,
                },
                {
                  label: "Sea Level",
                  data: seaLevel,
                  backgroundColor: "navy",
                  borderWidth: 1,
                },
                {
                  label: "Ground Level",
                  data: grndLevel,
                  backgroundColor: "orange",
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
        <div>
          <h3 className="font-medium mt-4">
            Pie Chart representation of {forecast.city.name}'s Pressure Vs Windspeed
          </h3>
          <div 
            style={{ 
              width: "300px", 
              height: "300px", 
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto", 
            }}>
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
          </div> 
        </div>

        <div>
          <h3 className="font-medium mt-4">
            Bar  Chart representation of {forecast.city.name}'s Wind degree
          </h3>
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
        </div>
        {/* <div>
          <h3 className="font-bold mt-4">
            Bar Chart representation of Humidity vs sea_level vs Ground-level
          </h3>
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
          </div> */}
        
      </div>
    </section>
  );
};

export default ChartDisplay;
