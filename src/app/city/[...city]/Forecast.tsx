import { WeatherConditionIcon } from "@/components/WeatherConditionIcon";
import { getCityWeatherForecast } from "@/services/weather";
import { getWeekDay } from "@/utils/date";
import { Coordinates } from "@/types";
import { capitalizeFirstLetter } from "@/utils/string";
import { IoRainyOutline, IoWater } from "react-icons/io5";

export default async function CityForecast(coordinates: Coordinates) {
  const forecast = await getCityWeatherForecast(coordinates);
  return (
    <div className="grid grid-cols-2 lg:flex  gap-4 justify-center lg:justify-between overflow-x-scroll">
      {forecast?.list?.map((day, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 rounded-md shadow-md p-3 border border-gray-200 dark:border-gray-700 text-center min-w-fit"
        >
          <p className="capitalize font-semibold mb-1">
            {getWeekDay(day.dt_txt)}
          </p>
          <div className="mx-auto">
            {day.weather?.[0] && (
              <WeatherConditionIcon
                icon={day.weather?.[0]?.icon}
                description={day.weather?.[0]?.description}
              />
            )}
          </div>
          <p className="font-semibold">
            <span className="text-blue-500">{day.main?.temp_min}°C</span> /{" "}
            <span className="text-red-500">{day.main?.temp_min}°C</span>
          </p>
          <p>{capitalizeFirstLetter(day.weather?.[0]?.description || "")}</p>
          <div className="flex justify-around mt-auto">
            <div>
              <IoRainyOutline className="text-blue-500 w-5 h-5" />
              <span className="text-sm">{day.pop}%</span>
            </div>
            <div>
              <IoWater className="text-blue-500 w-5 h-5" />
              <span className="text-sm">{day.main.humidity}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
