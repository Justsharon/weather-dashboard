import { useAirQuality } from "../hooks/useAirQuality";
import WeatherWidget from "../components/WeatherWidget";
import { useWeatherData } from "../hooks/useWeatherData";
import { useCity } from "../context/CityContext";
import LoadingSkeleton from "../components/LoadingSkeleton";

const AQI_LABELS = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
const AQI_COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f97316", "#ef4444"];

const AirQuality = () => {
   const { city } = useCity(); 
  const { airQualityData, isLoading, error } = useAirQuality(city);
  const { forecast } = useWeatherData(city);
  if (!forecast) return <LoadingSkeleton />;
 
  if (error || !airQualityData)
    return <p>Error: {error || "No data available"}</p>;

  const { aqi } = airQualityData.list[0].main;
  const carbonMonoxide = airQualityData.list.map((e) => e.components.co);
  const sulphurDioxide = airQualityData.list.map((e) => e.components.so2);
  const nitrogenMonoxide = airQualityData.list.map((e) => e.components.no);
  const nitrogenDioxide = airQualityData.list.map((e) => e.components.no2);
  const ozone = airQualityData.list.map((e) => e.components.o3);
  const fineParticles = airQualityData.list.map((e) => e.components.pm2_5);
  const coarseParticle = airQualityData.list.map((e) => e.components.pm10);
  const ammonia = airQualityData.list.map((e) => e.components.nh3);

  return (
    <div className="p-4 space-y-6">
       {isLoading && <LoadingSkeleton />}
      <div className="flex items-center justify-center">
        <h2 className="text-lg font-bold mr-2">
          Air Quality Index for {forecast.city.name}:{" "}
        </h2>
        <p className="text-lg font-bold" style={{ color: AQI_COLORS[aqi - 1] }}>
          {aqi} - {AQI_LABELS[aqi - 1]}
        </p>
      </div>
    <div className="text-sm text-gray-700 space-y-2 leading-relaxed">
  <p>
    The Air Quality Index (AQI) is a scale used to indicate how clean or polluted the air is, with an emphasis on its impact on human health. OpenWeather’s AQI levels range from <span className="font-medium text-green-600">1 (Good)</span> to <span className="font-medium text-red-600">5 (Very Poor)</span>, based on the concentration of specific air pollutants.
  </p>

  <ol className="list-disc pl-5 space-y-1">
    <li>
      Pollutants monitored: SO₂ (sulfur dioxide), NO₂ (nitrogen dioxide), PM10, PM2.5 (particulate matter), O₃ (ozone), and CO (carbon monoxide).
    </li>
    <li>
      AQI Levels:
      <span className="block pl-4">
        <span className="text-green-600">1 – Good</span>, 
        <span className="text-yellow-500"> 2 – Fair</span>, 
        <span className="text-orange-500"> 3 – Moderate</span>, 
        <span className="text-red-500"> 4 – Poor</span>, 
        <span className="text-purple-700"> 5 – Very Poor</span>
      </span>
    </li>
    <li>
      Lower index levels indicate cleaner air with minimal health risks, while higher levels signal increasing pollution and health hazards.
    </li>
    <li>
      NH₃ (ammonia) and NO (nitric oxide) are also monitored but are not included in AQI scoring.
    </li>
  </ol>
</div>

      <div className="grid lg:grid-cols-2 gap-4">
        <WeatherWidget
          title="Pollutant Composition"
          type="pie"
          data={{
            labels: ["PM2.5", "PM10", "CO", "NO₂", "O₃", "SO₂"],
            datasets: [
              {
                data: [
                  fineParticles,
                  coarseParticle,
                  carbonMonoxide,
                  nitrogenMonoxide,
                  ozone,
                  sulphurDioxide,
                ],
                backgroundColor: [
                  "#f87171",
                  "#fbbf24",
                  "#34d399",
                  "#60a5fa",
                  "#a78bfa",
                  "#f472b6",
                ],
              },
            ],
          }}
        />

        <WeatherWidget
          title="Pollutant Levels (μg/m³)"
          type="bar"
          data={{
            labels: ["PM2.5", "PM10", "CO", "NO", "NO₂", "O₃", "SO₂", "NH₃"],
            datasets: [
              {
                label: "μg/m³",
                data: [
                  fineParticles,
                  coarseParticle,
                  carbonMonoxide,
                  nitrogenMonoxide,
                  nitrogenDioxide,
                  ozone,
                  sulphurDioxide,
                  ammonia,
                ],
                backgroundColor: "#60a5fa",
              },
            ],
          }}
        />
      </div>

      <div className="p-4  text-sm ">
        <h3 className="text-lg font-semibold mb-2">
          Learn More About Air Pollution
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <a
              href="https://education.nationalgeographic.org/resource/air-pollution/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              National Geographic: Air Pollution
            </a>
          </li>
          <li>
            <a
              href="https://scied.ucar.edu/learning-zone/air-quality/air-pollution-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              UCAR Center for Science Education: Air Pollution Solutions
            </a>
          </li>
          <li>
            <a
              href="https://www.niehs.nih.gov/health/topics/agents/air-pollution"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              NIEHS: Air Pollution and Your Health
            </a>
          </li>
          <li>
            <a
              href="https://www.nrdc.org/stories/air-pollution-everything-you-need-know"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              NRDC: Air Pollution - Everything You Need to Know
            </a>
          </li>
          <li>
            <a
              href="https://www.who.int/news-room/feature-stories/detail/air-pollution--the-invisible-health-threat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              WHO: Air Pollution - The Invisible Health Threat
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AirQuality;
