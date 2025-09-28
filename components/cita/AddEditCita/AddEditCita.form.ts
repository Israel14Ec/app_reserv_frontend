import { z } from "zod"

export const FormSchema = z.object({
    fecha_cita: z.string().min(1, {message: "Campo obligatorio."}),
    nota: z.string().optional()
})

export type FormValues = z.infer<typeof FormSchema>

export const defaultValues = {
    fecha_cita: "",
    nota: ""
}