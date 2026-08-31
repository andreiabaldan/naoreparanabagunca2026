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
import logoNrnb from "@/assets/logo-nrnb-alpha.png.asset.json";
import suelenPhoto from "@/assets/suelen-idealizadora.jpg.asset.json";
import suelenAvatar from "@/assets/suelen-face-cut.png.asset.json";
import heroComposicao from "@/assets/hero-oficial-2608.jpeg.asset.json";
import spDouglas from "@/assets/douglas-cut.png.asset.json";
import spNatalia from "@/assets/natalia-rico-busto.png.asset.json";
import spFernanda from "@/assets/fernanda-ardito.png.asset.json";
import spAndreia from "@/assets/andreia-ombros.png.asset.json";
import spPaula from "@/assets/paula-chiaradia-busto.png.asset.json";
import spMichelle from "@/assets/michelle-cut.png.asset.json";
import spStella from "@/assets/stella-vilella-busto.png.asset.json";
import spThais from "@/assets/thais-cut.png.asset.json";
import event2 from "@/assets/event-2.jpg";
import event4 from "@/assets/event-4.jpg";
import nrnb1 from "@/assets/dan_9014.jpg.asset.json";
import nova1 from "@/assets/nova1.jpg.asset.json";
import nova2 from "@/assets/nova2.jpg.asset.json";
import nova3 from "@/assets/nova_3.jpg.asset.json";
import nova4 from "@/assets/nova_4.jpg.asset.json";
import nova5 from "@/assets/nova_5.jpg.asset.json";
import palco1 from "@/assets/dan_0359.jpg.asset.json";
import palco2 from "@/assets/dan_0144.jpg.asset.json";
import palco3 from "@/assets/dan_9870.jpg.asset.json";
import palco4 from "@/assets/dan_9675.jpg.asset.json";
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
      "Uma casa mais funcional, bonita e gostosa de viver.",

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
      "Mais clareza para cuidar do seu tempo, da sua mente e das suas escolhas.",

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
      "Porque organizar a vida também é abrir espaço para quem você quer ser.",

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
const LOT_SOLD_PERCENT: number | null = 34;
const LOT_LABEL = "2º LOTE";

type LotStep = { label: string; value: string };

type Ticket = {
  id: "compromisso" | "vip" | "platinum";
  name: string;
  desire: string;
  price: string;
  nextLotPrice: string;
  lotLabel: string;
  lotSteps: LotStep[];
  installments: string;
  soldPercent: number | null;
  benefits: string[];
  includesFrom?: string;
  highlight?: string;
  event: "ticket_compromisso_click" | "ticket_vip_click" | "ticket_platinum_click";
  checkout: string;
};

const TICKETS: Ticket[] = [
  {
    id: "compromisso",
    name: "Compromisso",
    desire: "Quero participar.",
    price: "147,00",
    nextLotPrice: "R$ 247,00",
    lotLabel: "2º LOTE",
    lotSteps: [
      { label: "1º lote", value: "R$ 97,00" },
      { label: "2º lote", value: "R$ 147,00" },
      { label: "3º lote", value: "R$ 197,00" },
      { label: "Valor cheio", value: "R$ 247,00" },
    ],
    installments: "ou 12x de R$ 14,70 no cartão",
    soldPercent: 34,
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
    price: "197,00",
    nextLotPrice: "R$ 297,00",
    lotLabel: "2º LOTE",
    lotSteps: [
      { label: "1º lote", value: "R$ 147,00" },
      { label: "2º lote", value: "R$ 197,00" },
      { label: "3º lote", value: "R$ 247,00" },
      { label: "Valor cheio", value: "R$ 297,00" },
    ],
    installments: "ou 12x de R$ 19,70 no cartão",
    soldPercent: 25,
    highlight: "Experiência recomendada",
    includesFrom: "TUDO DO INGRESSO COMPROMISSO +",
    benefits: [
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
    price: "447,00",
    nextLotPrice: "R$ 597,00",
    lotLabel: "2º LOTE",
    lotSteps: [
      { label: "1º lote", value: "R$ 347,00" },
      { label: "2º lote", value: "R$ 447,00" },
      { label: "3º lote", value: "R$ 497,00" },
      { label: "Valor cheio", value: "R$ 597,00" },
    ],
    installments: "ou 12x de R$ 44,70 no cartão",
    soldPercent: 70,
    highlight: "Experiência completa",
    includesFrom: "TUDO DO INGRESSO VIP +",
    benefits: [
      "Sacola com brindes exclusivos",
      "Assentos nas primeiras fileiras (1ª e 2ª fileira — melhor localização da plateia)",
      "Curso online completo de organização da casa toda por 1 ano",
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
  hideLabel = false,
}: {
  percent: number | null;
  label?: string;
  compact?: boolean;
  hideLabel?: boolean;
}) {
  if (percent === null) return null;
  return (
    <div className="w-full">
      {!hideLabel && (
        <div className="flex items-center justify-between gap-3">
          <span
            className={`font-semibold text-primary ${compact ? "text-xs" : "text-xs"} uppercase tracking-wider`}
          >
            {percent}% {label ?? "DESTE LOTE"} VENDIDO
          </span>
        </div>
      )}

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
          2º LOTE LIBERADO • GARANTA O SEU ANTES QUE ACABE
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-scene relative overflow-hidden">
      {/* brilho lateral que integra texto e fotografia */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_35%,_rgba(184,6,125,0.55)_0%,_transparent_60%)]" />

      {/* Fotografia — desktop: sangra à direita e avança para o centro */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block">
        <img
          src={heroComposicao.url}
          alt="Suelen Gubeisse e os especialistas convidados do Não Repara na Bagunça 2026"
          fetchPriority="high"
          decoding="async"
          className="hero-photo-desktop h-full w-full object-contain object-center"
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col px-5 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-10 lg:grid lg:grid-cols-[1.02fr_1fr] lg:items-center lg:gap-10 lg:pb-24 lg:pt-20">
        {/* Fotografia — mobile/tablet: largura total, fundida ao fundo */}
        <div className="order-1 -mx-5 sm:-mx-6 lg:hidden">
          <img
            src={heroComposicao.url}
            alt="Suelen Gubeisse e os especialistas convidados do Não Repara na Bagunça 2026"
            fetchPriority="high"
            decoding="async"
            className="hero-photo-mobile w-full object-contain object-center"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.95) 6%, #000 12%, #000 88%, rgba(0,0,0,0.95) 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 16%, #000 78%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.95) 6%, #000 12%, #000 88%, rgba(0,0,0,0.95) 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 16%, #000 78%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          />
        </div>

        {/* Conversão */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          {/* Logo — mobile only: abaixo da fotografia */}
          <div className="mb-5 flex justify-center lg:hidden">
            <img
              src={logoNrnb.url}
              alt="Não Repara na Bagunça"
              width={400}
              height={137}
              fetchPriority="high"
              className="w-[312px] max-w-full sm:w-[408px]"
            />
          </div>

          <img
            src={logoNrnb.url}
            alt="Não Repara na Bagunça"
            width={546}
            height={187}
            fetchPriority="high"
            className="mx-auto hidden w-[300px] max-w-full sm:w-[380px] lg:mx-0 lg:block lg:w-[546px]"
          />

          <h1 className="mt-4 text-balance text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            <span className="italic">O encontro que muda tudo.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-balance text-lg font-medium leading-relaxed text-white/92 sm:text-xl lg:mx-0">
            2 dias para deixar sua casa, sua rotina e sua vida mais leves e
            organizadas.
          </p>

          <div className="mt-5 flex flex-col items-center gap-1 text-base font-semibold text-white lg:items-start">
            <span className="text-balance">
              24 e 25 de outubro · São José dos Campos/SP
            </span>
            <span className="font-medium text-[#86CBD7]">9h às 18h30</span>
          </div>

          <div className="mx-auto mt-6 max-w-md lg:mx-0">
            <CTAButton event="hero_cta_click" size="lg" className="hero-cta w-full">
              Quero garantir meu ingresso
            </CTAButton>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#86CBD7]">
                {LOT_LABEL} LIBERADO · {LOT_SOLD_PERCENT}% VENDIDO
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
    <Section className="surface-blue">
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
    <Section className="surface-rose">
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
  { text: "\"Foram dois dias leves, cheios de aprendizado e de coisas que realmente dá vontade de colocar em prática. É uma experiência que toda mulher deveria viver.\"", author: "Vanessa Fernandes" },
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
      className="group fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-whatsapp px-3.5 py-3 text-sm font-medium text-white shadow-card backdrop-blur transition-all hover:brightness-110 lg:bottom-6 lg:right-6"
    >
      <MessageCircle className="h-5 w-5" />
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
    <Section id="ingressos" className="surface-ink">
      <div ref={ref} className="text-center">
        <SectionEyebrow>Ingressos</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight text-foreground sm:text-4xl">
          Escolha como você quer{" "}
          <span className="italic text-gradient-brand">
            viver essa experiência.
          </span>
        </h2>
      </div>

      <div className="mt-8 grid items-start gap-5 lg:grid-cols-3">
        {TICKETS.map((t) => (
          <div
            key={t.id}
            className={`card-light flex flex-col rounded-[2rem] border bg-card p-6 text-center sm:p-8 ${
              t.id === "vip"
                ? "border-primary/70 shadow-[0_0_0_1px_rgba(156,3,105,0.25),0_24px_60px_-28px_rgba(156,3,105,0.55)] lg:-mt-3"
                : "border-border shadow-card"
            }`}
          >
            {t.highlight && (
              <span className="mx-auto mb-4 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground">
                {t.highlight}
              </span>
            )}

            <h3 className="font-display text-3xl font-semibold sm:text-4xl">
              {t.name}
            </h3>
            <p className="mt-1 text-sm italic text-muted-foreground">
              “{t.desire}”
            </p>

            {/* valor do próximo lote riscado + nota manuscrita */}
            <div className="relative mt-6 flex items-center justify-center">
              <span className="relative inline-block font-display text-3xl text-muted-foreground/70 sm:text-4xl">
                {t.nextLotPrice}
                <span
                  aria-hidden
                  className="absolute left-[-6%] top-1/2 h-[3px] w-[112%] -translate-y-1/2 -rotate-6 rounded-full bg-primary"
                />
              </span>
              <span className="ml-2 hidden max-w-[7rem] font-script text-lg leading-tight text-primary sm:block">
                &nbsp;economize<br />
                {t.id === "platinum" ? "R$ 150" : "R$ 100"}
              </span>
            </div>

            <span className="mx-auto mt-5 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground">
              {t.lotLabel}
            </span>

            <p className="mt-3 flex items-baseline justify-center gap-1 font-display font-semibold text-primary">
              <span className="text-2xl sm:text-3xl">R$</span>
              <span className="text-5xl leading-none sm:text-6xl">
                {t.price}
              </span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {t.installments}
            </p>

            {/* divisor com coração */}
            <div className="mt-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-primary/15" />
              <Heart className="h-4 w-4 fill-primary/40 text-primary/40" />
              <span className="h-px flex-1 bg-primary/15" />
            </div>

            {t.includesFrom && (
              <p className="mt-4 rounded-xl bg-primary/10 px-3 py-2 text-center text-xs font-bold uppercase tracking-wider text-primary">
                {t.includesFrom}
              </p>
            )}

            <ul className={`flex-1 space-y-2.5 text-left ${t.includesFrom ? "mt-3" : "mt-5"}`}>
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
              className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99] ${
                t.id === "vip"
                  ? "bg-gradient-brand text-primary-foreground shadow-[0_14px_30px_-14px_rgba(156,3,105,0.75)] hover:brightness-110 hover:shadow-[0_18px_36px_-14px_rgba(156,3,105,0.85)]"
                  : "bg-primary text-primary-foreground hover:bg-plum hover:shadow-[0_14px_30px_-16px_rgba(156,3,105,0.7)]"
              }`}
            >
              Quero este ingresso
              <ArrowRight className="h-4 w-4" />
            </a>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-primary" />
              Compra segura
            </p>

            {/* escada de lotes */}
            <div className="mt-5 rounded-2xl bg-sky-tint p-3 text-left">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Próximos lotes
              </p>
              <ul className="mt-2 space-y-1">
                {t.lotSteps.map((s, i) => (
                  <li
                    key={s.label}
                    className={`flex items-center justify-between text-xs ${
                      i === 0
                        ? "text-muted-foreground line-through decoration-primary/60 decoration-2"
                        : i === 1
                          ? "font-semibold text-primary"
                          : "text-muted-foreground"
                    }`}
                  >
                    <span>{s.label}</span>
                    <span>{s.value}</span>
                  </li>
                ))}
              </ul>
              <LotProgress percent={t.soldPercent} compact />
            </div>
          </div>
        ))}
      </div>


      <p className="mt-6 text-center text-sm text-foreground/80">
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
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-all hover:brightness-110"
        >
          <MessageCircle className="h-4 w-4" />
          Falar com a Suelen no WhatsApp
        </a>
      </div>
    </Section>
  );
}

function PersonalOrganizerCourse() {
  const courseWhatsAppUrl =
    `https://wa.me/5512991402832?text=${encodeURIComponent("Olá, Suelen! Vim do site e quero saber mais sobre a turma de formação de Personal Organizer.")}`;

  return (
    <Section id="formacao" className="surface-cream">
      <div className="mx-auto max-w-3xl text-center">
        <SectionEyebrow>Formação</SectionEyebrow>
        <h2 className="mt-5 text-balance text-2xl leading-tight sm:text-4xl">
          Além de ter uma vida organizada, você quer se tornar uma{" "}
          <span className="italic text-gradient-brand">Personal Organizer?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          Teremos uma turma de formação. Envie uma mensagem pelo WhatsApp para ter mais informações.
        </p>

        <a
          href={courseWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("personal_organizer_whatsapp_click")}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-base font-bold uppercase tracking-wide text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.99]"
        >
          <MessageCircle className="h-5 w-5" />
          Quero mais informações no WhatsApp
        </a>

        <p className="mt-4 text-sm text-muted-foreground">
          Responderemos com todos os detalhes da turma.
        </p>
      </div>
    </Section>
  );
}

function Founder() {
  return (
    <Section>
      <div className="grid items-center gap-6 md:grid-cols-[1fr_1.1fr] md:gap-10">
        <div className="relative w-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-primary/10 to-background">
          <img
            src={suelenPhoto.url}
            alt="Suelen Gubeisse no ambiente do Não Repara na Bagunça, diante do painel com as marcas parceiras"
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover object-[55%_35%] sm:aspect-[4/3] md:aspect-[4/5]"
          />
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
    a: "Consulte na seção de ingresso os itens que compõem cada tipo de ingresso: compromisso, VIP e Platinum.",
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
    a: "O Ingresso é digital e será enviado no momento da sua compra na plataforma da Greenn e por e-mail.",
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
    <section className="surface-rose relative overflow-hidden px-5 py-16 sm:px-6 sm:py-24">
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
            2º LOTE LIBERADO<br />34% VENDIDO&nbsp;·&nbsp;GARANTA O SEU
          </p>
          <div className="mt-3">
            <LotProgress percent={LOT_SOLD_PERCENT} label="" hideLabel />
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
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      className="group relative flex h-full w-full flex-col rounded-2xl border border-primary/12 bg-card/90 p-4 text-left transition-colors duration-300 hover:border-primary/35 hover:bg-card sm:p-5"
    >
      <span
        aria-hidden
        className={`absolute right-3 top-3 text-base font-light leading-none text-primary/50 transition-all group-hover:text-primary ${open ? "rotate-45" : ""}`}
      >
        +
      </span>

      <span className="flex items-center gap-3">
        <span className="badge-icon h-9 w-9 shrink-0 rounded-xl">
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-balance pr-5 font-display text-lg font-semibold leading-tight text-foreground sm:text-xl">
          {theme.title}
        </span>
      </span>

      {open && (
        <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">
          {theme.desc}
        </span>
      )}
    </button>
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

      <p className="mt-2 max-w-2xl text-sm italic leading-relaxed text-muted-foreground sm:text-base">
        {group.blurb}
      </p>

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
    <Section id="programacao" className="surface-cream">
      <div className="text-center">
        <SectionEyebrow>Prévia da programação</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-3xl leading-tight sm:text-4xl">
          Tudo o que faz a sua vida{" "}
          <span className="italic text-gradient-brand">funcionar melhor.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          Da casa à rotina. Das <span className="text-primary">finanças</span> ao{" "}
          <span className="text-primary">bem-estar</span>. Da imagem ao{" "}
          <span className="text-primary">propósito</span>.
        </p>
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
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110"
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
  { src: palco1.url, alt: "Suelen Gubeisse palestrando sobre ambientes desorganizados" },
  { src: palco2.url, alt: "Palestra da Dra. Stella Vilella para a plateia lotada" },
  { src: palco3.url, alt: "Demonstração prática de dobras e organização de roupas no palco" },
  { src: palco4.url, alt: "Aula de mesa posta e recepção em casa durante o evento" },
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
    <Section id="galeria" className="surface-dark">
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
      <PersonalOrganizerCourse />
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
