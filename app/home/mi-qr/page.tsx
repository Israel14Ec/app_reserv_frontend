"use client"

import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

export default function MiQrPage() {
    const idProfesional = localStorage.getItem("id_profesional")

  const url = `${process.env.NEXT_PUBLIC_FRONT_URL}/home/agendar-cita-rapido/${idProfesional}`; // Link local
  const qrRef = useRef<SVGSVGElement | null>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;

    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const downloadUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "codigo-qr.svg";
    a.click();

    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <>
      <section className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-zinc-800 font-semibold">Mi QR</h1>
      </section>

      <div className="grid grid-cols-2 gap-6 items-center h-[500px] bg-gray-50 p-8 rounded-lg shadow-md">
        {/* QR Code */}
        <div className="flex flex-col items-center gap-4">
          <QRCodeSVG
            ref={qrRef}
            value={url}
            width={180}
            height={180}
            bgColor="#ffffff"
            fgColor="#000000"
          />
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition cursor-pointer"
          >
            Descargar QR
          </button>
        </div>

        {/* Texto explicativo */}
        <div className="flex flex-col justify-center text-zinc-800">
          <h2 className="text-xl font-semibold mb-2">¡Comparte tu código QR!</h2>
          <p className="text-zinc-600 leading-relaxed">
            Utiliza tu código y muéstralo a tus pacientes para que puedan agendar
            una cita contigo más rápido. <br />
            (Deben tener iniciada sesión en una cuenta para esto)
          </p>
        </div>
      </div>
    </>
  );
}
