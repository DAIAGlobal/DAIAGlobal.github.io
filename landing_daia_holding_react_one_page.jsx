import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function DAIAHoldingLanding() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const ARTICLES = useMemo(() => [
    {
      id: "art-01",
      title: "Frameworks de IA para operaciones con impacto",
      excerpt: "Cómo implementamos pipelines de machine learning productivos en compañías medianas de LatAm.",
      tag: "IA aplicada",
      date: "Ago 2025",
      href: "#"
    },
    {
      id: "art-02",
      title: "Automatización con agentes inteligentes",
      excerpt: "Casos reales de automatización de procesos administrativos con agentes y copilotos internos.",
      tag: "Automation",
      date: "Jul 2025",
      href: "#"
    },
    {
      id: "art-03",
      title: "Diseño de productos digitales centrados en data",
      excerpt: "Principios para co-crear software y servicios data-driven con clientes regulados.",
      tag: "Product",
      date: "Jun 2025",
      href: "#"
    },
    {
      id: "art-04",
      title: "Stack recomendado para analítica moderna",
      excerpt: "El stack que usamos para data warehouses, modelos semánticos y BI en tiempo real.",
      tag: "Data",
      date: "May 2025",
      href: "#"
    },
    {
      id: "art-05",
      title: "Cómo levantamos squads de delivery end-to-end",
      excerpt: "Lecciones aprendidas al armar equipos distribuidos para proyectos críticos.",
      tag: "Squads",
      date: "Abr 2025",
      href: "#"
    }
  ], []);

  const handleOpenCheckout = () => {
    if (typeof window !== "undefined") {
      const target = document.getElementById("labs");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setCheckoutOpen(true);
  };

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
            <a href="#labs" className="hover:opacity-70">DAIA Labs</a>
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
            <button type="button" onClick={handleOpenCheckout} className="px-5 py-3 rounded-2xl font-semibold text-white" style={{background:"linear-gradient(135deg,#06B6D4,#6C4CE5)"}}>Comprar</button>
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
              DAIA es un holding uruguayo creado para escalar soluciones y capital. Evolucionamos de N&B - InnoviNex - DAIA. Operamos con una matriz ágil y unidades especializadas.
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
            <UnitCard
              title="DAIA Labs"
              desc="I+D, IA y desarrollo de software. Delivery end-to-end."
              status="active"
              accent="#06B6D4"
              actionLabel="Comprar"
              onAction={handleOpenCheckout}
            />
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

      {/* Labs */}
      <section id="labs" className="mx-auto max-w-6xl px-4 py-16">
        <motion.div initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
          <h2 className="text-3xl font-extrabold tracking-tight">DAIA Labs</h2>
          <p className="mt-3 max-w-2xl text-neutral-700">Artículos y novedades sobre cómo construimos productos, modelos de IA y delivery ágil desde Montevideo hacia la región.</p>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <motion.article
              key={article.id}
              initial={{opacity:0, y:12}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{duration:0.4}}
              className="relative flex h-full flex-col rounded-3xl border bg-white p-6 shadow-sm"
            >
              <span className="inline-flex w-max items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold text-neutral-600">
                <span className="inline-block size-1.5 rounded-full" style={{background:'#06B6D4'}}/>
                {article.tag}
              </span>
              <h3 className="mt-4 text-xl font-semibold leading-tight">{article.title}</h3>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{article.excerpt}</p>
              <div className="mt-6 flex items-center justify-between text-xs text-neutral-500">
                <span>{article.date}</span>
                <a href={article.href} className="font-semibold text-indigo-600 hover:text-indigo-700">Leer</a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-600">¿Querés activar DAIA Labs en tu organización? Conocé nuestro plan Pro.</p>
          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            className="px-6 py-3 rounded-2xl font-semibold text-white shadow-sm"
            style={{background:"linear-gradient(135deg,#06B6D4,#6C4CE5)"}}
          >
            Comprar
          </button>
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

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}
function UnitCard({ title, desc, status, accent, actionLabel, onAction }) {
  return (
    <motion.div initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5}}
      className="rounded-3xl border bg-white p-6 shadow-sm relative overflow-hidden flex flex-col">
      <div className="absolute -right-10 -top-10 size-24 rounded-full opacity-10" style={{background:accent}}/>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-neutral-700 flex-1">{desc}</p>
      <div className="mt-4 flex items-center gap-2">
        {status === "active" ? (
          <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{background:accent, color:'white'}}>Operativa</span>
        ) : (
          <span className="text-xs font-semibold px-2 py-1 rounded-full border">Coming Soon</span>
        )}
      </div>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 w-full rounded-2xl px-4 py-2 text-sm font-semibold text-white shadow-sm"
          style={{background:"linear-gradient(135deg,#06B6D4,#6C4CE5)"}}
        >
          {actionLabel}
        </button>
      ) : null}
    </motion.div>
  );
}


function ServiceCard({ title, text }) {
  return (
    <motion.div initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5}} className="rounded-3xl border p-6 shadow-sm bg-white">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-700">{text}</p>
    </motion.div>
  );
}


function Badge({ children, color }){
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold border" style={{borderColor: color, color}}>{children}</span>
  );
}
function CheckoutModal({ open, onClose }) {
  const totalSteps = 3;
  const [step, setStep] = useState(1);
  const [billing, setBilling] = useState({
    companyName: "",
    taxId: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: ""
  });
  const [email, setEmail] = useState("");
  const [billingLoading, setBillingLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const priceUSD = 500;

  useEffect(() => {
    if (!open) {
      setStep(1);
      setBilling({
        companyName: "",
        taxId: "",
        country: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        notes: ""
      });
      setEmail("");
      setBillingLoading(false);
      setEmailLoading(false);
    }
  }, [open]);

  const stepItems = useMemo(() => [
    { id: 1, label: "Facturación" },
    { id: 2, label: "Cuenta" },
    { id: 3, label: "Confirmación" }
  ], []);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setBilling((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillingSubmit = async (event) => {
    event.preventDefault();
    if (billingLoading) return;
    setBillingLoading(true);
    try {
      await fakeCreateCheckout({ priceUSD, billing });
      // Simulación de redirección a proveedor de pago y retorno exitoso
      setStep(2);
    } finally {
      setBillingLoading(false);
    }
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    if (emailLoading) return;
    setEmailLoading(true);
    try {
      await fakeSendMagicLink(email);
      setStep(3);
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <motion.div
            className="absolute inset-0 bg-black/30"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            onClick={onClose}
          />
          <motion.div
            initial={{opacity:0, scale:0.96, y:12}}
            animate={{opacity:1, scale:1, y:0}}
            exit={{opacity:0, scale:0.96, y:12}}
            transition={{duration:0.25}}
            className="relative z-10 w-full max-w-lg rounded-2xl border bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Paso {step} de {totalSteps}</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight">Checkout - DAIA Labs</h2>
              </div>
              <button type="button" onClick={onClose} className="rounded-full border p-1 text-xs font-semibold text-neutral-500 hover:text-neutral-700">
                Cerrar
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-neutral-400">
              {stepItems.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <span className={item.id === step ? "text-neutral-900" : "text-neutral-400"}>{item.label}</span>
                  {index < stepItems.length - 1 ? <span className="h-px w-6 bg-neutral-200"/> : null}
                </div>
              ))}
            </div>

            {step === 1 ? (
              <form className="mt-6 space-y-6" onSubmit={handleBillingSubmit}>
                <div className="rounded-2xl border bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-700">Plan Pro</p>
                  <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-900">
                    <span className="inline-block size-1.5 rounded-full" style={{background:'#06B6D4'}}/>
                    USD {priceUSD}/mes
                  </span>
                </div>

                <div className="grid gap-4">
                  <input
                    required
                    value={billing.companyName}
                    onChange={handleChange('companyName')}
                    placeholder="Nombre de la empresa"
                    className="h-11 rounded-xl border px-4 text-sm outline-none focus:ring-4"
                  />
                  <input
                    required
                    value={billing.taxId}
                    onChange={handleChange('taxId')}
                    placeholder="RUT / CI"
                    className="h-11 rounded-xl border px-4 text-sm outline-none focus:ring-4"
                  />
                  <input
                    required
                    value={billing.country}
                    onChange={handleChange('country')}
                    placeholder="País"
                    className="h-11 rounded-xl border px-4 text-sm outline-none focus:ring-4"
                  />
                  <input
                    required
                    value={billing.address}
                    onChange={handleChange('address')}
                    placeholder="Dirección"
                    className="h-11 rounded-xl border px-4 text-sm outline-none focus:ring-4"
                  />
                  <div className="grid gap-3 sm:grid-cols-3">
                    <input
                      required
                      value={billing.city}
                      onChange={handleChange('city')}
                      placeholder="Ciudad"
                      className="h-11 rounded-xl border px-4 text-sm outline-none focus:ring-4"
                    />
                    <input
                      required
                      value={billing.state}
                      onChange={handleChange('state')}
                      placeholder="Estado / Provincia"
                      className="h-11 rounded-xl border px-4 text-sm outline-none focus:ring-4"
                    />
                    <input
                      required
                      value={billing.zip}
                      onChange={handleChange('zip')}
                      placeholder="Código postal"
                      className="h-11 rounded-xl border px-4 text-sm outline-none focus:ring-4"
                    />
                  </div>
                  <textarea
                    value={billing.notes}
                    onChange={handleChange('notes')}
                    placeholder="Notas adicionales (opcional)"
                    className="h-24 rounded-xl border p-4 text-sm outline-none focus:ring-4"
                  />
                </div>

                <button
                  type="submit"
                  disabled={billingLoading}
                  className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-sm disabled:opacity-70"
                  style={{background:"linear-gradient(135deg,#06B6D4,#6C4CE5)"}}
                >
                  {billingLoading ? 'Procesando...' : 'Continuar a pago'}
                </button>
              </form>
            ) : null}

            {step === 2 ? (
              <form className="mt-6 space-y-6" onSubmit={handleEmailSubmit}>
                <div className="space-y-3">
                  <p className="text-sm text-neutral-600">Ingresá tu email. Te enviaremos un enlace para validar tu cuenta (sin contraseña).</p>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email corporativo"
                    className="h-11 rounded-xl border px-4 text-sm outline-none focus:ring-4"
                  />
                </div>
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-sm disabled:opacity-70"
                  style={{background:"linear-gradient(135deg,#06B6D4,#6C4CE5)"}}
                >
                  {emailLoading ? 'Enviando...' : 'Enviar enlace'}
                </button>
              </form>
            ) : null}

            {step === 3 ? (
              <div className="mt-6 space-y-6 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-green-100">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 text-green-600"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13.5 9.5 18 19 8"/></svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">¡Listo!</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">Te enviamos un link para validar tu cuenta. Al ingresar desde ese link, definí tu contraseña nueva.</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-sm"
                  style={{background:"linear-gradient(135deg,#06B6D4,#6C4CE5)"}}
                >
                  Cerrar
                </button>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

async function fakeCreateCheckout(payload) {
  // TODO: POST /api/checkout  (Stripe/MercadoPago/PayPal)
  // TODO: POST /api/billing   (guardar datos de facturación)
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true, paymentId: 'demo-123' }), 800);
  });
}

async function fakeSendMagicLink(email) {
  // TODO: POST /api/auth/magiclink  (enviar email con token y URL /set-password?token=...)
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true }), 700);
  });
}
