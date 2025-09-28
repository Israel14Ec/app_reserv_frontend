"use client";

import { ServicioList } from "@/components/servicio/ServicioList";
import { Button } from "@/components/ui/button";
import { useServicio } from "@/src/hooks/useServicio";
import { Servicio } from "@/src/types/servicio";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ServiciosPage() {

  const { getAllServicio } = useServicio();
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true)
  const [servicios, setServicios] = useState<Servicio[]>([]);

  const getServicio = async () => {
    try {
      const idProfesional = localStorage.getItem("id_profesional");
      if (!idProfesional) {
        toast.error("No hay id profesional");
        return;
      }
      const response = await getAllServicio(idProfesional);
      setServicios(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setReload(false)
    }
  };

  useEffect(() => {
    if(reload === true) {
      getServicio();
    }
  }, [reload]);

  return (
    <>
      <section className="flex items-center justify-between">
        <h1 className=" text-3xl text-zinc-800 font-semibold">Servicio</h1>
        <Button type="button" variant={"primary"} asChild>
          <Link href={"/home/servicios/nuevo"}>
            <Plus />
            Agregar
          </Link>
        </Button>
      </section>

      <div className=" mt-10"></div>

      {isLoading ? <span>Cargando</span> : (
        <ServicioList 
          servicios={servicios}
          setReload={setReload}
        />
      )}
    </>
  );
}
