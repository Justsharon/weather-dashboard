export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  base: string;
  dt: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {};
  clouds: {
    all: number;
  };
  name: string;
  timezone: number;
  sys: {
    country: string;
  };
  dt_txt: string;
}

export interface WeatherError {
  message: string;
}

export interface WeatherForecastData {
  list: WeatherData[];
  city: {
    name: string;
    country: string;
    timezone: number;
  };
}

export interface FavoriteLocation {
  id: string;
  name: string;
}

export type TemperatureUnit = "celsius" | "fahrenheit";

export interface AirQualityData {
  list: [
    {
      dt: number
      main: {
        aqi: number;
      };
      components: {
        co: number;
        no: number;
        no2: number;
        o3: number;
        so2: number;
        pm2_5: number;
        pm10: number;
        nh3: number;
      };
    }
  ];
}
