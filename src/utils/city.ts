import { Coordinates } from "@/types";

export const getCityId = (coordinates: Coordinates) => {
  return `${coordinates.lat}-${coordinates.lon}`;
};
