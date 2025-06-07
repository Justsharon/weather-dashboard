import { useEffect, useState } from "react";
import type { AirQualityData } from "../types";
import { getAirQuality, getCityCoordinates } from "../service/weatherAPI";

export const useAirQuality = (city: string) => {
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        setIsLoading(true);
        const coords = await getCityCoordinates(city);
console.log("Geocoded Coordinates:", coords);
        const {lat, lon} = await getCityCoordinates(city)
        const airQuality = await getAirQuality(lat, lon);
        setAirQualityData(airQuality);
      } catch (error) {
        setError( "Error fetching air quality");
      } finally {
        setIsLoading(false)
      }
    };

    fetchAirQuality()
  }, [city]);

  return {airQualityData, isLoading, error}
};
