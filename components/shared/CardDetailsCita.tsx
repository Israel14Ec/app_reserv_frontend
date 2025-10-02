import { Cita, EstadoCita } from "@/src/types/cita";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { BadgeEstadoCita } from "./BadgeEstadoCita";

interface Props {
    cita: Cita;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function CardDetailsCita({ cita, showModal, setShowModal }: Props) {


    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-md sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Detalle de la cita</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Revisa los detalles más importantes de la cita
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 flex flex-col gap-4">

                    {/* Número y estado */}
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">Número de cita:</span>
                        <span className="text-gray-900">{cita.numero_cita}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">Estado:</span>
                        <BadgeEstadoCita estado={cita.estado} />
                    </div>

                    {/* Fecha y horario */}
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">Fecha:</span>
                        <span className="text-gray-900">{format(new Date(cita.fecha_cita), "dd/MM/yyyy")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">Horario:</span>
                        <span className="text-gray-900">{cita.horario.dia_atencion}, {cita.horario.hora_inicio} - {cita.horario.hora_fin}</span>
                    </div>

                    {/* Profesional y paciente */}
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">Profesional:</span>
                        <span className="text-gray-900">{cita.profesional.usuario.nombre}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">Paciente:</span>
                        <span className="text-gray-900">{cita.paciente.usuario.nombre}</span>
                    </div>

                    {/* Servicio */}
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-700 text-sm mb-1">Servicio:</span>
                        <span className="text-gray-900 text-sm">{cita.servicio.nombre}</span>
                    </div>

                    {/* Nota */}
                    {cita.nota && (
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-700 text-sm mb-1">Nota:</span>
                            <p className="text-gray-800 text-sm">{cita.nota}</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
