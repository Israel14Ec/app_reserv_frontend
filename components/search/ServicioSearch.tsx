import { cn } from "@/lib/utils";
import { useServicio } from "@/src/hooks/useServicio";
import { Servicio } from "@/src/types/servicio";
import { Check, User } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface Props {
  idProfesional: string;
  setServicioSelect: Dispatch<SetStateAction<Servicio| undefined>> ;
  servicioSelect: Servicio | undefined;
  noRequerido?: boolean;
  servicioApi?: Servicio
}

export function ServicioSearch({
  idProfesional,
  setServicioSelect,
  servicioSelect,
  noRequerido,
  servicioApi
}: Props) {
  
  const { getAllServicio } = useServicio();
  const [open, setOpen] = useState(false);
  const [servicios, setServicios] = useState<Servicio[]>([])

  const getData = async () => {
    const response = await getAllServicio(idProfesional);
    setServicios(response);
  };

  useEffect(() => {
    getData();
  }, [idProfesional]);

  //llenar al editar
  useEffect(() => {
    if(servicioApi) {
      console.log(servicioApi)
      setServicioSelect(servicioApi)
    }
  }, [servicioApi])

  return (
    <div className=" flex flex-col gap-2">
      <Label>
        Servicio{" "}
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
            {servicioSelect
              ? `${servicioSelect.nombre}`
              : "Busque el servicio por el nombre"}
            <User />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Buscar ..." className="h-9" />
            <CommandList>
              <CommandEmpty>Servicio no encontrado</CommandEmpty>
              <CommandGroup>
                {servicios.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.nombre}
                    onSelect={() => {
                      setServicioSelect(item);
                      setOpen(false);
                    }}
                  >
                    {item.nombre} 
                    <Check
                      className={cn(
                        "ml-auto",
                        item.id === servicioSelect?.id
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
