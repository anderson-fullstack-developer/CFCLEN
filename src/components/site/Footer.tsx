import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo, goToQuote } from "./shared";

export function Footer() {
  return (
    <footer className="bg-primary pt-16 pb-28 text-primary-foreground sm:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-primary-foreground/70">{site.shortDescription}</p>
          <ul className="mt-5 space-y-2 text-primary-foreground/80">
            <li>Telefone: <a href={site.phoneHref} className="font-semibold text-primary-foreground hover:text-accent">{site.phoneDisplay}</a></li>
            <li><a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">Pedir orçamento no WhatsApp</a></li>
            <li>{site.area}</li>
          </ul>
        </div>
        <nav aria-label="Rodapé">
          <h3 className="font-display font-bold">Navegação</h3>
          <ul className="mt-4 space-y-2.5">
            {site.nav.map((n) => <li key={n.href}><a className="text-primary-foreground/70 hover:text-primary-foreground" href={n.href}>{n.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <h3 className="font-display font-bold">Serviços</h3>
          <ul className="mt-4 space-y-2.5">
            {site.services.items.map((s) => <li key={s.id}><button className="text-left text-primary-foreground/70 hover:text-primary-foreground" onClick={() => goToQuote(s.id)}>{s.name}</button></li>)}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-primary-foreground/15 px-5 pt-6 text-sm text-primary-foreground/65 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>{site.demoNotice}</p>
        <a href={site.credit.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-foreground hover:text-accent">{site.credit.label}</a>
      </div>
    </footer>
  );
}

/** Mobile-only sticky CTA: hidden at top and while the quote form is on screen. */
export function MobileStickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const form = document.getElementById("orcamento");
    let formVisible = false;
    const io = form ? new IntersectionObserver(([e]) => { formVisible = !!e?.isIntersecting; update(); }, { threshold: 0 }) : null;
    const update = () => setShow(window.scrollY > 600 && !formVisible);
    if (form && io) io.observe(form);
    window.addEventListener("scroll", update, { passive: true });
    return () => { io?.disconnect(); window.removeEventListener("scroll", update); };
  }, []);
  return (
    <div className={cn("fixed inset-x-0 bottom-0 z-40 p-3 transition-transform duration-300 sm:hidden", show ? "translate-y-0" : "translate-y-full")} aria-hidden={!show}>
      <Button variant="cta" size="xl" className="w-full shadow-lift" tabIndex={show ? 0 : -1} onClick={() => goToQuote()}>Pedir orçamento <ArrowRight /></Button>
    </div>
  );
}
