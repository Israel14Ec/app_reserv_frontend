import { ClipboardClock, FolderKanban, QrCode } from "lucide-react";
import { LinkHome } from "./LinkHome";

interface Props {
  tipoUsuario: string;
}

export function AsideDashboard({ tipoUsuario }: Props) {
  const Links = [
    {
      href: "/home/servicios",
      label: "Mis Servicios",
      icon: <ClipboardClock />,
    },
    {
      href: "/home/horario",
      label: "Mis horarios",
      icon: <ClipboardClock />,
    },
    {
      href: "/home/mis-citas",
      label: "Mis citas",
      icon: <ClipboardClock />,
    },
    {
      href: "/home/gestionar-cita",
      label: "Gestionar cita",
      icon: <FolderKanban />,
    },
    {
      href: "/home/mi-qr",
      label: "Mi código qr",
      icon: <QrCode />,
    },
  ];

  // Filtrar dinámicamente según tipo de usuario
  const filteredLinks = Links.filter((link) => {
    if (tipoUsuario === "paciente") {
      return link.href === "/home/mis-citas";
    } else if (tipoUsuario === "profesional") {
      return link.href !== "/home/mis-citas";
    }
    return false;
  });

  return (
    <div className="px-3 py-5 flex flex-col gap-5 w-full">
      {filteredLinks.map((link, index) => (
        <LinkHome
          key={index}
          href={link.href}
          label={link.label}
          icon={link.icon}
        />
      ))}
    </div>
  );
}
