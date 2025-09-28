"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { usePaciente } from "@/src/hooks/usePaciente";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Campo obligatorio." }),
  email: z.email({ message: "Ingrese email válido" }),
  password: z.string().min(8, { message: "Ingrese mínimo 8 caracteres." }),
  direccion: z.string().optional(),
  ci_ruc: z.string().regex(/^(?:\d{10}|\d{13})$/, {message: "Ingrese 10 o 13, caracteres para el ci o ruc"}),
  celular: z
    .string()
    .regex(/^\d{10}$/, {
      message: "El celular debe tener exactamente 10 dígitos numéricos.",
    })
    .optional()
    .or(z.literal("")), 

  nota_adicional: z.string(),
  fecha_nacimiento: z
    .string()
    .min(1, { message: "Campo obligatorio." })
    .refine(
      (value) => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fecha = new Date(value);

        return fecha <= hoy;
      },
      {
        message: "La fecha de nacimiento no puede ser futura.",
      }
    ),
});

type FormaValues = z.infer<typeof FormSchema>;

export function FormPaciente() {
  const { handlerSave } = usePaciente();

  const form = useForm<FormaValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      fecha_nacimiento: "",
      nota_adicional: "",
      celular: "",
      ci_ruc: ""
    },
  });

  const onSubmit = async (dataForm: FormaValues) => {
    console.log(JSON.stringify(dataForm, null, 2))
    await handlerSave(dataForm)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3" noValidate>
        <div className=" grid grid-cols-2 gap-5 items-start">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre <span className=" text-rose-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="ci_ruc"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Cédula o Ruc <span className=" text-rose-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

         
        </div>
        
        <div className=" grid grid-cols-2 gap-5 items-start">
          <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className=" text-rose-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contraseña <span className=" text-rose-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="celular"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de celular</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="Ej: 0914567894" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="direccion"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="nota_adicional"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Información adicional</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder=" Ej: Antecendentes de enfermedades, alergias, etc"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="fecha_nacimiento"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Fecha nacimiento <span className=" text-rose-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-5 flex justify-end">
          <Button type="submit" variant={"primary"}>
            Crear cuenta
          </Button>
        </div>
      </form>
    </Form>
  );
}
