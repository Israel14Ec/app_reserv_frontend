import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "../config/api";
import { ProfesionalForm } from "../types/profesional";

export const useProfesional = () => {

  const router = useRouter();

  const handlerSave = async (dataForm: ProfesionalForm) => {
    try {
      const { data } = await api.post<{
        message: string;
      }>(`v1/profesionales`, dataForm);
      console.log(data);
      toast.success(data.message);
      router.push(`/auth/iniciar-sesion`);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response);
        toast.error(
          error.response?.data.message || "No se pudo crear el registro"
        );
      }
      throw error;
    }
  };

  
  return {
    handlerSave
  };
};
