import { ClipboardClock, FolderKanban } from "lucide-react";
import { LinkHome } from "./LinkHome";

export function AsideDashboard() {
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
  ];

  return (
    <div className=" px-3 py-5 flex flex-col gap-5 w-full">
      {Links.map((link, index) => (
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
