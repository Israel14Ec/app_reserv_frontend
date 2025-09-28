"use client"

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/src/hooks/useAuth";

const FormSchema = z.object({
    email: z.email({message: "Ingrese un email válido"})
})

type FormValues = z.infer<typeof FormSchema>

export default function RecuperarCuenta() {

    const {  recuperarCuenta } = useAuth();

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = async (data: FormValues) => {
        await recuperarCuenta(data);
    }

  return (
    <Card className=" w-[85%]">
      <CardHeader>
        <CardTitle className=" text-3xl text-blue-700 font-bold">
          Recupera tu cuenta
        </CardTitle>
        <CardDescription>
          Ingresa tu email
        </CardDescription>

        <CardAction>
          <Link2Icon />
        </CardAction>
      </CardHeader>
      <CardContent className=" mt-10">
        <Form {...form}>
          <form
            className=" space-y-5"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className=" text-rose-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
 
            <div className=" flex justify-end items-center gap-5">
              <Link
                href={`/auth/iniciar-sesion`}
                className=" text-zinc-400 hover:text-zinc-800 font-semibold"
              >
                Inicia sesión
              </Link>

              <Button variant={"primary"} type="submit">
                Recuperar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
