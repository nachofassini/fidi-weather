import Image from "next/image";

export const WeatherConditionIcon = ({
  icon,
  description,
}: {
  icon: string;
  description: string;
}) => (
  <Image
    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
    alt={description}
    width={50}
    height={50}
  />
);
