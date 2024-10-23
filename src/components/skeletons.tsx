import { Card } from "flowbite-react";
import { FaCloudMoonRain } from "react-icons/fa";
import { IoRainyOutline, IoUmbrellaSharp, IoWater } from "react-icons/io5";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const WeatherResumeSkeleton = () => (
  <Card className={`${shimmer} relative w-full bg-blue-700 text-white`}>
    <h2 className="h-[28px] w-32 bg-gray-300" />
    <div className="mt-1 grid grid-cols-2 md:flex gap-4 items-center md:items-start justify-items-center text-center md:text-left">
      <div className="h-[50px] w-[50px] flex items-center">
        <FaCloudMoonRain className="h-8 w-8 mx-auto" />
      </div>
      <div>
        <p className="py-5 w-44 bg-gray-300" />
        <p className="py-1.5 w-44 mt-1 bg-gray-300" />
      </div>
      <div className="text-center">
        <IoUmbrellaSharp size={40} />
        <p className="h-4 w-10 bg-gray-300" />
      </div>
      <div>
        <p className="py-2 w-20 bg-gray-300 mb-2" />
        <p className="py-2 w-20 bg-gray-300" />
      </div>
    </div>
  </Card>
);

export function ForecastCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex flex-col gap-2 rounded-md shadow-md p-3 border border-gray-200 dark:border-gray-700 text-center min-w-[120px]`}
    >
      <p className="mb-1 mx-auto w-full py-2.5 px-4 bg-gray-300" />
      <div className="mx-auto h-[50px]">
        <FaCloudMoonRain className="h-8 w-8 my-auto" />
      </div>
      <p className="mx-auto w-full py-2.5 px-4 bg-gray-300" />
      <p className="mx-auto w-full py-2.5 px-4 bg-gray-300" />
      <div className="flex justify-around mt-auto">
        <div>
          <IoRainyOutline className="text-blue-500 w-5 h-5" />
          <p className="mx-auto w-full py-2 px-4 bg-gray-300" />
        </div>
        <div>
          <IoWater className="text-blue-500 w-5 h-5" />
          <p className="mx-auto w-full py-2 px-4 bg-gray-300" />
        </div>
      </div>
    </div>
  );
}

export function ForecastSkeleton() {
  return (
    <>
      <ForecastCardSkeleton />
      <ForecastCardSkeleton />
      <ForecastCardSkeleton />
      <ForecastCardSkeleton />
      <ForecastCardSkeleton />
      <ForecastCardSkeleton />
    </>
  );
}
