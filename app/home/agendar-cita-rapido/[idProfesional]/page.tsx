"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useProfesional } from "@/src/hooks/useProfesional";
import { Profesional } from "@/src/types/profesional";
import { AddCitaRapida } from "@/components/cita";

export default function AgendarCitaRapidoPage() {
  const { getProfesionalById } = useProfesional();
  const { idProfesional } = useParams<{ idProfesional: string }>();
  const [isLoading, setIsLoading] = useState(true);

  const [profesional, setProfesional] = useState<Profesional>();

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await getProfesionalById(idProfesional);
      setProfesional(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [idProfesional]);

  if (isLoading) return <span>Cargando...</span>;
  if (!profesional)
    return <span>No se encontró los datos del profesional</span>;
  return (
    <>
      <div
        className="max-w-3xl mx-auto px-3
      py-8"
      >
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl text-zinc-800 font-semibold">
            Agendar cita con:{" "}
            <span className="text-indigo-500 font-bold">
              {profesional?.usuario.nombre}
            </span>
          </h1>
        </section>

        <div className="bg-white shadow-md rounded-xl p-5 space-y-4 border border-gray-100">
          <h2 className="text-xl font-semibold text-zinc-700">
            Datos del Profesional
          </h2>
          <div className="flex flex-col gap-2 text-zinc-600 py-2 border-b-2">
            <div className="flex items-center gap-2">
              <span className="font-medium w-32">CI/RUC:</span>
              <span>{profesional?.usuario.ci_ruc || "-"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium w-32">Número celular:</span>
              <span>{profesional?.usuario.celular || "-"}</span>
            </div>
          </div>

          <div className=" mt-10">
            <AddCitaRapida profesional={profesional} />
          </div>
        </div>
      </div>
    </>
  );
}
