import { AddEditHorario } from "@/components/horario";

export default function NuevoHorario() {
  return (
    <>
      <section className="flex items-center justify-between  mb-16">
        <h1 className=" text-3xl text-zinc-800 font-semibold">
          Agregar Horario
        </h1>
      </section>
      <AddEditHorario />
    </>
  );
}
