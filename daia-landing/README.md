# DAIA Landing

Este repositorio contiene una landing implementada con Next.js (App Router). Para facilitar el despliegue en GitHub Pages incluimos un `index.html` estático (fallback) en la raíz y scripts para exportar la versión estática de Next 15 a `out/`.

Rápido:

- Desarrollo local:

```powershell
cd 'c:\Users\nicol\OneDrive\Escritorio\DAIA\daia-landing'
npm install
npm run dev
```

- Build estático (Next 15):

```powershell
npm run build
```

El build de Next 15 generará `out/` (si la configuración de Next está para export estático). Existen scripts en `package.json` para copiar `out/` a `docs/` (útil si usás la rama `main` y GitHub Pages configurado en `docs/`), por ejemplo:

- `npm run deploy:docs` — hace build, copia `out/` a `docs/`, crea `.nojekyll` y realiza commit/push.
- `npm run deploy:root` — hace build y copia `out/` a la raíz del repo (útil si querés servir desde la raíz).

Si preferís usar `index.html` estático (sin ejecutar Next), GitHub Pages servirá el `index.html` de la raíz automáticamente.

Notas:
- Si querés una versión más fiel al `src/app/page.tsx` en Pages, genera `out/` con `next build` y luego usa `deploy:docs`.
- Recomendación: configurar GitHub Pages para servir desde `docs/` si usás `deploy:docs`.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Contact form (static hosting)

This site can be deployed on GitHub Pages (static). To receive contact messages by email without a backend, configure an external forms endpoint and expose it at build time:

- Use a service like Formspree, Formspark, Getform, Basin, or Formcarry.
- Create a form and copy its HTTP endpoint (e.g. `https://formspree.io/f/xxxxxx`).
- In GitHub → Settings → Secrets and variables → Actions → Variables, add:
  - `NEXT_PUBLIC_FORM_ENDPOINT` with that URL.
  - Optionally, `NEXT_PUBLIC_CONTACT_EMAIL` to enable a `mailto:` fallback when no endpoint is present.

The form sends: `name`, `email`, `message`, plus `_subject`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on GitHub Pages

This repo includes a workflow at `.github/workflows/deploy.yml` that:

- Builds a static export (`out/`) with `output: 'export'`.
- Sets `BASE_PATH` automatically to `/<repo-name>` for project pages, or override using a repository variable `BASE_PATH`.
- Publishes to GitHub Pages with `.nojekyll`.

Environment variables consumed at build-time:

- `BASE_PATH` — base path prefix (e.g. `/daia-landing`).
- `NEXT_PUBLIC_FORM_ENDPOINT` — external forms endpoint URL (recommended).
- `NEXT_PUBLIC_CONTACT_EMAIL` — mailto fallback address (optional).
