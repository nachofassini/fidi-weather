import { CityWeatherForecast, ForecastItem } from "@/types";

const roundToDecimal = (value: number, decimals: number = 0): number =>
  Number(value.toFixed(decimals));

export const averageForecastsByDay = (
  forecast: CityWeatherForecast
): ForecastItem[] => {
  const groupedByDay = new Map<string, ForecastItem[]>();

  // Group entries by day
  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; // Extract the date part
    if (!groupedByDay.has(date)) {
      groupedByDay.set(date, []);
    }
    groupedByDay.get(date)!.push(item);
  });

  // Calculate the average for each day
  const averagedEntries: ForecastItem[] = [];
  groupedByDay.forEach((items, date) => {
    const averageItem: ForecastItem = {
      dt: 0,
      dt_txt: date,
      main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        sea_level: 0,
        grnd_level: 0,
        humidity: 0,
        temp_kf: 0,
      },
      weather: items[0].weather,
      clouds: { all: 0 },
      wind: { gust: 0, speed: 0, deg: 0 },
      visibility: 0,
      pop: 0,
      sys: { pod: "d" },
    };

    items.forEach((item) => {
      averageItem.main.temp += item.main.temp;
      averageItem.main.feels_like += item.main.feels_like;
      averageItem.main.temp_min += item.main.temp_min;
      averageItem.main.temp_max += item.main.temp_max;
      averageItem.main.pressure += item.main.pressure;
      averageItem.main.sea_level += item.main.sea_level;
      averageItem.main.grnd_level += item.main.grnd_level;
      averageItem.main.humidity += item.main.humidity;
      averageItem.main.temp_kf += item.main.temp_kf;
      averageItem.clouds.all += item.clouds.all;
      averageItem.wind.speed += item.wind.speed;
      averageItem.wind.deg += item.wind.deg;
      averageItem.visibility += item.visibility;
      averageItem.pop += item.pop;
    });

    const itemCount = items.length;
    averageItem.main.temp = roundToDecimal(
      (averageItem.main.temp /= itemCount)
    );
    averageItem.main.feels_like = roundToDecimal(
      (averageItem.main.feels_like /= itemCount)
    );
    averageItem.main.temp_min = roundToDecimal(
      (averageItem.main.temp_min /= itemCount)
    );
    averageItem.main.temp_max = roundToDecimal(
      (averageItem.main.temp_max /= itemCount)
    );
    averageItem.main.pressure = roundToDecimal(
      (averageItem.main.pressure /= itemCount)
    );
    averageItem.main.sea_level = roundToDecimal(
      (averageItem.main.sea_level /= itemCount)
    );
    averageItem.main.grnd_level = roundToDecimal(
      (averageItem.main.grnd_level /= itemCount)
    );
    averageItem.main.humidity = roundToDecimal(
      (averageItem.main.humidity /= itemCount)
    );
    averageItem.main.temp_kf = roundToDecimal(
      (averageItem.main.temp_kf /= itemCount)
    );
    averageItem.clouds.all /= itemCount;
    averageItem.wind.speed /= itemCount;
    averageItem.wind.deg /= itemCount;
    averageItem.visibility /= itemCount;
    averageItem.pop = roundToDecimal((averageItem.pop /= itemCount), 1);

    averagedEntries.push(averageItem);
  });

  return averagedEntries;
};
