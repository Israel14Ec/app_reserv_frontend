"use client";

import {
  HorarioSearch,
  ProfesionalSearch,
  ServicioSearch,
} from "@/components/search";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCita } from "@/src/hooks/useCita";
import { HorarioDisponible } from "@/src/types/horario";
import { Profesional } from "@/src/types/profesional";
import { Servicio } from "@/src/types/servicio";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FormSchema, FormValues, defaultValues } from "./AddEditCita.form";
import Link from "next/link";

interface Props {
  idCita?: string;
}

export function AddEditCita({ idCita }: Props) {
  const { handlerSave, getCitaById, handlerEdit } = useCita();

  const [profesional, setProfesional] = useState<Profesional | undefined>(
    undefined
  );
  const [servicio, setServicio] = useState<Servicio | undefined>(undefined);
  const [horario, setHorario] = useState<HorarioDisponible | undefined>(
    undefined
  );

  //Datos al editar
  const [profesionalApi, setProfesionalApi] = useState<Profesional | undefined>(
    undefined
  );
  const [servicioApi, setServicioApi] = useState<Servicio | undefined>(
    undefined
  );
  const [horarioApi, setHorarioApi] = useState<
    HorarioDisponible | undefined
  >(undefined);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const fechaCita = form.watch("fecha_cita");

  const onSubmit = async (data: FormValues) => {
    if (!profesional) {
      toast.error("Seleccione el profesional");
      return;
    }
    if (!servicio) {
      toast.error("Seleccione el servicio");
      return;
    }
    if (!horario) {
      toast.error("Seleccione el horario");
      return;
    }

    const id_paciente = localStorage.getItem("id_paciente");

    if (!id_paciente) {
      toast.error("Inicie seión como paciente");
      return;
    }

    const dataSend = {
      fecha_cita: data.fecha_cita,
      id_paciente: +id_paciente,
      id_profesional: +profesional.id,
      id_horario: +horario.id,
      id_servicio: +servicio.id,
      nota: data.nota,
    };

    console.log(JSON.stringify(dataSend, null, 2));
    if(idCita) {
      await handlerEdit(idCita, dataSend)
      return
    }
    await handlerSave(dataSend);
  };

  const getData = async (idCita: string) => {
    const response = await getCitaById(idCita);
    form.setValue("fecha_cita", response.fecha_cita);
    form.setValue("nota", response.nota);
    setProfesionalApi(response.profesional);
    setServicioApi(response.servicio);
    setHorario({
      id: response.horario.id,
      dia_atencion: response.horario.dia_atencion,
      hora_inicio: response.horario.hora_inicio,
      hora_fin: response.horario.hora_fin,
      citas: [],
      disponible: true
    });
    setHorarioApi({
      id: response.horario.id,
      dia_atencion: response.horario.dia_atencion,
      hora_inicio: response.horario.hora_inicio,
      hora_fin: response.horario.hora_fin,
      citas: [],
      disponible: true
    });
  };

  useEffect(() => {
    if (idCita) {
      getData(idCita);
    }
  }, [idCita]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-5"
        noValidate
      >
        <div className=" grid grid-cols-2 gap-5 items-start">
          <FormField
            name="fecha_cita"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Fecha cita: <span className=" text-rose-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ProfesionalSearch
            profesionalSelect={profesional}
            setProfesionalSelect={setProfesional}
            profesionalApi={profesionalApi}
          />
        </div>
        <FormField
          name="nota"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nota:</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Ej: Eh presentado sintomas de ... o se requiere que el profesional ..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {profesional && (
          <ServicioSearch
            idProfesional={`${profesional.id}`}
            setServicioSelect={setServicio}
            servicioSelect={servicio}
            servicioApi={servicioApi}
          />
        )}

        {servicio && (
          <div className=" bg-white px-5 py-2 shadow-lg rounded-lg">
            <h3 className=" text-blue-500 font-semibold text-lg">
              Servicio:{" "}
              <span className=" text-zinc-500">{servicio.nombre}</span>
            </h3>
            <div className="flex flex-col gap-1 mt-5">
              <span className=" text-zinc-500">Descripción:</span>
              <p>{servicio.descripcion}</p>
            </div>
          </div>
        )}

        {profesional && fechaCita && (
          <HorarioSearch
            idProfesional={`${profesional.id}`}
            fecha={fechaCita}
            setHorarioSelect={setHorario}
            horarioSelect={horario}
            horarioApi={horarioApi}
          />
        )}

        <div className=" mt-5 flex justify-end gap-5">
          <Button type="button" variant={"secondary"} asChild>
            <Link href={`/home/mis-citas`}>Regresar</Link>
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Form>
  );
}
