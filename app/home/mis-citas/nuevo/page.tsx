import { AddEditCita } from "@/components/cita/AddEditCita";

export default function NuevaCitaPage() {
  return (
    <>
      <section className="flex items-center justify-between  mb-16">
        <h1 className=" text-3xl text-zinc-800 font-semibold">
          Agendar cita
        </h1>
      </section>
      <AddEditCita />
    </>
  );
}
