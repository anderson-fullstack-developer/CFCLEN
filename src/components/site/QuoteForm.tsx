import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertTriangle, Check, Copy, FileText, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { buildQuoteMessage, buildWhatsAppUrl, todayISO, validateQuote, type QuoteData, type QuoteErrors } from "@/lib/quote";
import { cn } from "@/lib/utils";
import { QUOTE_EVENT, SectionHeading } from "./shared";

const empty: QuoteData = { service: "", location: "", space: "", date: "", notes: "" };
const fieldCls = "w-full rounded-xl border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/15";

export function QuotePreview({ message, whatsappNumber }: { message: string | null; whatsappNumber: string | null }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => setCopied(false), [message]);

  const copy = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = message;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex h-full flex-col rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-bold"><FileText className="h-5 w-5" aria-hidden /> Pré-visualização</h3>
        <span className="rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium">Orçamento grátis</span>
      </div>
      <div aria-live="polite" className="mt-5 flex-1">
        {message ? (
          <pre className="min-h-56 whitespace-pre-wrap rounded-2xl bg-surface p-5 font-sans text-[0.95rem] leading-relaxed text-foreground animate-in fade-in slide-in-from-bottom-2">{message}</pre>
        ) : (
          <div className="grid min-h-56 place-items-center rounded-2xl border border-dashed border-primary-foreground/25 p-6 text-center text-primary-foreground/70">
            Preencha o formulário e clique em “Preparar pedido de orçamento”. A mensagem aparece aqui, pronta a enviar.
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <Button variant="cta" size="xl" onClick={copy} disabled={!message} aria-label="Copiar mensagem">
          {copied ? <><Check /> Mensagem copiada!</> : <><Copy /> Copiar mensagem</>}
        </Button>
        {whatsappNumber && message && (
          <Button variant="soft" size="xl" asChild>
            <a href={buildWhatsAppUrl(whatsappNumber, message)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Enviar por WhatsApp</a>
          </Button>
        )}
      </div>
    </div>
  );
}

export function QuoteForm() {
  const [data, setData] = useState<QuoteData>(empty);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setTimeout(() => {
      setMessage(buildQuoteMessage(data));
      setLoading(false);
      if (window.innerWidth < 1024) document.getElementById("quote-preview")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 450);
  };

  const err = (k: keyof QuoteData) =>
    errors[k] ? <p id={`q-${k}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-destructive"><AlertTriangle className="h-4 w-4" aria-hidden />{errors[k]}</p> : null;
  const a11y = (k: keyof QuoteData) => ({ id: `q-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `q-${k}-err` : undefined, className: cn(fieldCls, errors[k] ? "border-destructive" : "border-input") });

  return (
    <section id="orcamento" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="Pedido de orçamento" title={site.quote.title} subtitle={site.quote.subtitle} />
        <p className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-2 text-sm font-semibold text-primary">
          <AlertTriangle className="h-4 w-4 text-accent" aria-hidden /> Simulação — nenhum pedido será enviado
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <div ref={cardRef} className={cn("rounded-3xl border border-border bg-surface p-6 shadow-soft transition-shadow sm:p-8", highlight && "highlight")}>
            <form noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="q-service" className="mb-2 block text-sm font-semibold text-primary">Tipo de serviço *</label>
                <select {...a11y("service")} value={data.service} onChange={set("service")}>
                  <option value="">Selecione um serviço</option>
                  {site.quote.services.map((s) => <option key={s}>{s}</option>)}
                </select>
                {err("service")}
              </div>
              <div>
                <label htmlFor="q-location" className="mb-2 block text-sm font-semibold text-primary">Localidade *</label>
                <input {...a11y("location")} value={data.location} onChange={set("location")} placeholder="Lisboa" autoComplete="address-level2" />
                {err("location")}
              </div>
              <div>
                <label htmlFor="q-space" className="mb-2 block text-sm font-semibold text-primary">Tipo ou dimensão do espaço *</label>
                <select {...a11y("space")} value={data.space} onChange={set("space")}>
                  <option value="">Selecione</option>
                  {site.quote.spaces.map((s) => <option key={s}>{s}</option>)}
                </select>
                {err("space")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="q-date" className="mb-2 block text-sm font-semibold text-primary">Data pretendida <span className="font-normal text-muted-foreground">(opcional)</span></label>
                <input type="date" min={today} {...a11y("date")} value={data.date} onChange={set("date")} />
                {err("date")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="q-notes" className="mb-2 block text-sm font-semibold text-primary">Informações adicionais</label>
                <textarea {...a11y("notes")} rows={4} value={data.notes} onChange={set("notes")} placeholder="Por exemplo: limpeza das escadas do prédio uma vez por semana." />
              </div>
              <Button type="submit" variant="cta" size="xl" className="sm:col-span-2" disabled={loading}>
                {loading ? <><Loader2 className="animate-spin" /> A preparar…</> : "Preparar pedido de orçamento"}
              </Button>
              <p className="text-xs text-muted-foreground sm:col-span-2">Os dados não ficam guardados no site: a mensagem é enviada por si, pelo WhatsApp.</p>
            </form>
          </div>
          <div id="quote-preview" className="scroll-mt-24">
            <QuotePreview message={message} whatsappNumber={site.whatsappNumber} />
          </div>
        </div>
      </div>
    </section>
  );
}
