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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/src/hooks/useAuth";
import { useParams } from "next/navigation";

const FormSchema = z.object({
  password: z.string().min(8, { message: "Ingrese mínimo 8 caracteres" }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ResetPasswordPage() {
  
  const { resetPassword } = useAuth();
  const { token } = useParams<{token: string}>()
  
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await resetPassword(token, data);
  };

  return (
    <Card className=" w-[85%]">
      <CardHeader>
        <CardTitle className=" text-3xl text-blue-700 font-bold">
          Ingresa tu nueva contraseña
        </CardTitle>
        <CardDescription>Ingresa tu nueva contraseña</CardDescription>

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
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nueva contraseña <span className=" text-rose-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
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
