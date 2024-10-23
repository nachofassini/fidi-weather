import dayjs from "dayjs";

export const getWeekDay = (date: string): string =>
  dayjs(date).format("dddd DD");
