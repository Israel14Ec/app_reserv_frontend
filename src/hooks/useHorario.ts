import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "../config/api";
import { Horario, HorarioForm } from "../types/horario";

export const useHorario = () => {
    
    const router = useRouter();

    const getAllHorario = async (idProfesional: string) => {
        try {
            const { data } = await api.get<Horario[]>(`/v1/horarios/find-by-profesional/${idProfesional}`)

            return data
        } catch (error) {
            throw error
        }
    }

    const getHorarioById = async (idHorario: string) => {
        try {
            const { data } = await api.get<Horario>(`/v1/horarios/${idHorario}`)
            return data
        } catch (error) {
            throw error
        }
    }

    const handlerSave = async (dataForm: HorarioForm) => {
        try {
            const { data } = await api.post<{message: string}>(`v1/horarios`, dataForm);
            console.log(data);
            toast.success(data.message);
            router.push(`/home/horario`)
        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                toast.error(
                    error.response?.data.message || "No se pudo crear el registro"
                );
            }
            throw error;
        }
    };

    const handlerEdit = async (idHorario: string, dataForm: HorarioForm) => {
        try {
            const { data } = await api.patch<{message: string}>(`v1/horarios/${idHorario}`, dataForm);
            console.log(data);
            toast.success(data.message);
            router.push(`/home/horario`)
        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                toast.error(
                    error.response?.data.message || "No se pudo crear el registro"
                );
            }
            throw error;
        }
    };

    const handlerDelete = async (idServicio: string) => {
        try {
            const { data } = await api.delete<{message: string}>(`v1/horarios/${idServicio}`)
            toast.success(data.message);
        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                toast.error(
                    error.response?.data.message || "No se pudo crear el registro"
                );
            }
            throw error;
        }
    };

    return {
        getAllHorario,
        getHorarioById,
        handlerSave,
        handlerEdit,
        handlerDelete
    };
};
