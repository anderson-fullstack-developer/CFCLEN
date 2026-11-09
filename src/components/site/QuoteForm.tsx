import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import {
  buildQuoteMessage,
  buildWhatsAppUrl,
  todayISO,
  validateQuote,
  type QuoteData,
  type QuoteErrors,
} from "@/lib/quote";
import { cn } from "@/lib/utils";
import { QUOTE_EVENT, SectionHeading } from "./shared";
import { brandPaths } from "./brand-icons";

const empty: QuoteData = { service: "", location: "", space: "", date: "", notes: "" };
const fieldCls =
  "w-full rounded-xl border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/15";

export function QuoteForm() {
  const [data, setData] = useState<QuoteData>(empty);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [highlight, setHighlight] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const today = todayISO();

  useEffect(() => {
    const on = (e: Event) => {
      const svc = (e as CustomEvent<{ service?: string }>).detail?.service;
      if (svc) {
        setData((d) => ({ ...d, service: svc }));
        setErrors((er) => ({ ...er, service: undefined }));
      }
      setHighlight(false);
      requestAnimationFrame(() => setHighlight(true));
      setTimeout(() => setHighlight(false), 2600);
    };
    window.addEventListener(QUOTE_EVENT, on);
    return () => window.removeEventListener(QUOTE_EVENT, on);
  }, []);

  const set = (k: keyof QuoteData) => (e: { target: { value: string } }) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er = validateQuote(data, today);
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) {
      document.getElementById(`q-${first}`)?.focus();
      return;
    }
    if (!site.whatsappNumber) return;
    const url = buildWhatsAppUrl(site.whatsappNumber, buildQuoteMessage(data));
    // Opens WhatsApp (app on mobile, WhatsApp Web on desktop) with the message ready to send.
    // ("noopener" is not passed as a feature: it makes window.open return null and the fallback would also fire.)
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
  };

  const err = (k: keyof QuoteData) =>
    errors[k] ? (
      <p
        id={`q-${k}-err`}
        className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-destructive"
      >
        <AlertTriangle className="h-4 w-4" aria-hidden />
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof QuoteData) => ({
    id: `q-${k}`,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `q-${k}-err` : undefined,
    className: cn(fieldCls, errors[k] ? "border-destructive" : "border-input"),
  });

  return (
    <section id="orcamento" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Pedido de orçamento"
          title={site.quote.title}
          subtitle={site.quote.subtitle}
        />
        <div className="mx-auto mt-12 max-w-2xl">
          <div
            ref={cardRef}
            className={cn(
              "rounded-3xl border border-border bg-surface p-6 shadow-soft transition-shadow sm:p-8",
              highlight && "highlight",
            )}
          >
            <form noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="q-service"
                  className="mb-2 block text-sm font-semibold text-primary"
                >
                  Tipo de serviço *
                </label>
                <select {...a11y("service")} value={data.service} onChange={set("service")}>
                  <option value="">Selecione um serviço</option>
                  {site.quote.services.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {err("service")}
              </div>
              <div>
                <label
                  htmlFor="q-location"
                  className="mb-2 block text-sm font-semibold text-primary"
                >
                  Localidade *
                </label>
                <input
                  {...a11y("location")}
                  value={data.location}
                  onChange={set("location")}
                  placeholder="Casal de Cambra"
                  autoComplete="address-level2"
                />
                {err("location")}
              </div>
              <div>
                <label htmlFor="q-space" className="mb-2 block text-sm font-semibold text-primary">
                  Tipo ou dimensão do espaço *
                </label>
                <select {...a11y("space")} value={data.space} onChange={set("space")}>
                  <option value="">Selecione</option>
                  {site.quote.spaces.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {err("space")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="q-date" className="mb-2 block text-sm font-semibold text-primary">
                  Data pretendida{" "}
                  <span className="font-normal text-muted-foreground">(opcional)</span>
                </label>
                <input
                  type="date"
                  min={today}
                  {...a11y("date")}
                  value={data.date}
                  onChange={set("date")}
                />
                {err("date")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="q-notes" className="mb-2 block text-sm font-semibold text-primary">
                  Informações adicionais
                </label>
                <textarea
                  {...a11y("notes")}
                  rows={4}
                  value={data.notes}
                  onChange={set("notes")}
                  placeholder="Por exemplo: limpeza das escadas do prédio uma vez por semana."
                />
              </div>
              <Button type="submit" variant="cta" size="xl" className="sm:col-span-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d={brandPaths.whatsapp} />
                </svg>
                Enviar pedido por WhatsApp
              </Button>
              <p className="text-xs text-muted-foreground sm:col-span-2">
                Ao carregar no botão, abre-se o WhatsApp com o pedido já escrito. Só tem de nos
                enviar. Os dados não são guardados no site.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
