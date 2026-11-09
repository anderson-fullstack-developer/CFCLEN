import emblem from "@/assets/logo-emblem.png";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const QUOTE_EVENT = "quote:select-service";

/** Scrolls to the quote form, optionally preselecting a service, and highlights it. */
export function goToQuote(service?: string) {
  window.dispatchEvent(new CustomEvent(QUOTE_EVENT, { detail: { service } }));
  document.getElementById("orcamento")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Reveal({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={cn("reveal", className)}>
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-secondary">{eyebrow}</p>}
      <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2 font-display text-lg font-extrabold", light ? "text-primary-foreground" : "text-primary")}>
      {/* Client's own emblem from her flyer (transparent background, made for dark surfaces). */}
      <img src={emblem} alt="" aria-hidden width={547} height={273} className="h-11 w-auto" />
      <span>SF <span className="text-accent">Clean</span> Service</span>
    </span>
  );
}
