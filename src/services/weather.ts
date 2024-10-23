import {
  CityWeather,
  CityWeatherForecast,
  IGetCityWeather,
  IGetCityWeatherByCoordinates,
  IGetCityWeatherForecastByCoordinates,
} from "@/types";
import { averageForecastsByDay } from "@/utils/weather";

const appId = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export const getCityWeather = async ({
  cityName = "Buenos Aires",
  countryCode,
  stateCode,
  units = "metric",
  lang = "es",
}: IGetCityWeather): Promise<CityWeather> => {
  let q = cityName;
  if (stateCode) q += `,${stateCode}`;
  if (countryCode) q += `,${countryCode}`;

  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      q
    )}&appid=${appId}&units=${units}&lang=${lang}`
  );
  return weather.json();
};

export const getCityWeatherByCoordinates = async ({
  lat,
  lon,
  units = "metric",
  lang = "es",
}: IGetCityWeatherByCoordinates): Promise<CityWeather> => {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=${units}&lang=${lang}`
  );
  return weather.json();
};

export const getCityWeatherForecast = async ({
  lat,
  lon,
  cnt = 0,
  units = "metric",
  lang = "es",
}: IGetCityWeatherForecastByCoordinates): Promise<CityWeatherForecast> => {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${appId}&units=${units}&lang=${lang}`
  );
  console.log("weather", weather.url);
  const weatherParsed = (await weather.json()) as CityWeatherForecast;

  // Calculate the average for each day
  weatherParsed.list = averageForecastsByDay(weatherParsed);

  return weatherParsed;
};
