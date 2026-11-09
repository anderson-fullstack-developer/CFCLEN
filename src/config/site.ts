/**
 * Business configuration. Edit this file to adapt the template to another business.
 * Components read everything (texts, services, images, links) from here.
 *
 * Client: SF Clean Service — limpeza profissional em Casal de Cambra e arredores (Lisboa).
 * Only real data from the client is used: name, activity, area, phone/WhatsApp, free quotes.
 * No addresses, emails, prices, testimonials or certifications are invented.
 */
import hero from "@/assets/hero.jpg";
import cleaner from "@/assets/g-cleaner.jpg";
import flyer from "@/assets/flyer.jpg";
import kitchen from "@/assets/g-kitchen.jpg";
import office from "@/assets/g-office.jpg";
import bathroom from "@/assets/g-bathroom.jpg";
import bedroom from "@/assets/g-bedroom.jpg";

export type ServiceIcon = "home" | "store" | "building" | "stairs" | "hammer" | "sparkles";

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: ServiceIcon;
}

const WHATSAPP = "351914068213";
const WHATSAPP_TEXT = "Olá! Gostaria de pedir um orçamento gratuito para um serviço de limpeza.";

export const site = {
  name: "SF Clean Service",
  /** Endereço público do site (etiquetas de partilha e SEO). Mudar para o domínio final quando for publicado. */
  url: "https://sf-clean-service.vercel.app",
  shortDescription:
    "Limpeza profissional de casas, espaços comerciais, escritórios, escadas e pós-obra em Casal de Cambra e arredores, na região de Lisboa.",
  /** Aviso de demonstração no rodapé. Passar a null quando a cliente aprovar o site. */
  demoNotice:
    "Demonstração preparada por Anderson Neto para a SF Clean Service. Imagens ilustrativas, a confirmar antes da publicação." as
      string | null,
  credit: { label: "Desenvolvido por Anderson Neto", url: "https://andersonneto.gt.tc/freelancer.html" },
  whatsappNumber: WHATSAPP as string | null,
  phoneDisplay: "+351 914 068 213",
  phoneHref: "tel:+351914068213",
  /** Link usado por todos os botões de contacto: abre o WhatsApp com o pedido já escrito. */
  whatsappUrl: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
  area: "Casal de Cambra e arredores, região de Lisboa",

  nav: [
    { label: "Início", href: "#inicio" },
    { label: "Serviços", href: "#servicos" },
    { label: "Porquê nós", href: "#sobre" },
    { label: "Zona", href: "#zona" },
    { label: "Perguntas frequentes", href: "#faq" },
    { label: "Contactos", href: "#orcamento" },
  ],

  hero: {
    eyebrow: "Orçamento grátis e sem compromisso",
    title: "Limpeza profissional em Casal de Cambra e arredores",
    subtitle: "Mais tempo para si. Nós cuidamos da limpeza: casas, espaços comerciais, escritórios, escadas e pós-obra.",
    image: hero,
    imageAlt: "Sala de estar limpa e luminosa (imagem ilustrativa)",
  },

  services: {
    title: "Os nossos serviços",
    subtitle: "Tratamos da limpeza do seu espaço com atenção a cada detalhe, do primeiro contacto ao trabalho feito.",
    items: [
      { id: "Limpeza de casas", name: "Limpeza de casas", icon: "home", description: "Limpeza completa da sua casa, para ter mais tempo para si e para a família." },
      { id: "Limpeza de espaços comerciais", name: "Espaços comerciais", icon: "store", description: "Lojas e espaços abertos ao público limpos e prontos a receber os seus clientes." },
      { id: "Limpeza de escritórios", name: "Escritórios", icon: "building", description: "Espaços de trabalho limpos e agradáveis para a sua equipa, no dia a dia." },
      { id: "Limpeza de escadas", name: "Escadas", icon: "stairs", description: "Limpeza de escadas, entradas e zonas comuns de prédios." },
      { id: "Limpeza pós-obra", name: "Limpeza pós-obra", icon: "hammer", description: "Removemos o pó e a sujidade depois de obras ou remodelações, para entrar logo no espaço." },
    ] as Service[],
  },

  steps: {
    title: "Simples do primeiro contacto ao orçamento",
    items: [
      { title: "Escolha o serviço", text: "Diga-nos que tipo de limpeza precisa." },
      { title: "Conte-nos os detalhes", text: "Indique a localidade, o espaço e o que pretende." },
      { title: "Receba o orçamento", text: "Respondemos pelo WhatsApp com um orçamento gratuito e sem compromisso." },
    ],
  },

  about: {
    title: "Porquê escolher a SF Clean Service?",
    text: "Sabemos que o seu tempo é valioso. Por isso tratamos da limpeza com cuidado e rigor e falamos consigo de forma simples e direta, para saber sempre com o que pode contar.",
    notice: "Demonstração: textos e imagens a confirmar com a SF Clean Service.",
    image: flyer,
    imageAlt: "Panfleto da SF Clean Service: limpeza profissional em Lisboa, orçamento grátis, ligue 914 068 213",
    points: ["Atenção aos detalhes em cada divisão", "Comunicação simples e direta, pelo WhatsApp", "Orçamentos gratuitos e sem compromisso"],
  },

  zone: {
    title: "Onde trabalhamos",
    text: "Trabalhamos em Casal de Cambra e arredores, na região de Lisboa. Se estiver noutra localidade, indique-a no pedido e dizemos-lhe se conseguimos ir até si.",
  },

  gallery: {
    title: "Espaços limpos, prontos a usar",
    note: "Imagens ilustrativas para demonstração. Serão substituídas por fotografias de trabalhos da SF Clean Service.",
    images: [
      { src: hero, alt: "Sala de estar limpa e luminosa", caption: "Salas" },
      { src: kitchen, alt: "Cozinha moderna e organizada", caption: "Cozinhas" },
      { src: office, alt: "Espaço de escritório arrumado", caption: "Escritórios" },
      { src: bathroom, alt: "Casa de banho cuidada", caption: "Casas de banho" },
      { src: bedroom, alt: "Quarto luminoso com cama feita", caption: "Quartos" },
      { src: cleaner, alt: "Profissional a limpar o chão", caption: "Limpeza profissional" },
    ],
  },

  quote: {
    title: "Peça o seu orçamento grátis",
    subtitle: "Preencha os detalhes e envie-nos o pedido diretamente por WhatsApp.",
    services: [
      "Limpeza de casas",
      "Limpeza de espaços comerciais",
      "Limpeza de escritórios",
      "Limpeza de escadas",
      "Limpeza pós-obra",
      "Outro serviço",
    ],
    spaces: ["Apartamento T0/T1", "Apartamento T2", "Apartamento T3 ou maior", "Moradia", "Loja ou espaço comercial", "Escritório", "Prédio (escadas e zonas comuns)", "Outro espaço"],
  },

  faq: {
    title: "Perguntas frequentes",
    items: [
      { q: "Que serviços de limpeza fazem?", a: "Fazemos limpeza de casas, espaços comerciais, escritórios, escadas e limpeza pós-obra." },
      { q: "Em que zonas trabalham?", a: "Trabalhamos em Casal de Cambra e arredores, na região de Lisboa. Indique a sua localidade no pedido e confirmamos se conseguimos ir até si." },
      { q: "O orçamento é pago?", a: "Não. O orçamento é gratuito e sem compromisso." },
      { q: "Como posso pedir um orçamento?", a: "Carregue em qualquer botão do WhatsApp ou preencha o formulário e envie-nos o pedido. Respondemos para combinar os detalhes." },
      { q: "O preço depende do espaço?", a: "Sim. O valor depende da dimensão do espaço, do tipo de limpeza e da frequência. Por isso fazemos sempre um orçamento à medida." },
    ],
  },

  /** Assistente flutuante: só botões, leva ao WhatsApp ou ao telefone. */
  chat: {
    launcher: "Precisa de ajuda?",
    launcherShort: "Ajuda",
    title: "Como podemos ajudar?",
    subtitle: "SF Clean Service",
    greeting: "Olá! 👋 Somos a SF Clean Service. Em que podemos ajudar? Carregue numa das opções abaixo.",
    askService: "Com todo o gosto! De que serviço de limpeza precisa?",
    quoteReady: "Ótimo! Carregue no botão abaixo. Abre-se o WhatsApp com o pedido já escrito. Só tem de carregar em Enviar.",
    services: "Fazemos limpeza de casas, espaços comerciais, escritórios, escadas e limpeza pós-obra.",
    zones: "Trabalhamos em Casal de Cambra e arredores, na região de Lisboa. Se estiver noutra localidade, fale connosco e dizemos-lhe se conseguimos ir até si.",
    prices: "O valor depende do espaço, do tipo de limpeza e da frequência. O orçamento é gratuito e sem compromisso: peça-nos o seu.",
    regular: "Sim. Pode pedir uma limpeza pontual ou regular, por exemplo todas as semanas. Combinamos consigo o que for melhor.",
    typingLabel: "SF Clean Service está a escrever…",
    whatsappIntro: "Carregue no botão abaixo para falar connosco no WhatsApp.",
    callIntro: "Pode ligar-nos diretamente. Carregue no botão abaixo para ligar.",
    whatsappGeneric: "Olá! Gostaria de pedir um orçamento gratuito para um serviço de limpeza.",
  },

  finalCta: {
    title: "Mais tempo para si. Nós cuidamos da limpeza.",
    text: "Peça já o seu orçamento grátis e sem compromisso pelo WhatsApp.",
    button: "Pedir orçamento no WhatsApp",
  },
};
