import { z } from "zod"

export const FormSchema = z.object({
    nombre: z.string().min(1, {message: "Campo obligatorio."}),
    descripcion: z.string().min(1, {message: "Campo obligatorio."}),
})

export type FormValues = z.infer<typeof FormSchema>

export const defaultValues = {
    nombre: "",
    descripcion: ""
}