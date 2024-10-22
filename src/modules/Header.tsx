import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import { DarkThemeToggle } from "flowbite-react";

export const Header = () => (
  <header className="w-full h-16 md:h-20 p-4 flex justify-between items-center">
    <Image src={logo} alt="Fidi Weather" className="dark:invert" priority />

    <DarkThemeToggle className="ml-auto mr-2" />
    <h2 className="text-xl md:text-2xl font-bold text-gray-700 dark:text-white">
      Weather APP
    </h2>
  </header>
);
