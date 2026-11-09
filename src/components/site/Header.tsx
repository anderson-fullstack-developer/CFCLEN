import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo, goToQuote } from "./shared";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "overflow-hidden border-t border-border bg-surface transition-[max-height,opacity] duration-300 lg:hidden",
        open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
      )}
      aria-hidden={!open}
    >
      <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Menu móvel">
        {site.nav.map((n) => (
          <a key={n.href} href={n.href} onClick={onClose} tabIndex={open ? 0 : -1} className="rounded-lg px-3 py-3 font-medium text-foreground hover:bg-muted">
            {n.label}
          </a>
        ))}
        <Button variant="cta" size="xl" className="mt-2" tabIndex={open ? 0 : -1} onClick={() => { onClose(); goToQuote(); }}>
          Pedir orçamento
        </Button>
      </nav>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled || open ? "bg-primary/95 shadow-soft backdrop-blur-md" : "bg-primary")}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#inicio" aria-label={`${site.name} — início`}><Logo light /></a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-primary-foreground/75 transition-colors hover:text-accent">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="cta" className="hidden h-11 rounded-xl px-5 font-semibold sm:inline-flex" onClick={() => goToQuote()}>Pedir orçamento</Button>
          <button
            className="grid h-11 w-11 place-items-center rounded-xl text-primary-foreground hover:bg-primary-foreground/10 lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
