import { WeatherConditionIcon } from "@/components/WeatherConditionIcon";
import { getCityWeatherByCoordinates } from "@/services/weather";
import { Coordinates } from "@/types";
import { capitalizeFirstLetter } from "@/utils/string";
import { Card } from "flowbite-react";
import { IoUmbrellaSharp, IoWaterSharp } from "react-icons/io5";

export const CityWeatherResume = async (coordinates: Coordinates) => {
  const weather = await getCityWeatherByCoordinates(coordinates);
  return (
    <Card id="hero" className="w-full bg-blue-700 text-white">
      <h2 className="text-xl">
        {capitalizeFirstLetter(weather.weather?.[0]?.description)}
      </h2>
      <div className="grid grid-cols-2 md:flex gap-4 items-center md:items-start justify-items-center text-center md:text-left">
        {weather.weather?.[0] && (
          <WeatherConditionIcon
            icon={weather.weather[0].icon}
            description={weather.weather[0].description}
          />
        )}
        <div>
          <p className="font-bold text-3xl md:text-5xl">
            {weather.main?.temp}°C
          </p>
          <span>Sensación de {weather.main?.feels_like}°C</span>
        </div>
        {weather.rain?.["1h"] && (
          <p title="Probabilidad de lluvia" className="text-center">
            <IoUmbrellaSharp size={40} />
            <span>{weather.rain?.["1h"]}%</span>
          </p>
        )}
        <p title="Humedad" className="text-center">
          <IoWaterSharp size={40} />
          <span>{weather.main?.humidity}%</span>
        </p>
        <div>
          <h3>Min: {weather.main?.temp_min}°C</h3>
          <h3>Max: {weather.main?.temp_max}°C</h3>
        </div>
      </div>
    </Card>
  );
};
