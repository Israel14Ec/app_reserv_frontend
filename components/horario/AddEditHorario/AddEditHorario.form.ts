import { DiasAtencionSchema } from "@/src/types/horario"
import { z } from "zod"


export const FormSchema = z.object({
    dia_atencion: DiasAtencionSchema,
    hora_inicio: z.string().min(1, {message: "Campo obligatorio."}),
    hora_fin: z.string().min(1, {message: "Campo obligatorio."}),
})

export type FormValues = z.infer<typeof FormSchema>

export const defaultValues : FormValues = {
    dia_atencion: "lunes",
    hora_inicio: "",
    hora_fin: ""
}