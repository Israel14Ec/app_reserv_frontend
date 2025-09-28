import { cn } from "@/lib/utils";
import { useHorario } from "@/src/hooks/useHorario";
import { HorarioDisponible } from "@/src/types/horario";
import { Check, User } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BadgeDisponible from "../shared/BadgeDisponible";
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
  fecha: string;
  setHorarioSelect: Dispatch<SetStateAction<HorarioDisponible | undefined>>;
  horarioSelect: HorarioDisponible | undefined;
  noRequerido?: boolean;
  horarioApi?: HorarioDisponible;
}

export function HorarioSearch({
  idProfesional,
  setHorarioSelect,
  horarioSelect,
  noRequerido,
  fecha,
  horarioApi,
}: Props) {
  const { getHorarioDisponible } = useHorario();

  const [open, setOpen] = useState(false);
  const [horario, setHorarios] = useState<HorarioDisponible[]>([]);

  const getData = async () => {
    const response = await getHorarioDisponible(idProfesional, fecha);
    let newHorarios = response;

    if (horarioApi) {
      setHorarioSelect(horarioApi);
      const index = newHorarios.findIndex((item) => item.id === horarioApi.id);

      if (index !== -1) {
        newHorarios[index] = horarioApi;
      } else {
        newHorarios = [...newHorarios, horarioApi]; // opcional, si quieres meterlo igual
      }
    }

    setHorarios(newHorarios);
  };

  useEffect(() => {
    getData();
  }, [idProfesional, fecha]);

  return (
    <div className=" flex flex-col gap-2">
      <Label>
        Horario {!noRequerido && <span className=" text-rose-500 ml-1">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            role="combobox"
            aria-expanded={open}
            className=" w-full flex justify-between font-normal"
          >
            {horarioSelect
              ? `${horarioSelect.dia_atencion}, desde: (${horarioSelect.hora_inicio}) hasta ${horarioSelect.hora_fin}`
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
                {horario.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.hora_fin}
                    onSelect={() => {
                      setHorarioSelect(item);
                      setOpen(false);
                    }}
                    disabled={item.disponible === false}
                    className=" flex w-full justify-between"
                  >
                    {item.dia_atencion}, desde: {item.hora_inicio} hasta{" "}
                    {item.hora_fin}
                    <div className=" flex items-center">
                      <BadgeDisponible disponible={item.disponible} />
                      <Check
                        className={cn(
                          "ml-auto",
                          item.id === horarioSelect?.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </div>
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
