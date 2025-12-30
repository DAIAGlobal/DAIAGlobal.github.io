'use client';

import type { Metadata } from "next";
import { useState } from "react";
import { motion } from "framer-motion";
import UnitCard, { BrandDAIA, BrandText } from "../components/UnitCard";
import Modal from "../components/Modal";

export const metadata: Metadata = {
  title: "DAIA Holding | Infraestructura y Tecnología B2B",
  description:
    "Holding tecnológico especializado en infraestructura cloud, desarrollo de software, soporte técnico y análisis de datos para empresas.",
  openGraph: {
    title: "DAIA Holding | Infraestructura y Tecnología B2B",
    description:
      "Soluciones empresariales integradas: Cloud, Software, Soporte y Data Analytics.",
    url: "https://daia-global.vercel.app/",
    siteName: "DAIA Holding",
    images: [
      {
        url: "/icon.svg",
        width: 800,
        height: 600,
        alt: "DAIA Holding",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);

  const services = [
    {
      id: 'cloud',
      title: 'Infraestructura Cloud DAIA',
      desc: 'Soluciones cloud escalables, seguras y optimizadas para tu negocio.',
      status: 'active' as const,
      accent: '#6C4CE5',
      packages: [
        { id: 'cloud-basic', name: 'Cloud Básico', price: 'Consultar', desc: 'Infraestructura inicial con soporte' },
        { id: 'cloud-pro', name: 'Cloud Pro', price: 'Consultar', desc: 'Escalabilidad avanzada y redundancia' },
      ],
    },
    {
      id: 'software',
      title: 'Desarrollo de Software DAIA',
      desc: 'Aplicaciones web y mobile personalizadas para tu empresa.',
      status: 'active' as const,
      accent: '#06B6D4',
      packages: [
        { id: 'soft-web', name: 'Web Application', price: 'Consultar', desc: 'Desarrollo full-stack moderno' },
        { id: 'soft-mobile', name: 'Mobile App', price: 'Consultar', desc: 'iOS & Android nativas o híbridas' },
      ],
    },
    {
      id: 'support',
      title: 'Soporte Técnico DAIA',
      desc: 'Asistencia 24/7 para mantener tus sistemas funcionando.',
      status: 'active' as const,
      accent: '#F59E0B',
      packages: [
        { id: 'sup-basic', name: 'Soporte Básico', price: 'Consultar', desc: 'Respuesta en 4 horas' },
        { id: 'sup-premium', name: 'Soporte Premium', price: 'Consultar', desc: 'Respuesta en 1 hora, 24/7' },
      ],
    },
    {
      id: 'analytics',
      title: 'Análisis de Datos DAIA',
      desc: 'Business Intelligence y Data Analytics para decisiones informadas.',
      status: 'soon' as const,
      accent: '#10B981',
      packages: [],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 backdrop-blur-sm bg-white/80 border-b border-neutral-200"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/icon.svg" alt="DAIA" width={40} height={40} />
            <h1 className="font-bold text-xl">
              <BrandDAIA />
            </h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm text-neutral-600">
            <a href="#servicios" className="hover:text-neutral-900 transition">Servicios</a>
            <a href="#contacto" className="hover:text-neutral-900 transition">Contacto</a>
          </nav>
        </div>
      </motion.header>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Infraestructura y Tecnología B2B
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
          <BrandText text="DAIA Holding" className="font-semibold text-neutral-900" /> es tu partner tecnológico integral.
          Cloud, Software, Soporte y Data Analytics en un solo lugar.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setModalOpen(true)}
          className="px-8 py-3 bg-gradient-to-r from-[#6C4CE5] to-[#06B6D4] text-white rounded-lg font-semibold"
        >
          Conocer Más
        </motion.button>
      </motion.section>

      {/* Servicios */}
      <section id="servicios" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <UnitCard
              key={service.id}
              title={service.title}
              desc={service.desc}
              status={service.status}
              accent={service.accent}
              activeLabel="Disponible"
              soonLabel="Próximamente"
              packages={service.packages}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 mt-12 border-t border-neutral-200 text-center text-sm text-neutral-500">
        <p>© 2025 <BrandDAIA /> Holding. Todos los derechos reservados.</p>
      </footer>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Más Información">
        <p className="text-neutral-700">
          Estamos aquí para ayudarte. Contáctanos para más detalles sobre nuestros servicios.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => window.location.href = 'https://daia-global.vercel.app/gracias'}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
          >
            Contactar
          </button>
        </div>
      </Modal>
    </div>
  );
}
