import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "../config/api";
import { Servicio, ServicioForm } from "../types/servicio";

export const useServicio = () => {
    
    const router = useRouter();

    const getAllServicio = async (idProfesional: string) => {
        try {
            const { data } = await api.get<Servicio[]>(`/v1/servicios/by-profesional/${idProfesional}`)
            return data
        } catch (error) {
            throw error
        }
    }

    const getServicioById = async (idServicio: string) => {
        try {
            const { data } = await api.get<Servicio>(`/v1/servicios/${idServicio}`)
            return data
        } catch (error) {
            throw error
        }
    }

    const handlerSave = async (dataForm: ServicioForm) => {
        try {
            const { data } = await api.post<{message: string}>(`v1/servicios`, dataForm);
            console.log(data);
            toast.success(data.message);
            router.push(`/home/servicios`)
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

    const handlerEdit = async (idServicio: string, dataForm: ServicioForm) => {
        try {
            const { data } = await api.patch<{message: string}>(`v1/servicios/${idServicio}`, dataForm);
            console.log(data);
            toast.success(data.message);
            router.push(`/home/servicios`)
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
            const { data } = await api.delete<{message: string}>(`v1/servicios/${idServicio}`)
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
        getAllServicio,
        getServicioById,
        handlerSave,
        handlerEdit,
        handlerDelete
    };
};
