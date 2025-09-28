import { EstadoCita } from "@/src/types/cita";
import React from "react";

interface BadgeEstadoCitaProps {
  estado: EstadoCita;
}

export function BadgeEstadoCita({ estado }: BadgeEstadoCitaProps) {

  const estadoClasses: Record<EstadoCita, string> = {
    [EstadoCita.PENDIENTE]: "bg-yellow-100 text-yellow-800",
    [EstadoCita.CONFIRMADA]: "bg-blue-100 text-blue-800",
    [EstadoCita.CANCELADA]: "bg-red-100 text-red-800",
    [EstadoCita.COMPLETADA]: "bg-green-100 text-green-800",
    [EstadoCita.CANCELADA_CLIENTE]: "bg-red-200 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-medium ${estadoClasses[estado]}`}
    >
      {estado.charAt(0).toUpperCase() + estado.slice(1)}
    </span>
  );
}
