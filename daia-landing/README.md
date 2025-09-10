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
