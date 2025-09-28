import toast from "react-hot-toast"
import api from "../config/api"
import { PacienteForm } from "../types/paciente"
import { isAxiosError } from "axios"
import { useRouter } from "next/navigation"

export const usePaciente = () => {

    const router = useRouter()

    const handlerSave = async (dataForm: PacienteForm) => {
        try {
            const { data } = await api.post<{
                message: string
            }>(`v1/pacientes`, dataForm)
            console.log(data)
            toast.success(data.message)
            router.push(`/auth/iniciar-sesion`)
        } catch (error) {
            console.log(error)
            if(isAxiosError(error)) {
                toast.error(error.response?.data.message || "No se pudo crear el registro")
            }
            throw error
        }
    }

    return {
        handlerSave
    }
}