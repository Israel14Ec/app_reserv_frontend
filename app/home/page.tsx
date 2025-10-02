"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {

  const router = useRouter()
  const { getUserWithToken } = useAuth();

    const getData = async () => {


      const response = await getUserWithToken();
        const url = response.tipo_usuario === "profesional" ? `/home/gestionar-cita` : `/home/mis-citas`;
        router.push(url)
    }
  
    useEffect(() => {
      getData()
    }, [])

  return (
    <p>Redirigiendo ...</p>
  )
}
