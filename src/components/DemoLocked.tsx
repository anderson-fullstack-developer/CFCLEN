/**
 * Página de "website inativo": substitui a demonstração enquanto o cliente não ativa o projeto.
 * Para voltar a mostrar o site, mudar DEMO_LOCKED para false em src/routes/index.tsx (ou app/page.tsx).
 */
const DEV_WHATSAPP = "351937493326";

export function DemoLocked({ business }: { business: string }) {
  const msg = encodeURIComponent(`Olá Anderson, gostaria de ativar o website ${business}.`);
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: "32px 20px",
        background: "radial-gradient(120% 90% at 50% 0%, #1f2a44 0%, #0d1424 60%, #080d18 100%)",
        color: "#f4f6fb",
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 520 }}>
        <div
          aria-hidden
          style={{
            width: 72,
            height: 72,
            margin: "0 auto",
            borderRadius: 20,
            display: "grid",
            placeItems: "center",
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.14)",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9fb4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
        </div>
        <p style={{ margin: "28px 0 0", fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: "#9fb4ff", fontWeight: 600 }}>
          Website inativo
        </p>
        <h1 style={{ margin: "12px 0 0", fontSize: "clamp(28px, 6vw, 40px)", lineHeight: 1.15, fontWeight: 700, letterSpacing: "-.02em" }}>
          {business}
        </h1>
        <p style={{ margin: "18px auto 0", maxWidth: 420, fontSize: 16, lineHeight: 1.65, color: "rgba(244,246,251,.75)" }}>
          A demonstração deste website terminou. Para ativar o website e publicá-lo, contacte o desenvolvedor.
        </p>
        <a
          href={`https://wa.me/${DEV_WHATSAPP}?text=${msg}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 30,
            minHeight: 52,
            padding: "0 26px",
            borderRadius: 999,
            background: "#25d366",
            color: "#06240f",
            fontWeight: 700,
            fontSize: 15,
            textDecoration: "none",
          }}
        >
          Contactar o desenvolvedor
        </a>
        <p style={{ margin: "40px 0 0", fontSize: 13, color: "rgba(244,246,251,.5)" }}>
          Desenvolvido por <strong style={{ color: "rgba(244,246,251,.8)" }}>Anderson Neto</strong> · NETO SOFTWARE
        </p>
      </div>
    </main>
  );
}
