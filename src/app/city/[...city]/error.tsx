"use client";

import { Button } from "flowbite-react";
import Link from "next/link";

export default function Error() {
  return (
    <div>
      <p className="text-xl">
        Upps, ocurrio un error al cargar la info de la sucursal
      </p>
      <Link href="/">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  );
}
