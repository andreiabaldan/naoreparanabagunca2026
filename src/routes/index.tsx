import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  MapPin,
  Check,
  Home,
  Clock,
  Wallet,
  Heart,
  Sparkles,
  Users,
  ShoppingBag,
  Activity,
  ListChecks,
  Lightbulb,
  ArrowRight,
  Quote,
  Star,
  Play,
  MessageCircle,
  Shirt,
  Utensils,
  BedDouble,
  Ruler,
  Flower2,
  Brain,
  Compass,
  Lock,
  X,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CarouselRow } from "@/components/carousel-row";

import { track } from "@/lib/tracking";

import heroBg from "@/assets/hero-bg.jpg";
import logoNrnb from "@/assets/logo_nrnb.webp.asset.json";
import suelenPhoto from "@/assets/suelen_fundo.png.asset.json";
import suelenAvatar from "@/assets/suelen-avatar.png.asset.json";
import spDouglas from "@/assets/douglas-lopes.png.asset.json";
import spNatalia from "@/assets/natalia-rico.png.asset.json";
import spFernanda from "@/assets/fernanda-ardito.png.asset.json";
import spAndreia from "@/assets/andreia-baldan.png.asset.json";
import spPaula from "@/assets/paula-chiaradia.png.asset.json";
import spMichelle from "@/assets/michelle-sampaio.png.asset.json";
import spStella from "@/assets/stella-vilella.png.asset.json";
import spThais from "@/assets/thais-paraiso.png.asset.json";
import event2 from "@/assets/event-2.jpg";
import event4 from "@/assets/event-4.jpg";
import nrnb1 from "@/assets/dan_9014.jpg.asset.json";
import nova1 from "@/assets/nova1.jpg.asset.json";
import nova2 from "@/assets/nova2.jpg.asset.json";
import nova3 from "@/assets/nova_3.jpg.asset.json";
import nova4 from "@/assets/nova_4.jpg.asset.json";
import nova5 from "@/assets/nova_5.jpg.asset.json";
import nrnbVideo from "@/assets/nrnb-video.mp4.asset.json";
import nrnbVideoPoster from "@/assets/nrnb-video-poster.jpg.asset.json";
import depoimentoVideo from "@/assets/depoimento-1.mp4.asset.json";
import depoimentoPoster from "@/assets/depoimento-1-poster.jpg.asset.json";

/* ==================================================================
   CONFIGURAÇÃO EDITÁVEL — atualize aqui os dados reais do evento
   ================================================================== */

const EVENT = {
  name: "Não Repara na Bagunça 2026",
  concept: "O encontro que muda tudo.",
  promise: "Organize sua casa, sua rotina e sua vida para viver de forma mais leve, prática e possível.",
  date: "24 e 25 de outubro de 2026",
  dateShort: "24 e 25 de outubro",
  venue: "PIT - Parque Tecnológico de\u00a0São José dos Campos/SP",
  city: "",
  address: "Estr. Dr. Altino Bondesan, 500 - Eugênio de Melo, São José dos Campos - SP, 12247-016",
  /** Horários (editáveis). Substitua pelos horários confirmados. */
  hoursShort: "Das 09h às 18h30",
  hoursDay1: "Sábado, 24/10 · das 09h às 18h30",
  hoursDay2: "Domingo, 25/10 · das 09h às 18h30",
  /** CTAs genéricos levam para a seção de ingressos. */
  checkoutUrl: "#ingressos",
  whatsappNumber: "5512991402832",
  whatsappMessage:
    'Olá, Suelen. Vim do site e quero tirar uma dúvida sobre o "Não Repara na Bagunça".',
};

export const WHATSAPP_URL = `https://wa.me/${EVENT.whatsappNumber}?text=${encodeURIComponent(EVENT.whatsappMessage)}`;

/** Depoimento em vídeo (editável). */
const TESTIMONIAL_VIDEO: { src: string; poster?: string } | null = {
  src: depoimentoVideo.url,
  poster: depoimentoPoster.url,
};

/* ---- Palestrantes (editável e modular) ----
   Para adicionar um novo palestrante, basta acrescentar um objeto abaixo
   com: photo, name, topic e description.                                */
type Speaker = {
  name: string;
  /** Tema da palestra */
  topic: string;
  /** Descrição curta revelada em "Saiba mais" */
  description: string;
  photo?: string;
  /** Selo opcional (ex.: idealizadora & anfitriã) */
  badge?: string;
};

const SPEAKERS: Speaker[] = [
  {
    name: "Suelen Gubeisse",
    badge: "Idealizadora & anfitriã",
    topic: "Técnicas modernas de limpeza • Aromatização do lar",
    description:
      "Anfitriã do Não Repara na Bagunça, ela conduz os conteúdos de técnicas modernas de limpeza e aromatização do lar.",
    photo: suelenAvatar.url,
  },
  {
    name: "Andréia Baldan",
    topic: "Crescimento Inteligente",
    description:
      "Entenda como a desorganização impacta pessoas, equipes e empresas, e por onde começar a mudar essa realidade.",
    photo: spAndreia.url,
  },
  {
    name: "Douglas Lopes",
    topic: "A Trilha do Propósito",
    description:
      "Descubra como encontrar direção para viver uma vida com mais propósito e realização.",
    photo: spDouglas.url,
  },
  {
    name: "Fernanda Ardito",
    topic: "Descomplicando a Mesa Posta",
    description:
      "Aprenda a fazer uma mesa posta simples, descomplicada, encantadora e feita com muito carinho.",
    photo: spFernanda.url,
  },
  {
    name: "Michelle Sampaio",
    topic: "O Poder da Comunicação",
    description:
      "Aprenda como uma comunicação clara e intencional pode transformar a maneira como você é percebida.",
    photo: spMichelle.url,
  },
  {
    name: "Natália Rico",
    topic: "A Força do Ecossistema",
    description:
      "Idealizadora do movimento Mulheres à Obra, compartilhará como o poder do ecossistema pode transformar vidas e fortalecer mulheres.",
    photo: spNatalia.url,
  },
  {
    name: "Paula Chiaradia",
    topic: "Imagem que Comunica",
    description:
      "Antes de você falar, a sua imagem já contou uma história. Qual história ela está contando?",
    photo: spPaula.url,
  },
  {
    name: "Stella Vilella",
    topic: "Nosso Corpo é Nossa Primeira Casa",
    description:
      "Porque cuidar do seu corpo é o primeiro passo para viver com mais leveza e qualidade de vida.",
    photo: spStella.url,
  },
  {
    name: "Thaís Paraíso",
    topic: "Imagem que Comunica",
    description:
      "Aprenda como o autocuidado pode resgatar sua confiança e valorizar a mulher que existe em você.",
    photo: spThais.url,
  },
];

/* ---- Prévia da programação (editável) ----
   A agenda oficial (dia, horário, palestrante) ainda não está fechada.
   Estrutura modular: quando houver agenda, basta adicionar SCHEDULE (dias/slots)
   e trocar <Schedule /> por um componente de programação completa.       */
type Theme = { icon: LucideIcon; title: string; desc: string };
type ThemeGroup = { id: string; label: string; blurb: string; themes: Theme[] };

const THEME_GROUPS: ThemeGroup[] = [
  {
    id: "casa",
    label: "Casa & organização",
    blurb:
      "Ideias e soluções para tornar sua casa mais funcional, acolhedora e fácil de viver.",

    themes: [
      {
        icon: Home,
        title: "Organização residencial",
        desc: "Soluções para transformar a organização da casa em praticidade para a vida real.",
      },
      {
        icon: Shirt,
        title: "Guarda-roupa inteligente",
        desc: "Mais funcionalidade, clareza e praticidade na hora de se vestir e organizar suas escolhas.",
      },
      {
        icon: Sparkles,
        title: "Técnicas modernas de limpeza",
        desc: "Caminhos para tornar o cuidado com a casa mais prático e eficiente.",
      },
      {
        icon: Utensils,
        title: "Mesa posta e receber bem",
        desc: "Como transformar momentos à mesa em experiências de cuidado, conexão e acolhimento.",
      },
      {
        icon: BedDouble,
        title: "Cama posta e sensação de acolhimento",
        desc: "Pequenos cuidados capazes de transformar a experiência de chegar e estar em casa.",
      },
      {
        icon: Ruler,
        title: "Arquitetura e funcionalidade da casa",
        desc: "Como os espaços podem funcionar melhor para facilitar a rotina e a vida.",
      },
      {
        icon: Flower2,
        title: "Perfumação do lar: aromas e sensações",
        desc: "Como os aromas ajudam a construir a sensação de acolhimento e identidade dentro de casa.",
      },
    ],
  },
  {
    id: "vida",
    label: "Vida & rotina",
    blurb:
      "Organização para cuidar melhor do seu tempo, das suas escolhas e de você.",

    themes: [
      {
        icon: Wallet,
        title: "Organização financeira",
        desc: "Mais clareza e organização para cuidar melhor da vida financeira.",
      },
      {
        icon: Activity,
        title: "Saúde, bem-estar e qualidade de vida",
        desc: "Organização também é criar espaço para cuidar de você.",
      },
      {
        icon: Brain,
        title: "Organizando a mente para organizar a vida",
        desc: "Porque colocar a vida em ordem também começa pela forma como organizamos pensamentos e prioridades.",
      },
      {
        icon: Clock,
        title: "Rotina prática para mulheres reais",
        desc: "Organização possível para quem tem responsabilidades, imprevistos e uma vida de verdade.",
      },
    ],
  },
  {
    id: "voce",
    label: "Você, suas escolhas & conexões",
    blurb:
      "Porque organizar a vida também passa por quem você é, o que deseja e com quem escolhe caminhar.",

    themes: [
      {
        icon: Compass,
        title: "Trilha do propósito",
        desc: "Um convite para olhar para prioridades, sonhos e para aquilo que realmente importa.",
      },
      {
        icon: Star,
        title: "Imagem e estilo",
        desc: "Organização, imagem e escolhas que ajudam você a expressar quem é e como deseja viver.",
      },
      {
        icon: Users,
        title: "O poder do ecossistema feminino",
        desc: "Conexões, trocas e relações que fortalecem mulheres e abrem novas possibilidades.",
      },
    ],
  },
];

/* ---- Patrocinadores (editável). Adicione { name, logo } quando tiver os logos. ---- */
type Sponsor = { name: string; logo?: string; url?: string };
const SPONSORS: { group: string; items: Sponsor[] }[] = [
  {
    group: "Marcas parceiras",
    items: [
      { name: "[LOGO DA MARCA]" },
      { name: "[LOGO DA MARCA]" },
      { name: "[LOGO DA MARCA]" },
      { name: "[LOGO DA MARCA]" },
      { name: "[LOGO DA MARCA]" },
      { name: "[LOGO DA MARCA]" },
    ],
  },
];

/* ---- Experiências de marcas (opcional): deixe vazio para ocultar a seção. ---- */
type Activation = { brand: string; logo?: string; title: string; description: string };
const ACTIVATIONS: Activation[] = [];


/** Percentual vendido do lote atual (editável). Use null se não houver dado real. */
const LOT_SOLD_PERCENT: number | null = 87;
const LOT_LABEL = "1º lote";

type Ticket = {
  id: "compromisso" | "vip" | "platinum";
  name: string;
  desire: string;
  price: string;
  fullPrice: string;
  lots: string;
  installments: string;
  soldPercent: number | null;
  benefits: string[];
  highlight?: string;
  event: "ticket_compromisso_click" | "ticket_vip_click" | "ticket_platinum_click";
  checkout: string;
};

const TICKETS: Ticket[] = [
  {
    id: "compromisso",
    name: "Compromisso",
    desire: "Quero participar.",
    price: "R$ 97,00",
    fullPrice: "(valor cheio R$ 247,00)",
    lots: "Pré-lançamento - R$ 97,00 / 1º lote R$ 147,00 / 2º lote R$ 197,00 / 3º lote R$ 247,00",
    installments: "ou 12x de R$ 9,70 no cartão",
    soldPercent: 87,
    benefits: [
      "Acesso aos 2 dias de evento",
      "Acesso à feira “Não Repara na Bagunça”",
    ],
    event: "ticket_compromisso_click",
    checkout: "https://payfast.greenn.com.br/168687?batch=13831_RugVFv",
  },
  {
    id: "vip",
    name: "VIP",
    desire: "Quero viver melhor essa experiência.",
    price: "R$ 147,00",
    fullPrice: "(valor cheio R$ 297,00)",
    lots: "Pré-lançamento - R$ 147,00 / 1º lote R$ 197,00 / 2º lote R$ 247,00 / 3º lote R$ 297,00",
    installments: "ou 12x de R$ 14,70 no cartão",
    soldPercent: 62,
    highlight: "Experiência recomendada",
    benefits: [
      "Acesso aos 2 dias de evento",
      "Acesso à feira “Não Repara na Bagunça”",
      "Assentos em áreas mais à frente da plateia",
      "Acesso à área VIP exclusiva",
      "Café e petit four",
    ],
    event: "ticket_vip_click",
    checkout: "https://payfast.greenn.com.br/168694?batch=13835_tnl2FL",
  },
  {
    id: "platinum",
    name: "Platinum",
    desire: "Quero viver tudo o que o NRNB pode oferecer.",
    price: "R$ 347,00",
    fullPrice: "(valor cheio R$ 597,00)",
    lots: "Pré-lançamento - R$ 347,00 / 1º lote R$ 447,00 / 2º lote R$ 497,00 / 3º lote R$ 597,00",
    installments: "ou 12x de R$ 34,70 no cartão",
    soldPercent: 41,
    highlight: "Experiência completa",
    benefits: [
      "Acesso aos 2 dias de evento",
      "Sacola com brindes exclusivos",
      "Acesso à feira “Não Repara na Bagunça”",
      "Assentos nas primeiras fileiras (1ª e 2ª fileira — melhor localização da plateia)",
      "Acesso à área VIP exclusiva",
      "Café e petit four",
      "Curso completo de organização com Suelen Gubeisse",
      "Um encontro ao vivo com a Suelen para tirar dúvidas no momento da prática",
    ],
    event: "ticket_platinum_click",
    checkout: "https://payfast.greenn.com.br/168696?batch=13839_135ERC",
  },
];

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Não Repara na Bagunça 2026 — O encontro que muda tudo" },
      {
        name: "description",
        content:
          "2 dias para deixar sua casa, sua rotina e sua vida mais leves e organizadas. 24 e 25 de outubro de 2026, São José dos Campos/SP. Garanta seu ingresso.",
      },
      {
        property: "og:title",
        content: "Não Repara na Bagunça 2026 — O encontro que muda tudo",
      },
      {
        property: "og:description",
        content:
          "2 dias para deixar sua casa, sua rotina e sua vida mais leves e organizadas. 24 e 25 de outubro de 2026, São José dos Campos/SP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: heroBg },
      { name: "twitter:image", content: heroBg },
    ],
  }),
});

/* -------------------- Blocos reutilizáveis -------------------- */

function goToTickets() {
  const el = document.getElementById("ingressos");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CTAButton({
  children,
  event,
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  event: Parameters<typeof track>[0];
  size?: "md" | "lg";
  className?: string;
}) {
  const sizes = {
    md: "px-6 py-3.5 text-sm",
    lg: "px-8 py-4.5 text-base",
  };
  return (
    <button
      type="button"
      onClick={() => {
        track(event);
        goToTickets();
      }}
      className={`group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand font-semibold uppercase tracking-wide text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.99] sm:w-auto ${sizes[size]} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-magenta-soft px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

function LotProgress({
  percent,
  label,
  compact = false,
}: {
  percent: number | null;
  label?: string;
  compact?: boolean;
}) {
  if (percent === null) return null;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`font-semibold text-primary ${compact ? "text-xs" : "text-xs"} uppercase tracking-wider`}
        >
          {percent}% {label ?? "deste lote"} vendido
        </span>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-sky/40"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percent}% vendido`}
      >
        <div
          className="h-full rounded-full bg-gradient-brand"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-5 py-14 sm:px-6 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/* -------------------- Seções -------------------- */

function TopBar() {
  return (
    <div className="bg-gradient-brand">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2.5 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground sm:text-xs">
          1º LOTE QUASE ESGOTADO • GARANTA SEU INGRESSO PELO VALOR ATUAL
        </span>
      </div>
    </div>
  );
}

/** Composição editorial do Hero: Suelen protagonista + especialistas em recortes. */
const HERO_GUESTS = [
  {
    photo: spAndreia.url,
    name: "Andréia Baldan",
    pos: "left-0 bottom-[6%] w-[30%] sm:w-[28%] -rotate-3",
    hideOnMobile: false,
  },
  {
    photo: spDouglas.url,
    name: "Douglas Lopes",
    pos: "right-0 bottom-[6%] w-[30%] sm:w-[28%] rotate-3",
    hideOnMobile: false,
  },
  {
    photo: spFernanda.url,
    name: "Fernanda Ardito",
    pos: "left-[13%] top-[8%] w-[24%] sm:w-[22%] -rotate-6",
    hideOnMobile: false,
  },
  {
    photo: spMichelle.url,
    name: "Michelle Sampaio",
    pos: "right-[13%] top-[8%] w-[24%] sm:w-[22%] rotate-6",
    hideOnMobile: false,
  },
  {
    photo: spNatalia.url,
    name: "Natália Rico",
    pos: "left-[2%] top-[38%] w-[21%] -rotate-2",
    hideOnMobile: true,
  },
  {
    photo: spPaula.url,
    name: "Paula Chiaradia",
    pos: "right-[2%] top-[38%] w-[21%] rotate-2",
    hideOnMobile: true,
  },
  {
    photo: spStella.url,
    name: "Stella Vilella",
    pos: "left-1/2 -translate-x-1/2 -top-[1%] w-[20%]",
    hideOnMobile: true,
  },
];

function HeroComposition() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[380px] sm:aspect-square sm:max-w-[460px] lg:max-w-[560px]">
      {/* fundos suaves da marca */}
      <div className="absolute inset-x-[8%] bottom-[4%] top-[10%] rounded-[3rem] bg-gradient-identity opacity-20 blur-2xl" />
      <div className="absolute inset-x-[16%] bottom-0 top-[22%] rounded-[2.5rem] bg-sky-tint" />

      {/* Suelen protagonista */}
      <div className="absolute bottom-0 left-1/2 w-[52%] -translate-x-1/2 sm:w-[50%]">
        <img
          src={suelenAvatar.url}
          alt="Suelen Gubeisse, idealizadora do Não Repara na Bagunça"
          width={640}
          height={640}
          fetchPriority="high"
          decoding="async"
          className="w-full object-contain drop-shadow-[0_18px_30px_rgba(23,20,26,0.22)]"
        />
      </div>

      {/* Especialistas em recortes sobrepostos */}
      {HERO_GUESTS.map((g) => (
        <div
          key={g.name}
          className={`absolute ${g.pos} ${g.hideOnMobile ? "hidden sm:block" : ""}`}
        >
          <img
            src={g.photo}
            alt={g.name}
            width={260}
            height={260}
            loading="lazy"
            decoding="async"
            className="w-full object-contain drop-shadow-[0_12px_22px_rgba(23,20,26,0.18)]"
          />
        </div>
      ))}
    </div>
  );
}


function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-gradient-identity opacity-[0.10]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_at_top_right,_var(--sky-tint)_0%,_transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-identity" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-10 pt-6 sm:px-6 sm:pb-16 sm:pt-12 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12 lg:pb-20 lg:pt-16">
        {/* Composição (primeiro no mobile, à direita no desktop) */}
        <div className="order-1 lg:order-2">
          <HeroComposition />
          <p className="mt-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Suelen Gubeisse + especialistas convidados
          </p>
        </div>

        {/* Conversão */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <img
            src={logoNrnb.url}
            alt="Não Repara na Bagunça"
            width={380}
            height={135}
            fetchPriority="high"
            className="mx-auto w-[300px] max-w-full rounded-xl shadow-card sm:w-[380px] lg:mx-0 lg:w-[400px]"
          />

          <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            <span className="italic text-gradient-brand">
              O encontro que muda tudo.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-balance text-lg font-medium leading-relaxed text-foreground/90 sm:text-xl lg:mx-0">
            2 dias para deixar sua casa, sua rotina e sua vida mais leves e
            organizadas.
          </p>

          <div className="mt-5 flex flex-col items-center gap-1 text-base font-semibold text-foreground/90 lg:items-start">
            <span className="text-balance">
              24 e 25 de outubro · São José dos Campos/SP
            </span>
            <span className="font-medium text-foreground/80">9h às 18h30</span>
          </div>

          <div className="mx-auto mt-6 max-w-md lg:mx-0">
            <CTAButton event="hero_cta_click" size="lg" className="w-full">
              Quero garantir meu ingresso
            </CTAButton>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {LOT_LABEL} quase esgotado · {LOT_SOLD_PERCENT}% vendido
              </p>
              <LotProgress percent={LOT_SOLD_PERCENT} label="" hideLabel />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}


const FOR_WHOM = [
  "Você quer uma casa mais organizada, mas não sabe por onde começar.",
  "Sente que sua rotina vive no modo “apagar incêndios”.",
  "Quer aprender formas práticas de ganhar tempo no dia a dia.",
  "Quer cuidar melhor da sua casa, do seu dinheiro e de você.",
  "Adora organização, decoração, casa e soluções que facilitam a vida.",
  "Sente que precisa organizar prioridades e tirar alguns planos do papel.",
  "Quer uma rotina que funcione melhor para você e para sua família.",
];

function ForWhom() {
  return (
    <Section className="bg-sky-tint">
      <div className="text-center">
        <SectionEyebrow>Para quem é</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
          Se você sente que colocar a vida em ordem faria tudo ficar um pouco
          mais leve, <span className="italic text-gradient-brand">esse fim
          de semana é para você.</span>
        </h2>
      </div>

      <div className="mt-8">
        <CarouselRow
          ariaLabel="Para quem é o evento"
          hint="← Deslize para ver se você se identifica →"
          itemClassName="w-[82%] sm:w-[46%] lg:w-[32%]"
          items={FOR_WHOM.map((item) => (
            <div
              key={item}
              className="flex h-full items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-card"
            >
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-foreground/90">
                {item}
              </span>
            </div>
          ))}
        />
      </div>


      <p className="mx-auto mt-8 max-w-2xl text-balance text-center text-base font-medium text-foreground sm:text-lg">
        Você não precisa sair do evento com uma vida perfeita. Precisa sair
        sabendo como torná-la mais leve.
      </p>
    </Section>
  );
}

const BENEFITS = [
  {
    icon: Home,
    title: "Casa mais funcional",
    text: "Soluções práticas para organizar ambientes e fazer sua casa trabalhar a seu favor.",
  },
  {
    icon: Sparkles,
    title: "Rotina mais leve",
    text: "Maneiras de reduzir o improviso e tornar seus dias mais simples.",
  },
  {
    icon: Clock,
    title: "Mais tempo para você",
    text: "Organização é gastar menos energia procurando, decidindo e refazendo.",
  },
  {
    icon: Wallet,
    title: "Finanças mais organizadas",
    text: "Caminhos para colocar o dinheiro em ordem e decidir com mais clareza.",
  },
  {
    icon: ListChecks,
    title: "Clareza sobre prioridades",
    text: "Organizar não é fazer tudo. É entender o que merece espaço na sua vida.",
  },
  {
    icon: Lightbulb,
    title: "Ideias para colocar em prática",
    text: "Nada de sair só inspirada. O objetivo é sair sabendo por onde começar.",
  },
];

function Benefits() {
  return (
    <Section>
      <div className="text-center">
        <SectionEyebrow>O que muda para você</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
          Imagine voltar para casa sabendo{" "}
          <span className="italic text-gradient-brand">
            exatamente por onde começar.
          </span>
        </h2>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-2xl border border-border/60 bg-card shadow-card p-5 transition-colors hover:border-primary/50"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-magenta-soft">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <CTAButton event="benefits_cta_click" size="lg">
          Eu quero viver esses 2 dias
        </CTAButton>
      </div>
    </Section>
  );
}

const TERRITORIES = [
  { icon: Home, label: "Organização da casa" },
  { icon: Clock, label: "Rotina e produtividade" },
  { icon: Wallet, label: "Finanças" },
  { icon: Activity, label: "Saúde e bem-estar" },
  { icon: ListChecks, label: "Organização pessoal" },
  { icon: Sparkles, label: "Experiências práticas" },
  { icon: ShoppingBag, label: "Soluções e produtos" },
  { icon: Users, label: "Conexão com outras mulheres" },
];

function Experience() {
  return (
    <Section className="bg-secondary/60">
      <div className="text-center">
        <SectionEyebrow>O que você vai viver</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
          Não é um fim de semana para ficar sentada{" "}
          <span className="italic text-gradient-brand">
            apenas ouvindo palestras.
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
          É para aprender, experimentar, se inspirar e voltar para casa querendo
          colocar tudo em prática.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TERRITORIES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card shadow-card px-3 py-6 text-center"
          >
            <Icon className="h-6 w-6 text-primary" />
            <span className="text-xs font-semibold uppercase leading-snug tracking-wide text-foreground/90">
              {label}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function VideoStory() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    setPlaying(true);
    track("video_play");
    requestAnimationFrame(() => {
      videoRef.current?.play();
    });
  };

  return (
    <Section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#86CBD7]/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="relative text-center">
        <SectionEyebrow>A experiência NRNB</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
          Mais do que explicar,{" "}
          <span className="italic text-gradient-brand">é melhor viver.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
          Dê o play e sinta um pouco do que acontece quando centenas de mulheres
          se encontram para tornar a casa, a rotina e a vida mais leves.
        </p>
      </div>

      <div className="relative mt-10 flex justify-center">
        <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#86CBD7]/40 to-primary/30 blur-[2px]"
          />
          <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] border border-border/60 bg-black shadow-card">
            {playing ? (
              <video
                ref={videoRef}
                src={nrnbVideo.url}
                poster={nrnbVideoPoster.url}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <button
                type="button"
                onClick={handlePlay}
                aria-label="Reproduzir vídeo do Não Repara na Bagunça"
                className="group relative h-full w-full"
              >
                <img
                  src={nrnbVideoPoster.url}
                  alt="Suelen Gubeisse no palco durante o Não Repara na Bagunça"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-105">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 h-7 w-7"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-9 text-center">
        <p className="text-base font-semibold text-foreground sm:text-lg">
          Em outubro, seu lugar pode ser aqui.
        </p>
        <div className="mt-5 flex justify-center">
          <CTAButton event="video_cta_click" size="lg">
            Quero garantir meu ingresso
          </CTAButton>
        </div>
      </div>
    </Section>
  );
}



const GALLERY = [
  { src: nrnb1.url, alt: "Suelen Gubeisse no palco do Não Repara na Bagunça" },
  { src: nova5.url, alt: "Plateia vibrando e aplaudindo durante o evento" },
  { src: nova4.url, alt: "Suelen Gubeisse na palestra sobre organização de closet" },
  { src: nova2.url, alt: "Participantes registrando o conteúdo no auditório lotado" },
  { src: nova1.url, alt: "Participantes no espaço instagramável com as marcas parceiras" },
  { src: nova3.url, alt: "Apresentação musical ao vivo no palco do evento" },
];


const TESTIMONIALS = [
  { text: "\"Nunca pensei que organizar a casa pudesse ser tão libertador. Minha rotina mudou completamente e hoje tenho paz!\"", author: "Mariana Silva" },
  { text: "\"Finalmente encontrei um método que funciona para a minha realidade, sem cobranças de perfeição. Foi um divisor de águas.\"", author: "Juliana Costa" },
  { text: "[INSERIR DEPOIMENTO REAL]", author: "[Nome da participante]" },
];

function SocialProof() {
  return (
    <Section>
      <div className="text-center">
        <SectionEyebrow>Prova social</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
          Quem vive o Não Repara na Bagunça{" "}
          <span className="italic text-gradient-brand">entende.</span>
        </h2>
      </div>

      <TestimonialVideo />

      <div className="mt-8 grid auto-rows-[130px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-4">
        {GALLERY.map((img, i) => (
          <div
            key={img.src}
            className={`overflow-hidden rounded-2xl border border-border/60 ${
              i === 0 ? "col-span-2 row-span-2" : ""
            } ${i === 3 ? "sm:row-span-2" : ""}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={i}
            className="rounded-2xl border border-border/60 bg-card shadow-card p-5"
          >
            <Quote className="h-5 w-5 text-primary" />
            <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">
              {t.text}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
              <Star className="h-3.5 w-3.5 text-primary" />
              {t.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function TestimonialVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mt-8 rounded-3xl border border-primary/25 bg-card p-5 shadow-card sm:p-7">
      <p className="text-center text-balance font-display text-xl leading-snug sm:text-2xl">
        Veja o que quem já viveu o Não Repara na Bagunça{" "}
        <span className="italic text-gradient-brand">tem para contar.</span>
      </p>

      <div className="mx-auto mt-5 w-full max-w-[340px]">
        <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-border/60 bg-sky-tint">
          {TESTIMONIAL_VIDEO ? (
            playing ? (
              <video
                src={TESTIMONIAL_VIDEO.src}
                poster={TESTIMONIAL_VIDEO.poster}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  track("testimonial_video_play");
                  setPlaying(true);
                }}
                className="group absolute inset-0 h-full w-full"
                aria-label="Assistir depoimento em vídeo"
              >
                {TESTIMONIAL_VIDEO.poster && (
                  <img
                    src={TESTIMONIAL_VIDEO.poster}
                    alt="Depoimento de participante do Não Repara na Bagunça"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-colors group-hover:bg-foreground/30">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-glow">
                    <Play className="ml-1 h-7 w-7 text-primary-foreground" fill="currentColor" />
                  </span>
                </span>
              </button>
            )
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <Play className="h-8 w-8 text-primary" />
              [INSERIR VÍDEO DE DEPOIMENTO]
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WhatsAppFloating() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_floating_click")}
      title="Ficou com alguma dúvida? Fale com a gente."
      aria-label="Ficou com alguma dúvida? Fale com a gente no WhatsApp"
      className="group fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-card/95 px-3.5 py-3 text-sm font-medium text-foreground/80 shadow-card backdrop-blur transition-colors hover:text-primary lg:bottom-6 lg:right-6"
    >
      <MessageCircle className="h-5 w-5 text-primary" />
      <span className="hidden lg:inline">Ficou com alguma dúvida?</span>
    </a>
  );
}

function Tickets() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !seen.current) {
          seen.current = true;
          track("ticket_section_view");
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Section id="ingressos" className="bg-sky-tint">
      <div ref={ref} className="text-center">
        <SectionEyebrow>Ingressos</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
          Escolha como você quer{" "}
          <span className="italic text-gradient-brand">
            viver essa experiência.
          </span>
        </h2>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {TICKETS.map((t) => (
          <div
            key={t.id}
            className={`flex flex-col rounded-3xl border bg-card shadow-card p-5 ${
              t.id === "vip"
                ? "border-primary shadow-glow lg:-mt-3"
                : "border-border/60"
            }`}
          >
            {t.highlight && (
              <span className="mb-3 self-start rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground">
                {t.highlight}
              </span>
            )}

            <LotProgress percent={t.soldPercent} compact />

            <h3 className="mt-4 font-display text-2xl font-semibold">
              {t.name}
            </h3>
            <p className="mt-1 text-sm italic text-muted-foreground">
              “{t.desire}”
            </p>

            <div className="mt-4">
              <span className="font-display text-4xl font-semibold">
                {t.price}
              </span>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.fullPrice}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.installments}
              </p>
              <p className="mt-3 rounded-xl bg-sky-tint p-3 text-xs leading-relaxed text-muted-foreground">
                {t.lots}
              </p>
            </div>

            <ul className="mt-5 flex-1 space-y-2.5">
              {t.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-foreground/90">{b}</span>
                </li>
              ))}
            </ul>

            <a
              href={t.checkout}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track(t.event, { ticket: t.id });
                track("checkout_start", { ticket: t.id });
              }}
              className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all active:scale-[0.99] ${
                t.id === "vip"
                  ? "bg-gradient-brand text-primary-foreground shadow-glow hover:brightness-110"
                  : "bg-primary text-primary-foreground hover:bg-plum"
              }`}
            >
              Quero este ingresso
              <ArrowRight className="h-4 w-4" />
            </a>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-primary" />
              Compra segura
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Os valores mudam conforme os lotes avançam. Garanta agora o valor atual.
      </p>

      <div className="mt-6 rounded-2xl border border-border/60 bg-card/60 p-5 text-center">
        <p className="text-sm text-muted-foreground">
          Ainda ficou com alguma dúvida sobre qual ingresso escolher?
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_tickets_click")}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-magenta-soft"
        >
          <MessageCircle className="h-4 w-4" />
          Falar com a Suelen no WhatsApp
        </a>
      </div>
    </Section>
  );
}

function Founder() {
  return (
    <Section>
      <div className="grid items-center gap-6 md:grid-cols-[0.7fr_1fr] md:gap-8">
        <div className="relative mx-auto w-full max-w-[260px] overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-primary/15 to-background md:max-w-xs">
          <img
            src={suelenPhoto.url}
            alt="Suelen Gubeisse, idealizadora do Não Repara na Bagunça"
            loading="lazy"
            decoding="async"
            className="aspect-[3/4] w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
        <div>
          <SectionEyebrow>Idealizadora</SectionEyebrow>
          <h2 className="mt-4 text-balance text-2xl leading-tight sm:text-3xl">
            Quem criou o{" "}
            <span className="italic text-gradient-brand">
              Não Repara na Bagunça
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Suelen Gubeisse é Personal Organizer. Depois de anos entrando na
            casa de mulheres e vendo de perto como a organização transforma
            muito mais do que armários, criou o Não Repara na Bagunça.
          </p>
          <p className="mt-3 text-sm font-medium leading-relaxed text-foreground sm:text-base">
            Um evento para mostrar, na prática, que organização não é sobre ter
            uma casa perfeita. É sobre criar espaço para a vida que você quer
            viver.
          </p>
        </div>
      </div>

    </Section>
  );
}

function Venue() {
  return (
    <Section className="bg-secondary/60">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <SectionEyebrow>Data e local</SectionEyebrow>
          <h2 className="mt-5 text-balance text-2xl leading-tight sm:text-3xl">
            Nos encontramos em{" "}
            <span className="italic text-gradient-brand">
              São José dos Campos.
            </span>
          </h2>
          <ul className="mt-5 space-y-3 text-sm sm:text-base">
            <li className="flex items-center gap-3">
              <Calendar className="h-5 w-5 shrink-0 text-primary" />
              {EVENT.date}
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              {EVENT.venue}
            </li>
            <li className="flex items-start gap-3">
              <Clock className="h-5 w-5 shrink-0 text-primary" />
              <span>
                {EVENT.hoursDay1}
                <br />
                {EVENT.hoursDay2}
              </span>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Heart className="h-5 w-5 shrink-0 text-primary" />
              Estacionamento Gratuito - {EVENT.address}
            </li>

          </ul>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border/60">
          <img
            src={event2}
            alt="Espaço do evento em São José dos Campos"
            loading="lazy"
            decoding="async"
            className="h-64 w-full object-cover sm:h-80"
          />
        </div>
      </div>
    </Section>
  );
}

const FAQS = [
  {
    q: "Preciso entender de organização para participar?",
    a: "Não. O evento é feito para qualquer mulher que queira deixar a casa, a rotina e a vida mais organizadas — do zero ou não.",
  },
  {
    q: "É só para Personal Organizers?",
    a: "Não. Personal Organizers são muito bem-vindas, mas o evento é para todas as mulheres que querem organizar o que está ao seu redor.",
  },
  {
    q: "O ingresso vale para os dois dias?",
    a: "Sim. Todos os ingressos dão acesso aos dois dias de evento, 24 e 25 de outubro de 2026.",
  },
  {
    q: "O que está incluso no meu ingresso?",
    a: "[INSERIR DESCRIÇÃO CONFIRMADA DO QUE ESTÁ INCLUSO EM CADA CATEGORIA]",
  },
  {
    q: "Onde será realizado?",
    a: "No Parque Tecnológico, em São José dos Campos/SP.",
  },
  {
    q: "Posso parcelar?",
    a: "Sim. O pagamento pode ser parcelado em até 12x no cartão de crédito.",
  },
  {
    q: "Como recebo meu ingresso?",
    a: "[INSERIR PROCEDIMENTO CONFIRMADO DE ENVIO DO INGRESSO]",
  },
];

function FAQ() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <SectionEyebrow>Dúvidas</SectionEyebrow>
          <h2 className="mt-5 text-balance text-2xl leading-tight sm:text-3xl">
            Perguntas frequentes
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-6">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-sm sm:text-base">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-24">
      <img
        src={event4}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/88 via-background/92 to-background" />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-balance text-base text-muted-foreground sm:text-lg">
          Talvez você chegue pela vontade de organizar sua casa.
        </p>
        <h2 className="mt-6 text-balance font-display text-3xl leading-tight sm:text-5xl">
          E descubra que organizar muda muito mais do que a casa.
        </h2>
        <p className="mt-5 text-2xl italic text-gradient-brand sm:text-3xl">
          O encontro que muda tudo.
        </p>

        <p className="mt-8 text-base text-foreground/85">
          24 e 25 de outubro · São José dos Campos/SP
        </p>

        <div className="mx-auto mt-10 max-w-md">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
            {LOT_LABEL} quase esgotado
          </p>
          <div className="mt-3">
            <LotProgress percent={LOT_SOLD_PERCENT} label={`do ${LOT_LABEL}`} />
          </div>
          <div className="mt-8">
            <CTAButton event="final_cta_click" size="lg" className="w-full">
              Quero viver essa experiência
            </CTAButton>
          </div>
        </div>

      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-magenta px-5 py-10 text-center sm:px-6">
      <img
        src={logoNrnb.url}
        alt="Não Repara na Bagunça"
        width={380}
        height={135}
        className="mx-auto w-[160px] max-w-full sm:w-[200px]"
      />
      <p className="mt-4 text-xs text-white/90">
        {EVENT.dateShort} de 2026 · {EVENT.venue}
      </p>
      <p className="mt-6 text-xs text-white/85">
        © 2026 Não Repara na Bagunça. Todos os direitos reservados.
      </p>
    </footer>
  );
}

function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <button
        type="button"
        onClick={() => {
          track("sticky_cta_click");
          goToTickets();
        }}
        className="w-full rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-glow"
      >
        Garantir ingresso
      </button>
    </div>
  );
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const [open, setOpen] = useState(false);
  const initials = speaker.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <article className="flex h-full flex-col items-center rounded-3xl border border-border/60 bg-card p-5 text-center shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="relative rounded-full bg-gradient-identity p-[3px]">
        <div className="h-28 w-28 overflow-hidden rounded-full bg-sky-tint sm:h-32 sm:w-32">
          {speaker.photo ? (
            <img
              src={speaker.photo}
              alt={`Foto de ${speaker.name}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-serif text-2xl text-primary">
              {initials}
            </div>
          )}
        </div>
      </div>

      {speaker.badge ? (
        <span className="mt-3 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
          {speaker.badge}
        </span>
      ) : null}

      <div className="flex flex-1 flex-col items-center">
        <h3 className="mt-3 text-base font-semibold leading-tight text-foreground">
          {speaker.name}
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary">
          {speaker.topic}
        </p>


        {open ? (
          <p className="mt-3 text-sm leading-snug text-muted-foreground">
            {speaker.description}
          </p>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-3 text-xs font-bold uppercase tracking-widest text-primary transition-opacity hover:opacity-70"
        >

          {open ? "Fechar −" : "Saiba mais +"}
        </button>
      </div>
    </article>
  );
}

function Speakers() {
  return (
    <Section id="palestrantes">
      <div className="text-center">
        <SectionEyebrow>Palestrantes</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
          Quem você vai encontrar{" "}
          <span className="italic text-gradient-brand">no NRNB 2026</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
          Especialistas e convidados para ajudar você a olhar para diferentes
          áreas da casa, da rotina e da vida.
        </p>
      </div>

      <div className="mt-8">
        <CarouselRow
          ariaLabel="Palestrantes do NRNB 2026"
          items={SPEAKERS.map((s) => (
            <SpeakerCard key={s.name} speaker={s} />
          ))}
          itemClassName="w-[78%] sm:w-[45%] lg:w-[31%] xl:w-[23%]"
          hint="Deslize para conhecer os palestrantes →"
        />
      </div>

      <div className="mt-8 text-center">
        <p className="mx-auto max-w-xl text-balance text-sm text-muted-foreground sm:text-base">
          E ainda tem muito mais sendo preparado para esses dois dias.
        </p>
        <div className="mt-5 flex justify-center">
          <CTAButton event="schedule_cta_click">
            Quero viver essa experiência
          </CTAButton>
        </div>
      </div>
    </Section>
  );
}

function ThemeCard({ theme }: { theme: Theme }) {
  const Icon = theme.icon;
  const [open, setOpen] = useState(false);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 sm:p-6">
      <span className="badge-icon h-11 w-11 shrink-0 rounded-xl">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-balance font-display text-xl font-semibold leading-tight text-foreground sm:text-2xl">
        {theme.title}
      </h3>

      {open && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {theme.desc}
        </p>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-auto pt-4 text-left text-xs font-bold uppercase tracking-widest text-primary transition-opacity hover:opacity-70"
      >
        {open ? "Fechar −" : "Saiba mais +"}
      </button>
    </article>
  );
}

function ThemeGroupBlock({ group }: { group: ThemeGroup }) {

  return (
    <div>
      <div className="flex items-center gap-3">
        <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-primary sm:text-lg">
          {group.label}
        </h3>
        <span className="h-px flex-1 bg-gradient-identity opacity-60" />
      </div>

      <div className="mt-4">
        <CarouselRow
          ariaLabel={group.label}
          showDots={false}
          hint="Deslize para ver mais →"
          itemClassName="w-[80%] sm:w-[46%] lg:w-[31%] xl:w-[24%]"
          items={group.themes.map((t) => (
            <ThemeCard key={t.title} theme={t} />
          ))}
        />
      </div>
    </div>
  );
}


function Schedule() {
  return (
    <Section id="programacao" className="bg-sky-tint">
      <div className="text-center">
        <SectionEyebrow>Prévia da programação</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-3xl leading-tight sm:text-4xl">
          Dois dias para organizar{" "}
          <span className="italic text-gradient-brand">da casa à vida.</span>
        </h2>
      </div>

      <div className="mt-8 space-y-10">
        {THEME_GROUPS.map((group) => (
          <ThemeGroupBlock key={group.id} group={group} />
        ))}
      </div>



      <div className="mx-auto mt-14 max-w-3xl px-2 text-center sm:mt-20">
        <p className="text-balance font-display text-2xl italic leading-snug text-primary sm:text-4xl">
          “Grandes transformações começam quando você se apaixona pelo
          processo.”
        </p>

        <div className="mt-10 flex justify-center sm:mt-12">
          <CTAButton event="schedule_cta_click">
            Quero viver esses 2 dias
          </CTAButton>
        </div>
      </div>


      <p className="mt-6 text-center text-xs text-muted-foreground">
        *Temas confirmados. Dias, horários e palestrantes serão divulgados em
        breve.
      </p>
    </Section>
  );
}

function Sponsors() {
  const sponsorWhatsAppUrl =
    `https://wa.me/5512991402832?text=${encodeURIComponent("Olá, vim do site quero ser patrocinador")}`;

  return (
    <Section id="patrocinadores">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-2xl leading-tight sm:text-3xl">
          Marcas que estarão com a gente em 2026
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
          Os patrocinadores e parceiros desta edição serão apresentados em breve.
        </p>

        <div className="mt-8 rounded-2xl border border-border/60 bg-sky-tint/30 p-6 sm:p-8">
          <p className="text-base font-semibold text-foreground sm:text-lg">
            Sua marca também pode fazer parte do Não Repara na Bagunça 2026.
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Quer conhecer as possibilidades de parceria e patrocínio do evento? Fale com a nossa equipe.
          </p>
          <a
            href={sponsorWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("sponsor_whatsapp_click")}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border-2 border-magenta px-6 py-3 text-sm font-semibold uppercase tracking-wider text-magenta transition hover:bg-magenta hover:text-white"
          >
            Quero saber mais sobre patrocínio
          </a>
        </div>
      </div>

      {/*
        Grid de logos e experiências de marcas mantidos comentados temporariamente.
        Para reativar, basta remover este bloco de comentário e assegurar que
        SPONSORS e ACTIVATIONS tenham conteúdo real preenchido.
      */}
    </Section>
  );
}

/* -------------------- Galeria de fotos reais -------------------- */
/* Somente fotografias reais das edições anteriores.
   Ao receber as novas fotos, basta adicionar mais itens aqui. */
const EVENT_PHOTOS = [
  { src: nrnb1.url, alt: "Suelen Gubeisse no palco do Não Repara na Bagunça" },
  { src: nova5.url, alt: "Plateia vibrando e aplaudindo durante o evento" },
  { src: nova4.url, alt: "Palestra sobre organização de closet no palco" },
  { src: nova3.url, alt: "Apresentação musical ao vivo no palco do evento" },
  { src: nova2.url, alt: "Participantes registrando o conteúdo no auditório lotado" },
  { src: nova1.url, alt: "Participantes no espaço instagramável com as marcas parceiras" },
];

function PhotoGallery() {
  const [index, setIndex] = useState<number | null>(null);
  const total = EVENT_PHOTOS.length;

  const open = (i: number) => {
    setIndex(i);
    track("gallery_photo_open", { photo: i + 1 });
  };
  const move = (dir: 1 | -1) =>
    setIndex((cur) => (cur === null ? cur : (cur + dir + total) % total));

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <Section id="galeria">
      <div className="text-center">
        <SectionEyebrow>Galeria</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
          Um pouco do que{" "}
          <span className="italic text-gradient-brand">você vai viver</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground">
          Porque o Não Repara na Bagunça é muito mais do que assistir a
          palestras. É viver dois dias de experiências, encontros, aprendizados
          e conexão.
        </p>
      </div>

      <div className="mt-8">
        <CarouselRow
          ariaLabel="Fotos das edições anteriores"
          itemClassName="w-[85%] sm:w-[52%] lg:w-[38%]"
          hint="Deslize para ver mais fotos →"
          items={EVENT_PHOTOS.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => open(i)}
              className="group block w-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <CTAButton event="gallery_cta_click">
          Quero viver essa experiência
        </CTAButton>
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/90 p-4"
          onClick={() => setIndex(null)}
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-background/90 p-2 text-foreground"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Foto anterior"
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            className="absolute left-3 rounded-full bg-background/90 p-2 text-foreground sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <figure
            className="max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={EVENT_PHOTOS[index]!.src}
              alt={EVENT_PHOTOS[index]!.alt}
              className="mx-auto max-h-[75vh] w-auto max-w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-background/80">
              {EVENT_PHOTOS[index]!.alt} · {index + 1} / {total}
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Próxima foto"
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            className="absolute right-3 rounded-full bg-background/90 p-2 text-foreground sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </Section>
  );
}

/* -------------------- Compre com tranquilidade --------------------
   Componente pronto, porém OCULTO até recebermos a política oficial
   de cancelamento/reembolso. Para ativar, preencha REFUND_POLICY. */
const REFUND_POLICY: { intro: string; items: string[] } | null = null;

function PurchaseSafety() {
  if (!REFUND_POLICY) return null;

  return (
    <Section className="bg-sky-tint">
      <div className="mx-auto max-w-2xl rounded-3xl border border-border/60 bg-card p-6 text-center shadow-card sm:p-8">
        <span className="badge-icon mx-auto">
          <Lock className="h-5 w-5" />
        </span>
        <h2 className="mt-4 text-balance text-2xl leading-tight sm:text-3xl">
          Compre com tranquilidade
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {REFUND_POLICY.intro}
        </p>
        <ul className="mt-5 space-y-2.5 text-left">
          {REFUND_POLICY.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-foreground/90">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* -------------------- Página -------------------- */


function LandingPage() {
  useEffect(() => {
    track("page_view");
  }, []);

  return (
    <main className="min-h-screen bg-background pb-20 lg:pb-0">
      <TopBar />
      <Hero />
      <Experience />
      <VideoStory />
      <PhotoGallery />
      <ForWhom />
      <Benefits />
      <Founder />
      <Speakers />
      <Schedule />
      <SocialProof />
      <Tickets />
      <PurchaseSafety />

      <Sponsors />
      <Venue />

      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTA />
      <WhatsAppFloating />
    </main>
  );
}
