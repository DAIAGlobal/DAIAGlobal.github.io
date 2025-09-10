import type { NextConfig } from "next";

// Configure for static export suitable for GitHub Pages.
// BASE_PATH can be set to the repo name (e.g. "/daia-landing") for project pages.
const basePathEnv = process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || "";
// Treat "/" as empty for user/org pages
const normalized = basePathEnv === "/" ? "" : basePathEnv;
const basePath = normalized ? (normalized.startsWith("/") ? normalized : `/${normalized}`) : "";

const nextConfig = {
  output: "export",
  // Ensure URLs like "/about/" map to folders with index.html on Pages
  trailingSlash: true,
  // Prefix assets when hosted under "/<repo>"
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  // Avoid image optimization server on static hosting
  images: { unoptimized: true },
} satisfies NextConfig;

export default nextConfig;
