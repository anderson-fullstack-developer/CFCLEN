import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { site } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/quote";
import { cn } from "@/lib/utils";
import { brandPaths } from "./brand-icons";
import emblem from "@/assets/logo-emblem.png";

/**
 * Floating help assistant. Button-only (no typing), large text and targets, so it is easy
 * for less experienced users. Every path ends in a WhatsApp link with the message pre-written,
 * or a phone call.
 */

type Topic = "start" | "quote" | "services" | "zones" | "prices" | "regular" | "whatsapp" | "call";

type Msg = { from: "bot" | "user"; text: string; typed?: boolean };

/** Pause showing "a escrever…" before a reply, and typing speed (ms per character). */
const THINK_MS = 1000;
const CHAR_MS = 16;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Reveals the text letter by letter (screen readers get the full text at once). */
function TypedText({
  text,
  onProgress,
  onDone,
}: {
  text: string;
  onProgress: () => void;
  onDone: () => void;
}) {
  const [n, setN] = useState(() => (prefersReducedMotion() ? text.length : 0));
  const done = useRef(false);
  useEffect(() => {
    if (n >= text.length) {
      if (!done.current) {
        done.current = true;
        onDone();
      }
      return;
    }
    const t = setTimeout(() => {
      // Spaces and punctuation go a little faster so it reads naturally.
      setN((v) => Math.min(text.length, v + (text[v] === " " ? 2 : 1)));
      onProgress();
    }, CHAR_MS);
    return () => clearTimeout(t);
  }, [n, text, onDone, onProgress]);
  const typing = n < text.length;
  return (
    <>
      <span aria-hidden>
        {text.slice(0, n)}
        {typing && (
          <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-accent" />
        )}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}

type Option =
  | { kind: "topic"; label: string; topic: Topic }
  | { kind: "service"; label: string }
  | { kind: "whatsapp"; label: string; message: string }
  | { kind: "call"; label: string };

const c = site.chat;
const back: Option = { kind: "topic", label: "Voltar ao início", topic: "start" };
const askQuote: Option = { kind: "topic", label: "Pedir orçamento", topic: "quote" };
const whatsapp = (message = c.whatsappGeneric): Option => ({
  kind: "whatsapp",
  label: "Falar no WhatsApp",
  message,
});

const startOptions: Option[] = [
  askQuote,
  { kind: "topic", label: "Que serviços fazem?", topic: "services" },
  { kind: "topic", label: "Em que zonas trabalham?", topic: "zones" },
  { kind: "topic", label: "Quanto custa?", topic: "prices" },
  { kind: "topic", label: "Fazem limpezas regulares?", topic: "regular" },
  { kind: "topic", label: "Falar no WhatsApp", topic: "whatsapp" },
  ...(site.whatsappNumber
    ? [{ kind: "topic", label: "Prefiro ligar", topic: "call" } as Option]
    : []),
];

function reply(topic: Topic): { text: string; options: Option[] } {
  switch (topic) {
    case "start":
      return { text: "Em que mais podemos ajudar?", options: startOptions };
    case "quote":
      return {
        text: c.askService,
        options: [...site.quote.services.map((s): Option => ({ kind: "service", label: s })), back],
      };
    case "services":
      return { text: c.services, options: [askQuote, whatsapp(), back] };
    case "zones":
      return { text: c.zones, options: [askQuote, whatsapp(), back] };
    case "prices":
      return { text: c.prices, options: [askQuote, whatsapp(), back] };
    case "regular":
      return {
        text: c.regular,
        options: [
          whatsapp("Olá! Gostaria de saber mais sobre limpezas regulares."),
          back,
        ],
      };
    case "whatsapp":
      return { text: c.whatsappIntro, options: [whatsapp(), back] };
    case "call":
      return {
        text: c.callIntro,
        options: [{ kind: "call", label: `Ligar ${site.phoneDisplay}` }, back],
      };
  }
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [pending, setPending] = useState<Option[] | null>(null);
  const [typing, setTyping] = useState(false);
  const started = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Keep the newest message in view.
  const scrollToEnd = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);
  useEffect(scrollToEnd, [messages, typing, options, scrollToEnd]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  /** Shows "a escrever…", then types the reply; the options appear when it finishes. */
  const botSay = useCallback((text: string, next: Option[]) => {
    setOptions([]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setTyping(false);
      setPending(next);
      setMessages((m) => [...m, { from: "bot", text, typed: true }]);
    }, THINK_MS);
  }, []);

  const finishTyping = useCallback(() => {
    setPending((next) => {
      if (next) setOptions(next);
      return null;
    });
  }, []);

  // First open: greet the visitor.
  useEffect(() => {
    if (open && !started.current) {
      started.current = true;
      botSay(c.greeting, startOptions);
    }
  }, [open, botSay]);

  // Escape closes; focus moves into the panel on open and back to the launcher on close.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  };

  const say = (userText: string, bot: { text: string; options: Option[] }) => {
    setMessages((m) => [...m, { from: "user", text: userText }]);
    botSay(bot.text, bot.options);
  };

  const choose = (o: Option) => {
    if (o.kind === "topic") say(o.label, reply(o.topic));
    else if (o.kind === "service")
      say(o.label, {
        text: c.quoteReady,
        options: [
          whatsapp(
            o.label === "Outro serviço"
              ? "Olá! Gostaria de pedir um orçamento gratuito para um serviço de limpeza."
              : `Olá! Gostaria de pedir um orçamento para: ${o.label}.`,
          ),
          back,
        ],
      });
  };

  const bigBtn =
    "flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-lg font-bold shadow-soft transition-transform hover:-translate-y-0.5";

  return (
    <>
      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="chat-panel"
        className={cn(
          "fixed right-3 bottom-3 z-[45] flex h-14 items-center gap-2 rounded-full bg-accent px-5 font-bold text-accent-foreground shadow-lift transition-all hover:-translate-y-0.5 hover:brightness-105 sm:right-6 sm:bottom-6 sm:h-16 sm:px-6 sm:text-lg",
          open && "pointer-events-none scale-90 opacity-0",
        )}
      >
        <span className="relative">
          <MessageCircle className="h-6 w-6" aria-hidden />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-accent bg-accent-light" />
        </span>
        <span className="sm:hidden">{c.launcherShort}</span>
        <span className="hidden sm:inline">{c.launcher}</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-modal="false"
          aria-label={c.title}
          className="fixed inset-x-0 bottom-0 z-[55] flex max-h-[88vh] flex-col overflow-hidden rounded-t-3xl border border-border bg-surface shadow-lift animate-in fade-in slide-in-from-bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[410px] sm:rounded-3xl sm:max-h-[min(680px,85vh)]"
        >
          <div className="flex items-center gap-3 bg-primary px-5 py-4 text-primary-foreground">
            <span className="grid h-11 w-14 shrink-0 place-items-center">
              <img src={emblem} alt="" aria-hidden className="h-auto w-full" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg font-bold">{c.title}</p>
              <p className="truncate text-sm text-primary-foreground/75">{c.subtitle}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Fechar assistente"
              title="Fechar"
              className="grid h-11 w-11 place-items-center rounded-full hover:bg-primary-foreground/10"
            >
              <X className="h-6 w-6" aria-hidden />
            </button>
          </div>

          <div
            ref={listRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto bg-background px-4 py-5"
          >
            {messages.map((m, i) => (
              <p
                key={i}
                className={cn(
                  "max-w-[88%] rounded-2xl px-4 py-3 text-[1.05rem] leading-relaxed animate-in fade-in slide-in-from-bottom-1",
                  m.from === "bot"
                    ? "rounded-tl-md bg-surface text-foreground shadow-soft"
                    : "ml-auto rounded-tr-md bg-accent text-accent-foreground",
                )}
              >
                {m.from === "bot" && m.typed && i === messages.length - 1 && pending ? (
                  <TypedText text={m.text} onProgress={scrollToEnd} onDone={finishTyping} />
                ) : (
                  m.text
                )}
              </p>
            ))}
            {typing && (
              <div className="flex items-center gap-3 animate-in fade-in" role="status">
                <p className="flex w-fit gap-1.5 rounded-2xl rounded-tl-md bg-surface px-4 py-4 shadow-soft">
                  {[0, 160, 320].map((d) => (
                    <span
                      key={d}
                      className="h-2.5 w-2.5 animate-bounce rounded-full bg-accent"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </p>
                <span className="text-sm text-muted-foreground">{c.typingLabel}</span>
              </div>
            )}

            {options.length > 0 && (
              <div className="space-y-2.5 pt-2">
                {options.map((o) =>
                  o.kind === "whatsapp" && site.whatsappNumber ? (
                    <a
                      key={o.label}
                      href={buildWhatsAppUrl(site.whatsappNumber, o.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(bigBtn, "bg-[#25D366] text-white")}
                    >
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                        <path d={brandPaths.whatsapp} />
                      </svg>
                      {o.label}
                    </a>
                  ) : o.kind === "call" && site.whatsappNumber ? (
                    <a
                      key={o.label}
                      href={`tel:+${site.whatsappNumber}`}
                      className={cn(bigBtn, "bg-primary text-primary-foreground")}
                    >
                      <Phone className="h-6 w-6" aria-hidden />
                      {o.label}
                    </a>
                  ) : o.kind === "topic" || o.kind === "service" ? (
                    <button
                      key={o.label}
                      type="button"
                      onClick={() => choose(o)}
                      className={cn(
                        "block w-full rounded-2xl border-2 px-4 py-3.5 text-left text-[1.05rem] font-semibold transition-colors",
                        o === back
                          ? "border-transparent text-muted-foreground hover:text-primary"
                          : "border-accent/40 bg-surface text-primary hover:border-accent hover:bg-accent-soft",
                      )}
                    >
                      {o.label}
                    </button>
                  ) : null,
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
