"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useHorario } from "@/src/hooks/useHorario";
import { Horario } from "@/src/types/horario";
import { PencilIcon, Plus, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function HorarioPage() {
  
  const [isLoading, setIsLoading] = useState(true)
  const { getAllHorario, handlerDelete } = useHorario();
  const [horarios, setHorarios] = useState<Horario[]>([])
  const [reload, setReload] = useState(true)

  const getData = async () => {
    try {        
        const id_profesional = localStorage.getItem("id_profesional");
    
        if (!id_profesional) {
            toast.error("No existe el id_profesiona, vuelva a iniciar sesión");
            return;
        }
        const response = await getAllHorario(id_profesional)
        setHorarios(response)
    } catch (error) {
        console.log(error)
    } finally {
        setReload(false)
        setIsLoading(false)
    }
  }

  const deleteItem = async (id: string) => {
    await handlerDelete(id)
    setReload(true)
  }

  useEffect(() => {
    if(!reload) return
    getData();
  }, [reload])

    return (
    <>
      <section className="flex items-center justify-between">
        <h1 className=" text-3xl text-zinc-800 font-semibold">Horario</h1>
        <Button type="button" variant={"primary"} asChild>
          <Link href={"/home/horario/nuevo"}>
            <Plus />
            Agregar
          </Link>
        </Button>
      </section>
        { (!horarios && isLoading) && (
            <p>No existen datos de horario, agregue un nuevo registró</p>
        )}
      <Table className=" mt-5">
        <TableCaption>Lista de horarios registrados</TableCaption>
        <TableHeader className="bg-zinc-600">
            <TableRow className=" bg-zinc-700">
                <TableHead className=" text-white">Dia de atención</TableHead>
                <TableHead className=" text-white">Hora de inicio</TableHead>
                <TableHead className=" text-white">Hora de fin</TableHead>
                <TableHead className=" text-white w-[100px]">Acciones</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {horarios.map(item => (
                <TableRow key={item.id}>
                    <TableCell> <span className=" px-2 py-1 border border-blue-500 rounded-lg text-blue-700">{item.dia_atencion.toUpperCase()}</span> </TableCell>
                    <TableCell> {item.hora_inicio} </TableCell>
                    <TableCell> {item.hora_fin} </TableCell>
                    <TableCell className=" flex gap-2">
                        <Button variant={"outline"} className=" text-blue-500" type="button" asChild>
                            <Link href={`/home/horario/editar/${item.id}`}>
                                <PencilIcon />
                            </Link>
                        </Button>
                        <Button variant={"outline"} className=" text-red-500" type="button" onClick={() => deleteItem(`${item.id}`)}>
                            <TrashIcon />
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
