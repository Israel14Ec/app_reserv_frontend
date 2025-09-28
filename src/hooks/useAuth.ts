import { isAxiosError } from "axios";
import { Login, RecuperarCuenta, ResetPassword } from "../types/auth";
import toast from "react-hot-toast";
import api from "../config/api";
import { useRouter } from "next/navigation";
import { UsuarioApp } from "../types/usuario";

export const useAuth = () => {
  const router = useRouter();

  const login = async (loginForm: Login) => {
    try {
      const { data } = await api.post<{
        token: string;
      }>("v1/auth", loginForm);
      //Guardar token
      localStorage.setItem("AUTH_TOKEN", data.token);
      router.push(`/home/mis-citas`);
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "No se pudo iniciar sesión"
        );
      }
      throw error;
    }
  };

  const recuperarCuenta = async(form: RecuperarCuenta) => {
    try {
      const { data } = await api.post<{message: string}>("v1/auth/recuperar-cuenta", form);
      
      toast.success(data.message)
      router.push(`/auth/iniciar-sesion`);
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "No se pudo recuperar la cuenta"
        );
      }
      throw error;
    }
  };

  const resetPassword = async(token: string, form: ResetPassword) => {
    try {

      const { data } = await api.patch<{message: string}>(`v1/auth/reset-password/${token}`, form);
      toast.success(data.message)
      router.push(`/auth/iniciar-sesion`);
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "No se pudo recuperar la cuenta"
        );
      }
      throw error;
    }
  };

  const getUserWithToken = async () => {
    try {
      const { data } = await api.get<UsuarioApp>(`v1/auth/obtener-usuario-token`)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    login,
    recuperarCuenta,
    resetPassword,
    getUserWithToken
  };
};
