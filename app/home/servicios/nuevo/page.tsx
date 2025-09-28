import { AddEditServicio } from "@/components/servicio";

export default function NuevoServicioPage() {
  return (
    <>
      <section className="flex items-center justify-between  mb-16">
        <h1 className=" text-3xl text-zinc-800 font-semibold">Agregar Servicio</h1>
      </section>

      <AddEditServicio />
    </>
  );
}
