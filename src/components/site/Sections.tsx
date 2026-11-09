import { ArrowRight, Building2, CheckCircle2, ClipboardList, Hammer, Home, MessageSquareText, MousePointerClick, Sparkles, Info, MapPin, MessageCircle, Phone, Store, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site, type Service, type ServiceIcon } from "@/config/site";
import { Reveal, SectionHeading, goToQuote } from "./shared";

const icons: Record<ServiceIcon, typeof Home> = { home: Home, store: Store, building: Building2, stairs: Layers, hammer: Hammer, sparkles: Sparkles };

export function HeroSection() {
  const h = site.hero;
  const [before, after] = h.title.split(" em ");
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-primary pt-28 pb-20 text-primary-foreground sm:pt-32 lg:pb-28">
      <div className="pointer-events-none absolute -top-32 -left-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            <Sparkles className="h-4 w-4" aria-hidden /> {h.eyebrow}
          </p>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.06] sm:text-5xl lg:text-6xl">
            {before}
            {after && <> em <span className="text-accent">{after}</span></>}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/75">{h.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="cta" size="xl" asChild>
              <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle /> Pedir orçamento no WhatsApp</a>
            </Button>
            <Button size="xl" variant="outline" className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
              <a href="#servicos">Ver serviços</a>
            </Button>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-primary-foreground/70">
            <Phone className="h-4 w-4 text-accent" aria-hidden /> Ou ligue já: <a href={site.phoneHref} className="font-semibold text-primary-foreground hover:text-accent">{site.phoneDisplay}</a>
          </p>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 -z-10 rotate-2 rounded-[2rem] bg-accent/25" aria-hidden />
          <img src={h.image} alt={h.imageAlt} width={1200} height={1408} className="aspect-[4/3] w-full rounded-[1.75rem] object-cover object-[50%_30%] shadow-lift lg:aspect-[5/5.4]" />
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-surface p-4 text-foreground shadow-lift sm:left-8">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground"><MapPin className="h-5 w-5" /></span>
            <span className="text-sm"><strong className="block font-display text-primary">Casal de Cambra</strong><span className="text-muted-foreground">e arredores · Lisboa</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:shadow-lift">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-muted text-secondary transition-colors group-hover:bg-accent group-hover:text-accent-foreground"><Icon className="h-6 w-6" aria-hidden /></span>
      <h3 className="mt-5 text-xl font-bold text-primary">{service.name}</h3>
      <p className="mt-2 flex-1 text-muted-foreground">{service.description}</p>
      <button onClick={() => goToQuote(service.id)} className="mt-6 inline-flex items-center gap-2 self-start rounded-lg py-1 font-semibold text-secondary hover:gap-3 transition-all">
        Pedir orçamento <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section id="servicos" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><SectionHeading eyebrow="Serviços" title={site.services.title} subtitle={site.services.subtitle} /></Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.items.map((s) => (
            <Reveal key={s.id}><ServiceCard service={s} /></Reveal>
          ))}
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-2xl bg-primary p-7 text-primary-foreground">
              <div>
                <h3 className="text-xl font-bold">Precisa de outra solução?</h3>
                <p className="mt-2 text-primary-foreground/75">Descreva o seu espaço e as suas necessidades no formulário.</p>
              </div>
              <Button variant="cta" size="xl" className="mt-6 self-start" onClick={() => goToQuote("Outro serviço")}>Descrever pedido</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const stepIcons = [MousePointerClick, ClipboardList, MessageSquareText];
  return (
    <section id="como-funciona" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><SectionHeading eyebrow="Como funciona" title={site.steps.title} /></Reveal>
        <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div className="absolute top-8 right-[16%] left-[16%] hidden h-px border-t border-dashed border-input md:block" aria-hidden />
          {site.steps.items.map((s, i) => {
            const Icon = stepIcons[i] ?? MousePointerClick;
            return (
              <Reveal key={s.title} className="relative text-center">
                <li className="list-none">
                  <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-surface text-secondary shadow-soft ring-1 ring-border">
                    <Icon className="h-7 w-7" aria-hidden />
                    <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">{i + 1}</span>
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-primary">Passo {i + 1} — {s.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-muted-foreground">{s.text}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function AboutSection() {
  const a = site.about;
  return (
    <section id="sobre" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 lg:px-8">
        <Reveal className="order-2 md:order-1">
          <img src={a.image} alt={a.imageAlt} loading="lazy" width={1024} height={1024} className="aspect-square w-full max-w-lg mx-auto rounded-[1.75rem] object-cover shadow-lift" />
        </Reveal>
        <Reveal className="order-1 md:order-2">
          <SectionHeading eyebrow="Porquê nós" title={a.title} center={false} />
          <p className="mt-5 text-lg text-muted-foreground">{a.text}</p>
          <ul className="mt-7 space-y-3">
            {a.points.map((p) => (
              <li key={p} className="flex items-center gap-3 font-medium text-foreground"><CheckCircle2 className="h-5 w-5 text-accent" aria-hidden />{p}</li>
            ))}
          </ul>
          <p className="mt-8 inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground"><Info className="h-4 w-4" aria-hidden />{a.notice}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function ZoneSection() {
  const z = site.zone;
  return (
    <section id="zona" className="py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-8 shadow-soft sm:p-12">
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-accent/25 blur-3xl" aria-hidden />
          <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <span className="grid h-20 w-20 place-items-center rounded-2xl bg-primary text-accent"><MapPin className="h-10 w-10" aria-hidden /></span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-secondary">Zona de atuação</p>
              <h2 className="mt-2 text-3xl font-extrabold text-primary sm:text-4xl">{z.title}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{z.text}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Casal de Cambra</span>
                <span className="rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-primary">Arredores</span>
                <span className="rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-primary">Região de Lisboa</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FAQAccordion() {
  return (
    <section id="faq" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal><SectionHeading eyebrow="Dúvidas" title={site.faq.title} /></Reveal>
        <Reveal className="mt-12">
          <Accordion type="single" collapsible className="space-y-3">
            {site.faq.items.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`} className="rounded-2xl border border-border bg-background px-6">
                <AccordionTrigger className="py-5 text-left font-display text-base font-bold text-primary hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-base text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const c = site.finalCta;
  return (
    <section className="px-5 py-20 lg:px-8 lg:py-28">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-primary px-6 py-16 text-center sm:px-12">
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-secondary/40 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl" aria-hidden />
        <h2 className="relative mx-auto max-w-3xl text-3xl font-extrabold text-primary-foreground sm:text-4xl">{c.title}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-primary-foreground/75">{c.text}</p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="cta" size="xl" asChild>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle /> {c.button}</a>
          </Button>
          <Button size="xl" variant="outline" className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
            <a href={site.phoneHref}><Phone /> {site.phoneDisplay}</a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
