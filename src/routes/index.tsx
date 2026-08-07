import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  Heart,
  Sparkles,
  Smile,
  Wrench,
  Flame,
  Home,
  Wallet,
  Activity,
  Network,
  Clock,
  Quote,
  AlertTriangle,
  Check,
  Building2,
  Car,
  Accessibility,
  Mail,
  Phone,
  MessageCircle,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import founderPortrait from "@/assets/founder-portrait.jpg";
import founderSecondary from "@/assets/founder-secondary.jpg";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";
import event5 from "@/assets/event-5.jpg";
import event6 from "@/assets/event-6.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { property: "og:image", content: heroBg },
      { name: "twitter:image", content: heroBg },
    ],
  }),
});

/* -------------------- Building blocks -------------------- */

function CTAButton({
  children,
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  const sizes = {
    md: "px-7 py-3.5 text-sm",
    lg: "px-9 py-5 text-base",
  };
  return (
    <button
      type="button"
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.02] hover:brightness-110 active:scale-100 ${sizes[size]} ${className}`}
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

/* -------------------- Sections -------------------- */

function TopBar() {
  return (
    <div className="relative bg-gradient-brand">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-3">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-background/20 backdrop-blur">
          <MessageSquare className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-script text-2xl leading-none text-primary-foreground">
          Não Repara na Bagunça
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
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
      <div className="absolute inset-0 bg-gradient-brand-soft opacity-60" />

      <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24 text-center sm:pt-32">
        <SectionEyebrow>Edição 2026 · Vagas limitadas</SectionEyebrow>
        <h1 className="mt-8 text-balance text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
          Bem-vinda ao encontro
          <br />
          <span className="italic text-gradient-brand">que muda tudo.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
          Dois dias para respirar fundo, se reencontrar e voltar pra vida
          com um plano de verdade. Sem fórmula mágica, sem palco distante — só nós.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            24 e 25 de outubro · 2026
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-primary sm:block" />
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Parque Tecnológico de São José dos Campos
          </span>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border-2 border-primary/60 bg-card/70 p-6 shadow-glow backdrop-blur sm:p-8">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              INGRESSO COMPROMISSO · ATÉ 30/08
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-sm text-muted-foreground line-through">R$ 247</span>
              <span className="font-display text-5xl font-semibold sm:text-6xl">
                R$ 97
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              ou 12x de R$ 9,70 no cartão
            </span>
          </div>
          <div className="mt-6 flex justify-center">
            <CTAButton size="lg">Garantir meu ingresso</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

const PAINS = [
  "Você acorda cansada antes mesmo do dia começar — e sente que segura tudo sozinha.",
  "Faz por todos, mas ninguém pergunta como você está de verdade.",
  "Guarda sonhos numa gaveta faz tempo, esperando 'a hora certa' que nunca chega.",
  "Se sente invisível dentro da própria casa, do trabalho, das amizades.",
  "Sabe que precisa mudar algo, mas não consegue nem começar sozinha.",
];

function Pains() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionEyebrow>Se identifica?</SectionEyebrow>
        <h2 className="mt-6 text-balance text-4xl sm:text-5xl md:text-6xl">
          Talvez você esteja
          <span className="italic text-gradient-brand"> cansada de fingir </span>
          que está tudo bem.
        </h2>

        <ul className="mt-14 space-y-4 text-left">
          {PAINS.map((p, i) => (
            <li
              key={i}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card/60 p-5 shadow-card transition-all hover:border-primary/40 hover:bg-card"
            >
              <span className="badge-icon shrink-0">
                <Heart className="h-5 w-5 fill-current" />
              </span>
              <p className="pt-2 text-base text-foreground/90 sm:text-lg">{p}</p>
            </li>
          ))}
        </ul>

        <p className="mt-14 text-balance text-xl text-muted-foreground sm:text-2xl">
          Você não está sozinha. E não precisa continuar assim.
        </p>
        <div className="mt-8 flex justify-center">
          <CTAButton>Quero estar lá</CTAButton>
        </div>
      </div>
    </section>
  );
}

const MOVEMENT = [
  { icon: Smile, title: "Leve", desc: "Nada de palestrinha pesada — a gente ri, chora e respira junto." },
  { icon: Sparkles, title: "Divertido", desc: "Música, boa comida, e conversas que se transformam em amizade." },
  { icon: Wrench, title: "Prático", desc: "Você sai com métodos, planilhas e passos concretos pra aplicar." },
  { icon: Flame, title: "Transformador", desc: "Dois dias que reorganizam o antes e o depois da sua vida." },
];

function Movement() {
  return (
    <section className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>O manifesto</SectionEyebrow>
          <h2 className="mt-6 text-balance text-4xl sm:text-5xl md:text-6xl">
            Isso não é um evento.
            <br />É um <span className="italic text-gradient-brand">movimento.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Um lugar seguro pra ser você inteira — vulnerável, potente, engraçada,
            errada, brilhante. A gente veio construir uma comunidade que continua
            depois que a luz da última noite se apaga.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MOVEMENT.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-3xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="badge-icon">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-2xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TIMELINE = [
  { year: "2022", count: "120", desc: "A primeira edição. Uma sala pequena e a certeza de que era pra continuar." },
  { year: "2023", count: "380", desc: "Fomos pra um teatro. Filas de espera pela primeira vez, e o começo das amizades." },
  { year: "2024", count: "740", desc: "Duas cidades, dois palcos. As redes começaram a chamar de movimento." },
  { year: "2025", count: "1.200", desc: "Uma semana em cartaz. Marido, filha, chefe — todo mundo notou a mudança." },
];

function Timeline() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <SectionEyebrow>Nossa história</SectionEyebrow>
          <h2 className="mt-6 text-balance text-4xl sm:text-5xl md:text-6xl">
            Como um encontro virou
            <span className="italic text-gradient-brand"> movimento.</span>
          </h2>
        </div>

        <div className="relative mt-16 pl-8 sm:pl-16">
          <span className="absolute left-4 top-6 bottom-6 w-px bg-gradient-to-b from-primary via-plum to-transparent sm:left-8" />
          <ol className="space-y-8">
            {TIMELINE.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[1.65rem] top-3 grid h-12 w-12 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-primary-foreground shadow-glow sm:-left-[3.65rem]">
                  {t.year}
                </span>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-4xl text-gradient-brand">
                      {t.count}
                    </span>
                    <span className="text-sm uppercase tracking-widest text-muted-foreground">
                      mulheres
                    </span>
                  </div>
                  <p className="mt-3 text-foreground/85">{t.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mx-auto mt-16 max-w-2xl text-balance text-center text-xl italic text-muted-foreground sm:text-2xl">
          "Em 2026, você vai ser a próxima história a ser contada aqui."
        </p>
      </div>
    </section>
  );
}

const EXPERIENCE = [
  { icon: Home, title: "Casa em ordem", desc: "Método pra organizar o lar sem gastar o final de semana inteiro." },
  { icon: Sparkles, title: "Rotina que respira", desc: "Rituais simples pra desafogar a semana antes de segunda acontecer." },
  { icon: Wallet, title: "Dinheiro sem drama", desc: "Um plano financeiro real, adaptado à sua vida — não à do vizinho." },
  { icon: Activity, title: "Corpo que sustenta", desc: "Movimento, sono e comida como aliados, não como mais uma cobrança." },
  { icon: Heart, title: "Emoção no lugar", desc: "Conversa franca sobre culpa, exaustão e o que fazer com elas." },
  { icon: Network, title: "Rede que fica", desc: "Grupos regionais pra continuar caminhando junto depois do evento." },
];

function Experience() {
  return (
    <section className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Programa</SectionEyebrow>
          <h2 className="mt-6 text-balance text-4xl sm:text-5xl md:text-6xl">
            O que você vai
            <span className="italic text-gradient-brand"> viver.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCE.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-primary/50"
            >
              <span className="badge-icon">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <CTAButton size="lg">Reservar meu lugar</CTAButton>
        </div>
      </div>
    </section>
  );
}

const GALLERY = [event1, event2, event3, event4, event5, event6];

const TESTIMONIALS = [
  {
    quote:
      "Cheguei sem esperar nada e saí com uma agenda nova, uma amiga nova e uma coragem que eu tinha esquecido que existia dentro de mim.",
    name: "Camila R.",
    role: "Participante · edição 2024",
    photo: event3,
  },
  {
    quote:
      "Foi o único fim de semana em anos em que eu chorei, ri e ainda voltei descansada. Já estou marcando o próximo com as meninas do meu grupo.",
    name: "Fernanda M.",
    role: "Participante · edição 2025",
    photo: event4,
  },
];

function SocialProof() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Prova social</SectionEyebrow>
          <h2 className="mt-6 text-balance text-4xl sm:text-5xl md:text-6xl">
            <span className="italic text-gradient-brand">+1.000 mulheres</span> já
            atravessaram esse encontro.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {GALLERY.map((src, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-2xl border border-border shadow-card"
            >
              <img
                src={src}
                alt={`Momento do evento ${i + 1}`}
                loading="lazy"
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="relative rounded-3xl border border-border bg-card p-8 shadow-card"
            >
              <Quote className="absolute right-6 top-6 h-14 w-14 text-primary/20" />
              <blockquote className="text-lg leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <img
                  src={t.photo}
                  alt=""
                  loading="lazy"
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/50"
                />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const NUMBERS = [
  { n: "2", label: "dias" },
  { n: "+1k", label: "mulheres" },
  { n: "24", label: "experiências" },
  { n: "∞", label: "conexões" },
];

function Numbers() {
  return (
    <section className="relative bg-surface py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 sm:grid-cols-4">
        {NUMBERS.map((s) => (
          <div
            key={s.label}
            className="rounded-3xl border border-border bg-card p-6 text-center shadow-card"
          >
            <div className="font-display text-5xl text-gradient-brand sm:text-6xl">
              {s.n}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <img
            src={founderPortrait}
            alt="A idealizadora do Encontro Delas"
            loading="lazy"
            width={800}
            height={1000}
            className="w-full rounded-[2rem] object-cover shadow-glow"
          />
          <img
            src={founderSecondary}
            alt=""
            loading="lazy"
            width={800}
            height={600}
            className="absolute -bottom-10 -right-6 hidden w-1/2 rounded-2xl border-4 border-background object-cover shadow-card sm:block"
          />
          <div className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
        </div>

        <div>
          <SectionEyebrow>Idealizadora</SectionEyebrow>
          <h2 className="mt-6 text-balance text-4xl sm:text-5xl">
            Oi, eu sou a
            <span className="italic text-gradient-brand"> Lu Marques.</span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Filha, mãe, empreendedora — e mulher em construção, todo dia.
          </p>

          <div className="mt-6 space-y-4 text-foreground/85">
            <p>
              Aos 32 anos eu quebrei. Tinha o cargo, o casamento, a casa organizada, e ainda
              assim acordava com um peso que ninguém enxergava. Passei um ano
              montando o quebra-cabeça de novo — sozinha, e depois com outras mulheres.
            </p>
            <p>
              O Encontro Delas nasceu ali. De uma reunião de cinco amigas na sala de casa
              pra uma promessa: nenhuma mulher devia ter que se reconstruir na surdina.
              Hoje somos mais de mil, e você é a próxima.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-primary/40 bg-gradient-brand-soft p-6">
            <p className="font-display text-xl italic sm:text-2xl">
              "Meu compromisso é que você saia daqui com um plano — não com uma
              coleção de frases motivacionais."
            </p>
          </div>

          <p className="mt-6 font-script text-3xl text-primary">Lu, com você.</p>

          <div className="mt-8">
            <CTAButton>Quero fazer parte</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function UrgencyBanner() {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center gap-5 rounded-3xl border-2 border-primary/50 bg-gradient-brand-soft p-6 text-center shadow-card sm:flex-row sm:text-left">
          <span className="badge-icon shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <p className="flex-1 text-base sm:text-lg">
            <span className="font-semibold text-primary">Atenção:</span> restam apenas{" "}
            <span className="font-bold">47 vagas</span> no Lote Compromisso. Depois de esgotado,
            o próximo lote sai por R$ 247.
          </p>
          <CTAButton>Garantir agora</CTAButton>
        </div>
      </div>
    </section>
  );
}

const TIERS = [
  {
    name: "Básico",
    price: "97",
    old: "247",
    installments: "12x R$ 9,70",
    lots: ["INGRESSO COMPROMISSO · ATÉ 30/08", "Lote 2 · R$ 147", "Lote 3 · R$ 197"],
    perks: [
      "Acesso aos 2 dias do evento",
      "Kit de boas-vindas",
      "Coffee breaks e almoços",
      "Grupo oficial de participantes",
    ],
    highlight: false,
  },
  {
    name: "Intermediário",
    price: "197",
    old: "347",
    installments: "12x R$ 19,70",
    lots: ["INGRESSO COMPROMISSO · ATÉ 30/08", "Lote 2 · R$ 247", "Lote 3 · R$ 297"],
    perks: [
      "Tudo do Básico",
      "Cadeira nas 3 primeiras fileiras",
      "Meet & greet com a Lu",
      "Workshop extra de sábado",
      "Kit expandido (livro + planner)",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "347",
    old: "547",
    installments: "12x R$ 34,70",
    lots: ["INGRESSO COMPROMISSO · ATÉ 30/08", "Lote 2 · R$ 397", "Lote 3 · R$ 447"],
    perks: [
      "Tudo do Intermediário",
      "Jantar VIP com a Lu na sexta",
      "Mentoria em grupo (3 meses)",
      "Camarote reservado",
      "Presente exclusivo",
    ],
    highlight: false,
  },
];

function Pricing() {
  return (
    <section id="ingressos" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Ingressos</SectionEyebrow>
          <h2 className="mt-6 text-balance text-4xl sm:text-5xl md:text-6xl">
            Escolha seu
            <span className="italic text-gradient-brand"> ingresso.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Preços do lote pioneira. Restam poucas unidades em cada categoria.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl border p-8 shadow-card transition-all ${
                t.highlight
                  ? "border-primary bg-card shadow-glow lg:-translate-y-4 lg:scale-[1.03]"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-brand px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-glow">
                  Mais popular
                </span>
              )}
              <h3 className="text-2xl">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground line-through">
                  R$ {t.old}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">R$</span>
                <span className="font-display text-5xl">{t.price}</span>
              </div>
              <span className="text-xs text-muted-foreground">{t.installments}</span>

              <div className="mt-6 space-y-1.5 rounded-2xl border border-border bg-surface-2 p-4 text-xs">
                {t.lots.map((l, i) => (
                  <div
                    key={l}
                    className={`flex items-center gap-2 ${
                      i === 0 ? "text-primary" : "text-muted-foreground line-through"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {l}
                  </div>
                ))}
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-brand text-primary-foreground">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`mt-8 w-full rounded-full px-6 py-4 text-sm font-semibold transition-all ${
                  t.highlight
                    ? "bg-gradient-brand text-primary-foreground shadow-glow hover:brightness-110"
                    : "border border-primary/50 text-primary hover:bg-magenta-soft"
                }`}
              >
                Comprar {t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Venue() {
  const items = [
    { icon: Building2, title: "Estrutura completa", desc: "Auditório, salas de vivência, café e loja em um só lugar." },
    { icon: Accessibility, title: "Acesso facilitado", desc: "Espaço 100% acessível, com sinalização e apoio dedicado." },
    { icon: Car, title: "Estacionamento", desc: "Vagas próprias com convênio e vans de metrô mais próximo." },
  ];
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <SectionEyebrow>O local</SectionEyebrow>
        <h2 className="mt-6 text-balance text-4xl sm:text-5xl md:text-6xl">
          Parque
          <span className="italic text-gradient-brand"> Tecnológico.</span>
        </h2>
        <p className="mt-3 text-muted-foreground">
          Localizado em São José dos Campos, um espaço moderno e integrado para nos receber.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-3xl border border-border bg-card p-6 text-left shadow-card"
            >
              <span className="badge-icon">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" />
          Sexta 18h · Sábado 09h · Domingo 09h
        </div>

        <div className="mt-8 flex justify-center">
          <CTAButton>Ver como chegar</CTAButton>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid grid-cols-3 gap-2 opacity-15">
        {GALLERY.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <SectionEyebrow>Sua vez</SectionEyebrow>
        <h2 className="mt-6 text-balance text-4xl sm:text-6xl md:text-7xl">
          Em Outubro, essa cadeira
          <span className="italic text-gradient-brand"> vai ter seu nome.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Você já esperou tempo demais. Esse é o convite pra parar de esperar —
          e vir viver algo com a gente.
        </p>
        <div className="mt-10 flex justify-center">
          <CTAButton size="lg">Garantir meu ingresso agora</CTAButton>
        </div>
        <p className="mt-4 text-xs uppercase tracking-widest text-primary">
          INGRESSO COMPROMISSO encerra em 30/08 · restam 47 vagas
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border bg-background py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="font-script text-4xl text-gradient-brand">
              encontro delas
            </span>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Um movimento de mulheres que se encontram pra se reencontrar.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-primary">
              Contato
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                ola@encontrodelas.com.br
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                (11) 9 9999-0000
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-primary">
              Legal
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Termos de Serviço
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Encontro Delas. Todos os direitos reservados.</span>
          <span>Feito com carinho em São Paulo</span>
        </div>
      </div>
    </footer>
  );
}

function ChatFAB() {
  return (
    <button
      type="button"
      aria-label="Falar no chat"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow transition-transform hover:scale-110 active:scale-95"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}

/* -------------------- Page -------------------- */

function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Hero />
      <Pains />
      <Movement />
      <Timeline />
      <Experience />
      <SocialProof />
      <Numbers />
      <Founder />
      <UrgencyBanner />
      <Pricing />
      <Venue />
      <FinalCTA />
      <Footer />
      <ChatFAB />
    </main>
  );
}
