import { City, Coordinates } from "@/types";

export const getCityId = (coordinates: Coordinates) => {
  return `${coordinates.lat}-${coordinates.lon}`;
};

export const getCityLink = (city: City) =>
  `/city/${city.name}/${city.lat}/${city.lon}`;
