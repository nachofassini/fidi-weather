import { CityWeather, IGetCityWeather } from "@/types";

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
