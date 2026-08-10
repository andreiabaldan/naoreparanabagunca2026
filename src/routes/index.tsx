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
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { track } from "@/lib/tracking";

import heroBg from "@/assets/hero-bg.jpg";
import suelenPhoto from "@/assets/suelen_fundo.png.asset.json";
import event2 from "@/assets/event-2.jpg";
import event4 from "@/assets/event-4.jpg";
import nrnb1 from "@/assets/dan_9014.jpg.asset.json";
import nrnb2 from "@/assets/dan_9150.jpg.asset.json";
import nrnb3 from "@/assets/dan_9119.jpg.asset.json";
import nrnb4 from "@/assets/dan_9266.jpg.asset.json";
import nrnb5 from "@/assets/dan_8916.jpg.asset.json";
import nrnb6 from "@/assets/dan_8856.jpg.asset.json";

/* ==================================================================
   CONFIGURAÇÃO EDITÁVEL — atualize aqui os dados reais do evento
   ================================================================== */

const EVENT = {
  name: "Não Repara na Bagunça 2026",
  concept: "O encontro que muda tudo.",
  promise:
    "2 dias para deixar sua casa, sua rotina e sua vida mais leves e organizadas.",
  date: "24 e 25 de outubro de 2026",
  dateShort: "24 e 25 de outubro",
  venue: "PIT - Parque Tecnológico de\u00a0São José dos Campos/SP",
  city: "",
  address: "Estr. Dr. Altino Bondesan, 500 - Eugênio de Melo, São José dos Campos - SP, 12247-016",
  /** Horários (editáveis). Substitua pelos horários confirmados. */
  hoursShort: "Das 09h às 17h",
  hoursDay1: "Sábado, 24/10 · das 09h às 17h",
  hoursDay2: "Domingo, 25/10 · das 09h às 17h",
  /** URL do checkout. Troque pelo link real quando estiver configurado. */
  checkoutUrl: "#ingressos",
};

/* ---- Palestrantes (editável). Não inventar nomes: use placeholders. ---- */
type Speaker = {
  name: string;
  role: string;
  benefit: string;
  photo?: string;
};

const SPEAKERS: Speaker[] = [
  {
    name: "Suelen Gubeisse",
    role: "Personal Organizer · Idealizadora do NRNB",
    benefit: "Vai ajudar você a começar a organizar a casa sem travar no meio.",
    photo: suelenPhoto.url,
  },
  {
    name: "[NOME DO PALESTRANTE]",
    role: "Especialista em [ÁREA]",
    benefit: "Vai ajudar você a [BENEFÍCIO].",
  },
  {
    name: "[NOME DO PALESTRANTE]",
    role: "Especialista em [ÁREA]",
    benefit: "Vai ajudar você a [BENEFÍCIO].",
  },
  {
    name: "[NOME DO PALESTRANTE]",
    role: "Especialista em [ÁREA]",
    benefit: "Vai ajudar você a [BENEFÍCIO].",
  },
];

/* ---- Programação (editável) ---- */
type Slot = { time: string; title: string; speaker?: string; highlight?: boolean };

const SCHEDULE: { id: "d1" | "d2"; tab: string; hours: string; slots: Slot[] }[] = [
  {
    id: "d1",
    tab: "Sábado · 24 de outubro",
    hours: "Das 09h às 17h",
    slots: [
      { time: "[HORÁRIO]", title: "Abertura do Não Repara na Bagunça", speaker: "Suelen Gubeisse", highlight: true },
      { time: "[HORÁRIO]", title: "[TÍTULO DA PALESTRA]", speaker: "[NOME DO PALESTRANTE]", highlight: true },
      { time: "[HORÁRIO]", title: "[EXPERIÊNCIA PRÁTICA]", speaker: "[NOME DO PALESTRANTE]", highlight: true },
      { time: "[HORÁRIO]", title: "[TÍTULO DA PALESTRA]", speaker: "[NOME DO PALESTRANTE]" },
      { time: "[HORÁRIO]", title: "[ATIVAÇÃO / INTERVALO]", speaker: "[NOME DA MARCA]" },
      { time: "[HORÁRIO]", title: "[TÍTULO DA PALESTRA]", speaker: "[NOME DO PALESTRANTE]" },
    ],
  },
  {
    id: "d2",
    tab: "Domingo · 25 de outubro",
    hours: "Das 09h às 17h",
    slots: [
      { time: "[HORÁRIO]", title: "[TÍTULO DA PALESTRA]", speaker: "[NOME DO PALESTRANTE]", highlight: true },
      { time: "[HORÁRIO]", title: "[EXPERIÊNCIA PRÁTICA]", speaker: "[NOME DO PALESTRANTE]", highlight: true },
      { time: "[HORÁRIO]", title: "[TÍTULO DA PALESTRA]", speaker: "[NOME DO PALESTRANTE]", highlight: true },
      { time: "[HORÁRIO]", title: "[ATIVAÇÃO / INTERVALO]", speaker: "[NOME DA MARCA]" },
      { time: "[HORÁRIO]", title: "Encerramento", speaker: "Suelen Gubeisse" },
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
          className={`font-semibold text-primary ${compact ? "text-[11px]" : "text-xs"} uppercase tracking-wider`}
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
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground sm:text-xs">
          {EVENT.dateShort} · {EVENT.venue} · {LOT_LABEL} quase esgotado
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={heroBg}
        alt="Mulheres reunidas no auditório do Não Repara na Bagunça"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/88 to-background" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-identity opacity-[0.10]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-identity" />


      <div className="relative mx-auto max-w-3xl px-5 pb-14 pt-12 text-center sm:px-6 sm:pb-20 sm:pt-20">
        <SectionEyebrow>Não Repara na Bagunça 2026</SectionEyebrow>

        <h1 className="mt-6 text-balance text-4xl leading-[1.05] sm:text-6xl">
          <span className="italic text-gradient-brand">
            O encontro que muda tudo.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-balance text-xl font-semibold leading-snug text-foreground sm:text-2xl">
          {EVENT.promise}
        </p>

        <p className="mx-auto mt-4 max-w-xl text-balance text-sm text-muted-foreground sm:text-base">
          Um fim de semana inteiro de experiências, conteúdos e aprendizados
          práticos para você organizar o que está ao seu redor, e abrir espaço
          para viver melhor.
        </p>

        <div className="mt-6 flex flex-col items-center gap-2 text-sm text-foreground/85 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2">
          <span className="inline-flex items-center gap-2 font-semibold uppercase tracking-wide">
            <Calendar className="h-4 w-4 text-primary" />
            24 E 25 DE OUTUBRO · 2026
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            {EVENT.hoursShort}
          </span>
          <span className="inline-flex items-center gap-2 text-center">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            {EVENT.venue}
          </span>
        </div>


        <div className="mx-auto mt-8 max-w-md rounded-3xl border border-primary/40 bg-card p-5 shadow-glow backdrop-blur">
          <CTAButton event="hero_cta_click" size="lg" className="w-full">
            Quero garantir meu ingresso
          </CTAButton>
          <p className="mt-4 text-sm font-semibold text-foreground">
            {LOT_LABEL} quase esgotado
          </p>
          <div className="mt-2">
            <LotProgress percent={LOT_SOLD_PERCENT} label={`do ${LOT_LABEL}`} />
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

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {FOR_WHOM.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card shadow-card p-4"
          >
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span className="text-sm leading-relaxed text-foreground/90">
              {item}
            </span>
          </li>
        ))}
      </ul>

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

const GALLERY = [
  { src: nrnb1.url, alt: "Suelen Gubeisse no palco do Não Repara na Bagunça" },
  { src: nrnb2.url, alt: "Palestra sobre técnicas modernas de limpeza no palco principal" },
  { src: nrnb3.url, alt: "Plateia de mulheres em momento de conexão durante o evento" },
  { src: nrnb4.url, alt: "Demonstração prática no palco com o auditório lotado" },
  { src: nrnb5.url, alt: "Participantes no espaço instagramável do evento" },
  { src: nrnb6.url, alt: "Brindes e experiências das marcas parceiras" },
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
              <span className="mb-3 self-start rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary-foreground">
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
              href={EVENT.checkoutUrl}
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
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Os valores mudam conforme os lotes avançam. Garanta agora o valor atual.
      </p>
    </Section>
  );
}

function Founder() {
  return (
    <Section>
      <div className="grid items-center gap-8 md:grid-cols-[0.8fr_1fr]">
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-primary/15 to-background md:max-w-none">
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
          <h2 className="mt-5 text-balance text-2xl leading-tight sm:text-3xl">
            Quem criou o{" "}
            <span className="italic text-gradient-brand">
              Não Repara na Bagunça
            </span>
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Suelen Gubeisse é Personal Organizer, apaixonada por organização e
              acredita que uma casa organizada pode ser o começo de uma vida
              muito mais leve.
            </p>
            <p>
              Depois de anos entrando na casa de mulheres e vendo de perto como
              a organização transforma muito mais do que armários, criou o Não
              Repara na Bagunça.
            </p>
            <p className="font-medium text-foreground">
              Um evento para mostrar, na prática, que organização não é sobre
              ter uma casa perfeita. É sobre criar espaço para a vida que você
              quer viver.
            </p>
          </div>
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
        <p className="text-balance text-lg text-muted-foreground sm:text-xl">
          Talvez você chegue pela vontade de organizar sua casa.
        </p>
        <p className="mt-2 text-balance text-xl font-semibold sm:text-2xl">
          E descubra que organizar muda muito mais do que a casa.
        </p>
        <p className="mt-4 text-sm uppercase tracking-[0.2em] text-primary">
          Sua rotina · Seu tempo · Suas prioridades · Seus planos · A forma como
          você vive
        </p>

        <h2 className="mt-8 font-display text-3xl leading-tight sm:text-5xl">
          Não Repara na Bagunça 2026
        </h2>
        <p className="mt-2 text-2xl italic text-gradient-brand sm:text-3xl">
          O encontro que muda tudo.
        </p>

        <p className="mt-5 text-sm text-foreground/85">
          {EVENT.dateShort} · {EVENT.venue}
        </p>

        <div className="mx-auto mt-6 max-w-md">
          <p className="text-sm font-semibold">{LOT_LABEL} quase esgotado.</p>
          <div className="mt-2">
            <LotProgress percent={LOT_SOLD_PERCENT} label={`do ${LOT_LABEL}`} />
          </div>
          <div className="mt-6">
            <CTAButton event="final_cta_click" size="lg" className="w-full">
              Quero viver essa experiência
            </CTAButton>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Garanta o valor atual antes da virada do lote.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 px-5 py-8 text-center sm:px-6">
      <span className="font-script text-2xl text-primary">
        Não Repara na Bagunça
      </span>
      <p className="mt-2 text-xs text-muted-foreground">
        {EVENT.dateShort} de 2026 · {EVENT.venue}
      </p>
      <p className="mt-4 text-xs text-muted-foreground">
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

function Speakers() {
  return (
    <Section id="palestrantes">
      <div className="text-center">
        <SectionEyebrow>Palestrantes</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
          Um encontro. Diferentes especialistas.{" "}
          <span className="italic text-gradient-brand">
            Uma vida mais organizada.
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
          Conheça algumas das pessoas que vão subir ao palco do Não Repara na
          Bagunça para compartilhar conhecimento, experiências e caminhos
          práticos para uma vida mais leve e organizada.
        </p>
      </div>

      <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
        {SPEAKERS.map((s, i) => (
          <article
            key={`${s.name}-${i}`}
            className="w-[72%] shrink-0 snap-start overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card sm:w-auto"
          >
            <div className="aspect-[4/5] w-full bg-sky-tint">
              {s.photo ? (
                <img
                  src={s.photo}
                  alt={`Foto de ${s.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  [FOTO]
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold leading-tight text-foreground">
                {s.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {s.role}
              </p>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">
                {s.benefit}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Schedule() {
  const [day, setDay] = useState<"d1" | "d2">("d1");
  const [expanded, setExpanded] = useState(false);
  const current = SCHEDULE.find((d) => d.id === day)!;
  const visible = expanded
    ? current.slots
    : current.slots.filter((s) => s.highlight);

  return (
    <Section id="programacao" className="bg-sky-tint">
      <div className="text-center">
        <SectionEyebrow>Programação</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
          Dois dias para organizar{" "}
          <span className="italic text-gradient-brand">
            diferentes áreas da sua vida.
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
          Casa, rotina, finanças, saúde, bem-estar e muito mais em uma
          experiência criada para você aprender, experimentar e sair pronta para
          colocar em prática.
        </p>
      </div>

      <div className="mx-auto mt-7 flex max-w-lg gap-2 rounded-full border border-border/60 bg-card shadow-card p-1">
        {SCHEDULE.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => {
              setDay(d.id);
              setExpanded(false);
            }}
            className={`flex-1 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors sm:text-xs ${
              day === d.id
                ? "bg-gradient-brand text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {d.tab}
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-xs font-semibold uppercase tracking-wide text-primary">
        {current.hours}
      </p>

      <ol className="mx-auto mt-6 max-w-2xl space-y-0">
        {visible.map((slot, i) => (
          <li key={`${slot.time}-${i}`} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
              {i < visible.length - 1 && (
                <span className="w-px flex-1 bg-border/70" />
              )}
            </div>
            <div className="pb-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                {slot.time}
              </span>
              <h3 className="mt-1 text-base font-semibold leading-snug text-foreground">
                {slot.title}
              </h3>
              {slot.speaker && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {slot.speaker}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      {current.slots.length > visible.length && !expanded && (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-primary/10"
          >
            Ver programação completa +
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        *Programação sujeita a alterações.
      </p>
    </Section>
  );
}

function Sponsors() {
  return (
    <Section id="patrocinadores">
      <div className="text-center">
        <SectionEyebrow>Patrocinadores</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight sm:text-3xl">
          Marcas que acreditam em{" "}
          <span className="italic text-gradient-brand">
            uma vida mais organizada.
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
          O Não Repara na Bagunça acontece ao lado de marcas que compartilham o
          nosso propósito de tornar a casa, a rotina e a vida mais leves.
        </p>
      </div>

      {SPONSORS.map((group) => (
        <div key={group.group} className="mt-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {group.group}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {group.items.map((s, i) => (
              <div
                key={`${s.name}-${i}`}
                className="flex h-20 items-center justify-center rounded-2xl border border-border/50 bg-card shadow-card px-3 text-center"
              >
                {s.logo ? (
                  <img
                    src={s.logo}
                    alt={`Logo ${s.name}`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-10 w-auto opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                  />
                ) : (
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {s.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {ACTIVATIONS.length > 0 && (
        <div className="mt-12">
          <h3 className="text-center text-balance text-xl leading-tight sm:text-2xl">
            Experiências que você vai{" "}
            <span className="italic text-gradient-brand">encontrar por lá</span>
          </h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVATIONS.map((a, i) => (
              <article
                key={`${a.title}-${i}`}
                className="rounded-2xl border border-border/60 bg-card shadow-card p-5"
              >
                {a.logo ? (
                  <img
                    src={a.logo}
                    alt={`Logo ${a.brand}`}
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-auto"
                  />
                ) : (
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {a.brand}
                  </span>
                )}
                <h4 className="mt-3 text-base font-semibold text-foreground">
                  {a.title}
                </h4>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">
                  {a.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
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
      <ForWhom />
      <Benefits />
      <Experience />
      <Speakers />
      <Schedule />
      <SocialProof />
      <Tickets />
      <Founder />
      <Sponsors />
      <Venue />

      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTA />
    </main>
  );
}
