export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  dt: number
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  name: string;
  timezone: number;
  sys: {
    country: string;
  };
  dt_txt: string
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
