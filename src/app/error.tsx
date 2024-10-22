"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div>
      <p className="text-5xl">Upps, ocurrio un error. ¡Intentá de nuevo!</p>;
      <Link href="/">Volver al inicio</Link>
    </div>
  );
}
