# Brilho & Cuidado

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TanStack Start](https://img.shields.io/badge/TanStack-Start-FF4154)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)

**Demo website for a cleaning company**, built as a reusable template for local service businesses: cleaning, plumbing, electricians, hairdressers and others.

> Brilho & Cuidado is a fictional company. The site is a demonstration of the websites I build for small businesses; no requests are sent or stored.

## What the site includes

- **Services** with a short description of each one
- **How it works** in three steps, from first contact to quote
- **About** section and a **photo gallery**
- **Quote request** form that validates the details and builds an organised message, ready to copy or send by WhatsApp
- **FAQ** to answer common questions before the first contact
- Mobile-first layout and SEO metadata

## A template, not a one-off

All business content (name, texts, services, images, FAQ and links) lives in [`src/config/site.ts`](src/config/site.ts). The components in `src/components/site/` only read from it, so adapting the site to another business means editing one file.

The quote logic is a pure module ([`src/lib/quote.ts`](src/lib/quote.ts)): validation, date formatting and the message builder, including a WhatsApp link that switches on as soon as `site.whatsappNumber` is set.

## Tech stack

React 19 · TanStack Start · TypeScript · Tailwind CSS · Radix UI · Vitest · deployed on Vercel

## Running locally

```bash
npm install
npm run dev        # http://localhost:8080
npm test
```

Production build for Vercel: `NITRO_PRESET=vercel vite build` (already set in `vercel.json`).

## Author

**Anderson Neto**, Full-Stack Developer in Lisbon. [Freelance services](https://andersonneto.gt.tc/freelancer.html) · [Portfolio](https://andersonneto.gt.tc)
