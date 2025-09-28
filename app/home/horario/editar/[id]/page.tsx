import { AddEditHorario } from "@/components/horario";

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function EditarHorarioPage({params} : Props) {
  
  const { id } = await params

  return (
    <>
      <section className="flex items-center justify-between  mb-16">
        <h1 className=" text-3xl text-zinc-800 font-semibold">
          Editar Horario
        </h1>
      </section>
      <AddEditHorario idHorario={id} />
    </>
  );
}
