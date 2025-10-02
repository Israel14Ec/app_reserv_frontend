"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { CheckCircle2, XCircle, ClipboardCheck } from "lucide-react";
import Swal from "sweetalert2";
import { useCita } from "@/src/hooks/useCita";

interface Props {
  idCita: string;
  estadoCita?: string;
  onFilter: (estado?: string | undefined) => void;
  filter: string;
  tipoUsuario: "profesional" | "paciente";
}

export function ChangeEstado({
  idCita,
  estadoCita,
  onFilter,
  filter,
  tipoUsuario,
}: Props) {
  const { updateStatusCita } = useCita();
  const [estado, setEstado] = useState("");

  const onChangeSelect = async (estado: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Cambiara el estado, de la cita",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Rechazar",
      confirmButtonColor: "#6366f1", // morado (Tailwind purple-500)
      cancelButtonColor: "#d33", // rojo
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateStatusCita(idCita, estado);
        onFilter(filter);
        setEstado(estado);
      }
    });
  };

  useEffect(() => {
    if (!estadoCita) return;
    setEstado(estadoCita);
  }, [estadoCita]);

  const disabledCitaProfesional = estadoCita === "cancelada_cliente"

  return (
    <div className=" flex flex-col gap-1 items-start">  
      <Select value={estado} onValueChange={onChangeSelect}>
        <SelectTrigger className="w-[150px] justify-between rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500">
          {estado ? estado : "Cambiar estado"}
        </SelectTrigger>

        <SelectContent className="rounded-xl shadow-lg">
          {tipoUsuario === "profesional" && (
            <>
              <SelectItem
                value="confirmada"
                className="capitalize flex items-center gap-2"
                disabled={disabledCitaProfesional}
              >
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Confirmada
              </SelectItem>
              <SelectItem
                value="finalizada"
                className="capitalize flex items-center gap-2"
                disabled={disabledCitaProfesional}
              >
                <ClipboardCheck className="h-4 w-4 text-blue-500" />
                Finalizada
              </SelectItem>
              <SelectItem
                value="cancelada"
                className="capitalize flex items-center gap-2"
                disabled={disabledCitaProfesional}
              >
                <XCircle className="h-4 w-4 text-red-500" />
                Cancelada
              </SelectItem>
            </>
          )}

          {tipoUsuario === "paciente" && (
            <SelectItem value="cancelada_cliente" disabled={estadoCita === "cancelada"}>
              <XCircle className="h-4 w-4 text-red-500" />
              Cancelada cliente
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      
      { (estadoCita === "cancelada" && tipoUsuario === "paciente")&& (
        <>        
          <span className=" text-sm text-red-400">El profesional cancelo la cita</span>
          <span className="text-xs">(No puede cambiar el estado) </span>
        </>
      )}

      {
       ( estadoCita === "cancelada_cliente" && tipoUsuario === "profesional") && (
        <>        
          <span className=" text-sm text-red-400">El paciente cancelo la cita</span>
          <span className="text-xs">(No puede cambiar el estado) </span>
        </>
      )
      }
    </div>
  );
}
