import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  // Define la raíz del proyecto un nivel arriba para silenciar el warning de workspace
  outputFileTracingRoot: path.join(process.cwd(), "../"),
  // Necesario para exportación estática (GitHub Pages, etc) ya que no hay servidor de optimización de imágenes
  images: {
    unoptimized: true,
  },
};

export default nextConfig;