"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

type LinkHomeProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export function LinkHome({ href, label, icon }: LinkHomeProps) {

  const pathname = usePathname()
  const hrefPathname = href.split('?')[0];

  return (
    <Link
      href={href}
      className={ ` px-5 py-2 
        rounded-lg flex items-center gap-2 hover text-white w-full
            ${pathname === hrefPathname ? " bg-zinc-600" : ""}
        `}
    >
      <div className=" text-white">{icon}</div>
      <p className=" text-sm"> { label } </p>
    </Link>
  );
}
