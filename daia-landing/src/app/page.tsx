'use client'; // si usás useState/useEffect en App Router
import { motion } from "framer-motion";
import { useEffect, useState, useMemo, type FormEvent, type ReactNode } from "react";

/* ================== Utilidades de marca ================== */
function BrandDAIA({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 font-black ${className}`}>
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

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";
const DATA_PRICING_LEVELS = {
  basic: { rate: 0.06 },
  standard: { rate: 0.09 },
  advanced: { rate: 0.14 },
} as const;

export default function Page() {
  const DEFAULT_CONTACT_EMAIL = "daiaglab@gmail.com";
  const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL;
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | { ok: boolean; message: string }>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"es" | "en">("es");
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  
  // State for Ecosystems Logic
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  // State for Data Calculator
  const [dataConfig, setDataConfig] = useState({ volume: 1000, level: 'basic' as 'basic'|'standard'|'advanced', freq: 'monthly' });
  
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

  const dict = isEN
    ? {
        nav: { home: "Home", about: "About", mission: "Mission", units: "Ecosystems", contact: "Contact", talk: "Request Sample Audit" },
        hero: {
          title: "DAIA: Infrastructure, Technology and Integrated Business Services.",
          intro:
            "Professional audit and technology services with enterprise focus and scalable delivery.",
          seeUnits: "Request Sample Audit",
          contact: "Evaluate Audit Pilot",
        },
        mission: {
          title: "Our Mission & Vision",
          text: "To drive measurable business impact through integrated AI, data, and operations, delivering specialized services with enterprise-grade excellence. To be a global reference platform proving that sustainable growth comes from combining advanced technology, continuous R&D, and high-value professional services.",
          chips: ["AI-Powered Audits", "100% Call Coverage", "Automated Scoring"],
        },
        about: {
          title: "Who We Are",
          body:
            "DAIA is a professional audit service that uses AI to analyze calls at scale, delivering automated scoring, compliance verification, and full traceability so operations teams can make data-driven decisions without adding headcount.",
          bullets: [
            "• Continuous AI-driven call auditing",
            "• Full call coverage, no partial sampling",
            "• Automated quality and compliance scoring",
            "• Actionable reports for decision-making",
            "• Service-based delivery with operational consistency",
          ],
          focus: "Estimated Operational Impact",
          focusBadges: ["↓ 60-80% audit time", "↑ 100% call coverage", "↓ QA human error", "↑ Consistent scoring"],
          focusLinePre: "Results depend on volume and service configuration powered by ",
          focusLinePost: ", ensuring traceability, scalability, and early-risk alerts.",
        },
        units: {
          title: "Ecosystems",
          subtitle: "Ecosystems · Specialized services powered by DAIA Software Labs. Service lines that solve critical business problems, driven by proprietary technology developed by ",
          data: {
            title: "DAIA Data & Analytics",
            desc: "Professional AI call audit service for QA and voice intelligence, focused on quality, compliance, and operational improvement. Base price: USD 200/mo. Final scope defined contractually.",
            calc: {
              volLabel: "Monthly Volume (Minutes/Audios)",
              levelLabel: "Analysis Depth",
              levels: { basic: "Basic (Transcription)", standard: "Standard (+Sentiment)", advanced: "Advanced (+Custom KPI)" },
              cta: "Request Sample Audit",
              disclaimer: "*Estimated value. Final scope defined in contract.",
              basePrice: "Base price: USD 200/mo",
              upgradeHint: "Higher volumes may benefit from upgrading plans.",
              equivalenceTitle: "Optimization examples",
              equivalence: ["4,000 min Basic ≈ 1,000 min Standard", "2,500 min Standard ≈ 1,000 min Advanced"],
              howPriceTitle: "How pricing is calculated",
              howPriceBullets: ["A base monthly fee", "An incremental cost per processed minute", "Upper tiers include deeper analysis and better efficiency at scale"]
            }
          },
          support: {
            title: "DAIA Support",
            desc: "Specialized operational support to ensure proper implementation, operation, and evolution of DAIA ecosystems in production.",
            plans: {
              basic: { name: "Essential", price: "USD 45/mo", features: ["Email Support", "8x5 Coverage", "Basic Monitoring"] },
              ops: { name: "Operational", price: "USD 120/mo", features: ["Priority Channel", "12x7 Coverage", "Incident Response", "Weekly Reports"] },
              prio: { name: "Priority", price: "Custom", features: ["Dedicated Agent", "24/7 Coverage", "SLA < 1h", "Architecture Consulting"] }
            },
            cta: "Request Volume Quote"
          },
          cloud: {
            title: "DAIA Cloud",
            desc: "Internal, scalable, high-performance infrastructure powering DAIA ecosystems, designed for security, reliability, and high-volume processing under enterprise standards.",
            cta: "Learn About Infrastructure",
            badge: "In development"
          },
          lab: {
            title: "DAIA Software Lab",
            desc: "Internal R&D. We design, train, and evolve the AI models and processing systems that power all DAIA ecosystems. Not available for direct hiring.",
            badge: "Internal Division"
          },
        },
        what: {
          title: "Our Competencies",
          tech: { title: "Call Auditing", text: "AI-powered QA with 100% coverage, automated scoring, and evidence by turn for coaching and operations." },
          data: { title: "QA Automation", text: "Rule engines and AI detectors to automate checklists, compliance flags, and recurring QA workflows." },
          re: { title: "Sentiment & CX Analysis", text: "Layered sentiment, intent, and experience signals to anticipate churn and detect critical events early." },
          global: { title: "Compliance & Standards", text: "Processes aligned to ISO 18295, ISO 9001, ISO 27001 with full traceability and auditable reporting." },
        },
        how: {
          title: "How the service works",
          steps: [
            "Client signs the plan",
            "Shares audio files via Drive / shared folder / SFTP",
            "DAIA processes and audits",
            "Client receives individual and consolidated reports (PDF + DOCX)",
          ],
        },
        contact: {
          title: "Request Sample Audit",
          name: "Full Name",
          email: "Business Email",
          message: "Project Details",
          context: "Requesting:",
          send: "Submit",
          sending: "Submitting...",
        },
        footer: {
          developedBy: "Built by",
          rights: "© 2025. All rights reserved.",
          terms: "Terms & Conditions",
          termsContent: "Here the full text of the terms and conditions of the service would go...",
          close: "Close",
        },
      }
    : {
        nav: { home: "Inicio", about: "Quiénes somos", mission: "Misión", units: "Ecosistemas", contact: "Contacto", talk: "Solicitar auditoría de ejemplo" },
        hero: {
          title: "Automatizamos la auditoría de llamadas con IA para reducir costos operativos, elevar la calidad y garantizar el cumplimiento normativo sin aumentar personal.",
          intro:
            "Auditoría profesional para contact centers que necesitan escala, trazabilidad y resultados medibles, sin aumentar carga operativa.",
          seeUnits: "Solicitar auditoría de ejemplo",
          contact: "Evaluar piloto de auditoría",
        },
        mission: {
          title: "Misión & Visión",
          text: "Promover la innovación tecnológica mediante investigación y desarrollo integrados, entregando servicios especializados de alta excelencia que combinan inteligencia artificial, datos y operación para generar impacto medible y sostenible. Ser una plataforma tecnológica de referencia global, demostrando que el crecimiento empresarial sostenible surge de la integración estratégica entre tecnología avanzada, I+D continuo y servicios profesionales de alto valor.",
          chips: ["Auditoría IA continua", "Cobertura 100% de llamadas", "Scoring automatizado"],
        },
        about: {
          title: "Quiénes Somos",
          body:
            "DAIA es un servicio profesional de auditoría que utiliza inteligencia artificial para analizar llamadas de contact centers a escala. Entregamos scoring automatizado, verificación de cumplimiento normativo y trazabilidad completa, permitiendo a las operaciones tomar decisiones basadas en datos sin aumentar carga operativa.",
          bullets: [
            "• Auditoría continua impulsada por IA propia",
            "• Cobertura total de llamadas, sin muestreo parcial",
            "• Scoring automatizado de calidad y cumplimiento normativo",
            "• Reportes accionables para toma de decisiones",
            "• Modelo de servicio profesional, no software genérico",
          ],
          focus: "Impacto Operativo Estimado",
          focusBadges: ["↓ 60-80% tiempo auditoría", "↑ 100% cobertura llamadas", "↓ errores humanos en QA", "↑ consistencia en scoring"],
          focusLinePre: "Resultados estimados según volumen y configuración del servicio impulsado por ",
          focusLinePost: ", con trazabilidad, escalabilidad y alertas tempranas para reducir riesgo operativo.",
        },
        units: {
          title: "Ecosistemas",
          subtitle: "Ecosistemas · Servicios especializados powered by DAIA Software Labs. Los ecosistemas son líneas de servicio que resuelven problemas críticos del negocio, impulsadas por tecnología propia desarrollada por DAIA Software Labs.",
          data: {
            title: "DAIA Data & Analytics",
            desc: "Auditoría profesional de llamadas con IA. Auditoría, QA e inteligencia sobre comunicaciones de voz orientada a calidad, cumplimiento y mejora operativa. Scoring automatizado, verificación de cumplimiento y analítica operativa con trazabilidad. Precio base: USD 200 / mes. El alcance final se define contractualmente.",
            calc: {
              volLabel: "Volumen mensual (minutos / audios)",
              levelLabel: "Profundidad de Análisis",
              levels: { basic: "Básico (Transcripción)", standard: "Estándar (+Sentimiento)", advanced: "Avanzado (+KPIs Custom)" },
              cta: "Solicitar auditoría de ejemplo",
              disclaimer: "*Valor estimado. El alcance final se define en contrato.",
              basePrice: "Precio base: USD 200 / mes",
              upgradeHint: "A mayor volumen, puede convenir escalar de plan.",
              equivalenceTitle: "Ejemplo de optimización",
              equivalence: ["4.000 min en Básico ≈ 1.000 min en Estándar", "2.500 min en Estándar ≈ 1.000 min en Avanzado"],
              howPriceTitle: "Cómo se calcula el precio",
              howPriceBullets: ["Un costo base mensual", "Un costo incremental por minuto procesado", "Los planes superiores incluyen análisis más profundo y mayor eficiencia por volumen"]
            }
          },
          support: {
            title: "DAIA Support",
            desc: "Soporte operativo especializado para asegurar la correcta implementación, operación y evolución de los ecosistemas DAIA en entornos productivos.",
            plans: {
              basic: { name: "Essential", price: "USD 45/mes", features: ["Soporte Email", "Cobertura 8x5", "Monitoreo Básico"] },
              ops: { name: "Operational", price: "USD 120/mes", features: ["Canal Prioritario", "Cobertura 12x7", "Respuesta a Incidentes", "Reportes Semanales"] },
              prio: { name: "Priority", price: "A medida", features: ["Agente Dedicado", "Cobertura 24/7", "SLA < 1h", "Consultoría Arquitectura"] }
            },
            cta: "Solicitar cotización por volumen"
          },
          cloud: {
            title: "DAIA Cloud",
            desc: "Infraestructura interna escalable de alto rendimiento que impulsa los ecosistemas DAIA, diseñada para seguridad, confiabilidad y procesamiento de alto volumen bajo estándares enterprise.",
            cta: "Consultar Infraestructura",
            badge: "En desarrollo"
          },
          lab: {
            title: "DAIA Software Lab",
            desc: "DAIA Software Labs. I+D interno. Construimos las herramientas que potencian tu negocio. División responsable del diseño, entrenamiento y evolución de los modelos de IA y sistemas de procesamiento que impulsan todos los ecosistemas DAIA. No disponible para contratación directa.",
            badge: "División Interna"
          },
        },
        what: {
          title: "Nuestras Competencias",
          tech: { title: "Auditoría de llamadas", text: "QA con IA, cobertura 100%, scoring automatizado y evidencia turno a turno para coaching y operación." },
          data: { title: "Automatización de QA", text: "Motores de reglas y detectores IA para automatizar checklists, banderas de cumplimiento y workflows recurrentes de QA." },
          re: { title: "Análisis de sentimiento y CX", text: "Capas de sentimiento, intención y señales de experiencia para anticipar churn y detectar eventos críticos temprano." },
          global: { title: "Compliance y normas", text: "Procesos alineados a ISO 18295, ISO 9001, ISO 27001 con trazabilidad completa y reportes auditables." },
        },
        how: {
          title: "Cómo funciona el servicio",
          steps: [
            "El cliente contrata un plan",
            "Comparte los audios por Drive / carpeta compartida / SFTP",
            "DAIA procesa y audita",
            "El cliente recibe reportes individuales y consolidados (PDF + DOCX)",
          ],
        },
        contact: {
          title: "Solicitar Auditoría de Ejemplo",
          name: "Nombre Completo",
          email: "Email Corporativo",
          message: "Detalles del Proyecto",
          context: "Solicitando:",
          send: "Enviar",
          sending: "Enviando...",
        },
        footer: {
          developedBy: "Construido por",
          rights: "© 2025. Todos los derechos reservados.",
          terms: "Términos y Condiciones",
          termsContent: "Aquí iría el texto completo de los términos y condiciones del servicio...",
          close: "Cerrar",
        },
      } as const;

  // --- Logic for Data Calculator ---
  const estimatedDataPrice = useMemo(() => {
    const { volume, level } = dataConfig;
    const base = 200;
    const rate = DATA_PRICING_LEVELS[level].rate;
    const variable = volume * rate;
    return Math.max(base, Math.round(base + variable));
  }, [dataConfig]);

  const dataFeatures = useMemo(
    () =>
      isEN
        ? [
            "Automatic transcription",
            "Sentiment analysis",
            "Risk and critical event detection",
            "Quality and performance metrics",
            "Professional reports (PDF + Word)",
          ]
        : [
            "Transcripción automática",
            "Análisis de sentimiento",
            "Detección de riesgos y eventos críticos",
            "Métricas de calidad y desempeño",
            "Reportes profesionales (PDF + Word)",
          ],
    [isEN]
  );

  const currentRate = DATA_PRICING_LEVELS[dataConfig.level].rate;

  const handleHireData = () => {
    const text = `${dict.units.data.title} - ${dataConfig.volume} units - ${dataConfig.level} (${isEN ? 'Est.' : 'Est.'} $${estimatedDataPrice})`;
    setSelectedService(text);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHireSupport = (planName: string) => {
    const text = `${dict.units.support.title} - Plan ${planName}`;
    setSelectedService(text);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHireCloud = () => {
    setSelectedService(`${dict.units.cloud.title} - General Inquiry`);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

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
          service_interest: selectedService || "General Inquiry",
          _subject: `Nuevo mensaje desde DAIA`,
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
      const subject = encodeURIComponent(isEN ? "New message from DAIA" : "Nuevo mensaje desde DAIA");
      const body = encodeURIComponent((isEN ? `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}` : `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`));
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setSent({ ok: true, message: isEN ? "Opening your email client..." : "Abriendo tu cliente de correo..." });
      return;
    }

    setSent({ ok: false, message: isEN ? "Configure NEXT_PUBLIC_FORM_ENDPOINT or NEXT_PUBLIC_CONTACT_EMAIL." : "Configura NEXT_PUBLIC_FORM_ENDPOINT o NEXT_PUBLIC_CONTACT_EMAIL." });
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      {isTermsModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" 
          onClick={() => setIsTermsModalOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full m-4" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">{dict.footer.terms}</h3>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto text-sm text-neutral-700 space-y-4">
              <p>{dict.footer.termsContent}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
              <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede.</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-b-2xl text-right">
              <button onClick={() => setIsTermsModalOpen(false)} className="px-4 py-2 rounded-lg border font-medium bg-white hover:bg-neutral-100">{dict.footer.close}</button>
            </div>
          </motion.div>
        </div>
      )}
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
            <BrandText text={dict.hero.title} />
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
          
          <div className="mt-12 space-y-16">
            
            {/* 1. DAIA Data & Analytics (Calculator) */}
            <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
              <div className="p-8 md:p-10 grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-10 rounded-lg bg-[#F59E0B] flex items-center justify-center text-white font-bold text-lg">D</div>
                    <h3 className="text-2xl font-bold text-neutral-900">{dict.units.data.title}</h3>
                  </div>
                  <p className="text-neutral-600 text-lg leading-relaxed">{dict.units.data.desc}</p>
                  <ul className="mt-6 space-y-2 text-sm text-neutral-700">
                    {dataFeatures.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="text-[#F59E0B]">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-sm text-neutral-700 bg-neutral-50 border rounded-xl p-4">
                    <div className="font-semibold text-neutral-900">{dict.units.data.calc.basePrice}</div>
                    <p className="mt-1 text-neutral-700">{isEN ? "Final value is calculated by volume and depth of analysis." : "El valor final se calcula según volumen y profundidad de análisis."} {dict.units.data.calc.upgradeHint}</p>
                  </div>
                </div>
                
                {/* Calculator UI */}
                <div className="bg-neutral-50 rounded-2xl p-6 border">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-800 mb-2">{dict.units.data.calc.volLabel}</label>
                      <input 
                        type="range" min="1000" max="10000" step="100" 
                        value={dataConfig.volume} 
                        onChange={(e) => setDataConfig({...dataConfig, volume: Number(e.target.value)})}
                        className="w-full accent-[#F59E0B] h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="mt-2 text-right font-mono font-medium text-[#F59E0B]">{dataConfig.volume.toLocaleString()} min</div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-neutral-700 bg-white border rounded-xl p-3">
                      <div className="font-semibold">{dict.units.data.calc.basePrice}</div>
                      <div className="text-neutral-900 font-semibold">+ USD {currentRate.toFixed(2)} / min</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-neutral-800 mb-2">{dict.units.data.calc.levelLabel}</label>
                      <div className="grid grid-cols-1 gap-2">
                        {(['basic', 'standard', 'advanced'] as const).map((lvl) => (
                          <label key={lvl} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${dataConfig.level === lvl ? 'bg-white border-[#F59E0B] ring-1 ring-[#F59E0B]' : 'bg-white border-neutral-200 hover:border-neutral-300'}`}>
                            <input 
                              type="radio" name="level" value={lvl} 
                              checked={dataConfig.level === lvl}
                              onChange={() => setDataConfig({...dataConfig, level: lvl})}
                              className="text-[#F59E0B] focus:ring-[#F59E0B]"
                            />
                            <span className="text-sm font-medium">{dict.units.data.calc.levels[lvl]}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t flex items-center justify-between">
                      <div>
                        <span className="block text-xs text-neutral-500 uppercase tracking-wider">{isEN ? "Estimated (USD)" : "Estimado (USD)"}</span>
                        <span className="text-3xl font-bold text-neutral-900">USD {estimatedDataPrice}<span className="text-lg font-normal text-neutral-500">/mo</span></span>
                      </div>
                      <button onClick={handleHireData} className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#d97706] text-white font-semibold rounded-xl transition-colors">
                        {dict.units.data.calc.cta}
                      </button>
                    </div>
                    <div className="space-y-3 text-sm text-neutral-700 bg-white border rounded-xl p-4">
                      <div className="font-semibold text-neutral-900">{dict.units.data.calc.howPriceTitle}</div>
                      <ul className="list-disc ml-5 space-y-1">
                        {dict.units.data.calc.howPriceBullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2 text-sm text-neutral-700 bg-white border rounded-xl p-4">
                      <div className="font-semibold text-neutral-900">{dict.units.data.calc.equivalenceTitle}</div>
                      <ul className="list-disc ml-5 space-y-1">
                        {dict.units.data.calc.equivalence.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <p className="text-xs text-neutral-500">{dict.units.data.calc.upgradeHint}</p>
                    </div>
                    <p className="text-xs text-neutral-400 text-center">{dict.units.data.calc.disclaimer}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. DAIA Support (Packages) */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-lg bg-[#10B981] flex items-center justify-center text-white font-bold text-lg">S</div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900">{dict.units.support.title}</h3>
                  <p className="text-neutral-600">{dict.units.support.desc}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[dict.units.support.plans.basic, dict.units.support.plans.ops, dict.units.support.plans.prio].map((plan, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border hover:shadow-md transition-shadow flex flex-col">
                    <h4 className="font-bold text-lg text-neutral-900">{plan.name}</h4>
                    <div className="mt-2 text-2xl font-bold text-[#10B981]">{plan.price}</div>
                    <ul className="mt-6 space-y-3 flex-1">
                      {plan.features.map((f, j) => (
                        <li key={j} className="text-sm text-neutral-600 flex items-start gap-2">
                          <span className="text-[#10B981] mt-0.5">•</span> {f}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => handleHireSupport(plan.name)}
                      className="mt-8 w-full py-2 rounded-xl border border-[#10B981] text-[#10B981] font-semibold hover:bg-[#10B981] hover:text-white transition-colors"
                    >
                      {dict.units.support.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Cloud & Lab (Informational) */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Cloud */}
              <div className="bg-white p-8 rounded-3xl border shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="size-32 rounded-full bg-[#06B6D4] blur-2xl"></div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[#06B6D4]/10 text-xs font-medium border border-[#06B6D4]/30 text-[#065f6d]">
                    {dict.units.cloud.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{dict.units.cloud.title}</h3>
                <p className="text-neutral-600 mb-6">{dict.units.cloud.desc}</p>
                <button onClick={handleHireCloud} className="text-[#06B6D4] font-semibold hover:underline">
                  {dict.units.cloud.cta} →
                </button>
              </div>

              {/* Lab */}
              <div className="bg-neutral-900 p-8 rounded-3xl border shadow-sm text-white relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium border border-white/20">
                    {dict.units.lab.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#6C4CE5]">{dict.units.lab.title}</h3>
                <p className="text-neutral-300 mb-6">{dict.units.lab.desc}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight">{dict.how.title}</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          {dict.how.steps.map((step, idx) => (
            <div key={step} className="bg-white border rounded-2xl p-5 shadow-sm">
              <div className="size-9 rounded-full bg-neutral-900 text-white flex items-center justify-center font-semibold mb-3">{idx + 1}</div>
              <p className="text-sm text-neutral-800 leading-relaxed">{step}</p>
            </div>
          ))}
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
            {selectedService && (
              <div className="md:col-span-2 mb-2 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
                <span className="text-sm text-blue-800 font-medium">
                  {dict.contact.context} {selectedService}
                </span>
                <button type="button" onClick={() => setSelectedService(null)} className="text-blue-500 hover:text-blue-700 text-lg leading-none px-2">×</button>
              </div>
            )}
            <input type="hidden" name="_subject" value="Nuevo mensaje desde DAIA" />
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
              defaultValue={selectedService ? `Hola, me interesa contratar: ${selectedService}. \n\nMis dudas son:` : ''}
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
            © 2025 <BrandDAIA />. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setIsTermsModalOpen(true)} className="hover:underline">
              {dict.footer.terms}
            </button>
            <p>{dict.footer.developedBy} <BrandDAIA /> Labs</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
