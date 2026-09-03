import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  Gift,
  Heart,
  MapPin,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { track } from "@/lib/tracking";
import logoNrnb from "@/assets/logo-nrnb-alpha.png.asset.json";
import heroComposicao from "@/assets/hero-oficial-2608.jpeg.asset.json";
import heroBg from "@/assets/hero-bg.jpg";
import palco1 from "@/assets/dan_0359.jpg.asset.json";
import palco2 from "@/assets/dan_0144.jpg.asset.json";
import palco3 from "@/assets/dan_9870.jpg.asset.json";
import palco4 from "@/assets/dan_9675.jpg.asset.json";

/* ==================================================================
   CAMPANHA 2 POR 1 — página objetiva de remarketing
   ================================================================== */

const EVENT = {
  name: "Não Repara na Bagunça 2026",
  dateShort: "24 e 25 de outubro de 2026",
  venue: "PIT — Parque Tecnológico de\u00a0São José dos Campos/SP",
  hours: "das 9h às 18h30",
  whatsappNumber: "5512991402832",
  whatsappMessage:
    'Olá, Suelen! Quero saber mais sobre a promoção 2 por 1 do "Não Repara na Bagunça 2026".',
};

const WHATSAPP_URL = `https://wa.me/${EVENT.whatsappNumber}?text=${encodeURIComponent(
  EVENT.whatsappMessage,
)}`;

/** Duração da contagem regressiva (reinicia a cada entrada na página). */
const COUNTDOWN_MINUTES = 240; // 4 horas

type Ticket = {
  id: "compromisso" | "vip" | "platinum";
  name: string;
  price: string;
  installments: string;
  highlight?: string;
  includesFrom?: string;
  benefits: string[];
  checkout: string;
};

const TICKETS: Ticket[] = [
  {
    id: "compromisso",
    name: "Compromisso",
    price: "147,00",
    installments: "ou 12x de R$ 14,70 no cartão",
    benefits: [
      "Acesso aos 2 dias de evento",
      "Acesso à feira “Não Repara na Bagunça”",
    ],
    checkout: "https://payfast.greenn.com.br/168687?batch=13831_RugVFv",
  },
  {
    id: "vip",
    name: "VIP",
    price: "197,00",
    installments: "ou 12x de R$ 19,70 no cartão",
    highlight: "Mais escolhido",
    includesFrom: "Tudo do ingresso Compromisso +",
    benefits: [
      "Assentos em áreas mais à frente da plateia",
      "Acesso à área VIP exclusiva",
      "Café e petit four",
    ],
    checkout: "https://payfast.greenn.com.br/168694?batch=13835_tnl2FL",
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "447,00",
    installments: "ou 12x de R$ 44,70 no cartão",
    highlight: "Experiência completa",
    includesFrom: "Tudo do ingresso VIP +",
    benefits: [
      "Sacola com brindes exclusivos",
      "Assentos nas primeiras fileiras (1ª e 2ª)",
      "Curso online completo de organização da casa toda por 1 ano",
      "Um encontro ao vivo com a Suelen para tirar dúvidas",
    ],
    checkout: "https://payfast.greenn.com.br/168696?batch=13839_135ERC",
  },
];

const STEPS = [
  {
    icon: Clock,
    title: "1. Compre hoje",
    desc: "Escolha seu ingresso e finalize a compra enquanto a oferta estiver no ar.",
  },
  {
    icon: Gift,
    title: "2. Receba o bônus",
    desc: "Você recebe por e-mail o voucher do ingresso extra para a sua acompanhante.",
  },
  {
    icon: Users,
    title: "3. Escolha quem vai com você",
    desc: "Mãe, filha, irmã ou amiga: é só indicar o nome dela até a data do evento.",
  },
];

const TESTIMONIALS = [
  {
    text: '"Nunca pensei que organizar a casa pudesse ser tão libertador. Minha rotina mudou completamente e hoje tenho paz!"',
    author: "Mariana Silva",
  },
  {
    text: '"Finalmente encontrei um método que funciona para a minha realidade, sem cobranças de perfeição. Foi um divisor de águas."',
    author: "Juliana Costa",
  },
  {
    text: '"Foram dois dias leves, cheios de aprendizado e de coisas que realmente dá vontade de colocar em prática. É uma experiência que toda mulher deveria viver."',
    author: "Vanessa Fernandes",
  },
];

const GALLERY = [
  { src: palco1.url, alt: "Plateia do Não Repara na Bagunça" },
  { src: palco2.url, alt: "Palestra no Não Repara na Bagunça" },
  { src: palco3.url, alt: "Participantes do Não Repara na Bagunça" },
  { src: palco4.url, alt: "Momento de conexão no Não Repara na Bagunça" },
];

const FAQS = [
  {
    q: "Como funciona o ingresso extra?",
    a: "Comprando hoje qualquer um dos ingressos, você ganha um segundo ingresso da mesma categoria para levar uma acompanhante, sem custo adicional.",
  },
  {
    q: "Como recebo meu ingresso?",
    a: "Os ingressos são digitais e enviados por e-mail assim que a compra é aprovada na plataforma Greenn.",
  },
  {
    q: "Preciso informar o nome da acompanhante na hora da compra?",
    a: "Não. Você pode indicar o nome dela depois, pelo WhatsApp oficial, até a data do evento.",
  },
  {
    q: "A promoção pode acabar antes do prazo?",
    a: "Sim. A campanha vale enquanto houver lugares disponíveis nesta condição.",
  },
];

export const Route = createFileRoute("/2por1")({
  component: TwoForOnePage,
  head: () => ({
    meta: [
      {
        title: "2 por 1 — Não Repara na Bagunça 2026 | Compre 1 e leve uma amiga",
      },
      {
        name: "description",
        content:
          "Compre hoje seu ingresso do Não Repara na Bagunça 2026 e ganhe outro para uma acompanhante. Oferta por tempo limitado. 24 e 25 de outubro, São José dos Campos/SP.",
      },
      {
        property: "og:title",
        content: "2 por 1 — Não Repara na Bagunça 2026",
      },
      {
        property: "og:description",
        content:
          "Compre 1 ingresso hoje e leve uma acompanhante de graça. Oferta por tempo limitado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: heroBg },
      { name: "twitter:image", content: heroBg },
    ],
  }),
});

/* -------------------- Contagem regressiva -------------------- */

function useCountdown(minutes: number) {
  const total = minutes * 60;
  const [remaining, setRemaining] = useState(total);
  const firedRef = useRef(false);

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const next = Math.max(0, total - elapsed);
      setRemaining(next);
      if (next === 0 && !firedRef.current) {
        firedRef.current = true;
        track("twofor1_timer_expired");
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [total]);

  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    hours: pad(Math.floor(remaining / 3600)),
    minutes: pad(Math.floor((remaining % 3600) / 60)),
    seconds: pad(remaining % 60),
    expired: remaining === 0,
  };
}

function CountdownBlock({ compact = false }: { compact?: boolean }) {
  const { hours, minutes, seconds } = useCountdown(COUNTDOWN_MINUTES);
  const boxes = [
    { v: hours, l: "horas" },
    { v: minutes, l: "min" },
    { v: seconds, l: "seg" },
  ];

  if (compact) {
    return (
      <span className="font-display tabular-nums text-base font-semibold text-gold">
        {hours}:{minutes}:{seconds}
      </span>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 lg:justify-start">
      {boxes.map((b) => (
        <div
          key={b.l}
          className="min-w-[74px] rounded-2xl border border-gold/30 bg-gold/12 px-3 py-2 text-center backdrop-blur-sm"
        >
          <div className="font-display tabular-nums text-3xl leading-none text-gold">
            {b.v}
          </div>
          <div className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-gold/80">
            {b.l}
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------- Blocos -------------------- */

function goToTickets() {
  document
    .getElementById("ingressos")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <section id={id} className={`px-5 py-12 sm:px-6 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
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

function TopBar() {
  return (
    <div className="bg-gradient-brand">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2.5 text-center">
        <Gift className="h-4 w-4 shrink-0 text-primary-foreground" />
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground">
          Só hoje: compre 1 ingresso e leve uma acompanhante
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-scene relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_35%,_rgba(184,6,125,0.55)_0%,_transparent_60%)]" />

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <img
          src={heroComposicao.url}
          alt="Suelen Gubeisse e os especialistas do Não Repara na Bagunça 2026"
          fetchPriority="high"
          decoding="async"
          className="hero-photo-desktop h-full w-full object-contain object-center"
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col px-5 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:pb-20 lg:pt-16">
        <div className="order-1 -mx-5 sm:-mx-6 lg:hidden">
          <img
            src={heroComposicao.url}
            alt="Suelen Gubeisse e os especialistas do Não Repara na Bagunça 2026"
            fetchPriority="high"
            decoding="async"
            className="hero-photo-mobile w-full object-contain object-center"
          />
        </div>

        <div className="order-2 text-center lg:order-1 lg:text-left">
          <div className="mb-5 flex justify-center lg:justify-start">
            <img
              src={logoNrnb.url}
              alt="Não Repara na Bagunça"
              width={420}
              height={144}
              fetchPriority="high"
              className="w-[260px] max-w-full sm:w-[320px] lg:w-[420px]"
            />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            Campanha 2 por 1
          </span>

          <h1 className="mt-4 text-balance text-4xl leading-[1.05] text-white sm:text-5xl">
            Compre seu ingresso hoje e{" "}
            <span className="italic">ganhe +1 para uma acompanhante.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-balance text-lg font-medium leading-relaxed text-white/92 lg:mx-0">
            Você já conhece o Não Repara na Bagunça. Agora pode viver os 2 dias
            ao lado de alguém que você ama — pagando por um só ingresso.
          </p>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Esta oferta expira em
            </p>
            <CountdownBlock />
          </div>

          <div className="mx-auto mt-6 max-w-md lg:mx-0">
            <button
              type="button"
              onClick={() => {
                track("twofor1_hero_cta_click");
                goToTickets();
              }}
              className="hero-cta group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-base font-semibold uppercase tracking-wide text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.99]"
            >
              Quero meu 2 por 1
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="mt-4 flex flex-col items-center gap-1 text-sm font-medium text-white/90 lg:items-start">
              <span className="text-balance">
                {EVENT.dateShort} · {EVENT.hours}
              </span>
              <span className="text-balance text-[#86CBD7]">{EVENT.venue}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <Section className="bg-sky-tint">
      <div className="text-center">
        <SectionEyebrow>Como funciona</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
          Três passos para garantir{" "}
          <span className="italic text-gradient-brand">os dois ingressos.</span>
        </h2>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-card"
          >
            <span className="badge-icon">
              <s.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Tickets() {
  return (
    <Section id="ingressos" className="surface-ink">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          <Gift className="h-3.5 w-3.5" />
          Cada ingresso vale por dois
        </span>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight text-white sm:text-4xl">
          Escolha seu ingresso e{" "}
          <span className="italic text-gradient-brand">leve alguém com você.</span>
        </h2>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-2 text-sm font-semibold text-gold">
          <Clock className="h-4 w-4 text-gold" />
          Oferta encerra em <CountdownBlock compact />
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {TICKETS.map((t) => (
          <div
            key={t.id}
            className="card-light flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold">{t.name}</h3>
              {t.highlight && (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-primary">
                  {t.highlight}
                </span>
              )}
            </div>

            <div className="mt-4 inline-flex items-center gap-2 self-start rounded-full bg-gold px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-[#1c0f18]">
              <Users className="h-3.5 w-3.5 text-[#1c0f18]" />
              2 ingressos pelo preço de 1
            </div>

            <div className="mt-4">
              <span className="text-sm text-muted-foreground">R$ </span>
              <span className="font-display text-4xl font-semibold">{t.price}</span>
              <p className="mt-1 text-sm text-muted-foreground">{t.installments}</p>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-gold/25" />
              <Heart className="h-4 w-4 fill-gold/40 text-gold/40" />
              <span className="h-px flex-1 bg-gold/25" />
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
              <li className="flex items-start gap-2 text-sm font-semibold text-gold">
                <Gift className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>+1 ingresso da mesma categoria para sua acompanhante</span>
              </li>
            </ul>

            <a
              href={t.checkout}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("twofor1_ticket_click", { ticket: t.id })}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.99]"
            >
              Quero este ingresso
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 text-center">
        <p className="inline-flex items-center gap-2 text-sm text-white/80">
          <ShieldCheck className="h-4 w-4" />
          Compra segura pela plataforma Greenn · ingresso digital por e-mail
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("twofor1_whatsapp_click")}
          className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
        >
          Tirar uma dúvida no WhatsApp
        </a>
      </div>
    </Section>
  );
}

function SocialProof() {
  return (
    <Section>
      <div className="text-center">
        <SectionEyebrow>Quem já viveu</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
          Melhor do que viver o NRNB é{" "}
          <span className="italic text-gradient-brand">viver acompanhada.</span>
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {GALLERY.map((img) => (
          <div
            key={img.src}
            className="overflow-hidden rounded-2xl border border-border/60"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-48"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.author}
            className="rounded-2xl border border-border/60 bg-card p-5 shadow-card"
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

function FAQ() {
  return (
    <Section className="surface-cream">
      <div className="text-center">
        <SectionEyebrow>Dúvidas rápidas</SectionEyebrow>
      </div>
      <div className="mx-auto mt-6 max-w-3xl space-y-3">
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-border/60 bg-card p-5 shadow-card"
          >
            <summary className="cursor-pointer list-none text-base font-semibold marker:hidden">
              {f.q}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section className="surface-rose text-center">
      <h2 className="mx-auto max-w-3xl text-balance text-3xl leading-tight sm:text-4xl">
        Dois dias. Duas mulheres. Um só ingresso.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-white/90">
        Garanta agora enquanto o tempo desta página não zera.
      </p>

      <div className="mt-6 flex justify-center">
        <CountdownBlock />
      </div>

      <div className="mx-auto mt-6 max-w-md">
        <button
          type="button"
          onClick={() => {
            track("twofor1_hero_cta_click", { position: "final" });
            goToTickets();
          }}
          className="hero-cta group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-base font-semibold uppercase tracking-wide text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.99]"
        >
          Quero meu 2 por 1
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <p className="mt-5 inline-flex items-center gap-2 text-sm text-white/85">
        <MapPin className="h-4 w-4" />
        {EVENT.venue}
      </p>
    </Section>
  );
}

function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-primary">
            2 por 1 acaba em
          </p>
          <div className="text-foreground">
            <CountdownBlock compact />
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            track("twofor1_sticky_click");
            goToTickets();
          }}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-glow"
        >
          Garantir
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 px-5 py-10 text-center">
      <img
        src={logoNrnb.url}
        alt="Não Repara na Bagunça"
        width={200}
        height={69}
        loading="lazy"
        className="mx-auto w-[180px]"
      />
      <p className="mt-4 text-sm text-muted-foreground">
        {EVENT.name} · {EVENT.dateShort}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{EVENT.venue}</p>
    </footer>
  );
}

function TwoForOnePage() {
  useEffect(() => {
    track("twofor1_page_view");
  }, []);

  return (
    <main className="pb-24 lg:pb-0">
      <TopBar />
      <Hero />
      <HowItWorks />
      <Tickets />
      <SocialProof />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTA />
    </main>
  );
}
