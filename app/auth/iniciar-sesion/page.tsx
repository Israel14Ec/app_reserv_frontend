"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/src/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

const FormShema = z.object({
  email: z.email("Ingrese email válido"),
  password: z.string().min(1, { message: "Ingrese la contraseña" }),
});

type FormValues = z.infer<typeof FormShema>;

export default function IniciarSesionPage() {

  const { login } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormShema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (dataForm: FormValues) => {
    console.log(JSON.stringify(dataForm, null, 2));
    await login(dataForm)
  };

  return (
    <Card className=" w-[85%]">
      <CardHeader>
        <CardTitle className=" text-3xl text-blue-700 font-bold">
          Inicia sesión
        </CardTitle>
        <CardDescription>
          Bienvenido, inicia sesión en tu cuenta
        </CardDescription>

        <CardAction>
          <Link
            href={`/auth/crear-cuenta`}
            className=" text-blue-500 font-semibold text-sm"
          >
            Crea una cuenta
          </Link>
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

            <div className=" flex justify-end items-center gap-5">

              <Link href={`/auth/recuperar-cuenta`} className=" text-zinc-400 hover:text-zinc-800 font-semibold">
                Olvidaste tu contraseña?
              </Link>

              <Button variant={"primary"} type="submit">
                Iniciar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
