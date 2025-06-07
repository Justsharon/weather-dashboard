import { useAirQuality } from "../hooks/useAirQuality";
import WeatherWidget from "../components/WeatherWidget";

const AQI_LABELS = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
const AQI_COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f97316", "#ef4444"];

const AirQuality = () => {
  const { airQualityData, isLoading, error } = useAirQuality("Dublin");
  if (isLoading) return <p>Loading...</p>;
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
      <div className="p-4 bg-white rounded shadow flex flex-col items-center">
        <h2 className="text-lg font-bold">Air Quality Index</h2>
        <div
          className="text-4xl font-bold"
          style={{ color: AQI_COLORS[aqi - 1] }}
        >
          {aqi} - {AQI_LABELS[aqi - 1]}
        </div>
      </div>

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

      <div className="p-4 bg-white rounded shadow">
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
