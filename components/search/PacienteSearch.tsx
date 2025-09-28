import { usePaciente } from "@/src/hooks/usePaciente"
import { Paciente } from "@/src/types/paciente";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";
import { Check, User } from "lucide-react";
import { Label } from "../ui/label";

interface Props {
  setPacienteSelect: Dispatch<SetStateAction <Paciente | undefined>>;
  pacienteSelect: Paciente | undefined;
  noRequerido?: boolean;
}

export function PacienteSearch({
  setPacienteSelect,
  pacienteSelect,
  noRequerido
} : Props) {

  const { getAllPaciente } = usePaciente();
  const [open, setOpen] = useState(false)
  const [pacientes, setPacientes] = useState<Paciente[]>([])

  const getData = async () => {
    const paciente = await getAllPaciente()
    setPacientes(paciente)
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className=" flex flex-col gap-2">
      <Label>
        Paciente {!noRequerido && <span className=" text-rose-500 ml-1">*</span>} 
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant={'outline'} role="combobox" aria-expanded={open} className=" w-full flex justify-between font-normal">
              { pacienteSelect ? `${pacienteSelect.usuario.ci_ruc} - ${pacienteSelect.usuario.nombre}`: "Busque el usuario por la cédula o RUC" }
              <User />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
          <Command>
            <CommandInput placeholder="Buscar ..." className="h-9" />
            <CommandList>
              <CommandEmpty>Usuario no encontrado</CommandEmpty>
              <CommandGroup>
                {pacientes.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.usuario.ci_ruc}
                    onSelect={() => {
                      setPacienteSelect(item)
                      setOpen(false)
                    }}
                  >
                    {item.usuario.ci_ruc} - {item.usuario.nombre}
                    <Check
                      className={cn(
                        "ml-auto",
                        item.usuario.ci_ruc === pacienteSelect?.usuario?.ci_ruc ? "opacity-100" : "opacity-0"
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
  )
}
