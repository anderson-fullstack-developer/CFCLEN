import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./shared";

export function Gallery() {
  const imgs = site.gallery.images;
  const [idx, setIdx] = useState<number | null>(null);
  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + imgs.length) % imgs.length)), [imgs.length]);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    document.getElementById("lightbox-close")?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [idx, close, step]);

  return (
    <section id="galeria" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><SectionHeading eyebrow="Galeria" title={site.gallery.title} subtitle={site.gallery.note} /></Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {imgs.map((im, i) => (
            <Reveal key={im.caption} className={cn(i === 0 && "col-span-2 lg:col-span-1 lg:row-span-2")}>
              <button
                onClick={() => setIdx(i)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl"
                aria-label={`Ampliar imagem: ${im.alt}`}
              >
                <img src={im.src} alt={im.alt} loading="lazy" width={1024} height={1024} className={cn("w-full object-cover transition-transform duration-500 group-hover:scale-105", i === 0 ? "aspect-[4/3] h-full lg:aspect-auto" : "aspect-square")} />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-primary/80 to-transparent p-4 text-left text-sm font-semibold text-primary-foreground">
                  {im.caption}<Expand className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {idx !== null && imgs[idx] && (
        <div role="dialog" aria-modal="true" aria-label={imgs[idx]!.alt} className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/90 p-4 backdrop-blur-sm animate-in fade-in" onClick={close}>
          <button id="lightbox-close" onClick={close} aria-label="Fechar" className="absolute top-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-surface text-primary"><X /></button>
          <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Imagem anterior" className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-surface/90 text-primary sm:left-6"><ChevronLeft /></button>
          <figure className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={imgs[idx]!.src} alt={imgs[idx]!.alt} className="max-h-[78vh] w-auto rounded-2xl object-contain" />
            <figcaption className="mt-3 text-center text-sm text-primary-foreground/85">{imgs[idx]!.alt} · imagem ilustrativa</figcaption>
          </figure>
          <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Imagem seguinte" className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-surface/90 text-primary sm:right-6"><ChevronRight /></button>
        </div>
      )}
    </section>
  );
}
