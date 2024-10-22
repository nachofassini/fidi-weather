import { ISearchCityByName, OpenApiCity } from "@/types";

const appId = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export const searchCityByName = async ({
  q = "",
  limit = 10,
  lang = "es",
}: ISearchCityByName): Promise<OpenApiCity[]> => {
  const weather = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      q
    )}&limit=${limit}&appid=${appId}&lang=${lang}`
  );
  return weather.json();
};
