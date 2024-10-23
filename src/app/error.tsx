"use client";

import { Button } from "flowbite-react";
import Link from "next/link";

export default function Error() {
  return (
    <div>
      <p className="text-5xl">Upps, ocurrio un error. ¡Intentá de nuevo!</p>
      <Link href="/">
        <Button className="mt-2">Volver al inicio</Button>
      </Link>
    </div>
  );
}
