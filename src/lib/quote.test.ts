import { describe, it, expect } from "vitest";
import { buildQuoteMessage, validateQuote } from "./quote";

const base = { service: "Limpeza pós-obras", location: "Lisboa", space: "Apartamento T2", date: "2026-11-12", notes: "Preciso de limpeza após uma remodelação." };

describe("quote", () => {
  it("requires service, location and space", () => {
    const e = validateQuote({ service: "", location: " ", space: "", date: "", notes: "" }, "2026-11-07");
    expect(Object.keys(e).sort()).toEqual(["location", "service", "space"]);
  });
  it("rejects past dates", () => {
    expect(validateQuote({ ...base, date: "2026-11-06" }, "2026-11-07").date).toBeDefined();
    expect(validateQuote(base, "2026-11-07").date).toBeUndefined();
  });
  it("builds the message with pt date", () => {
    const m = buildQuoteMessage(base);
    expect(m).toContain("📅 Data pretendida: 12/11/2026");
    expect(m).toContain("📍 Localidade: Lisboa");
  });
});
