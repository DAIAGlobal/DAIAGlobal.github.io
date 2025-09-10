import { motion } from "framer-motion";

export default function DAIAHoldingLanding() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg" style={{background:"linear-gradient(135deg,#6C4CE5,#5F2EEA)"}}/>
            <span className="font-extrabold tracking-tight text-xl">DAIA</span>
            <span className="ml-2 text-xs px-2 py-1 rounded-full border">Holding</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#home" className="hover:opacity-70">Inicio</a>
            <a href="#about" className="hover:opacity-70">Quiénes somos</a>
            <a href="#units" className="hover:opacity-70">Filiales</a>
            <a href="#contact" className="hover:opacity-70">Contacto</a>
          </nav>
          <a href="#contact" className="md:inline-flex hidden px-4 py-2 rounded-xl border font-medium hover:shadow-sm">Hablemos</a>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20" style={{
          background:
            "radial-gradient(60rem 30rem at 10% 10%, #6E45E2 0%, transparent 60%),"+
            "radial-gradient(60rem 30rem at 90% 20%, #06B6D4 0%, transparent 60%),"+
            "radial-gradient(60rem 30rem at 10% 90%, #F59E0B 0%, transparent 60%),"+
            "radial-gradient(60rem 30rem at 90% 90%, #10B981 0%, transparent 60%)"
        }}/>
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-28 lg:py-32">
          <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            DAIA Holding
          </motion.h1>
          <motion.p initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.15, duration:0.6}} className="mt-4 max-w-2xl text-lg text-neutral-700">
            Innovación, capital y futuro. Nacimos en tecnología y crecemos hacia real estate, pharma y mercados globales.
          </motion.p>
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.25, duration:0.6}} className="mt-8 flex items-center gap-3">
            <a href="#units" className="px-5 py-3 rounded-2xl font-semibold text-white" style={{background:"linear-gradient(135deg,#6C4CE5,#5F2EEA)"}}>Ver filiales</a>
            <a href="#contact" className="px-5 py-3 rounded-2xl font-semibold border">Contacto</a>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <h2 className="text-3xl font-extrabold tracking-tight">Quiénes somos</h2>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              DAIA es un holding uruguayo creado para escalar soluciones y capital. Evolucionamos de N&B → InnoviNex → DAIA. Operamos con una matriz ágil y unidades especializadas.
            </p>
            <ul className="mt-6 space-y-2 text-neutral-800">
              <li>• Gobierno corporativo simple y efectivo.</li>
              <li>• Ejecución descentralizada por filiales.</li>
              <li>• Visión de largo plazo y diversificación.</li>
            </ul>
          </motion.div>
          <motion.div initial={{opacity:0, scale:0.98}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{duration:0.6}} className="rounded-3xl p-6 border shadow-sm">
            <h3 className="font-bold">Foco 2025</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Badge color="#06B6D4">Tecnología</Badge>
              <Badge color="#10B981">Real Estate</Badge>
              <Badge color="#F59E0B">Pharma/Agro</Badge>
              <Badge color="#6C4CE5">Global</Badge>
            </div>
            <p className="mt-4 text-neutral-700">Arrancamos fuerte con <span className="font-semibold">DAIA Labs</span> mientras preparamos el aterrizaje de nuevas filiales.</p>
          </motion.div>
        </div>
      </section>

      {/* Units */}
      <section id="units" className="bg-neutral-50 border-y">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight">Filiales</h2>
          <p className="mt-2 text-neutral-700">Hoy operativa: <span className="font-semibold">DAIA Labs</span>. El resto, anunciadas.</p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <UnitCard title="DAIA Labs" desc="I+D, IA y desarrollo de software. Delivery end‑to‑end." status="active" accent="#06B6D4"/>
            <UnitCard title="DAIA Data" desc="Bases de datos, dashboards y analítica." status="soon" accent="#6C4CE5"/>
            <UnitCard title="DAIA Properties" desc="Activos inmobiliarios y gestión de renta." status="soon" accent="#10B981"/>
            <UnitCard title="DAIA Pharma Labs" desc="Cáñamo, cannabis medicinal y biotech." status="soon" accent="#F59E0B"/>
            <UnitCard title="DAIA Global" desc="Exportación e inversiones desde Zona Franca." status="soon" accent="#06B6D4"/>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight">Qué hacemos</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          <ServiceCard title="Tecnología" text="Automatización, apps y soporte." />
          <ServiceCard title="Data" text="Modelado, SQL y BI." />
          <ServiceCard title="Real Estate" text="Gestión de renta y capex." />
          <ServiceCard title="Global" text="Facturación internacional y trade." />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-neutral-50 border-t">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight">Contacto</h2>
          <form className="mt-8 grid md:grid-cols-2 gap-4">
            <input placeholder="Nombre" className="h-11 rounded-xl border px-4 outline-none focus:ring-4"/>
            <input placeholder="Email" className="h-11 rounded-xl border px-4 outline-none focus:ring-4"/>
            <textarea placeholder="Mensaje" className="md:col-span-2 h-32 rounded-xl border p-4 outline-none focus:ring-4"/>
            <button type="button" className="w-full md:w-max px-6 h-11 rounded-2xl text-white font-semibold" style={{background:"linear-gradient(135deg,#06B6D4,#6C4CE5)"}}>Enviar</button>
          </form>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2025 DAIA Holding. Desarrollado por DAIA Labs. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full" style={{background:'#6C4CE5'}}/>
            <span className="inline-block h-2 w-2 rounded-full" style={{background:'#06B6D4'}}/>
            <span className="inline-block h-2 w-2 rounded-full" style={{background:'#F59E0B'}}/>
            <span className="inline-block h-2 w-2 rounded-full" style={{background:'#10B981'}}/>
          </div>
        </div>
      </footer>
    </div>
  );
}

function UnitCard({ title, desc, status, accent }: { title:string; desc:string; status:"active"|"soon"; accent:string }) {
  return (
    <motion.div initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5}}
      className="rounded-3xl border bg-white p-6 shadow-sm relative overflow-hidden">
      <div className="absolute -right-10 -top-10 size-24 rounded-full opacity-10" style={{background:accent}}/>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-neutral-700">{desc}</p>
      <div className="mt-4 flex items-center gap-2">
        {status === "active" ? (
          <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{background:accent, color:'white'}}>Operativa</span>
        ) : (
          <span className="text-xs font-semibold px-2 py-1 rounded-full border">Coming Soon</span>
        )}
      </div>
    </motion.div>
  );
}

function ServiceCard({ title, text }: { title:string; text:string }) {
  return (
    <motion.div initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5}} className="rounded-3xl border p-6 shadow-sm bg-white">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-700">{text}</p>
    </motion.div>
  );
}

function Badge({ children, color }:{ children: React.ReactNode; color: string }){
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold border" style={{borderColor: color, color}}>{children}</span>
  );
}
