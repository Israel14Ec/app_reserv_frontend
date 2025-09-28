"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { defaultValues, FormSchema, FormValues } from "./AddEditHorario.form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHorario } from "@/src/hooks/useHorario";
import { useEffect } from "react";

interface Props {
  idHorario?: string;
}

export function AddEditHorario({ idHorario }: Props) {
  const { handlerSave, getHorarioById, handlerEdit } = useHorario();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });
  const onSubmit = async (data: FormValues) => {
    const id_profesional = localStorage.getItem("id_profesional");

    if (!id_profesional) {
      toast.error("No existe el id_profesiona, vuelva a iniciar sesión");
      return;
    }

    const dataSend = {
      ...data,
      id_profesional: +id_profesional,
    };

    console.log(JSON.stringify(dataSend, null, 2));

    if(idHorario) {
      await handlerEdit(idHorario, dataSend)
      return
    }
    await handlerSave(dataSend);
  };

  const getData = async (id: string) => {
    const response = await getHorarioById(id);
    form.setValue("dia_atencion", response.dia_atencion);
    form.setValue("hora_inicio", response.hora_inicio);
    form.setValue("hora_fin", response.hora_fin);
  };

  useEffect(() => {
    if(idHorario) {
      getData(idHorario)
    }
  }, [idHorario])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-5"
        noValidate
      >
        <FormField
          name="dia_atencion"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Día de atención: <span className=" text-rose-500 ml-1">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el día" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="lunes">Lunes</SelectItem>
                  <SelectItem value="martes">Martes</SelectItem>
                  <SelectItem value="miercoles">Miércoles</SelectItem>
                  <SelectItem value="jueves">Jueves</SelectItem>
                  <SelectItem value="viernes">Viernes</SelectItem>
                  <SelectItem value="sabado">Sábado</SelectItem>
                  <SelectItem value="domingo">Domingo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" grid grid-cols-2 items-start gap-5">
          <FormField
            name="hora_inicio"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Hora de inicio: <span className=" text-rose-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="time" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="hora_fin"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Hora de fin: <span className=" text-rose-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="time" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className=" mt-5 flex justify-end gap-5">
          <Button type="button" variant={"secondary"} asChild>
            <Link href={`/home/horario`}>Regresar</Link>
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Form>
  );
}
