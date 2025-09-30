const BASE_PATH_ENV = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const homeHref = BASE_PATH_ENV
  ? (BASE_PATH_ENV.startsWith('/') ? BASE_PATH_ENV : `/${BASE_PATH_ENV}`)
  : "/";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Página no encontrada</h1>
        <p className="text-neutral-600">No pudimos encontrar la página que estabas buscando.</p>
        <a
          href={homeHref}
          className="inline-block px-6 h-11 rounded-2xl text-white font-semibold"
          style={{ background: "linear-gradient(135deg,#06B6D4,#6C4CE5)" }}
        >
          Volver al inicio
        </a>
      </div>
    </main>
  );
}
