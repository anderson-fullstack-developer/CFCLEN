export interface QuoteData {
  service: string;
  location: string;
  space: string;
  date: string; // yyyy-mm-dd or ""
  notes: string;
}

export type QuoteErrors = { [K in keyof QuoteData]?: string | undefined };

export function todayISO(now = new Date()): string {
  const off = now.getTimezoneOffset();
  return new Date(now.getTime() - off * 60000).toISOString().slice(0, 10);
}

export function validateQuote(d: QuoteData, today = todayISO()): QuoteErrors {
  const e: QuoteErrors = {};
  if (!d.service) e.service = "Selecione o tipo de serviço.";
  if (!d.location.trim()) e.location = "Indique a localidade.";
  if (!d.space) e.space = "Selecione o tipo ou dimensão do espaço.";
  if (d.date && d.date < today) e.date = "A data não pode ser anterior a hoje.";
  return e;
}

export function formatDatePT(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function buildQuoteMessage(d: QuoteData): string {
  const lines = [
    "Olá! Gostaria de pedir um orçamento.",
    "",
    `🧹 Serviço: ${d.service}`,
    `📍 Localidade: ${d.location.trim()}`,
    `🏠 Espaço: ${d.space}`,
  ];
  if (d.date) lines.push(`📅 Data pretendida: ${formatDatePT(d.date)}`);
  if (d.notes.trim()) lines.push(`📝 Observações: ${d.notes.trim()}`);
  lines.push("", "Podem enviar-me uma proposta?");
  return lines.join("\n");
}

/** Future integration: open an authorised business WhatsApp with the message prefilled. */
export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
