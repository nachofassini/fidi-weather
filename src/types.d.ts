export interface ISearchCityByName {
  q?: string;
  limit?: number;
  lang?: string;
}

export interface IGetCityWeather {
  cityName?: string;
  stateCode?: string;
  countryCode?: string;
  units?: "standard" | "metric" | "imperial";
  lang?: string;
}

export interface IGetCityWeatherByCoordinates {
  lat: number;
  lon: number;
  units?: "standard" | "metric" | "imperial";
  lang?: string;
}

export interface IGetCityWeatherForecastByCoordinates {
  lat: number;
  lon: number;
  cnt?: number;
  units?: "standard" | "metric" | "imperial";
  lang?: string;
}

export interface IGetCityWeatherForecastByDateAndCoordinates {
  lat: number;
  lon: number;
  date: string;
  units?: "standard" | "metric" | "imperial";
  lang?: string;
}

type OpenApiCity = {
  name: string;
  local_names: Dictionary<string, string>;
  country: string;
  state: string;
} & Coordinates;

type City = OpenApiCity & { id: string };

type Coordinates = { lon: number; lat: number };
type Conditions = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
type Wind = {
  speed: number; // m/s
  deg: number; // degrees
  gust: number; // m/s
};

export type CityWeather = {
  coord: Coordinates;
  weather: Conditions[];
  base: "stations" | string;
  main: {
    temp: number; // kelvin
    feels_like: number; // kelvin
    temp_min: number; // kelvin
    temp_max: number; // kelvin
    pressure: number; // hPa
    humidity: number; // %
    sea_level: number; // hPa
    grnd_level: number; // hPa
  };
  visibility: number; // meters (max: 10km/10000)
  wind: Wind;
  clouds: { all: number }; // % }
  dt: number; // unix timestamp
  sys: {
    id: number;
    type: number;
    message?: string;
    country: string; // ISO 3166-1 alpha-2
    sunrise: number; // unix timestamp
    sunset: number; // unix timestamp
  };
  timezone: number; // seconds from UTC
  id: number;
  name: string;
  cod: number;
  rain?: { "1h": number }; // mm/h
  snow?: { "1h": number }; // mm/h
};

type ForecastItem = {
  dt: number; // unix timestamp
  main: {
    temp: number; // kelvin
    feels_like: number; // kelvin
    temp_min: number; // kelvin
    temp_max: number; // kelvin
    pressure: number; // hPa
    sea_level: number; // hPa
    grnd_level: number; // hPa
    humidity: number; // %
    temp_kf: number; // internal parameter
  };
  weather: Conditions[];
  clouds: { all: number }; // %
  wind: Wind;
  visibility: number; // meters
  pop: number; // %
  sys: {
    pod: "d" | "n";
  };
  dt_txt: string; // date time
};

export type CityWeatherForecast = {
  cod: number;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};
