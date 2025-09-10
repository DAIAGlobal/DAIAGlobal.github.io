"use client";
import { useEffect, useMemo, useState } from "react";

export default function GraciasPage() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const isEN = useMemo(() => lang === 'en', [lang]);

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? window.localStorage.getItem('daia_lang') : null;
      if (saved === 'en' || saved === 'es') {
        setLang(saved);
      } else if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('en')) {
        setLang('en');
      }
    } catch {}
    const t = setTimeout(() => {
      // Redirección relativa para respetar basePath en GitHub Pages
      window.location.href = "../";
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {isEN ? "Thanks for contacting DAIA" : "Gracias por comunicarte con DAIA"}
        </h1>
        <p className="mt-3 text-neutral-700">
          {isEN
            ? "We received your message and will get back to you shortly."
            : "Recibimos tu mensaje y te responderemos a la brevedad."}
        </p>
        <a
          href="../"
          className="inline-block mt-8 px-6 h-11 rounded-2xl text-white font-semibold"
          style={{ background: "linear-gradient(135deg,#06B6D4,#6C4CE5)" }}
        >
          {isEN ? "Back to home" : "Volver al inicio"}
        </a>
        <p className="mt-2 text-xs text-neutral-500">
          {isEN ? "You will be redirected automatically." : "Serás redirigido automáticamente."}
        </p>
      </div>
    </main>
  );
}
