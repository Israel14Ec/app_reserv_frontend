"use client";

import { FormPaciente, FormProfesional } from "@/components/crear-cuenta";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useState } from "react";

export default function CrearCuentaPage() {

  const [tipoCuenta, setTipoCuenta] = useState('paciente');

  return (
    <Card className=" w-[85%]">
      <CardHeader>
        <CardTitle className=" text-zinc-700 text-3xl">Crear cuenta de <span className=" text-blue-700 font-bold"> {tipoCuenta === "paciente" ? "Paciente" : "Profesional"} </span> </CardTitle>
        <CardDescription>
          Crea una cuenta como profesional o paciente, para comenzar a gestionar tus citas
        </CardDescription>
        <CardAction>
          <Link
            href={`/auth/iniciar-sesion`}
            className=" text-blue-500 font-semibold text-sm"
          >
            Iniciar sesión
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className=" flex flex-row gap-5 items-center justify-between">
          <Label>Selecciona el tipo de cuenta:</Label>
          <RadioGroup 
            value={tipoCuenta}
            onValueChange={setTipoCuenta}
          >
            <div className=" flex flex-row gap-5">
              <div className=" flex flex-row gap-2 items-center">
                <RadioGroupItem value="paciente" id="paciente" />
                <span>Paciente</span>
              </div>
              <div className=" flex flex-row gap-2 items-center">
                <RadioGroupItem value="prefesional" id="prefesional" />
                <span>Profesional</span>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/** Formularios */}
        <div className=" mt-10">
          {
            tipoCuenta === "paciente" ? <FormPaciente/> : <FormProfesional />
          }
        </div>
      </CardContent>
    </Card>
  );
}
