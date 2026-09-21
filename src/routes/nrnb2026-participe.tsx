import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Heart,
  Home,
  Lock,
  MapPin,
  MessageCircle,
  Play,
  Quote,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CarouselRow } from "@/components/carousel-row";
import { track } from "@/lib/tracking";
import logoNrnb from "@/assets/logo-nrnb-alpha.png.asset.json";
import heroComposicao from "@/assets/hero-oficial-2608.jpeg.asset.json";
import suelenPhoto from "@/assets/suelen-idealizadora.jpg.asset.json";
import spAndreia from "@/assets/andreia-ombros.png.asset.json";
import spDouglas from "@/assets/douglas-cut.png.asset.json";
import spFernanda from "@/assets/fernanda-ardito.png.asset.json";
import spMichelle from "@/assets/michelle-cut.png.asset.json";
import spNatalia from "@/assets/natalia-rico-busto.png.asset.json";
import spPaula from "@/assets/paula-chiaradia-busto.png.asset.json";
import spStella from "@/assets/stella-vilella-busto.png.asset.json";
import spThais from "@/assets/thais-cut.png.asset.json";
import nrnb1 from "@/assets/dan_9014.jpg.asset.json";
import nova1 from "@/assets/nova1.jpg.asset.json";
import nova2 from "@/assets/nova2.jpg.asset.json";
import nova4 from "@/assets/nova_4.jpg.asset.json";
import depoimentoVideo from "@/assets/depoimento-1.mp4.asset.json";
import depoimentoPoster from "@/assets/depoimento-1-poster.jpg.asset.json";

const VARIANT = "nrnb2026-participe";
const WHATSAPP_URL = `https://wa.me/5512991402832?text=${encodeURIComponent('Olá, Suelen. Vim da página NRNB 2026 Participe e quero tirar uma dúvida sobre o evento.')}`;

type Ticket = {
  id: "compromisso" | "vip" | "platinum";
  name: string;
  desire: string;
  price: string;
  installmentPrice: string;
  soldPercent: number;
  benefits: string[];
  includesFrom?: string;
  highlight?: string;
  ctaLabel?: string;
  event: "ticket_compromisso_click" | "ticket_vip_click" | "ticket_platinum_click";
  checkout: string;
};

const TICKETS: Ticket[] = [
  {
    id: "compromisso",
    name: "Compromisso",
    desire: "Quero participar.",
    price: "147,00",
    installmentPrice: "15,11",
    soldPercent: 34,
    benefits: [
      "Você não sai só inspirada. Sai sabendo o que começar a aplicar na sua casa e na sua rotina.",
      "Acesso aos 2 dias de evento",
      "Acesso à feira “Não Repara na Bagunça”",
    ],
    event: "ticket_compromisso_click",
    checkout: "https://payfast.greenn.com.br/168687?batch=17042_y49MyT",
  },
  {
    id: "vip",
    name: "VIP",
    desire: "Quero viver melhor essa experiência.",
    price: "197,00",
    installmentPrice: "20,25",
    soldPercent: 25,
    highlight: "Experiência recomendada",
    ctaLabel: "QUERO O VIP",
    includesFrom: "TUDO DO INGRESSO COMPROMISSO +",
    benefits: [
      "Assentos em áreas mais à frente da plateia",
      "Acesso à área VIP exclusiva",
      "Café e petit four",
    ],
    event: "ticket_vip_click",
    checkout: "https://payfast.greenn.com.br/168687?batch=17042_mqGZ6S",
  },
  {
    id: "platinum",
    name: "Platinum",
    desire: "Quero viver tudo o que o NRNB pode oferecer.",
    price: "447,00",
    installmentPrice: "45,96",
    soldPercent: 70,
    highlight: "Experiência completa",
    ctaLabel: "QUERO O PLATINUM",
    includesFrom: "TUDO DO INGRESSO VIP +",
    benefits: [
      "Sacola com brindes exclusivos",
      "Assentos nas primeiras fileiras (1ª e 2ª fileira com a melhor localização da plateia)",
      "Curso online completo de organização da casa toda, por 1 ano",
      "Um encontro ao vivo com a Suelen para tirar dúvidas no momento da prática",
    ],
    event: "ticket_platinum_click",
    checkout: "https://payfast.greenn.com.br/168687?batch=17042_TMB3di",
  },
];

const SPEAKERS = [
  { name: "Andréia Baldan", topic: "Crescimento Inteligente", photo: spAndreia.url, description: "Entenda como a desorganização impacta pessoas, equipes e empresas, e por onde começar a mudar essa realidade." },
  { name: "Douglas Lopes", topic: "A Trilha do Propósito", photo: spDouglas.url, description: "Descubra como encontrar direção para viver uma vida com mais propósito e realização." },
  { name: "Fernanda Ardito", topic: "Descomplicando a Mesa Posta", photo: spFernanda.url, description: "Aprenda a fazer uma mesa posta simples, descomplicada, encantadora e feita com muito carinho." },
  { name: "Michelle Sampaio", topic: "O Poder da Comunicação", photo: spMichelle.url, description: "Aprenda como uma comunicação clara e intencional pode transformar a maneira como você é percebida." },
  { name: "Natália Rico", topic: "A Força do Ecossistema", photo: spNatalia.url, description: "O poder do ecossistema pode transformar vidas e fortalecer mulheres." },
  { name: "Paula Chiaradia", topic: "Imagem que Comunica", photo: spPaula.url, description: "Antes de você falar, a sua imagem já contou uma história. Qual história ela está contando?" },
  { name: "Stella Vilella", topic: "Nosso Corpo é Nossa Primeira Casa", photo: spStella.url, description: "Cuidar do seu corpo é o primeiro passo para viver com mais leveza e qualidade de vida." },
  { name: "Thaís Paraíso", topic: "Imagem que Comunica", photo: spThais.url, description: "O autocuidado pode resgatar sua confiança e valorizar a mulher que existe em você." },
];

const OBJECTIONS = [
  ["Eu já tentei cronogramas e rotinas de organização.", "\n"],
  ["Eu arrumo, mas depois tudo volta a ficar bagunçado.", "\n"],
  ["Eu simplesmente não tenho tempo para dar conta de tudo.", "\n"],
];

const DELIVERIES: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Home, title: "ORGANIZAR", text: "Técnicas práticas para organizar ambientes, guarda-roupa, limpeza e os espaços que fazem parte da sua rotina." },
  { icon: Check, title: "MANTER", text: "Aprenda a criar uma lógica de organização que você consiga manter, em vez de arrumar tudo e ver a bagunça voltar." },
  { icon: Heart, title: "VIVER MAIS LEVE", text: "Menos tempo apagando incêndios dentro de casa e mais espaço para você, sua família, seus planos e sua vida." },
];

const CONTENTS = [
  "Organização residencial", "Guarda-roupa", "Limpeza\ndoméstica", "Mesa e cama posta", "Finanças",
  "Saúde e bem-estar", "Organização da mente", "Rotina", "Imagem e estilo", "Arquitetura e funcionalidade",
];

const FOR_WHOM = [
  "Sente que arruma, mas nunca consegue manter.",
  "Quer uma casa organizada sem viver em função dela.",
  "Precisa de soluções possíveis para sua rotina real.",
  "Quer transformar organização em mais tempo e leveza para viver.",
];

const TESTIMONIALS = [
  { text: "“Nunca pensei que organizar a casa pudesse ser tão libertador. Minha rotina mudou completamente e hoje tenho paz!”", author: "Mariana Silva" },
  { text: "“Finalmente encontrei um método que funciona para a minha realidade, sem cobranças de perfeição. Foi um divisor de águas.”", author: "Juliana Costa" },
  { text: "“Foram dois dias leves, cheios de aprendizado e de coisas que realmente dá vontade de colocar em prática.”", author: "Vanessa Fernandes" },
];

const FAQS = [
  { q: "Onde acontece?", a: "No PIT — Parque Tecnológico de São José dos Campos/SP, na Estr. Dr. Altino Bondesan, 500 — Eugênio de Melo." },
  { q: "Quais são os horários?", a: "Nos dias 24 e 25 de outubro de 2026, das 09h às 18h30." },
  { q: "O ingresso vale para os dois dias?", a: "Sim. Todos os ingressos dão acesso aos dois dias de evento, 24 e 25 de outubro de 2026." },
  { q: "Posso parcelar?", a: "Sim. O pagamento pode ser parcelado em até 12x no cartão de crédito." },
  { q: "Qual a diferença entre Compromisso, VIP e Platinum?", a: "O Compromisso inclui os benefícios-base. O VIP inclui tudo do Compromisso e benefícios VIP. O Platinum inclui tudo do VIP e os diferenciais Platinum. Confira todos os itens nos cards de ingresso." },
  { q: "Como recebo meu ingresso?", a: "O ingresso é digital e será enviado no momento da sua compra na plataforma da Greenn e por e-mail." },
];

export const Route = createFileRoute("/nrnb2026-participe")({
  component: ConversionLandingPage,
  head: () => ({
    meta: [
      { title: "Participe do Não Repara na Bagunça 2026" },
      { name: "description", content: "Dois dias de técnicas práticas para organizar sua casa, manter a organização e viver uma rotina mais leve. 24 e 25 de outubro, em São José dos Campos." },
      { property: "og:title", content: "Participe do Não Repara na Bagunça 2026" },
      { property: "og:description", content: "Aprenda os 7 Passos da Organização em uma experiência prática de dois dias para a vida real." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function goToTickets() {
  document.getElementById("ingressos")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function TrackedCTA({ event = "benefits_cta_click", children, className = "" }: { event?: "hero_cta_click" | "benefits_cta_click" | "final_cta_click" | "sticky_cta_click"; children: React.ReactNode; className?: string }) {
  return (
    <Button
      type="button"
      size="lg"
      onClick={() => { track(event, { variant: VARIANT }); goToTickets(); }}
      className={`cta-primary h-auto min-h-12 rounded-full px-7 py-3.5 text-center text-sm font-bold uppercase whitespace-normal ${className}`}
    >
      {children}<ArrowRight className="h-4 w-4" />
    </Button>
  );
}

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`px-5 py-12 sm:px-6 sm:py-16 ${className}`}><div className="mx-auto max-w-6xl">{children}</div></section>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{children}</p>;
}

function TopTicker() {
  const message = "2º LOTE LIBERADO • GARANTA O SEU ANTES QUE ACABE";
  const repetitions = Array.from({ length: 4 });

  return (
    <div className="nrnb-top-ticker bg-foreground text-primary-foreground" role="region" aria-label={message}>
      <span className="sr-only">{message}</span>
      <div className="nrnb-top-ticker-track" aria-hidden="true">
        {[0, 1].map((group) => (
          <div key={group} className="nrnb-top-ticker-group">
            {repetitions.map((_, index) => (
              <span key={index} className="nrnb-top-ticker-item">
                <strong>{message}</strong>
                <span className="nrnb-top-ticker-separator">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <span className="nrnb-top-ticker-static" aria-hidden="true">{message}</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-scene relative overflow-hidden lg:min-h-[720px]">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[60%] lg:block">
        <img src={heroComposicao.url} alt="Suelen Gubeisse e convidados do Não Repara na Bagunça 2026" fetchPriority="high" className="hero-photo-desktop h-full w-full object-contain object-center" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col px-5 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-5 lg:grid lg:min-h-[720px] lg:grid-cols-[46%_1fr] lg:items-center lg:py-8">
        <div className="order-1 -mx-5 h-[205px] sm:-mx-6 sm:h-[270px] lg:hidden">
          <img src={heroComposicao.url} alt="Suelen Gubeisse e convidados do Não Repara na Bagunça 2026" fetchPriority="high" className="hero-photo-mobile h-full w-full object-contain object-center" />
        </div>
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <img src={logoNrnb.url} alt="Não Repara na Bagunça" width={546} height={187} className="mx-auto w-[165px] sm:w-[220px] lg:mx-0 lg:w-[290px]" />
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-highlight sm:mt-3 sm:text-xs">4ª EDIÇÃO</p>
          <h1 className="mt-2 text-balance text-[1.9rem] italic leading-[1.05] text-foreground sm:mt-3 sm:text-5xl lg:max-w-[620px] lg:text-[3.4rem]">
            Organize sua casa. Simplifique sua rotina. Viva com mais leveza.
          </h1>
          <p className="mx-auto mt-2.5 max-w-xl text-balance text-sm font-medium leading-relaxed text-muted-foreground sm:mt-3 sm:text-base lg:mx-0">
            Em 2 dias, aprenda os <strong>7 Passos da Organização</strong> e técnicas práticas para fazer sua casa funcionar melhor, sem depender de rotinas impossíveis de manter.
          </p>
          <div className="mt-3 grid grid-cols-3 border-y border-border text-foreground sm:mt-4">
            <div className="flex min-w-0 items-center justify-center gap-1.5 px-1.5 py-2.5 sm:gap-2 sm:px-3 lg:justify-start">
              <Calendar className="h-4 w-4 shrink-0 text-sky-highlight" />
              <span className="text-left text-[10px] font-bold uppercase leading-tight sm:text-xs"><strong className="block text-xs sm:text-sm">24 E 25</strong>Outubro</span>
            </div>
            <div className="flex min-w-0 items-center justify-center gap-1.5 border-x border-border px-1.5 py-2.5 sm:gap-2 sm:px-3">
              <MapPin className="h-4 w-4 shrink-0 text-sky-highlight" />
              <span className="text-left text-[10px] font-bold uppercase leading-tight sm:text-xs">São José dos<br />Campos • SP</span>
            </div>
            <div className="flex min-w-0 items-center justify-center gap-1.5 px-1.5 py-2.5 sm:gap-2 sm:px-3 lg:justify-end">
              <Clock className="h-4 w-4 shrink-0 text-sky-highlight" />
              <span className="text-left text-[10px] font-bold leading-tight sm:text-xs"><strong className="block text-xs sm:text-sm">9h às</strong>18h30</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-[auto_1fr] items-center gap-x-3 border border-border bg-foreground/90 px-3 py-2.5 text-primary-foreground shadow-card sm:grid-cols-[auto_1fr_auto] sm:gap-x-5 sm:px-4 lg:mt-4">
            <div className="text-left">
              <span className="inline-flex rounded-full bg-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-primary-foreground sm:text-[10px]">2º lote disponível</span>
              <p className="mt-1 text-[9px] font-bold uppercase leading-tight tracking-[0.08em] text-primary-foreground/75 sm:text-[10px]">Ingressos a partir de</p>
            </div>
            <div className="flex items-end justify-center gap-1 whitespace-nowrap">
              <span className="pb-0.5 text-xs font-semibold sm:text-sm">12x de</span>
              <strong className="font-display text-[1.75rem] leading-none text-sky-highlight sm:text-4xl">R$ 15,11</strong>
            </div>
            <div className="col-span-2 mt-2 border-t border-primary-foreground/20 pt-2 text-center sm:col-span-1 sm:mt-0 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0 sm:text-left">
              <p className="text-[10px] text-primary-foreground/80 sm:text-xs">ou R$ 147 à vista</p>
              <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-primary-foreground sm:text-[10px]">Compromisso • VIP • Platinum</p>
            </div>
          </div>
          <div className="mx-auto mt-3 max-w-md lg:mx-0 lg:mt-4">
            <TrackedCTA event="hero_cta_click" className="w-full">QUERO PARTICIPAR</TrackedCTA>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return <div className="border-b border-border bg-card px-5 py-4"><div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-3 gap-y-1 text-center text-xs font-bold uppercase tracking-[0.12em] text-foreground sm:text-sm">{["4ª edição", "2 dias", "7 Passos da Organização", "São José dos Campos"].map((item, index) => <span key={item} className="flex items-center gap-3">{index > 0 && <span className="text-primary">•</span>}{item}</span>)}</div></div>;
}

function Objections() {
  return <Section><div className="text-center"><Eyebrow>Antes de qualquer coisa</Eyebrow><h2 className="mt-4 text-balance text-3xl leading-tight sm:text-5xl">Talvez você esteja pensando…</h2></div><div className="mt-8 grid gap-4 lg:grid-cols-3">{OBJECTIONS.map(([question, answer], index) => <article key={question} className="border-t-2 border-primary bg-card px-1 py-5"><span className="font-display text-4xl text-primary/30">0{index + 1}</span><h3 className="mt-2 text-xl font-semibold leading-snug">“{question}”</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{answer}</p></article>)}</div></Section>;
}

function Deliveries() {
  return <Section className="surface-blue"><div className="text-center"><Eyebrow>O que você vai levar desses 2 dias</Eyebrow><h2 className="mx-auto mt-4 max-w-4xl text-balance text-3xl leading-tight sm:text-5xl">Não é sobre ter uma casa perfeita. É sobre fazer sua casa funcionar para a vida que você tem.</h2></div><div className="mt-8 grid gap-4 lg:grid-cols-3">{DELIVERIES.map(({ icon: Icon, title, text }) => <article key={title} className="border-t border-border py-5"><Icon className="h-7 w-7 text-primary" /><h3 className="mt-4 font-display text-3xl font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div><div className="mt-8 flex justify-center"><TrackedCTA>QUERO APRENDER A ORGANIZAR MINHA CASA E MINHA ROTINA</TrackedCTA></div></Section>;
}

function PracticalDifference() {
  const photos = [nrnb1.url, nova4.url, nova2.url, nova1.url];
  return <Section className="bg-sky-tint"><div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]"><div><Eyebrow>Na prática</Eyebrow><h2 className="mt-4 text-balance text-3xl leading-tight sm:text-5xl">Você não vai passar 2 dias apenas ouvindo falar de organização.</h2><p className="mt-4 text-base leading-relaxed text-muted-foreground">O NRNB reúne método, demonstrações, técnicas e especialistas para você entender como aplicar a organização na sua própria realidade.</p><p className="mt-5 text-lg font-bold text-primary">Você sai sabendo o que fazer, e não apenas inspirada para tentar depois.</p><span className="mt-5 inline-flex rounded-full border border-primary/25 bg-card px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">MÉTODO • 7 PASSOS DA ORGANIZAÇÃO</span></div><div className="grid grid-cols-2 gap-3">{photos.map((src, index) => <img key={src} src={src} alt={`Experiência real do NRNB ${index + 1}`} loading="lazy" className={`w-full rounded-lg object-cover ${index === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"}`} />)}</div></div></Section>;
}

function ContentsAndDays() {
  return <><Section><div className="text-center"><Eyebrow>VOCÊ VAI APRENDER</Eyebrow><h2 className="mt-4 text-balance text-3xl leading-tight sm:text-5xl">Da casa à rotina. Da organização ao seu bem-estar.</h2></div><div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">{CONTENTS.map((content) => <div key={content} className="flex min-h-24 items-center justify-center whitespace-pre-line bg-card p-4 text-center text-sm font-semibold">{content}</div>)}</div><p className="mt-4 text-center text-sm text-muted-foreground">+ outros conteúdos durante os 2 dias.</p></Section><Section className="surface-rose"><div className="text-center"><Eyebrow>24 e 25 de outubro</Eyebrow><h2 className="mx-auto mt-4 max-w-3xl text-balance text-3xl leading-tight sm:text-5xl">Dois dias para sair do “eu preciso me organizar” e começar a saber como.</h2></div><div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">{[["DIA 1", "ENTENDER E ORGANIZAR", "Você começa entendendo os princípios, técnicas e decisões que fazem uma casa funcionar melhor."], ["DIA 2", "APLICAR E MANTER", "Você aprofunda as soluções e conecta organização, rotina e vida para conseguir manter o que construiu."]].map(([day, title, text]) => <article key={day} className="border border-border bg-card p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{day}</p><h3 className="mt-3 text-2xl font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div><p className="mt-4 text-center text-xs text-muted-foreground">Uma narrativa da experiência, a programação oficial será divulgada posteriormente.</p></Section></>;
}

function SpeakerCard({ speaker }: { speaker: (typeof SPEAKERS)[number] }) {
  const [open, setOpen] = useState(false);
  return <article className="flex h-full flex-col border border-border bg-card p-4 shadow-card"><div className="aspect-[4/3] overflow-hidden bg-sky-tint"><img src={speaker.photo} alt={`Foto de ${speaker.name}`} loading="lazy" className="h-full w-full object-contain object-bottom" /></div><h3 className="mt-4 text-xl font-semibold">{speaker.name}</h3><p className="mt-1 text-xs font-bold uppercase tracking-wide text-primary">{speaker.topic}</p>{open && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{speaker.description}</p>}<Button type="button" variant="ghost" size="sm" onClick={() => setOpen((value) => !value)} className="mt-2 self-start px-0 text-xs font-bold uppercase text-primary">{open ? "Fechar −" : "Saiba mais +"}</Button></article>;
}

function Teachers() {
  return <Section><div className="grid items-center gap-6 border-y border-border py-8 md:grid-cols-[42%_1fr]"><img src={suelenPhoto.url} alt="Suelen Gubeisse, idealizadora e anfitriã" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover object-center md:aspect-[4/5]" /><div><Eyebrow>Idealizadora e anfitriã</Eyebrow><h2 className="mt-3 text-4xl sm:text-5xl">Suelen Gubeisse</h2><p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">Suelen criou o Não Repara na Bagunça para levar a organização para a vida real de quem trabalha, cuida da casa, da família e precisa de soluções possíveis de manter.</p></div></div><div className="mt-12 text-center"><h2 className="mx-auto max-w-3xl text-balance text-3xl leading-tight sm:text-5xl">Especialistas para olhar a organização por diferentes partes da sua vida.</h2></div><div className="mt-8"><CarouselRow ariaLabel="Especialistas do NRNB 2026" hint="Deslize para conhecer →" itemClassName="w-[82%] sm:w-[46%] lg:w-[31%]" items={SPEAKERS.map((speaker) => <SpeakerCard key={speaker.name} speaker={speaker} />)} /></div></Section>;
}

function SocialProof() {
  const [playing, setPlaying] = useState(false);
  return <Section className="surface-dark"><div className="text-center"><Eyebrow>Quem já viveu entende</Eyebrow><h2 className="mt-4 text-balance text-3xl leading-tight sm:text-5xl">O NRNB não termina quando você sai do evento.</h2></div><div className="mt-8 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]"><div className="mx-auto w-full max-w-[320px]"><div className="relative aspect-[9/16] overflow-hidden rounded-lg border border-border bg-card">{playing ? <video src={depoimentoVideo.url} poster={depoimentoPoster.url} controls autoPlay playsInline className="h-full w-full object-cover" /> : <Button type="button" variant="ghost" onClick={() => { setPlaying(true); track("testimonial_video_play", { variant: VARIANT }); }} aria-label="Assistir depoimento" className="group absolute inset-0 h-full w-full rounded-none p-0"><img src={depoimentoPoster.url} alt="Depoimento real de participante" className="h-full w-full object-cover" /><span className="absolute inset-0 flex items-center justify-center bg-foreground/20"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary"><Play className="ml-1 h-7 w-7 text-primary-foreground" fill="currentColor" /></span></span></Button>}</div></div><div><div className="grid grid-cols-2 gap-3">{[nrnb1.url, nova2.url, nova1.url].map((src, index) => <img key={src} src={src} alt={`Pessoas e experiência real no NRNB ${index + 1}`} loading="lazy" className={`w-full rounded-lg object-cover ${index === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"}`} />)}</div><div className="mt-5 grid gap-3">{TESTIMONIALS.map((testimonial) => <figure key={testimonial.author} className="border-l-2 border-primary pl-4"><Quote className="h-4 w-4 text-primary" /><blockquote className="mt-2 text-sm leading-relaxed">{testimonial.text}</blockquote><figcaption className="mt-2 text-xs font-bold uppercase tracking-wide text-muted-foreground"><Star className="mr-1 inline h-3 w-3 text-primary" />{testimonial.author}</figcaption></figure>)}</div></div></div></Section>;
}

function LotProgress({ percent }: { percent: number }) {
  return <div><div className="flex items-center justify-between text-xs font-semibold uppercase text-muted-foreground"><span>Próximo lote em breve</span><span>{percent}% do lote 2 vendido</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} /></div></div>;
}

function Tickets() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useRef(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting && !seen.current) { seen.current = true; track("ticket_section_view", { variant: VARIANT }); } }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <Section id="ingressos" className="surface-ink"><div ref={ref} className="text-center"><Eyebrow>Ingressos</Eyebrow><h2 className="mt-4 text-balance text-3xl leading-tight sm:text-5xl">Escolha como você quer viver o NRNB.</h2></div><div className="mt-8 grid items-start gap-5 lg:grid-cols-3">{TICKETS.map((ticket) => <article key={ticket.id} className={`card-light flex flex-col border bg-card p-6 text-center ${ticket.id === "vip" ? "border-primary shadow-glow lg:-mt-3" : "border-border shadow-card"}`}>{ticket.highlight && <span className="mx-auto mb-4 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">{ticket.highlight}</span>}<h3 className="text-3xl font-semibold">{ticket.name}</h3><p className="mt-1 text-sm italic text-muted-foreground">“{ticket.desire}”</p><span className="mx-auto mt-5 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">2º lote</span><p className="mt-4 text-sm font-semibold text-muted-foreground">12x de</p><p className="mt-1 font-display text-5xl font-semibold leading-none text-primary">R$ {ticket.installmentPrice}</p><p className="mt-2 text-sm text-muted-foreground">ou R$ {ticket.price} à vista</p><div className="my-5 h-px bg-border" />{ticket.includesFrom && <p className="rounded-lg bg-magenta-soft px-3 py-2 text-xs font-bold uppercase text-primary">{ticket.includesFrom}</p>}<ul className="mt-4 flex-1 space-y-3 text-left">{ticket.benefits.map((benefit) => <li key={benefit} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{benefit}</span></li>)}</ul><Button asChild size="lg" className="ticket-cta mt-6 h-auto min-h-12 w-full rounded-full px-5 py-3.5 text-sm font-bold uppercase"><a suppressHydrationWarning href={ticket.checkout} target="_blank" rel="noopener noreferrer" onClick={() => { track(ticket.event, { ticket: ticket.id, variant: VARIANT }); track("checkout_start", { ticket: ticket.id, variant: VARIANT }); }}>{ticket.ctaLabel ?? "QUERO ESTE INGRESSO"}<ArrowRight className="h-4 w-4" /></a></Button><p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase text-muted-foreground"><Lock className="h-3.5 w-3.5 text-primary" />Compra segura</p><div className="mt-5 bg-sky-tint p-3"><LotProgress percent={ticket.soldPercent} /></div></article>)}</div><div className="mt-7 text-center"><p className="text-sm text-muted-foreground">Ainda ficou com alguma dúvida sobre qual ingresso escolher?</p><Button asChild variant="outline" className="mt-3 rounded-full"><a suppressHydrationWarning href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_tickets_click", { variant: VARIANT })}><MessageCircle className="h-4 w-4" />Falar no WhatsApp</a></Button></div></Section>;
}

function AudienceAndFaq() {
  return <><Section className="bg-sky-tint"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><Eyebrow>Para quem é</Eyebrow><h2 className="mt-4 text-3xl leading-tight sm:text-5xl">Esse encontro é para você que…</h2></div><div className="grid gap-3 sm:grid-cols-2">{FOR_WHOM.map((item) => <div key={item} className="flex items-start gap-3 border-b border-border bg-card p-4"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><p className="text-sm leading-relaxed">{item}</p></div>)}</div></div></Section><Section><div className="mx-auto max-w-3xl text-center"><Eyebrow>Dúvidas de compra</Eyebrow><h2 className="mt-4 text-3xl sm:text-5xl">Perguntas frequentes</h2></div><Accordion type="single" collapsible className="mx-auto mt-7 max-w-3xl">{FAQS.map((item) => <AccordionItem key={item.q} value={item.q}><AccordionTrigger className="text-left">{item.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{item.a}</AccordionContent></AccordionItem>)}</Accordion></Section></>;
}

function FinalDecision() {
  return <section className="surface-rose px-5 py-14 sm:px-6 sm:py-20"><div className="mx-auto max-w-4xl text-center"><Eyebrow>24 e 25 de outubro</Eyebrow><h2 className="mt-4 text-balance text-3xl leading-tight sm:text-5xl">Daqui a algumas semanas, sua rotina pode continuar exatamente como está.</h2><p className="mx-auto mt-5 max-w-2xl text-balance leading-relaxed text-muted-foreground">Ou você pode passar dois dias aprendendo técnicas, fazendo novas escolhas e descobrindo uma forma mais possível de organizar sua casa e sua vida.</p><p className="mt-5 text-xl font-bold">Você não precisa continuar recomeçando do zero toda semana.</p><div className="mt-8 flex justify-center"><TrackedCTA event="final_cta_click">QUERO VIVER O NRNB</TrackedCTA></div><p className="mt-4 text-sm font-semibold">24 e 25 de outubro • São José dos Campos/SP</p></div></section>;
}

function Footer() {
  return <footer className="bg-magenta px-5 py-8 text-center"><img src={logoNrnb.url} alt="Não Repara na Bagunça" width={380} height={135} className="mx-auto w-[170px]" /><p className="mt-4 text-xs text-primary-foreground/85">© 2026 Não Repara na Bagunça. Todos os direitos reservados.</p></footer>;
}

function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => { const onScroll = () => setShow(window.scrollY > 500); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur transition-transform lg:hidden ${show ? "translate-y-0" : "translate-y-full"}`}><TrackedCTA event="sticky_cta_click" className="w-full">QUERO PARTICIPAR</TrackedCTA></div>;
}

function WhatsAppFloating() {
  return <a suppressHydrationWarning href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_floating_click", { variant: VARIANT })} aria-label="Tirar uma dúvida no WhatsApp" className="fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-card transition hover:brightness-110 lg:bottom-6 lg:right-6"><MessageCircle className="h-5 w-5" /></a>;
}

function ConversionLandingPage() {
  useEffect(() => {
    track("page_view", { variant: VARIANT, page: "/nrnb2026-participe" });
    const sent = new Set<number>();
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = Math.round((window.scrollY / scrollable) * 100);
      [25, 50, 75, 90].forEach((mark) => { if (depth >= mark && !sent.has(mark)) { sent.add(mark); track("editorial_scroll_depth", { variant: VARIANT, percent: mark }); } });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <main className="nrnb2026-2-page min-h-screen overflow-x-clip bg-background pb-20 lg:pb-0"><TopTicker /><Hero /><ProofStrip /><Objections /><Deliveries /><PracticalDifference /><ContentsAndDays /><Teachers /><SocialProof /><Tickets /><AudienceAndFaq /><FinalDecision /><Footer /><StickyCTA /><WhatsAppFloating /></main>;
}
