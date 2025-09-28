import { Servicio } from "@/src/types/servicio";
import Link from "next/link";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useServicio } from "@/src/hooks/useServicio";
import { Dispatch, SetStateAction } from "react";

interface Props {
  servicios: Servicio[];
  setReload: Dispatch<SetStateAction<boolean>>
}

export function ServicioList({ servicios, setReload }: Props) {

    const { handlerDelete } = useServicio();

    const deleteItem = async (id: string) => {
        await handlerDelete(id)
        setReload(true)
    }

  return (
    <ul className=" flex flex-wrap gap-5 items-start">
      {servicios.map((item) => (
        <li className=" bg-zinc-100 p-5 shadow rounded-lg w-[350px]" key={item.id}>
          <div className=" flex flex-row justify-between">
            <div>
              <p className=" text-lg font-semibold text-zic-700">
                Servicio: <span className="font-normal">{item.nombre} </span>
              </p>
              <p className=" mt-3 text-zinc-500">{item.descripcion}</p>
            </div>
            <div className=" flex flex-col gap-2">
              <Button variant={"outline"} className=" text-blue-500" asChild>
                <Link href={`/home/servicios/editar/${item.id}`}>
                    <PencilIcon />
                </Link>
              </Button>
              <Button variant={"outline"} className=" text-red-500" type="button" onClick={() => deleteItem(`${item.id}`)}>
                <TrashIcon />
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
