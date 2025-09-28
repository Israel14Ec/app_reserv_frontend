import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "../config/api";
import { Cita, CitaForm, EstadoCita } from "../types/cita";

export const useCita = () => {
    
    const router = useRouter();

    const getAllCita = async (filters?: string) => {
        try {
            const { data } = await api.get<Cita[]>(`/v1/citas${filters}`)
            return data
        } catch (error) {
            throw error
        }
    }

    const getCitaById = async (idCita: string) => {
        try {
            const { data } = await api.get<Cita>(`/v1/citas/${idCita}`)
            return data
        } catch (error) {
            throw error
        }
    }


    const handlerSave = async (dataForm: CitaForm) => {
        try {
            const { data } = await api.post<{message: string}>(`v1/citas`, dataForm);
            console.log(data);
            toast.success(data.message);
            router.push(`/home/mis-citas`)
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

    const handlerEdit = async (idCita: string, dataForm: CitaForm) => {
        try {
            const { data } = await api.patch<{message: string}>(`v1/citas/${idCita}`, dataForm);
            console.log(data);
            toast.success(data.message);
            router.push(`/home/mis-citas`)
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

    const handlerDelete = async (idCita: string) => {
        try {
            const { data } = await api.delete<{message: string}>(`v1/citas/${idCita}`)
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

    const updateStatusCita =async  (idCita: string, status: string) => {
        try {
            const { data } = await api.patch<{message: string}>(`v1/citas/update-estado/${idCita}`, {estado: status})
            toast.success(`${data.message}`)

        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                toast.error(
                    error.response?.data.message || "No se pudo crear el registro"
                );
            }
            throw error;
        }
    }

    return {
        getAllCita,
        getCitaById,
        handlerSave,
        handlerEdit,
        handlerDelete,
        updateStatusCita,
    };
};
