"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { AsideDashboard } from "./AsideDashboard";
import { useState } from "react";
import { UsuarioApp } from "@/src/types/usuario";

interface Props {
  usuario: UsuarioApp["usuario"];
  tipoUsuario: string;
}

export function AvatarOptions({ usuario, tipoUsuario}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const logout = () => {
    router.push("/auth/iniciar-sesion");
  };

  return (
    <>
      <div className=" flex items-center gap-5 cursor-pointer">
        <button
          className=" block lg:hidden text-white"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <Menu />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className=" flex items-center gap-3 cursor-pointer">
              <Avatar className=" rounded-full flex items-center justify-center">
                <AvatarFallback className=" text-zinc-600 font-bold">
                  {usuario.nombre.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className=" hidden lg:block text-white font-semibold">
                {usuario.nombre}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Button
                variant={"ghost"}
                className=" w-full"
                onClick={() => logout()}
              >
                Cerrar sesión
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className=" bg-zinc-900">
          <SheetHeader>
            <SheetTitle className=" text-2xl text-white App">Reserv</SheetTitle>
          </SheetHeader>
          <AsideDashboard tipoUsuario={tipoUsuario} />
          <SheetFooter>&copy; Reserv App- Derechos reservados</SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
