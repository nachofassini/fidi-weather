import { WeatherConditionIcon } from "@/components/WeatherConditionIcon";
import { IoCloudOffline } from "react-icons/io5";
import { getCityWeather } from "@/services/weather";
import { City, CityWeather } from "@/types";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

interface IWeatherResume {
  city: City;
}

export function WeatherResume({ city }: IWeatherResume) {
  const [weather, setWeather] = useState<CityWeather>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityWeather = async () => {
      try {
        const data = await getCityWeather({ cityName: city.name });
        setWeather(data);
      } catch (error) {
        console.error("Error fetching branches", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityWeather();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!weather) {
    return <IoCloudOffline title="Error al obtener el clima" />;
  }

  return (
    <div className="flex items-center gap-4 flex-grow">
      {weather.weather?.[0] && (
        <WeatherConditionIcon
          icon={weather.weather[0].icon}
          description={weather.weather[0].description}
        />
      )}
      <div className="flex-grow flex-1">
        <p className="text-lg md:text-2xl font-bold">{weather.main.temp}°C</p>
        <p className="text-xs sm:text-base">{weather.weather[0].description}</p>
      </div>
      <div>
        <p>Min</p>
        <p>{weather.main.temp_min}°C</p>
      </div>
      <div>
        <p>Max</p>
        <p>{weather.main.temp_max}°C</p>
      </div>
      <div>
        <p>Humedad</p>
        <p>{weather.main.humidity}%</p>
      </div>
    </div>
  );
}
