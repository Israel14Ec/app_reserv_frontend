import Image from "next/image"

export default function AuthLayout({children} : Readonly<{children: React.ReactNode}>) {
  return (
    <section className=" grid grid-cols-1 lg:grid-cols-[550px_1fr] gap-5">
      <aside className=" relative w-full h-[25px] lg:h-dvh mb-[100px] lg:mb-0">
         <Image
          src="/imagen_background.jpg"
          alt="Imagen background"
          fill 
          className="object-cover" 
        />
      </aside>
      <aside className=" flex items-center justify-center p-5 lg:p-10 h-dvh ">
            { children}
      </aside>
    </section>
  )
}
