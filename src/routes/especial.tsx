import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Brain,
  Clock,
  Home,
  Play,
  Quote,
  Shirt,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { track } from "@/lib/tracking";

import logoNrnb from "@/assets/logo-nrnb-alpha.png.asset.json";
import heroComposicao from "@/assets/hero-oficial-2608.jpeg.asset.json";
import suelenPhoto from "@/assets/suelen-idealizadora.jpg.asset.json";
import suelenAvatar from "@/assets/suelen-face-cut.png.asset.json";
import spDouglas from "@/assets/douglas-cut.png.asset.json";
import spNatalia from "@/assets/natalia-rico-busto.png.asset.json";
import spFernanda from "@/assets/fernanda-ardito.png.asset.json";
import spAndreia from "@/assets/andreia-ombros.png.asset.json";
import spPaula from "@/assets/paula-chiaradia-busto.png.asset.json";
import spMichelle from "@/assets/michelle-cut.png.asset.json";
import spStella from "@/assets/stella-vilella-busto.png.asset.json";
import spThais from "@/assets/thais-cut.png.asset.json";
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

const TITLE =
  "Você não precisa dar conta de tudo — Não Repara na Bagunça 2026";
const DESCRIPTION =
  "Casa, rotina, dinheiro e bem-estar: por que cada vez mais mulheres descobrem que organização vai além de arrumar a casa. Especial sobre o Não Repara na Bagunça 2026, em São José dos Campos.";
const URL_CANONICAL = "https://naoreparanabagunca2026.lovable.app/especial";
const OG_IMAGE = `https://naoreparanabagunca2026.lovable.app${heroComposicao.url}`;

/** Destino comercial: seção de ingressos da página oficial. */
const TICKETS_URL = "/#ingressos";

export const Route = createFileRoute("/especial")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL_CANONICAL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: URL_CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Você não precisa dar conta de tudo. Talvez só precise organizar melhor o que importa.",
          description: DESCRIPTION,
          image: OG_IMAGE,
          about: "Organização da casa, da rotina e da vida",
          mainEntityOfPage: URL_CANONICAL,
        }),
      },
    ],
  }),
  component: EditorialPage,
});

/* ------------------------------------------------------------------ */
/* UTMs                                                                */
/* ------------------------------------------------------------------ */

function useTrackedParams() {
  const [qs, setQs] = useState("");
  useEffect(() => {
    const src = new URLSearchParams(window.location.search);
    const keep = new URLSearchParams();
    src.forEach((value, key) => {
      if (/^utm_/i.test(key) || ["fbclid", "gclid", "ttclid"].includes(key)) {
        keep.set(key, value);
      }
    });
    setQs(keep.toString());
  }, []);

  return (url: string) => {
    if (!qs) return url;
    const [path, hash] = url.split("#");
    const joiner = path?.includes("?") ? "&" : "?";
    return `${path}${joiner}${qs}${hash ? `#${hash}` : ""}`;
  };
}

/* ------------------------------------------------------------------ */
/* Reveal on scroll (leve, sem libs)                                    */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Blocos base                                                          */
/* ------------------------------------------------------------------ */

function Article({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[680px] px-5 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

function Wide({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Hero editorial                                                    */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <header className="hero-scene relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 pb-12 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-20 lg:pt-16">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            Especial • Organização &amp; Vida
          </p>
          <h1 className="mt-5 text-balance text-3xl leading-[1.12] sm:text-4xl lg:text-[3.1rem]">
            Você não precisa dar conta de tudo.{" "}
            <span className="italic text-white/90">
              Talvez só precise organizar melhor o que importa.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/90 sm:text-lg">
            Casa, rotina, dinheiro, bem-estar e tempo: por que cada vez mais
            mulheres estão descobrindo que organização vai muito além de deixar
            tudo no lugar.
          </p>
          <p className="mt-4 max-w-xl border-l-2 border-white/40 pl-4 text-sm text-white/80 sm:text-base">
            Conheça o movimento que já reuniu centenas de mulheres e chega à sua
            4ª edição em São José dos Campos.
          </p>
        </div>

        <figure className="order-1 lg:order-2">
          <img
            src={heroComposicao.url}
            alt="Suelen Gubeisse e as especialistas do Não Repara na Bagunça 2026"
            className="hero-photo-mobile w-full object-contain object-center lg:hero-photo-desktop"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1420}
          />
        </figure>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Abertura editorial                                                */
/* ------------------------------------------------------------------ */

function Opening() {
  return (
    <section className="bg-background py-14 sm:py-20">
      <Article>
        <Reveal>
          <Kicker>Reportagem</Kicker>
          <h2 className="mt-4 text-balance text-2xl leading-tight sm:text-4xl">
            A bagunça nem sempre está no armário.
          </h2>
        </Reveal>

        <Reveal className="mt-6 space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
          <div>
            <p>
              Tem dia em que você olha para a casa e pensa que precisa organizar
              tudo.
            </p>
            <p className="mt-5">
              O guarda-roupa está cheio, mas você nunca encontra o que quer
              vestir. A bancada acumula coisas. Tem uma gaveta que você prefere
              nem abrir.
            </p>
            <p className="mt-5">
              Mas, muitas vezes, a sensação de desorganização não termina aí.
            </p>
            <p className="mt-5">
              Está na rotina que nunca cabe no dia. Nas contas que precisam de
              mais atenção. Na lista de coisas que você gostaria de fazer por
              você e continua adiando. No cansaço de passar o fim de semana
              tentando colocar em ordem tudo aquilo que saiu do lugar durante a
              semana.
            </p>
            <p className="mt-5">
              E talvez seja justamente aí que esteja uma das maiores mudanças de
              perspectiva:
            </p>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-8 border-l-4 border-primary pl-5 font-display text-xl leading-snug text-foreground sm:text-3xl">
            organização não é sobre ter tudo perfeito. É sobre fazer a casa e a
            rotina trabalharem a seu favor.
          </p>
        </Reveal>
      </Article>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Identificação                                                     */
/* ------------------------------------------------------------------ */

const PHRASES = [
  "Eu arrumo, mas logo está tudo bagunçado de novo.",
  "Tenho tanta coisa para fazer que não sei por onde começar.",
  "Meu armário está cheio e parece que não tenho roupa.",
  "Queria ter uma rotina mais organizada, mas nunca consigo manter.",
  "Sinto que estou sempre resolvendo coisas e nunca termino nada.",
  "Queria ter mais tempo para mim.",
];

function Identification() {
  return (
    <section className="surface-blue py-14 sm:py-20">
      <Wide>
        <Reveal>
          <h2 className="max-w-2xl text-balance text-2xl leading-tight sm:text-4xl">
            Quantas dessas frases poderiam ser suas?
          </h2>
        </Reveal>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {PHRASES.map((p, i) => (
            <Reveal key={p} delay={i * 60}>
              <li className="h-full rounded-2xl border border-border bg-card p-5 font-display text-lg leading-snug sm:text-xl">
                “{p}”
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mt-10 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Se você se identificou, talvez o problema não seja falta de esforço.
          </p>
          <p className="mt-3 max-w-3xl text-balance font-display text-2xl leading-tight sm:text-4xl">
            Talvez esteja faltando um sistema que funcione para a sua vida real.
          </p>
        </Reveal>
      </Wide>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. A virada                                                          */
/* ------------------------------------------------------------------ */

const TURNS = [
  "Uma casa organizada pode facilitar a manhã.",
  "Um guarda-roupa organizado pode diminuir decisões.",
  "Uma rotina organizada pode devolver tempo.",
  "Uma vida financeira organizada pode trazer mais tranquilidade.",
  "Um ambiente pensado para quem vive nele pode tornar tarefas mais simples.",
];

function Turn() {
  return (
    <section className="surface-cream py-14 sm:py-20">
      <Article>
        <Reveal>
          <Kicker>A virada</Kicker>
          <h2 className="mt-4 text-balance text-2xl leading-tight sm:text-4xl">
            Organizar a casa é só o começo.
          </h2>
        </Reveal>

        <ul className="mt-8 space-y-4">
          {TURNS.map((t, i) => (
            <Reveal key={t} delay={i * 60}>
              <li className="flex gap-3 text-base leading-relaxed sm:text-lg">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {t}
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mt-9 rounded-3xl bg-magenta-soft p-6 font-display text-xl leading-snug text-foreground sm:text-2xl">
            Quando você começa a entender organização dessa maneira, ela deixa
            de ser uma cobrança estética e passa a ser uma ferramenta para viver
            melhor.
          </p>
          <p className="mt-8 text-center font-display text-2xl leading-tight text-gradient-brand sm:text-3xl">
            É justamente dessa visão que nasceu o Não Repara na Bagunça.
          </p>
        </Reveal>
      </Article>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Apresentação do evento                                            */
/* ------------------------------------------------------------------ */

const FACTS = [
  { value: "4ª", label: "edição" },
  { value: "2", label: "dias de experiência" },
  { value: "24 e 25", label: "de outubro" },
  { value: "SJC", label: "São José dos Campos" },
];

function EventIntro() {
  return (
    <section className="bg-background pb-14 sm:pb-20">
      <figure className="relative">
        <img
          src={nova2.url}
          alt="Auditório lotado durante o Não Repara na Bagunça"
          loading="lazy"
          decoding="async"
          className="h-[46vh] min-h-[260px] w-full object-cover sm:h-[60vh]"
        />
      </figure>

      <Article className="pt-10">
        <Reveal>
          <img
            src={logoNrnb.url}
            alt="Não Repara na Bagunça"
            loading="lazy"
            className="mb-6 w-40 sm:w-52"
          />
          <h2 className="text-balance text-2xl leading-tight sm:text-4xl">
            Um encontro para mulheres que querem organizar muito mais que a
            casa.
          </h2>
        </Reveal>

        <Reveal className="mt-6 space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
          <div>
            <p>
              Criado pela Personal Organizer Suelen Gubeisse, o Não Repara na
              Bagunça chega à sua 4ª edição nos dias 24 e 25 de outubro, em São
              José dos Campos.
            </p>
            <p className="mt-5">
              O que começou falando de organização residencial cresceu para
              reunir diferentes dimensões da vida feminina em uma mesma
              experiência.
            </p>
            <p className="mt-5">
              Em 2026, serão dois dias de conteúdos, experiências, encontros e
              aprendizados para ajudar mulheres a criarem uma casa, uma rotina e
              uma vida que funcionem melhor para elas.
            </p>
          </div>
        </Reveal>
      </Article>

      <Wide className="mt-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {FACTS.map((f, i) => (
            <Reveal key={f.label} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border/70 bg-card p-5 text-center shadow-card">
                <p className="font-display text-2xl text-gradient-brand sm:text-3xl">
                  {f.value}
                </p>
                <p className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
                  {f.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Wide>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Territórios                                                       */
/* ------------------------------------------------------------------ */

type Territory = {
  icon: LucideIcon;
  title: string;
  text: string;
  photo?: string;
};

const TERRITORIES: Territory[] = [
  {
    icon: Home,
    title: "Sua casa",
    text: "Aprender formas mais práticas de organizar ambientes para que sejam fáceis de usar — e também de manter.",
    photo: palco3.url,
  },
  {
    icon: Shirt,
    title: "Seu guarda-roupa",
    text: "Enxergar melhor o que você tem, fazer escolhas mais conscientes e construir uma relação mais funcional com suas roupas.",
    photo: nova4.url,
  },
  {
    icon: Clock,
    title: "Sua rotina",
    text: "Encontrar maneiras possíveis de organizar tarefas sem transformar a organização em mais uma obrigação.",
  },
  {
    icon: Wallet,
    title: "Seu dinheiro",
    text: "Entender como mais clareza e planejamento podem ajudar você a tomar decisões melhores.",
  },
  {
    icon: Brain,
    title: "Sua mente e seu bem-estar",
    text: "Olhar para prioridades, autocuidado, saúde e tudo aquilo que também precisa de espaço na rotina.",
    photo: palco2.url,
  },
  {
    icon: Sparkles,
    title: "A experiência de viver sua casa",
    text: "Limpeza, mesa posta, cama posta, arquitetura, perfumação e pequenos cuidados que transformam uma casa em um lugar gostoso de viver.",
    photo: palco4.url,
  },
];

function Territories() {
  return (
    <section className="surface-cream py-14 sm:py-20">
      <Wide>
        <Reveal>
          <Kicker>Dimensões da vida</Kicker>
          <h2 className="mt-4 max-w-2xl text-balance text-2xl leading-tight sm:text-4xl">
            O que você gostaria de deixar mais leve?
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TERRITORIES.map((t, i) => (
            <Reveal key={t.title} delay={i * 60}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card">
                {t.photo && (
                  <img
                    src={t.photo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-40 w-full object-cover object-center"
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className="badge-icon">
                    <t.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg sm:text-xl">{t.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {t.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Wide>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Perfil da Suelen                                                  */
/* ------------------------------------------------------------------ */

function Profile() {
  return (
    <section className="bg-background py-14 sm:py-20">
      <Wide>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <img
              src={suelenPhoto.url}
              alt="Suelen Gubeisse, Personal Organizer e idealizadora do Não Repara na Bagunça"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-card"
            />
          </Reveal>
          <Reveal>
            <Kicker>Perfil</Kicker>
            <h2 className="mt-4 text-balance text-2xl leading-tight sm:text-4xl">
              De bagunceira a Personal Organizer: por que Suelen decidiu
              transformar organização em um movimento.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
              [PLACEHOLDER — trajetória da Suelen] Espaço reservado para o texto
              oficial contando a história dela: o começo, a virada, a decisão de
              se tornar Personal Organizer e o nascimento do Não Repara na
              Bagunça.
            </p>
            <blockquote className="mt-7 rounded-3xl bg-magenta-soft p-6">
              <Quote className="h-6 w-6 text-primary" />
              <p className="mt-3 font-display text-xl leading-snug sm:text-2xl">
                Eu não acredito em organização para ter uma casa de revista.
                Acredito em organização para ter uma casa que funcione para a
                vida que você quer viver.
              </p>
              <footer className="mt-4 text-sm uppercase tracking-wide text-muted-foreground">
                Suelen Gubeisse
              </footer>
            </blockquote>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <figure>
            <img
              src={nrnb1.url}
              alt="Suelen Gubeisse no palco do Não Repara na Bagunça"
              loading="lazy"
              decoding="async"
              className="h-[38vh] min-h-[220px] w-full rounded-3xl object-cover sm:h-[52vh]"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Suelen no palco do Não Repara na Bagunça, edição anterior.
            </figcaption>
          </figure>
        </Reveal>
      </Wide>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Experiência                                                       */
/* ------------------------------------------------------------------ */

const EXPERIENCE_PHOTOS = [
  { src: nova5.url, alt: "Plateia vibrando e aplaudindo durante o evento", span: "sm:col-span-2 sm:row-span-2" },
  { src: palco1.url, alt: "Suelen Gubeisse palestrando sobre ambientes desorganizados", span: "" },
  { src: nova1.url, alt: "Participantes no espaço das marcas parceiras", span: "" },
  { src: palco3.url, alt: "Demonstração prática de dobras e organização de roupas", span: "sm:col-span-2" },
  { src: nova3.url, alt: "Apresentação musical ao vivo no palco do evento", span: "" },
  { src: palco4.url, alt: "Aula de mesa posta e recepção em casa durante o evento", span: "" },
];

function Experience() {
  return (
    <section className="surface-dark py-14 sm:py-20">
      <Wide>
        <Reveal>
          <h2 className="max-w-2xl text-balance text-2xl leading-tight sm:text-4xl">
            Tem coisas que você aprende.{" "}
            <span className="italic text-gradient-brand">
              E tem coisas que precisa viver.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            O Não Repara na Bagunça não foi pensado como uma sequência de
            palestras. São dois dias de experiência: conteúdo, demonstrações
            práticas, ativações, trocas e encontros entre mulheres.
          </p>
        </Reveal>

        <div className="mt-8 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-4">
          {EXPERIENCE_PHOTOS.map((p, i) => (
            <Reveal
              key={p.src}
              delay={i * 50}
              className={`overflow-hidden rounded-2xl border border-border/60 ${p.span}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </Wide>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Histórias                                                         */
/* ------------------------------------------------------------------ */

type Story = { headline: string; text: string; name: string; photo?: string };

/* PLACEHOLDERS: substituir pelos depoimentos reais quando disponíveis. */
const STORIES: Story[] = [
  {
    headline: "“Eu precisava organizar minha casa.”",
    text: "[PLACEHOLDER — relato real da participante]",
    name: "[NOME DA PARTICIPANTE]",
    photo: nova2.url,
  },
  {
    headline: "“Percebi que precisava organizar minha rotina.”",
    text: "[PLACEHOLDER — relato real da participante]",
    name: "[NOME DA PARTICIPANTE]",
    photo: nova5.url,
  },
  {
    headline: "“Saí de lá querendo colocar outros planos em movimento.”",
    text: "[PLACEHOLDER — relato real da participante]",
    name: "[NOME DA PARTICIPANTE]",
    photo: nova1.url,
  },
];

function Stories() {
  return (
    <section className="bg-background py-14 sm:py-20">
      <Wide>
        <Reveal>
          <Kicker>Histórias</Kicker>
          <h2 className="mt-4 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
            Elas chegaram querendo organizar a casa.{" "}
            <span className="italic text-gradient-brand">
              Algumas saíram olhando diferente para a própria vida.
            </span>
          </h2>
        </Reveal>

        <div className="mt-10 space-y-10">
          {STORIES.map((s, i) => (
            <Reveal key={s.headline}>
              <article
                className={`grid items-center gap-6 sm:grid-cols-2 ${
                  i % 2 === 1 ? "sm:[&>figure]:order-2" : ""
                }`}
              >
                <figure>
                  <img
                    src={s.photo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full rounded-3xl object-cover object-center"
                  />
                </figure>
                <div>
                  <h3 className="text-balance font-display text-xl leading-snug sm:text-2xl">
                    {s.headline}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                  <p className="mt-4 text-sm uppercase tracking-wide text-primary">
                    {s.name}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Wide>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 10. Especialistas                                                    */
/* ------------------------------------------------------------------ */

type Speaker = {
  question: string;
  name: string;
  topic: string;
  description: string;
  photo: string;
  badge?: string;
};

const SPEAKERS: Speaker[] = [
  {
    question: "Quer tornar o cuidado com a casa mais simples e prazeroso?",
    name: "Suelen Gubeisse",
    badge: "Idealizadora & anfitriã",
    topic: "Técnicas modernas de limpeza • Aromatização do lar",
    description:
      "Anfitriã do Não Repara na Bagunça, ela conduz os conteúdos de técnicas modernas de limpeza e aromatização do lar.",
    photo: suelenAvatar.url,
  },
  {
    question: "Quer entender como a desorganização afeta a sua vida e o seu trabalho?",
    name: "Andréia Baldan",
    topic: "Crescimento Inteligente",
    description:
      "Entenda como a desorganização impacta pessoas, equipes e empresas, e por onde começar a mudar essa realidade.",
    photo: spAndreia.url,
  },
  {
    question: "Quer encontrar mais direção para as suas escolhas?",
    name: "Douglas Lopes",
    topic: "A Trilha do Propósito",
    description:
      "Descubra como encontrar direção para viver uma vida com mais propósito e realização.",
    photo: spDouglas.url,
  },
  {
    question: "Quer transformar momentos simples à mesa em memórias?",
    name: "Fernanda Ardito",
    topic: "Descomplicando a Mesa Posta",
    description:
      "Aprenda a fazer uma mesa posta simples, descomplicada, encantadora e feita com muito carinho.",
    photo: spFernanda.url,
  },
  {
    question: "Quer ser ouvida e compreendida do jeito que você deseja?",
    name: "Michelle Sampaio",
    topic: "O Poder da Comunicação",
    description:
      "Aprenda como uma comunicação clara e intencional pode transformar a maneira como você é percebida.",
    photo: spMichelle.url,
  },
  {
    question: "Quer se cercar de mulheres que impulsionam a sua caminhada?",
    name: "Natália Rico",
    topic: "A Força do Ecossistema",
    description:
      "Idealizadora do movimento Mulheres à Obra, compartilhará como o poder do ecossistema pode transformar vidas e fortalecer mulheres.",
    photo: spNatalia.url,
  },
  {
    question: "Quer que a sua imagem conte a história certa sobre você?",
    name: "Paula Chiaradia",
    topic: "Imagem que Comunica",
    description:
      "Antes de você falar, a sua imagem já contou uma história. Qual história ela está contando?",
    photo: spPaula.url,
  },
  {
    question: "Quer cuidar melhor da sua primeira casa: o seu corpo?",
    name: "Stella Vilella",
    topic: "Nosso Corpo é Nossa Primeira Casa",
    description:
      "Porque cuidar do seu corpo é o primeiro passo para viver com mais leveza e qualidade de vida.",
    photo: spStella.url,
  },
  {
    question: "Quer resgatar a confiança que o autocuidado devolve?",
    name: "Thaís Paraíso",
    topic: "Imagem que Comunica",
    description:
      "Aprenda como o autocuidado pode resgatar sua confiança e valorizar a mulher que existe em você.",
    photo: spThais.url,
  },
];

function Speakers() {
  return (
    <section className="surface-cream py-14 sm:py-20">
      <Wide>
        <Reveal>
          <Kicker>Especialistas</Kicker>
          <h2 className="mt-4 max-w-3xl text-balance text-2xl leading-tight sm:text-4xl">
            Diferentes especialistas. Um mesmo objetivo:{" "}
            <span className="italic text-gradient-brand">
              deixar sua vida mais leve.
            </span>
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPEAKERS.map((s, i) => (
            <Reveal key={s.name} delay={i * 50}>
              <article className="flex h-full flex-col rounded-3xl border border-border/70 bg-card p-6 shadow-card">
                <p className="font-display text-lg leading-snug text-primary">
                  {s.question}
                </p>
                <img
                  src={s.photo}
                  alt={s.name}
                  loading="lazy"
                  decoding="async"
                  className="mt-5 h-24 w-24 rounded-full bg-sky-tint object-cover object-top"
                />
                <h3 className="mt-4 text-lg">{s.name}</h3>
                {s.badge && (
                  <p className="mt-1 text-xs uppercase tracking-wide text-primary">
                    {s.badge}
                  </p>
                )}
                <p className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
                  {s.topic}
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Wide>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 11. Bloco emocional / vídeo                                          */
/* ------------------------------------------------------------------ */

function EmotionalVideo() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="surface-rose py-14 sm:py-20">
      <Wide>
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-balance text-center text-2xl leading-tight sm:text-4xl">
            Talvez você não precise de uma vida completamente diferente.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-center font-display text-xl leading-snug sm:text-2xl">
            Talvez precise fazer a sua vida funcionar melhor para você.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-9 w-full max-w-sm">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-black/20 shadow-card">
            <video
              ref={videoRef}
              src={nrnbVideo.url}
              poster={nrnbVideoPoster.url}
              controls={playing}
              playsInline
              preload="none"
              className="aspect-[9/16] w-full object-cover"
              onPlay={() => {
                setPlaying(true);
                track("editorial_video_play");
              }}
              onEnded={() => track("editorial_video_complete")}
            />
            {!playing && (
              <button
                type="button"
                aria-label="Assistir ao vídeo do Não Repara na Bagunça"
                onClick={() => videoRef.current?.play()}
                className="absolute inset-0 flex items-center justify-center bg-black/25 transition hover:bg-black/35"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#7c0353]">
                  <Play className="ml-1 h-7 w-7" fill="currentColor" />
                </span>
              </button>
            )}
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-9 text-center font-display text-2xl sm:text-3xl">
            Organizar a casa é só o começo.
          </p>
        </Reveal>
      </Wide>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 12 e 13. Convite e conversão                                         */
/* ------------------------------------------------------------------ */

function Invitation({ href }: { href: string }) {
  return (
    <section id="convite" className="bg-background py-14 sm:py-20">
      <Article className="text-center">
        <Reveal>
          <Kicker>O convite</Kicker>
          <h2 className="mt-4 text-balance text-2xl leading-tight sm:text-4xl">
            Dois dias para começar a organizar a casa — e muito mais.
          </h2>
          <p className="mt-6 font-display text-xl uppercase tracking-wide text-gradient-brand sm:text-2xl">
            Não Repara na Bagunça 2026
          </p>
          <p className="mt-2 text-base text-muted-foreground sm:text-lg">
            24 e 25 de outubro · São José dos Campos
          </p>
          <a
            href={href}
            onClick={() => track("editorial_tickets_click")}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-glow transition hover:opacity-95"
          >
            Quero conhecer os ingressos
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </Article>
    </section>
  );
}

function FinalCta({ href }: { href: string }) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={nova5.url}
        alt="Participantes do Não Repara na Bagunça"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[#170811]/80" />
      <div className="mx-auto max-w-3xl px-5 py-20 text-center text-white sm:px-6 sm:py-28">
        <Reveal>
          <h2 className="text-balance font-display text-2xl leading-tight sm:text-4xl">
            E se o próximo espaço que você organizar for a sua vida?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Nos dias 24 e 25 de outubro, centenas de mulheres vão se encontrar
            em São José dos Campos para descobrir maneiras mais leves, práticas
            e possíveis de organizar a casa, a rotina e aquilo que importa.
          </p>
          <a
            href={href}
            onClick={() => track("editorial_final_cta_click")}
            className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wide text-[#7c0353] transition hover:opacity-95"
          >
            Quero participar do Não Repara na Bagunça
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky CTA                                                           */
/* ------------------------------------------------------------------ */

function StickyCta({ href }: { href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("convite-anchor");
    const onScroll = () => {
      const y = window.scrollY;
      const start = target ? target.offsetTop - window.innerHeight : 1200;
      setVisible(y > Math.max(600, start));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 px-4 py-3 backdrop-blur transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={href}
        onClick={() => track("editorial_sticky_click")}
        className="mx-auto flex min-h-12 max-w-md items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-glow"
      >
        Quero viver essa experiência
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll depth                                                         */
/* ------------------------------------------------------------------ */

function useScrollDepth() {
  useEffect(() => {
    const marks = [25, 50, 75, 90];
    const fired = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      marks.forEach((m) => {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          track("editorial_scroll_depth", { percent: m });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ------------------------------------------------------------------ */

function EditorialPage() {
  const withParams = useTrackedParams();
  const ticketsHref = withParams(TICKETS_URL);
  useScrollDepth();

  useEffect(() => {
    track("editorial_page_view");
  }, []);

  return (
    <main className="overflow-x-hidden pb-20">
      <Hero />
      <Opening />
      <Identification />
      <Turn />
      <EventIntro />
      <Territories />
      <Profile />
      <Experience />
      <Stories />
      <Speakers />
      <EmotionalVideo />
      <div id="convite-anchor" />
      <Invitation href={ticketsHref} />
      <FinalCta href={ticketsHref} />
      <StickyCta href={ticketsHref} />
    </main>
  );
}
