import { Servicio } from "@/src/types/servicio";
import { FileText } from "lucide-react";

interface Props {
  servicio: Servicio;
}

export default function ServicioCard({ servicio }: Props) {
  return (
    <div className="bg-white p-3 shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-200">
      {/* Título con ícono */}
      <h3 className="text-sm font-semibold text-blue-600 flex items-center gap-1 mb-2">
        <FileText className="w-4 h-4 text-blue-500" />
        Servicio:{" "}
        <span className="text-zinc-600 font-normal">{servicio.nombre}</span>
      </h3>

      {/* Separador */}
      <div className="border-b border-gray-200 mb-2"></div>

      {/* Descripción */}
      <div className="flex flex-col gap-1">
        <span className="text-zinc-500 font-medium text-xs">Descripción:</span>
        <p className="text-zinc-700 text-xs leading-snug">
          {servicio.descripcion}
        </p>
      </div>
    </div>
  );
}
