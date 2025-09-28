import { usePaciente } from "@/src/hooks/usePaciente";
import { Paciente } from "@/src/types/paciente";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { Check, User } from "lucide-react";
import { useProfesional } from "@/src/hooks/useProfesional";
import { Profesional } from "@/src/types/profesional";
import { Label } from "../ui/label";

interface Props {
  setProfesionalSelect: Dispatch<SetStateAction<Profesional| undefined>> ;
  profesionalSelect: Profesional | undefined;
  noRequerido?: boolean;
  profesionalApi?: Profesional
}

export function ProfesionalSearch({
  setProfesionalSelect,
  profesionalSelect,
  noRequerido,
  profesionalApi
}: Props) {
  const { getAllProfesional } = useProfesional();
  const [open, setOpen] = useState(false);
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);

  const getData = async () => {
    const response = await getAllProfesional();
    setProfesionales(response);
  };

  useEffect(() => {
    getData();
  }, []);

  //llenar al editar
  useEffect(() => {
    if(profesionalApi) {
      setProfesionalSelect(profesionalApi)
    }
  }, [profesionalApi])

  return (
    <div className=" flex flex-col gap-2">
      <Label>
        Profesional{" "}
        {!noRequerido && <span className=" text-rose-500 ml-1">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            role="combobox"
            aria-expanded={open}
            className=" w-full flex justify-between font-normal"
          >
            {profesionalSelect
              ? `${profesionalSelect.usuario.ci_ruc} - ${profesionalSelect.usuario.nombre}`
              : "Busque el usuario por la cédula o RUC"}
            <User />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Buscar ..." className="h-9" />
            <CommandList>
              <CommandEmpty>Usuario no encontrado</CommandEmpty>
              <CommandGroup>
                {profesionales.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.usuario.ci_ruc}
                    onSelect={() => {
                      setProfesionalSelect(item);
                      setOpen(false);
                    }}
                  >
                    {item.usuario.ci_ruc} - {item.usuario.nombre}
                    <Check
                      className={cn(
                        "ml-auto",
                        item.usuario.ci_ruc ===
                          profesionalSelect?.usuario?.ci_ruc
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
