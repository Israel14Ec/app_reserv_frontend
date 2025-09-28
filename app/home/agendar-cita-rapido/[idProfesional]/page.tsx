"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useProfesional } from "@/src/hooks/useProfesional";

export default function AgendarCitaRapidoPage() {
  
  const { getPro} = useProfesional()
  const { idProfesional } = useParams<{ idProfesional: string }>();
  return (
    <>
      <section className="flex items-center justify-between  mb-16">
        <h1 className=" text-3xl text-zinc-800 font-semibold">
          Agendar cita rápidamente
        </h1>
      </section>

    </>
  );
}
