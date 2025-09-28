import { AddEditServicio } from "@/components/servicio";

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function EditarServicioPage({params} : Props) {

  const { id } = await params;

  return (
    <>
      <section className="flex items-center justify-between  mb-16">
        <h1 className=" text-3xl text-zinc-800 font-semibold">
          Editar Servicio
        </h1>
      </section>

      <AddEditServicio id={id}/>
    </>
  );
}
