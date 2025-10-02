"use client"

import { useEffect, useState } from "react";
import { AsideDashboard, AvatarOptions } from "@/components/home";
import { useAuth } from "@/src/hooks/useAuth";
import { UsuarioApp } from "@/src/types/usuario";
import { useRouter } from "next/navigation";

export default function LayoutHome({children}: Readonly<{children: React.ReactNode}>) {
  
  const router = useRouter();
  const { getUserWithToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true)
  const [usuario, setUsuario] = useState<UsuarioApp>()
  
  const getData = async () => {
    try {
      setIsLoading(true)
      const response = await getUserWithToken();
      setUsuario(response)
      const id_profesional = `${response.profesional?.id || ""}`
      const id_paciente = `${response.paciente?.id || ""}`
      localStorage.setItem('id_profesional', id_profesional) //Guarda en local, este id se necesita para las peticiones
      localStorage.setItem('id_paciente', id_paciente) //Guarda en local, este id se necesita para las peticiones
    } catch (error) {
      localStorage.clear();
      router.push(`/auth/iniciar-sesion`)
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if(isLoading) return <span>Cargando ...</span>
  if(!usuario) return <span className="text-red-500 font-semibold">Primero inicie sesión</span>
  
  return (
      <div className=" flex flex-col h-dvh relative">
      <header className="py-3 px-3 lg:px-10 flex justify-between items-center border-b fixed w-full z-10 bg-zinc-800">
        <div className="border-l-2 px-5">
            <AvatarOptions usuario={usuario.usuario} tipoUsuario={usuario.tipo_usuario} />
        </div>
        <p className=" text-blue-100 font-bold text-2xl uppercase">{usuario.tipo_usuario === "profesional" ? "Profesional" : "Paciente"} </p>
      </header>
      <div className=" flex-1 flex flex-row mt-10">
        <aside className="hidden lg:flex border-r-2 py-5 bg-zinc-900 w-72 fixed h-full">
          <AsideDashboard tipoUsuario={usuario.tipo_usuario} />
        </aside>
        <main className=" w-full p-10 lg:ml-72">
          {children}
        </main>
      </div>
    </div>
  )
}
