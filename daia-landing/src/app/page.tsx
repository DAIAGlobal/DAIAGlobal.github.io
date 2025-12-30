import type { Metadata } from "next";
import DAIAHoldingLanding from "../components/LandingPage";

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
  return <DAIAHoldingLanding />;
}
// vercel-deploy-test
