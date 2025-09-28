"use client"

import { useProfesional } from "@/src/hooks/useProfesional";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Campo obligatorio." }),
  email: z.email({ message: "Ingrese email válido" }),
  password: z.string().min(8,{ message: "Ingrese mínimo 8 caracteres." }),
   ci_ruc: z.string().regex(/^(?:\d{10}|\d{13})$/, {message: "Ingrese 10 o 13, caracteres para el ci o ruc"}),
  celular: z
    .string()
    .regex(/^\d{10}$/, {
      message: "El celular debe tener exactamente 10 dígitos numéricos.",
    })
    .optional()
    .or(z.literal("")), 
  descripcion: z.string().min(1, {message: "Campo obligatorio."})
 
});

type FormaValues = z.infer<typeof FormSchema>;

export function FormProfesional() {

  const { handlerSave } = useProfesional();

  const form = useForm<FormaValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      celular: "",
      descripcion: "",
      ci_ruc: ""
    }
  });

  const onSubmit = (dataForm : FormaValues) => {
    console.log(JSON.stringify(dataForm, null, 2))
    handlerSave(dataForm)
  }

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
          name="descripcion"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Descripción profesional <span className=" text-rose-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Describe como profesional: Ej Soy un dr con experiencia ..." />
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
  )
}
