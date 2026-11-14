import { createFileRoute } from "@tanstack/react-router";
import { DemoLocked } from "@/components/DemoLocked";

// Demonstração desativada até o cliente ativar o website. Mudar para false para voltar a mostrar o site.
const DEMO_LOCKED = true;
import { Header } from "@/components/site/Header";
import { AboutSection, ZoneSection, FAQAccordion, FinalCTA, HeroSection, HowItWorksSection, ServicesSection } from "@/components/site/Sections";
import { Gallery } from "@/components/site/Gallery";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Footer, MobileStickyCTA } from "@/components/site/Footer";
import { ChatBot } from "@/components/site/ChatBot";

import { site } from "@/config/site";

const SITE_URL = site.url;
const TITLE = "SF Clean Service | Limpezas em Casal de Cambra e Lisboa";
const DESCRIPTION =
  "Limpeza profissional de casas, espaços comerciais, escritórios, escadas e pós-obra em Casal de Cambra e arredores, região de Lisboa. Orçamento grátis por WhatsApp.";

/** Local SEO: schema.org data with only what the client confirmed (no address, prices or reviews). */
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HouseCleaningService",
  name: site.name,
  url: SITE_URL,
  image: `${SITE_URL}/og-logo.jpg`,
  telephone: "+351914068213",
  areaServed: [
    { "@type": "Place", name: "Casal de Cambra" },
    { "@type": "AdministrativeArea", name: "Região de Lisboa" },
  ],
  description: DESCRIPTION,
  makesOffer: site.services.items.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.id },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "SF Clean Service | Limpeza profissional" },
      { property: "og:description", content: "Casal de Cambra e arredores, região de Lisboa. Orçamento grátis por WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: "pt_PT" },
      { property: "og:url", content: SITE_URL },
      // Square logo: WhatsApp shows it as a small thumbnail next to the link.
      { property: "og:image", content: `${SITE_URL}/og-logo.jpg` },
      { property: "og:image:secure_url", content: `${SITE_URL}/og-logo.jpg` },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "600" },
      { property: "og:image:height", content: "600" },
      { property: "og:image:alt", content: "SF Clean Service — limpeza profissional" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image", content: `${SITE_URL}/og-logo.jpg` },
      { name: "geo.region", content: "PT-11" },
      { name: "geo.placename", content: "Casal de Cambra" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusiness) }],
  }),
  component: DEMO_LOCKED ? LockedPage : Index,
});

function Index() {
  return (
    <>
      <a href="#servicos" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2">Saltar para o conteúdo</a>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <AboutSection />
        <ZoneSection />
        <Gallery />
        <QuoteForm />
        <FAQAccordion />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
      <ChatBot />
    </>
  );
}

function LockedPage() {
  return <DemoLocked business="SF Clean Service" />;
}
