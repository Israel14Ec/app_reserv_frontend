"use client";

import { BadgeEstadoCita, ChangeEstado } from "@/components/shared";
import { EstadoCita } from "@/src/types/cita";
import { Button } from "@/components/ui/button";
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

import { EyeIcon, PencilIcon, Plus, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CardDetailsCita from "@/components/shared/CardDetailsCita";

export default function MisCitasPage() {
  const { getAllCita, handlerDelete } = useCita();

  const [showModal, setShowModal] = useState(false);
  const [citaSelect, setCitaSelect] = useState<Cita | undefined>(undefined);

  const [citas, setCitas] = useState<Cita[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [estado, setEstado] = useState("");
  const [filter, setFilter] = useState("");

  const onFilter = (estado?: string) => {
    setFilter("");
    const id_paciente = localStorage.getItem("id_paciente");
    if (!id_paciente) {
      toast.error("No existe el id_paciente, vuelva a iniciar sesión");
      return;
    }

    const filter = `?id_paciente=${id_paciente}${
      estado ? `&estado=${estado}` : ""
    }`;
    setFilter(estado || "");
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

  const deleteItem = async (id: string) => {
    await handlerDelete(id);
    onFilter();
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
        <h1 className=" text-3xl text-zinc-800 font-semibold">Mis citas</h1>
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
          <Button type="button" variant={"primary"} asChild>
            <Link href={"/home/mis-citas/nuevo"}>
              <Plus />
              Agregar
            </Link>
          </Button>
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
            <TableHead className=" text-white">Profesional</TableHead>
            <TableHead className=" text-white">Ruc/CI Profesional</TableHead>
            <TableHead className=" text-white">Cambiar estado</TableHead>
            <TableHead className=" text-white w-[100px]">Acciones</TableHead>
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
                  <span>{item.profesional.usuario.nombre}</span>
                  <span>
                    Teléfono:{" "}
                    {item.profesional.usuario.celular
                      ? item.profesional.usuario.celular
                      : "No dispone"}
                  </span>
                </div>
              </TableCell>
              <TableCell> {item.profesional.usuario.ci_ruc} </TableCell>
              <TableCell>
                <ChangeEstado
                  idCita={`${item.id}`}
                  estadoCita={item.estado}
                  onFilter={onFilter}
                  filter={filter}
                  tipoUsuario="paciente"
                />
              </TableCell>
              <TableCell className=" flex gap-2">
                <Button
                  variant={"outline"}
                  className=" text-blue-500"
                  type="button"
                  asChild
                >
                  <Link href={`/home/mis-citas/editar/${item.id}`}>
                    <PencilIcon />
                  </Link>
                </Button>
                <Button
                  variant={"outline"}
                  className=" text-red-500"
                  type="button"
                  onClick={() => deleteItem(`${item.id}`)}
                >
                  <TrashIcon />
                </Button>
                <Button
                  variant={"outline"}
                  className=" text-green-500"
                  type="button"
                  onClick={() => {
                    setCitaSelect(item);
                    setShowModal(true);
                  }}
                >
                  <EyeIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {citaSelect && (
        <CardDetailsCita
          showModal={showModal}
          setShowModal={setShowModal}
          cita={citaSelect}
        />
      )}
    </>
  );
}
