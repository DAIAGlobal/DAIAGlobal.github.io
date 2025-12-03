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
  
  useEffect(() => {
    // fetch a captcha challenge on mount
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

  // Packages for the DAIA Data & Infrastructure unit, language-aware
  const dataPackages = isEN
    ? [
        { id: 'starter-node', name: 'Starter Node', price: '$10/mo', desc: '1 vCPU · 1 GB RAM · 20 GB SSD · 2 TB transfer · Basic management', bullets: ['1 vCPU','1 GB RAM','20 GB SSD','2 TB transfer','Basic management'] },
        { id: 'pro-node', name: 'Pro Node', price: '$25/mo', desc: '2 vCPU · 4 GB RAM · 40 GB SSD · Weekly backups · Priority support', bullets: ['2 vCPU','4 GB RAM','40 GB SSD','Weekly backups','Priority support'] },
        { id: 'ultra-node', name: 'Ultra Node', price: '$70/mo', desc: '4 vCPU · 8 GB RAM · 80 GB SSD · Basic HA · Daily backups · 99.9% SLA', bullets: ['4 vCPU','8 GB RAM','80 GB SSD','Basic HA','Daily backups','99.9% SLA'] },
        { id: 'cloud-engine', name: 'DAIA Cloud Engine — Managed Infrastructure', price: 'Contact', desc: 'Operative Infrastructure: Virtual servers (VPS), firewall, backups, monitoring and security, OS tuning and optimization, data & app migration, direct support and enterprise SLA. Pricing examples: Starter $10/mo · Pro $25/mo · Ultra $70/mo · Enterprise: contact us.', bullets: ['Virtual servers (VPS)','Firewall, backups, monitoring and security','OS tuning and optimization','Data and app migration','Direct technical support and enterprise SLA'] },
        { id: 'model-marketplace', name: 'Model Marketplace — AI On-Demand', price: 'Pay per use', desc: 'Optimized models ready to use with consumption-based billing. Plug-and-play APIs.', bullets: ['Classification models','Transcription (Whisper)','Anomaly detection','Customer analytics models','Consumption-based billing'] },
        { id: 'sre-services', name: 'SRE & Professional Services', price: 'From $25', desc: 'Expert support to scale infrastructure and maintain critical operations.', bullets: ['Security hardening','Infrastructure audit','Cost optimization','Critical app deploys','24/7 observability'] },
        { id: 'monitoring-addon', name: 'Advanced Monitoring (Add-on)', price: '+$5', desc: 'Advanced monitoring and alerts.' },
        { id: 'backups-addon', name: 'Extra Backups (Add-on)', price: '+$10', desc: 'Additional backups retained according to policy.' },
        { id: 'deploy-addon', name: 'App Deploy (Add-on)', price: '+$20–80', desc: 'Deployment and configuration of the application on the platform.' },
        { id: 'security-addon', name: 'Advanced Security (Add-on)', price: '+$30–50', desc: 'Hardening and advanced security rules.' },
      ]
    : [
        { id: 'starter-node', name: 'Starter Node', price: '$10/mo', desc: '1 vCPU · 1 GB RAM · 20 GB SSD · 2 TB transferencia · Gestión básica', bullets: ['1 vCPU','1 GB RAM','20 GB SSD','2 TB transferencia','Gestión básica'] },
        { id: 'pro-node', name: 'Pro Node', price: '$25/mo', desc: '2 vCPU · 4 GB RAM · 40 GB SSD · Backups semanales · Soporte prioritario', bullets: ['2 vCPU','4 GB RAM','40 GB SSD','Backups semanales','Soporte prioritario'] },
        { id: 'ultra-node', name: 'Ultra Node', price: '$70/mo', desc: '4 vCPU · 8 GB RAM · 80 GB SSD · Alta disponibilidad básica · Backups diarios · SLA 99.9%', bullets: ['4 vCPU','8 GB RAM','80 GB SSD','Alta disponibilidad básica','Backups diarios','SLA 99.9%'] },
        { id: 'enterprise', name: 'Enterprise', price: 'Custom', desc: 'Soluciones personalizadas en arquitectura, escalamiento, redundancia, redes privadas y auditorías de seguridad.' },
        { id: 'cloud-engine', name: 'DAIA Cloud Engine — Infraestructura Gestionada', price: 'Custom', desc: 'Plataforma de servidores cloud con operación completa incluida. Servidores virtuales (VPS) optimizados, seguridad, firewall y hardening, backups automáticos, monitoreo y alertas, optimización del sistema operativo, migración de datos y aplicaciones y soporte técnico con SLA.' , bullets: ['Servidores virtuales (VPS) optimizados','Seguridad, firewall y hardening','Backups automáticos','Monitoreo y alertas','Optimización del sistema operativo','Migración de datos y aplicaciones','Soporte técnico con SLA'] },
        { id: 'model-marketplace', name: 'Model Marketplace — IA On-Demand', price: 'Custom', desc: 'Modelos listos para integración mediante API. Transcripción (Whisper), modelos de clasificación, modelos de anomalías y análisis de clientes. Enterprise / Custom (pay-per-use).', bullets: ['Transcripción (Whisper)','Modelos de clasificación','Modelos de anomalías','Análisis de clientes','Enterprise / Custom (pay-per-use)'] },
        { id: 'sre-services', name: 'SRE & Servicios Profesionales', price: 'Desde USD 25', desc: 'Servicios avanzados para optimizar y asegurar entornos productivos. Auditoría de infraestructura, optimización de costos, seguridad avanzada, deploy de aplicaciones críticas y observabilidad 24/7. Desde USD 25 por intervención.', bullets: ['Auditoría de infraestructura','Optimización de costos','Seguridad avanzada','Deploy de aplicaciones críticas','Observabilidad 24/7'] },
        { id: 'monitoring-addon', name: 'Monitoreo avanzado (Add-on)', price: '+USD 5', desc: 'Monitoreo y alertas avanzadas.' },
        { id: 'backups-addon', name: 'Backups adicionales (Add-on)', price: '+USD 10', desc: 'Backups adicionales retenidos según política.' },
        { id: 'deploy-addon', name: 'Deploy y configuración de apps (Add-on)', price: 'USD 20–80', desc: 'Despliegue y configuración de aplicaciones: USD 20–80 según complejidad.' },
        { id: 'security-addon', name: 'Hardening de seguridad (Add-on)', price: 'USD 30–50', desc: 'Hardening y reglas avanzadas de seguridad: USD 30–50.' },
      ];

  const dict = isEN
    ? {
        nav: { home: "Home", about: "About", mission: "Mission", units: "Subsidiaries", contact: "Contact", talk: "Let’s Talk" },
        hero: {
          title: "DAIA Holding: Infrastructure, Technology and Integrated Business Services.",
          intro:
            "A holding company designed to lead cloud solutions, software, support and data with corporate focus and global scalability.",
          seeUnits: "Explore Units",
          contact: "Contact Management",
        },
        mission: {
          title: "Our Mission & Vision",
          text: "To advance technological innovation through integrated R&D, infrastructure excellence, and specialized professional services. We believe sustainable business growth stems from combining rigorous research, operational resilience, and strategic execution across diversified markets.",
          chips: ["Advanced R&D", "Operational Excellence", "Strategic Growth"],
        },
        about: {
          title: "Who We Are",
          body:
            "DAIA is a technology holding focused on delivering high-performance enterprise solutions. Integrating cloud infrastructure, software development, operational support and analytics, DAIA acts as a complete ecosystem for organizations that need reliable, scalable and secure technology.",
          bullets: [
            "• 24/7 Operations",
            "• Corporate Security Protocols",
            "• Scalable Architectures",
            "• Modular Services with High Impact",
            "• International Expansion Vision",
          ],
          focus: "Core Units 2025",
          focusBadges: ["Cloud Infrastructure", "Software Development", "Technical Support", "Data & Analytics"],
          focusLinePre: "Operating across ",
          focusLinePost: ", DAIA delivers integrated enterprise solutions.",
        },
        units: {
          title: "Our Core Units",
          subtitle: "Enterprise solutions powered by: ",
          activeLabel: "Live",
          soonLabel: "Development",
          desc: {
            labs: "High-performance cloud infrastructure: VPS, Dedicated Virtual Servers and enterprise deployments. Security, scalability and continuous operation.",
            data:
              "Enterprise software applications, APIs, integrations and automation solutions for companies requiring quality and results.",
            props: "Specialized technical support, monitoring, maintenance, remote assistance and dedicated support for enterprises.",
            pharma: "Advanced analytics, applied AI, intelligent automation and process optimization for enterprise intelligence.",
            global: "Global cloud expansion and managed services across multiple regions and compliance frameworks.",
          },
        },
        what: {
          title: "Our Competencies",
          tech: { title: "Digital Solutions", text: "Custom automation, enterprise applications, SaaS development, and 24/7 technical support." },
          data: { title: "Data & Cloud", text: "Advanced analytics, cloud architecture, business intelligence, and infrastructure optimization." },
          re: { title: "Real Estate", text: "Portfolio management, asset optimization, capex planning, and institutional rentals." },
          global: { title: "Global Trade", text: "Cross-border commerce, tax-optimized invoicing, Free Zone logistics, and export strategy." },
        },
        contact: {
          title: "Start a Conversation",
          name: "Full Name",
          email: "Business Email",
          message: "Project Details",
          send: "Submit",
          sending: "Submitting...",
        },
        footer: {
          developedBy: "Built by",
          rights: "© 2025. All rights reserved.",
        },
      }
    : {
        nav: { home: "Inicio", about: "Quiénes somos", mission: "Misión", units: "Filiales", contact: "Contacto", talk: "Hablemos" },
        hero: {
          intro:
            "Un holding diseñado para liderar soluciones cloud, software, soporte y datos con enfoque corporativo y escalabilidad global.",
          seeUnits: "Explorar Unidades",
          contact: "Contactar Dirección",
        },
        mission: {
          title: "Misión & Visión",
          text: "Promover la innovación tecnológica mediante I+D integrada, excelencia en infraestructura y servicios profesionales especializados. Creemos que el crecimiento empresarial sostenible surge de combinar investigación rigurosa, resiliencia operacional y ejecución estratégica en mercados diversificados.",
          chips: ["I+D Avanzada", "Excelencia Operacional", "Crecimiento Estratégico"],
        },
        about: {
          title: "Quiénes Somos",
          body:
            "DAIA es un holding tecnológico orientado a entregar soluciones empresariales de alto desempeño. Integrando infraestructura cloud, desarrollo de software, soporte operativo y analítica, DAIA actúa como un ecosistema completo para organizaciones que necesitan tecnología confiable, escalable y segura.",
          bullets: [
            "• Operación 24/7",
            "• Protocolos de Seguridad Corporativa",
            "• Arquitecturas Escalables",
            "• Servicios Modulares de Alto Impacto",
            "• Visión de Expansión Internacional",
          ],
          focus: "Unidades Centrales 2025",
          focusBadges: ["Infraestructura Cloud", "Desarrollo de Software", "Soporte Técnico", "Data & Analytics"],
          focusLinePre: "Operando en ",
          focusLinePost: ", DAIA entrega soluciones empresariales integradas.",
        },
        units: {
          title: "Nuestras Unidades Centrales",
          subtitle: "Soluciones empresariales impulsadas por: ",
          activeLabel: "Activa",
          soonLabel: "En Desarrollo",
          desc: {
            labs: "Infraestructura cloud de alto rendimiento: VPS, Servidores Dedicados y despliegues empresariales. Seguridad, escalabilidad y operación continua.",
            data:
              "Aplicaciones de software empresarial, APIs, integraciones y soluciones de automatización para empresas que requieren calidad y resultados.",
            props: "Soporte técnico especializado, monitoreo, mantenimiento, asistencia remota y soporte dedicado para empresas.",
            pharma: "Analítica avanzada, IA aplicada, automatización inteligente y optimización de procesos para inteligencia empresarial.",
            global: "Expansión cloud global y servicios gestionados en múltiples regiones y marcos de cumplimiento.",
          },
        },
        what: {
          title: "Nuestras Competencias",
          tech: { title: "Soluciones Digitales", text: "Automatización personalizada, aplicaciones empresariales, desarrollo SaaS y soporte técnico 24/7." },
          data: { title: "Data y Cloud", text: "Analítica avanzada, arquitectura cloud, inteligencia empresarial y optimización de infraestructura." },
          re: { title: "Real Estate", text: "Gestión de cartera, optimización de activos, planificación capex y rentales institucionales." },
          global: { title: "Comercio Global", text: "Comercio transfronterizo, facturación con optimización fiscal, logística en Zona Franca y estrategia de exportación." },
        },
        contact: {
          title: "Iniciar una Conversación",
          name: "Nombre Completo",
          email: "Email Corporativo",
          message: "Detalles del Proyecto",
          send: "Enviar",
          sending: "Enviando...",
        },
        footer: {
          developedBy: "Construido por",
          rights: "© 2025. Todos los derechos reservados.",
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

    // Envío directo al endpoint público de formularios (Formspree u otro configurado)
    try {
      setSending(true);
      const resp = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new URLSearchParams({
          name,
          email,
          message,
          _subject: `Nuevo mensaje desde DAIA Holding`,
        }),
      });

      if (resp.ok) {
        form.reset();
        setSent({ ok: true, message: isEN ? "Thanks! We’ll get back to you soon." : "¡Gracias! Te responderemos pronto." });
        // Redirección suave a página de gracias (relativa para respetar basePath)
        setTimeout(() => {
          window.location.href = 'gracias/';
        }, 600);
      } else {
        const text = await resp.text();
        setSent({ ok: false, message: (isEN ? 'Could not send. ' : 'No se pudo enviar. ') + (text || '') });
      }
    } catch (err) {
      console.error(err);
      setSent({ ok: false, message: isEN ? 'Network error while sending.' : 'Error de red al enviar.' });
    } finally {
      setSending(false);
    }

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
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
          >
            <BrandText text="DAIA Holding: Infrastructure, Technology and Integrated Business Services." />
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
              title="DAIA Cloud"
              desc="High-performance cloud infrastructure: VPS, Dedicated Virtual Servers and enterprise deployments. Security, scalability and continuous operation."
              status="active"
              accent="#06B6D4"
              activeLabel={dict.units.activeLabel}
              soonLabel={dict.units.soonLabel}
              packages={[
                { id: 'cloud-vps', name: 'VPS Standard', price: 'From $10/mo' },
                { id: 'cloud-dedicated', name: 'Dedicated Servers', price: 'Custom' },
              ]}
            />
            <UnitCard
              title="DAIA Software Lab"
              desc="Enterprise software applications, APIs, integrations and automation solutions for companies requiring quality and results."
              status="active"
              accent="#6C4CE5"
              activeLabel={dict.units.activeLabel}
              soonLabel={dict.units.soonLabel}
              packages={[
                { id: 'soft-dev', name: 'Custom Development', price: 'By Project' },
                { id: 'soft-api', name: 'API Integration', price: 'Custom' },
              ]}
            />
            <UnitCard
              title="DAIA Support"
              desc="Specialized technical support, monitoring, maintenance, remote assistance and dedicated support for enterprises."
              status="active"
              accent="#10B981"
              activeLabel={dict.units.activeLabel}
              soonLabel={dict.units.soonLabel}
              packages={[
                { id: 'support-basic', name: 'Support Plan Basic', price: 'From $500/mo' },
                { id: 'support-premium', name: 'Premium Support', price: 'Custom' },
              ]}
            />
            <UnitCard
              title="DAIA Data & Analytics"
              desc="Advanced analytics, applied AI, intelligent automation and process optimization for enterprise intelligence."
              status="active"
              accent="#F59E0B"
              activeLabel={dict.units.activeLabel}
              soonLabel={dict.units.soonLabel}
              packages={[
                { id: 'data-analytics', name: 'Analytics Platform', price: 'Custom' },
                { id: 'data-ai', name: 'AI Solutions', price: 'By Estimate' },
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
            {/* honeypot */}
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
