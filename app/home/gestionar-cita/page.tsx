"use client";

import { BadgeEstadoCita, ChangeEstado } from "@/components/shared";
import { EstadoCita } from "@/src/types/cita";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCita } from "@/src/hooks/useCita";
import { Cita } from "@/src/types/cita";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function GestionarCita() {
  const { getAllCita } = useCita();

  const [citas, setCitas] = useState<Cita[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [estado, setEstado] = useState("");
  const [filter, setFilter] = useState("")

  const onFilter = (estado?: string) => {
    setFilter("")
    const id_profesional = localStorage.getItem("id_profesional");
    if (!id_profesional) {
      toast.error("No existe el id_profesional, vuelva a iniciar sesión");
      return;
    }
  
    const filter = `?id_profesional=${id_profesional}${
      estado ? `&estado=${estado}` : ""
    }`;
    setFilter(estado || "")
    getData(filter);
  };

  const getData = async (filter = "") => {
    try {
      const response = await getAllCita(filter);
      console.log(response);
      setCitas(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeSelect = (estado: string) => {
    setEstado(estado);
    if (estado === "ND") {
      onFilter("");
      return;
    }
    onFilter(estado);
  };

  useEffect(() => {
    onFilter();
  }, []);

  return (
    <>
      <section className="flex items-center justify-between">
        <h1 className=" text-3xl text-zinc-800 font-semibold">
          Citas agendadas
        </h1>
        <div className=" flex flex-row gap-5 items-start">
          <Select value={estado} onValueChange={onChangeSelect}>
            <SelectTrigger>
              {estado ? estado : "Buscar por estado"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ND">Ninguno</SelectItem>
              {Object.entries(EstadoCita).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {!citas && isLoading && (
        <p>No existen datos de horario, agregue un nuevo registró</p>
      )}
      <Table className=" mt-5">
        <TableCaption>Lista de citas registradas</TableCaption>
        <TableHeader className="bg-zinc-600">
          <TableRow className=" bg-zinc-700">
            <TableHead className=" text-white">Nro. Cita</TableHead>
            <TableHead className=" text-white">Estado</TableHead>
            <TableHead className=" text-white">Fecha cita</TableHead>
            <TableHead className=" text-white">Horas</TableHead>
            <TableHead className=" text-white">Paciente</TableHead>
            <TableHead className=" text-white">Ruc/CI Paciente</TableHead>
            <TableHead className=" text-white w-[100px]">Cambiar estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {citas.map((item) => (
            <TableRow key={item.id}>
              <TableCell> {item.numero_cita} </TableCell>
              <TableCell>
                {" "}
                {<BadgeEstadoCita estado={item.estado} />}{" "}
              </TableCell>
              <TableCell> {item.fecha_cita} </TableCell>
              <TableCell className="flex flex-col items-start gap-1">
                <span>Desde: {item.horario.hora_inicio}</span>
                <span>Hasta: {item.horario.hora_fin}</span>
              </TableCell>
              <TableCell>
                <div className=" flex flex-col gap-1">
                  <span>{item.paciente.usuario.nombre}</span>
                  <span>
                    Teléfono:{" "}
                    {item.paciente.usuario.celular
                      ? item.paciente.usuario.celular
                      : "No dispone"}
                  </span>
                </div>
              </TableCell>
              <TableCell> {item.paciente.usuario.ci_ruc} </TableCell>
              <TableCell>
                <ChangeEstado tipoUsuario="profesional" idCita={`${item.id}`} estadoCita={item.estado} onFilter={onFilter} filter={filter}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
