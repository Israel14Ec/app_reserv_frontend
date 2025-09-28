"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { defaultValues, FormSchema, FormValues } from "./AddEditServicio.form"
import { Textarea } from "@/components/ui/textarea"
import { useServicio } from "@/src/hooks/useServicio"
import toast from "react-hot-toast"
import { useEffect } from "react"

interface Props {
    id?: string;
}

export  function AddEditServicio({ id } : Props) {

    const { handlerSave, handlerEdit, getServicioById } = useServicio();

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues
    })

    const onSubmit = async (data : FormValues) => {
        const id_profesional = localStorage.getItem("id_profesional")
        
        if(!id_profesional) {
            toast.error("No existe el id_profesiona, vuelva a iniciar sesión")
            return
        }
        const dataSend = {
            ...data,
            id_profesional
        }
        if(id) {
            await handlerEdit(id, dataSend)
            return
        }
        await handlerSave(dataSend)
        
    }

    const getData = async (id: string) => {
        const response = await getServicioById(id)
        form.setValue("nombre", response.nombre)
        form.setValue("descripcion", response.descripcion)
    }

    useEffect(() => {
        if(!id) return
        getData(id)
    }, [id])

    return (
    <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-5"
            noValidate
        >
            <FormField 
                name="nombre"
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Nombre: <span className=" text-rose-500 ml-1">*</span></FormLabel>
                        <FormControl>
                            <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField 
                name="descripcion"
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Descripción: <span className=" text-rose-500 ml-1">*</span></FormLabel>
                        <FormControl>
                            <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className=" mt-5 flex justify-end gap-5">
                <Button type="button" variant={"secondary"} asChild>
                    <Link href={`/home/servicios`} >
                        Regresar
                    </Link>
                </Button>
                <Button type="submit" >
                    Guardar
                </Button>
            </div>
        </form>
    </Form>
  )
}
