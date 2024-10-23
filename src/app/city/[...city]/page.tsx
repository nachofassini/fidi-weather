import MapPreview from "@/components/MapPreview";
import { Suspense } from "react";
import { Card } from "flowbite-react";
import CityForecast from "./Forecast";
import { CityWeatherResume } from "./Resume";
import {
  ForecastSkeleton,
  WeatherResumeSkeleton,
} from "@/components/skeletons";
import { getCityWeatherByCoordinates } from "@/services/weather";

export default async function CityWeather({
  params,
}: {
  params: { city: string[] };
}) {
  const cityName = params.city?.[0];
  const lat = Number(params.city?.[1]);
  const lon = Number(params.city?.[2]);

  const weather = await getCityWeatherByCoordinates({ lat, lon });

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl">
        Sucursal: <span className="font-bold">{weather?.name || cityName}</span>
      </h1>

      <Suspense fallback={<WeatherResumeSkeleton />}>
        <CityWeatherResume lat={lat} lon={lon} />
      </Suspense>

      <Card>
        <p>Pronostico para la próxima semana</p>
        <div className="grid grid-cols-2 lg:flex  gap-4 justify-center lg:justify-between overflow-x-scroll">
          <Suspense fallback={<ForecastSkeleton />}>
            <CityForecast lat={lat} lon={lon} />
          </Suspense>
        </div>
      </Card>

      <div className="h-[400px] rounded-lg border border-gray-200 shadow-md dark:border-gray-700 overflow-hidden">
        <MapPreview lat={lat} lon={lon} />
      </div>
    </div>
  );
}
