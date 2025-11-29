'use client'; // si usás useState/useEffect en App Router
import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import UnitCard from "../components/UnitCard";

/* ================== Utilidades de marca ================== */
function BrandDAIA({ className }: { className?: string }) {
  return (
    <span aria-label="DAIA" className={className}>
      <span className="text-[#6C4CE5]">D</span>
      <span className="text-[#06B6D4]">A</span>
      <span className="text-[#F59E0B]">I</span>
      <span className="text-[#10B981]">A</span>
    </span>
  );
}

/** Reemplaza TODAS las ocurrencias exactas de "DAIA" en un string por <BrandDAIA/> */
function BrandText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/DAIA/g);
  const out: ReactNode[] = [];
  parts.forEach((part, i) => {
    if (part) out.push(<span key={`t-${i}`}>{part}</span>);
    if (i < parts.length - 1) out.push(<BrandDAIA key={`b-${i}`} />);
  });
  return <span className={className}>{out}</span>;
}

export default function DAIAHoldingLanding() {
  const DEFAULT_FORM_ENDPOINT = "https://formspree.io/f/xrbajroz";
  const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || DEFAULT_FORM_ENDPOINT;
  const DEFAULT_CONTACT_EMAIL = "daiaglab@gmail.com";
  const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL;
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | { ok: boolean; message: string }>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"es" | "en">("es");
  const [captcha, setCaptcha] = useState<null | { a: number; b: number; expiry: number; sig: string }>(null);
  useEffect(() => {
    // fetch a captcha challenge on mount
    (async () => {
      try {
        const r = await fetch('/api/captcha');
        if (r.ok) {
          const j = await r.json();
          setCaptcha(j);
        }
      } catch {}
    })();
    try {
      const saved = typeof window !== 'undefined' ? window.localStorage.getItem('daia_lang') : null;
      if (saved === 'en' || saved === 'es') {
        setLang(saved);
        return;
      }
    } catch {}
    if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('en')) {
      setLang('en');
    }
  }, []);
  const isEN = lang === 'en';
  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'es' : 'en';
      try { window.localStorage.setItem('daia_lang', next); } catch {}
      return next;
    });
  };

  const dict = isEN
    ? {
        nav: { home: "Home", about: "About", mission: "Mission", units: "Subsidiaries", contact: "Contact", talk: "Let’s Talk" },
        hero: {
          intro:
            "Innovation with purpose. We started in technology to build solutions that improve people’s lives, and we keep evolving to meet new challenges.",
          seeUnits: "See subsidiaries",
          contact: "Contact",
        },
        mission: {
          title: "Our Mission",
          text: "Research and develop technological solutions so innovation is accessible to everyone.",
          chips: ["Access", "R&D", "Real impact"],
        },
        about: {
          title: "About us",
          body:
            "DAIA is an Uruguayan holding company created to scale solutions and capital. We evolved from N&B → InnoviNex → DAIA. We operate with an agile matrix and specialized units.",
          bullets: [
            "• Simple and effective corporate governance.",
            "• Decentralized execution by subsidiaries.",
            "• Long-term vision and diversification.",
          ],
          focus: "Focus 2025",
          focusBadges: ["Technology", "Real Estate", "Pharma / Research", "Global"],
          focusLinePre: "We’re kicking off strong with ",
          focusLinePost: " while we prepare new subsidiaries.",
        },
        units: {
          title: "Subsidiaries",
          subtitle: "Currently active: ",
          activeLabel: "Operational",
          soonLabel: "Coming Soon",
          desc: {
            labs: "R&D, AI and software development. End-to-end delivery.",
            data: "Databases, dashboards and analytics.",
            props: "Real estate assets and rent management.",
            pharma: "Pharmaceutical and biotech research: formulation, analysis and preclinical development.",
            global: "Export and investments from Free Trade Zone.",
          },
        },
        what: {
          title: "What we do",
          tech: { title: "Technology", text: "Automation, apps and support." },
          data: { title: "Data", text: "Modeling, SQL and BI." },
          re: { title: "Real Estate", text: "Rent management and capex." },
          global: { title: "Global", text: "International invoicing and trade." },
        },
        contact: {
          title: "Contact",
          name: "Name",
          email: "Email",
          message: "Message",
          send: "Send",
          sending: "Sending...",
        },
        footer: {
          developedBy: "Developed by",
          rights: "All rights reserved.",
        },
      }
    : {
        nav: { home: "Inicio", about: "Quiénes somos", mission: "Misión", units: "Filiales", contact: "Contacto", talk: "Hablemos" },
        hero: {
          intro:
            "Innovación con propósito. Nacimos en tecnología para crear soluciones que mejoran la vida de las personas, y seguimos evolucionando para acompañar sus necesidades en cada nuevo desafío.",
          seeUnits: "Ver filiales",
          contact: "Contacto",
        },
        mission: {
          title: "Nuestra misión",
          text: "Investigar y desarrollar soluciones tecnológicas para que la innovación sea accesible a todos.",
          chips: ["Acceso", "I+D", "Impacto real"],
        },
        about: {
          title: "Quiénes somos",
          body:
            "DAIA es un holding uruguayo creado para escalar soluciones y capital. Evolucionamos de N&B → InnoviNex → DAIA. Operamos con una matriz ágil y unidades especializadas.",
          bullets: [
            "• Gobernanza corporativa simple y efectiva.",
            "• Ejecución descentralizada por filiales.",
            "• Visión de largo plazo y diversificación.",
          ],
          focus: "Foco 2025",
          focusBadges: ["Tecnología", "Real Estate", "Pharma / Investigación", "Global"],
          focusLinePre: "Arrancamos fuerte con ",
          focusLinePost: " mientras preparamos el aterrizaje de nuevas filiales.",
        },
        units: {
          title: "Filiales",
          subtitle: "Hoy operativa: ",
          activeLabel: "Operativa",
          soonLabel: "Próximamente",
          desc: {
            labs: "I+D, IA y desarrollo de software. Delivery end-to-end.",
            data: "Bases de datos, dashboards y analítica.",
            props: "Activos inmobiliarios y gestión de renta.",
            pharma: "Investigación farmacéutica y biotech: formulación, análisis y desarrollo preclínico.",
            global: "Exportación e inversiones desde Zona Franca.",
          },
        },
        what: {
          title: "Qué hacemos",
          tech: { title: "Tecnología", text: "Automatización, apps y soporte." },
          data: { title: "Data", text: "Modelado, SQL y BI." },
          re: { title: "Bienes Raíces", text: "Gestión de renta y capex." },
          global: { title: "Global", text: "Facturación internacional y trade." },
        },
        contact: {
          title: "Contacto",
          name: "Nombre",
          email: "Email",
          message: "Mensaje",
          send: "Enviar",
          sending: "Enviando...",
        },
        footer: {
          developedBy: "Desarrollado por",
          rights: "Todos los derechos reservados.",
        },
      } as const;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot anti-spam
    if ((data.get("_gotcha") as string)?.length) return;

    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    if (!name || !email || !message) {
      setSent({ ok: false, message: isEN ? "Please complete all fields." : "Completa todos los campos." });
      return;
    }

    // verify we have a captcha loaded
    if (!captcha) {
      setSent({ ok: false, message: isEN ? 'Captcha not loaded.' : 'Captcha no cargado.' });
      return;
    }

    // Envío a nuestra API interna que reenvía a Formspree (server-side)
    try {
      setSending(true);
      const captchaAnswer = (data.get('captcha') as string)?.trim();
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Nuevo mensaje desde DAIA Holding`,
          captchaAnswer,
          captchaA: captcha.a,
          captchaB: captcha.b,
          captchaExpiry: captcha.expiry,
          captchaSig: captcha.sig,
        }),
      });

      const json = await resp.json().catch(() => null);
      if (resp.ok && json?.ok) {
        form.reset();
        setSent({ ok: true, message: isEN ? "Thanks! We’ll get back to you soon." : "¡Gracias! Te responderemos pronto." });
        setTimeout(() => {
          window.location.href = 'gracias/';
        }, 600);
      } else {
        const message = json?.message || (isEN ? 'Could not send.' : 'No se pudo enviar.');
        setSent({ ok: false, message });
      }
    } catch (err) {
      console.error(err);
      setSent({ ok: false, message: isEN ? 'Network error while sending.' : 'Error de red al enviar.' });
    } finally {
      setSending(false);
    }
    return;

    // Fallback: abrir cliente de correo
    if (CONTACT_EMAIL) {
      const subject = encodeURIComponent(isEN ? "New message from DAIA Holding" : "Nuevo mensaje desde DAIA Holding");
      const body = encodeURIComponent((isEN ? `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}` : `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`));
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setSent({ ok: true, message: isEN ? "Opening your email client..." : "Abriendo tu cliente de correo..." });
      return;
    }

    setSent({ ok: false, message: isEN ? "Configure NEXT_PUBLIC_FORM_ENDPOINT or NEXT_PUBLIC_CONTACT_EMAIL." : "Configura NEXT_PUBLIC_FORM_ENDPOINT o NEXT_PUBLIC_CONTACT_EMAIL." });
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="size-8 rounded-lg"
              style={{ background: "linear-gradient(135deg,#6C4CE5,#5F2EEA)" }}
            />
            {/* DAIA multicolor en encabezado */}
            <BrandDAIA className="font-extrabold tracking-tight text-xl leading-none" />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#home" className="hover:opacity-70">{dict.nav.home}</a>
            <a href="#about" className="hover:opacity-70">{dict.nav.about}</a>
            <a href="#mission" className="hover:opacity-70">{dict.nav.mission}</a>
            <a href="#units" className="hover:opacity-70">{dict.nav.units}</a>
            <a href="#contact" className="hover:opacity-70">{dict.nav.contact}</a>
          </nav>
          <a
            href="#contact"
            className="md:inline-flex hidden px-4 py-2 rounded-xl border font-medium hover:shadow-sm"
          >
            {dict.nav.talk}
          </a>
          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((s) => !s)}
              className="px-3 py-2 rounded-lg border"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
          <button
            type="button"
            onClick={toggleLang}
            className="ml-3 px-3 py-2 rounded-lg border text-sm font-medium hover:shadow-sm"
            aria-label={isEN ? "Switch language to Spanish" : "Cambiar idioma a inglés"}
            title={isEN ? "Switch to Spanish" : "Cambiar a inglés"}
          >
            {isEN ? 'EN' : 'ES'}
          </button>
        </div>
        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 flex flex-col gap-3">
              <a href="#home" onClick={() => setMenuOpen(false)} className="hover:opacity-80">{dict.nav.home}</a>
              <a href="#about" onClick={() => setMenuOpen(false)} className="hover:opacity-80">{dict.nav.about}</a>
              <a href="#mission" onClick={() => setMenuOpen(false)} className="hover:opacity-80">{dict.nav.mission}</a>
              <a href="#units" onClick={() => setMenuOpen(false)} className="hover:opacity-80">{dict.nav.units}</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:opacity-80">{dict.nav.contact}</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        {/* fondo con manchas DAIA */}
        <div
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            background:
              "radial-gradient(60rem 30rem at 10% 10%, #6E45E2 0%, transparent 60%)," +
              "radial-gradient(60rem 30rem at 90% 20%, #06B6D4 0%, transparent 60%)," +
              "radial-gradient(60rem 30rem at 10% 90%, #F59E0B 0%, transparent 60%)," +
              "radial-gradient(60rem 30rem at 90% 90%, #10B981 0%, transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-28 lg:py-32">
          {/* H1 con DAIA multicolor */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
          >
            <span role="text" className="inline-flex items-baseline">
              <BrandDAIA />
              <span className="ml-2 text-neutral-900">Holding</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-4 max-w-2xl text-lg text-neutral-700"
          >
            {dict.hero.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-8 flex items-center gap-3"
          >
            <a
              href="#units"
              className="px-5 py-3 rounded-2xl font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#6C4CE5,#5F2EEA)" }}
            >
              {dict.hero.seeUnits}
            </a>
            <a href="#contact" className="px-5 py-3 rounded-2xl font-semibold border">
              {dict.hero.contact}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Misión */}
      <section id="mission" className="text-center py-14 bg-neutral-50 border-y">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold tracking-tight"
        >
          {dict.mission.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-4 max-w-3xl mx-auto text-lg text-neutral-700"
        >
          {dict.mission.text}
        </motion.p>
        <div className="mt-6 flex items-center justify-center gap-3 text-xs text-neutral-600">
          {dict.mission.chips.map((c) => (
            <span key={c} className="px-3 py-1 rounded-full border">{c}</span>
          ))}
        </div>
      </section>

      {/* Quiénes somos */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight">{dict.about.title}</h2>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              <BrandText text={dict.about.body} />
            </p>
            <ul className="mt-6 space-y-2 text-neutral-800">
              {dict.about.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-6 border shadow-sm"
          >
            <h3 className="font-bold">{dict.about.focus}</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Badge color="#06B6D4">{dict.about.focusBadges[0]}</Badge>
              <Badge color="#10B981">{dict.about.focusBadges[1]}</Badge>
              <Badge color="#F59E0B">{dict.about.focusBadges[2]}</Badge>
              <Badge color="#6C4CE5">{dict.about.focusBadges[3]}</Badge>
            </div>
            <p className="mt-4 text-neutral-700">
              {dict.about.focusLinePre}
              <span className="font-semibold">
                <BrandText text="DAIA Labs" />
              </span>{" "}
              {dict.about.focusLinePost}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filiales */}
      <section id="units" className="bg-neutral-50 border-y">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight">{dict.units.title}</h2>
          <p className="mt-2 text-neutral-700">
            {dict.units.subtitle}
            <span className="font-semibold"><BrandText text="DAIA Labs" /></span>
          </p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <UnitCard
              title="DAIA Labs"
              desc={dict.units.desc.labs}
              status="active"
              accent="#06B6D4"
              activeLabel={dict.units.activeLabel}
              soonLabel={dict.units.soonLabel}
              packages={[
                { id: 'labs-core', name: 'Core Development', price: 'Custom' },
                { id: 'labs-ai', name: 'AI Research', price: 'By estimate' },
              ]}
            />
            <UnitCard
              title="DAIA Data"
              desc={dict.units.desc.data}
              status="soon"
              accent="#6C4CE5"
              activeLabel={dict.units.activeLabel}
              soonLabel={dict.units.soonLabel}
              packages={[
                { id: 'data-basic', name: 'Analytics Starter', price: '$2k+' },
                { id: 'data-enterprise', name: 'Enterprise BI', price: 'Custom' },
              ]}
            />
            <UnitCard
              title="DAIA Properties"
              desc={dict.units.desc.props}
              status="soon"
              accent="#10B981"
              activeLabel={dict.units.activeLabel}
              soonLabel={dict.units.soonLabel}
              packages={[
                { id: 'props-manage', name: 'Property Management', price: '$500/mo+' },
                { id: 'props-invest', name: 'Investment Advisory', price: 'Custom' },
              ]}
            />
            <UnitCard
              title="DAIA Pharma Labs"
              desc={dict.units.desc.pharma}
              status="soon"
              accent="#F59E0B"
              activeLabel={dict.units.activeLabel}
              soonLabel={dict.units.soonLabel}
              packages={[
                { id: 'pharma-form', name: 'Formulation', price: 'Custom' },
                { id: 'pharma-analysis', name: 'Analytical Services', price: 'Custom' },
              ]}
            />
            <UnitCard
              title="DAIA Global"
              desc={dict.units.desc.global}
              status="soon"
              accent="#06B6D4"
              activeLabel={dict.units.activeLabel}
              soonLabel={dict.units.soonLabel}
              packages={[
                { id: 'global-trade', name: 'Trade & Export', price: 'Custom' },
                { id: 'global-fz', name: 'Free Zone Services', price: 'Custom' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Qué hacemos */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight">{dict.what.title}</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          <ServiceCard title={dict.what.tech.title} text={dict.what.tech.text} />
          <ServiceCard title={dict.what.data.title} text={dict.what.data.text} />
          <ServiceCard title={dict.what.re.title} text={dict.what.re.text} />
          <ServiceCard title={dict.what.global.title} text={dict.what.global.text} />
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" className="bg-neutral-50 border-t">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight">{dict.contact.title}</h2>
          <form
            className="mt-8 grid md:grid-cols-2 gap-4"
            method="post"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_subject" value="Nuevo mensaje desde DAIA Holding" />
            <input
              required
              name="name"
              id="name"
              autoComplete="name"
              placeholder={dict.contact.name}
              className="h-11 rounded-xl border px-4 outline-none focus:ring-4"
            />
            <input
              required
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              placeholder={dict.contact.email}
              className="h-11 rounded-xl border px-4 outline-none focus:ring-4"
            />
            <textarea
              required
              name="message"
              id="message"
              placeholder={dict.contact.message}
              className="md:col-span-2 h-32 rounded-xl border p-4 outline-none focus:ring-4"
            />
            {/* Simple math captcha (server-signed) */}
            {captcha ? (
              <div className="flex flex-col">
                <label className="text-sm mb-1">{isEN ? 'Human check' : 'Verificación humana'}: ¿Cuánto es {captcha.a} + {captcha.b}?</label>
                <input name="captcha" required placeholder={isEN ? 'Answer' : 'Respuesta'} className="h-11 rounded-xl border px-4 outline-none focus:ring-4" />
              </div>
            ) : (
              <div className="flex items-center">{isEN ? 'Loading captcha...' : 'Cargando captcha...'}</div>
            )}
            {/* honeypot */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <button
              type="submit"
              disabled={sending}
              className="w-full md:w-max px-6 h-11 rounded-2xl text-white font-semibold disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#06B6D4,#6C4CE5)" }}
            >
              {sending ? dict.contact.sending : dict.contact.send}
            </button>
            {sent && (
              <p className={`md:col-span-2 text-sm ${sent.ok ? "text-green-600" : "text-red-600"}`}>
                {sent.message}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer legal */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © 2025 <BrandDAIA /> Holding. {dict.footer.developedBy} <BrandDAIA /> Labs. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#6C4CE5" }} />
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#06B6D4" }} />
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#F59E0B" }} />
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#10B981" }} />
          </div>
        </div>
      </footer>
    </div>
  );
}
 
/* UnitCard has been moved to src/components/UnitCard.tsx */

function ServiceCard({ title, text }: { title: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border p-6 shadow-sm bg-white"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-700">{text}</p>
    </motion.div>
  );
}

function Badge({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold border" style={{ borderColor: color, color }}>
      {children}
    </span>
  );
}
