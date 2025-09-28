import { z } from "zod";

export const DiasAtencionSchema = z.enum([
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
], {message: "Ingrese un dia válido"});

export type DiasAtencion = z.infer<typeof DiasAtencionSchema>;

export interface HorarioForm {
  dia_atencion:   DiasAtencion;
  hora_inicio:    string;
  hora_fin:       string;
  id_profesional: number;
}


export interface Horario {
  id:           number;
  dia_atencion: DiasAtencion;
  hora_inicio:  string;
  hora_fin:     string;
  createdAt:    Date;
  updatedAt:    Date;
}
