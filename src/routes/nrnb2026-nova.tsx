import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown, ArrowRight, Calendar, Check, ChevronRight, Clock, Heart, Home,
  Lightbulb, Lock, MapPin, Menu, MessageCircle, Play, Quote, Sparkles, Star, Users, X,
  type LucideIcon,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CarouselRow } from "@/components/carousel-row";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { track } from "@/lib/tracking";
import logoNrnb from "@/assets/logo-nrnb-alpha.png.asset.json";
import heroImage from "@/assets/hero-oficial-2608.jpeg.asset.json";
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
import nova3 from "@/assets/nova_3.jpg.asset.json";
import nova4 from "@/assets/nova_4.jpg.asset.json";
import nova5 from "@/assets/nova_5.jpg.asset.json";
import palco1 from "@/assets/dan_0359.jpg.asset.json";
import palco2 from "@/assets/dan_0144.jpg.asset.json";
import event2 from "@/assets/event-2.jpg";
import event4 from "@/assets/event-4.jpg";
import testimonialVideo from "@/assets/depoimento-1.mp4.asset.json";
import testimonialPoster from "@/assets/depoimento-1-poster.jpg.asset.json";

const VARIANT = "nrnb2026-nova";
const WHATSAPP_URL = `https://wa.me/5512991402832?text=${encodeURIComponent("Olá, Suelen. Vim da nova página do NRNB 2026 e quero tirar uma dúvida sobre o evento.")}`;

type Ticket = {
  id: "compromisso" | "vip" | "platinum";
  name: string;
  price: string;
  installment: string;
  benefits: string[];
  includesFrom?: string;
  badge?: string;
  cta: string;
  checkout: string;
  event: "ticket_compromisso_click" | "ticket_vip_click" | "ticket_platinum_click";
};

const TICKETS: Ticket[] = [
  { id: "compromisso", name: "Compromisso", price: "147,00", installment: "15,11", cta: "QUERO MEU INGRESSO", event: "ticket_compromisso_click", checkout: "https://payfast.greenn.com.br/168687?batch=17042_y49MyT", benefits: ["Você sai sabendo o que começar a aplicar na sua casa e na sua rotina.", "Acesso aos 2 dias de evento", "Acesso à feira Não Repara na Bagunça"] },
  { id: "vip", name: "VIP", price: "197,00", installment: "20,25", cta: "QUERO SER VIP", event: "ticket_vip_click", checkout: "https://payfast.greenn.com.br/168687?batch=17042_mqGZ6S", badge: "Experiência recomendada", includesFrom: "TUDO DO INGRESSO COMPROMISSO +", benefits: ["Assentos em áreas mais à frente da plateia", "Acesso à área VIP exclusiva", "Café e petit four"] },
  { id: "platinum", name: "Platinum", price: "447,00", installment: "45,96", cta: "QUERO SER PLATINUM", event: "ticket_platinum_click", checkout: "https://payfast.greenn.com.br/168687?batch=17042_TMB3di", badge: "Experiência completa", includesFrom: "TUDO DO INGRESSO VIP +", benefits: ["Sacola com brindes exclusivos", "Assentos nas primeiras fileiras", "Curso online completo de organização da casa toda, por 1 ano", "Um encontro ao vivo com a Suelen para tirar dúvidas no momento da prática"] },
];

const SPEAKERS = [
  { name: "Andréia Baldan", specialty: "Especialista em acelerar negócios", topic: "Crescimento Inteligente", photo: spAndreia.url, bio: "Entenda como a desorganização impacta pessoas, equipes e empresas, e por onde começar a mudar essa realidade." },
  { name: "Douglas Lopes", specialty: "Especialista em propósito", topic: "A Trilha do Propósito", photo: spDouglas.url, bio: "Descubra como encontrar direção para viver uma vida com mais propósito e realização." },
  { name: "Fernanda Ardito", specialty: "Especialista em mesa posta", topic: "Descomplicando a Mesa Posta", photo: spFernanda.url, bio: "Aprenda a fazer uma mesa posta simples, descomplicada, encantadora e feita com carinho." },
  { name: "Michelle Sampaio", specialty: "Especialista em comunicação", topic: "O Poder da Comunicação", photo: spMichelle.url, bio: "Uma comunicação clara e intencional pode transformar a maneira como você é percebida." },
  { name: "Natália Rico", specialty: "Especialista em conexões", topic: "A Força do Ecossistema", photo: spNatalia.url, bio: "O poder do ecossistema pode transformar vidas e fortalecer mulheres." },
  { name: "Paula Chiaradia", specialty: "Especialista em imagem", topic: "Imagem que Comunica", photo: spPaula.url, bio: "Antes de você falar, a sua imagem já contou uma história." },
  { name: "Stella Vilella", specialty: "Médica e especialista em saúde", topic: "Nosso Corpo é Nossa Primeira Casa", photo: spStella.url, bio: "Cuidar do seu corpo é o primeiro passo para viver com mais leveza e qualidade de vida." },
  { name: "Thaís Paraíso", specialty: "Especialista em autocuidado", topic: "Imagem que Comunica", photo: spThais.url, bio: "O autocuidado pode resgatar sua confiança e valorizar a mulher que existe em você." },
];

const BENEFITS: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Home, title: "Uma casa mais funcional", text: "Aprenda soluções que tornam os espaços mais fáceis de usar e manter." },
  { icon: Sparkles, title: "Uma rotina mais leve", text: "Descubra formas práticas de diminuir o esforço necessário para manter a organização." },
  { icon: Heart, title: "Mais tempo para você", text: "Quando casa e rotina funcionam melhor, sobra espaço para outras prioridades." },
  { icon: Users, title: "Organização que envolve a família", text: "Conheça estratégias que ajudam a organização a não depender exclusivamente de você." },
  { icon: Lightbulb, title: "Mais clareza", text: "Organizar também é definir prioridades e entender o que precisa ocupar seu espaço e tempo." },
  { icon: Check, title: "Inspiração para colocar em prática", text: "Saia do evento com ideias que podem começar a ser aplicadas imediatamente." },
];

const TOPICS = ["Organização residencial", "Guarda-roupa", "Limpeza", "Mesa posta", "Cama posta", "Finanças", "Saúde e bem-estar", "Organização da mente", "Arquitetura e funcionalidade", "Imagem e estilo", "Perfumação", "Rotina prática", "Propósito"];
const EXPERIENCE_TAGS = ["Conteúdo", "Experiências", "Conexões", "Feira", "Marcas", "Inspiração"];
const FAIR_ITEMS = ["Feira de marcas e produtos", "Experiências e ativações", "Novidades para casa e organização", "Conexões com outras participantes", "Espaços instagramáveis"];
const GALLERY = [
  { src: nrnb1.url, alt: "Suelen Gubeisse no palco do NRNB" }, { src: nova5.url, alt: "Plateia vibrando no evento" },
  { src: nova4.url, alt: "Demonstração de organização no palco" }, { src: nova2.url, alt: "Participantes acompanhando o conteúdo" },
  { src: nova1.url, alt: "Participantes no espaço das marcas" }, { src: nova3.url, alt: "Apresentação ao vivo no NRNB" },
];
const TESTIMONIALS = [
  { text: "Nunca pensei que organizar a casa pudesse ser tão libertador. Minha rotina mudou completamente e hoje tenho paz!", author: "Mariana Silva" },
  { text: "Finalmente encontrei um método que funciona para a minha realidade, sem cobranças de perfeição. Foi um divisor de águas.", author: "Juliana Costa" },
  { text: "Foram dois dias leves, cheios de aprendizado e de coisas que realmente dá vontade de colocar em prática.", author: "Vanessa Fernandes" },
];
const FAQS = [
  { q: "Para quem é o Não Repara na Bagunça?", a: "Para mulheres que querem aprender formas mais práticas de organizar casa, rotina e vida, com soluções possíveis de manter." },
  { q: "Preciso ser Personal Organizer para participar?", a: "Não. O evento é especialmente pensado para mulheres interessadas em organização, casa, rotina e qualidade de vida." },
  { q: "Meu ingresso vale para os dois dias?", a: "Sim. Todos os ingressos dão acesso aos dias 24 e 25 de outubro de 2026." },
  { q: "Onde acontece o evento?", a: "No PIT — Parque Tecnológico de São José dos Campos/SP, na Estr. Dr. Altino Bondesan, 500 — Eugênio de Melo." },
  { q: "Quais são os horários?", a: "Nos dias 24 e 25 de outubro de 2026, das 09h às 18h30." },
  { q: "O que está incluído em cada tipo de ingresso?", a: "Os benefícios de Compromisso, VIP e Platinum estão detalhados nos cards de ingresso desta página." },
  { q: "Existe garantia?", a: "A compra conta com garantia de 7 dias." },
  { q: "Como recebo meu ingresso?", a: "O ingresso é digital e será enviado no momento da compra pela plataforma Greenn e por e-mail." },
  { q: "Posso transferir ou comprar mais de um ingresso?", a: "Para confirmar essas condições, fale com nossa equipe pelo WhatsApp." },
];

export const Route = createFileRoute("/nrnb2026-nova")({
  head: () => ({ meta: [
    { title: "Não Repara na Bagunça 2026 — Organização para a vida real" },
    { name: "description", content: "Dois dias para aprender práticas de organização que tornam sua casa mais funcional e sua rotina mais leve. 24 e 25 de outubro, em São José dos Campos." },
    { property: "og:title", content: "Não Repara na Bagunça 2026 — Organização para a vida real" },
    { property: "og:description", content: "Viva dois dias de conteúdo, experiências e conexões para organizar casa, rotina e vida de um jeito possível de manter." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: NewNrnbLanding,
});

function goTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }
function CTA({ children, event = "benefits_cta_click", className = "" }: { children: React.ReactNode; event?: "hero_cta_click" | "benefits_cta_click" | "final_cta_click" | "sticky_cta_click"; className?: string }) {
  return <Button type="button" size="lg" onClick={() => { track(event, { variant: VARIANT }); goTo("ingressos"); }} className={`nrnb-nova-cta h-auto min-h-12 rounded-md px-7 py-4 text-center text-sm font-bold uppercase shadow-card ${className}`}>{children}<ArrowRight /></Button>;
}
function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) { return <section id={id} className={`scroll-mt-20 px-5 py-14 sm:px-6 sm:py-20 ${className}`}><div className="mx-auto max-w-6xl">{children}</div></section>; }
function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">{children}</p>; }
function LogoDivider() { return <div className="bg-event-magenta px-5 py-10 sm:px-6 sm:py-14"><img src={logoNrnb.url} alt="Não Repara na Bagunça" loading="lazy" className="mx-auto w-80 max-w-full sm:w-[26rem]" /></div>; }

function TwoForOneCallout({
  context,
  compact = false,
}: {
  context?: string;
  compact?: boolean;
}) {
  return <div className={`mx-auto border border-primary/25 bg-magenta-soft p-5 text-center ${compact ? "max-w-xl" : "max-w-3xl"}`}>
    {context && <p className="mb-3 text-base font-semibold">{context}</p>}
    <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Oferta especial 2 por 1</p>
    <p className="mt-2 text-xl font-extrabold uppercase leading-tight text-primary sm:text-2xl">Compre 1 ingresso e ganhe +1</p>
    <p className="mt-1 font-bold uppercase">Para levar uma amiga</p>
    <p className="mt-3 text-sm text-muted-foreground">Oferta válida para os ingressos Compromisso e VIP.</p>
  </div>;
}

function Ticker() {
  const text = "24 E 25 DE OUTUBRO • SÃO JOSÉ DOS CAMPOS • 4ª EDIÇÃO • NÃO REPARA NA BAGUNÇA 2026 •";
  return <div className="nrnb-top-ticker bg-foreground text-background" role="region" aria-label={text}><span className="sr-only">{text}</span><div className="nrnb-top-ticker-track" aria-hidden="true">{[0,1].map(group => <div className="nrnb-top-ticker-group" key={group}>{[0,1,2].map(item => <span className="nrnb-top-ticker-item" key={item}><strong>{text}</strong></span>)}</div>)}</div><span className="nrnb-top-ticker-static">{text}</span></div>;
}

function Hero({ campaign }: { campaign: boolean }) {
  return <section className="hero-scene relative min-h-[calc(100svh-38px)] overflow-hidden"><div className="absolute inset-0"><img src={heroImage.url} alt="Suelen Gubeisse e especialistas do Não Repara na Bagunça 2026" fetchPriority="high" className="absolute left-1/2 top-12 h-auto w-[125%] max-w-none -translate-x-1/2 object-contain opacity-80 lg:static lg:h-full lg:w-full lg:max-w-full lg:translate-x-0 lg:object-cover lg:object-[68%_center]" /><div className="absolute inset-0 bg-gradient-to-r from-cta-dark/95 via-cta-dark/80 to-cta-dark/10" /><div className="absolute inset-0 bg-gradient-to-t from-cta-dark/95 via-cta-dark/55 to-cta-dark/10 lg:hidden" /></div><div className="relative mx-auto flex min-h-[calc(100svh-38px)] max-w-7xl items-end px-5 pb-8 pt-20 sm:px-6 lg:items-center lg:py-16"><div className="max-w-2xl"><img src={logoNrnb.url} alt="Não Repara na Bagunça" width={546} height={187} className="w-full max-w-[380px] sm:max-w-[520px]" /><p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-sky-highlight">24 e 25 de outubro • São José dos Campos</p><h1 className="mt-4 text-balance text-3xl italic leading-[1.05] text-foreground sm:text-5xl">Se a bagunça sempre volta, o problema não é você. É o jeito que você está tentando organizar.</h1><p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">Em 2 dias você aprende um jeito de organizar que funciona mesmo com a correria de trabalho, casa e filhos. Sem precisar viver arrumando tudo de novo.</p><div className="mt-5 grid gap-2 text-sm font-semibold sm:grid-cols-3"><span className="border-l-2 border-sky pl-3">{"\n"}</span><span className="border-l-2 border-sky pl-3">Casa • Rotina • Bem-estar</span><span className="border-l-2 border-sky pl-3">2 dias de experiência</span></div>{campaign && <div className="nrnb-nova-offer mt-5 w-fit max-w-full border border-border border-l-4 border-l-sky px-5 py-4"><p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-highlight">Oferta especial da 4ª edição</p><p className="mt-1 text-lg font-extrabold uppercase leading-tight text-foreground">Compre 1 ingresso e ganhe +1</p><p className="mt-1 text-sm font-bold uppercase text-foreground">Para levar uma amiga</p></div>}<div className="mt-7"><CTA event="hero_cta_click">QUERO VIVER ESSA EXPERIÊNCIA</CTA><p className="mt-3 text-sm text-muted-foreground">Escolha seu ingresso para os dois dias do evento.</p></div><button type="button" onClick={() => goTo("experiencia")} aria-label="Continuar conhecendo o evento" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowDown className="h-4 w-4" /> Continue</button></div></div></section>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const links = [["Experiência","experiencia"],["Palestrantes","palestrantes"],["Programação","programacao"],["Ingressos","ingressos"],["FAQ","faq"]];
  return <nav aria-label="Navegação da página" className="sticky top-0 z-40 border-b border-border bg-surface/95 px-4 py-3 shadow-card backdrop-blur"><div className="mx-auto grid max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3"><span className="text-sm font-extrabold text-foreground sm:text-base">NRNB 2026</span><div className="hidden justify-center gap-6 lg:flex">{links.map(([label,id]) => <button key={id} type="button" onClick={() => goTo(id)} className="text-sm font-semibold text-muted-foreground hover:text-primary">{label}</button>)}</div><div className="flex justify-end gap-2"><Button type="button" size="sm" onClick={() => goTo("ingressos")} className="bg-primary text-primary-foreground"><span className="sm:hidden">COMPRAR INGRESSO</span><span className="hidden sm:inline">COMPRAR INGRESSO</span></Button><Button type="button" size="icon" variant="outline" className="lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(v => !v)}>{open ? <X /> : <Menu />}</Button></div></div>{open && <div className="mx-auto mt-3 grid max-w-6xl border-t border-border pt-3 lg:hidden">{links.map(([label,id]) => <button key={id} type="button" onClick={() => { setOpen(false); goTo(id); }} className="border-b border-border py-3 text-left text-sm font-semibold">{label}</button>)}</div>}</nav>;
}

function Identification({ campaign }: { campaign: boolean }) {
  const thoughts = ["Eu organizo, mas a bagunça sempre volta.", "Queria que minha casa fosse mais fácil de manter.", "Quero uma rotina que funcione de verdade.", "Queria ter mais tempo para mim."];
  return <Section id="experiencia"><div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><Eyebrow>Antes de qualquer coisa</Eyebrow><h2 className="mt-4 text-balance text-3xl leading-tight sm:text-5xl">Se você gosta de organização, mas sente que nunca consegue manter tudo organizado, o NRNB foi feito para você.</h2><div className="mt-6 space-y-3 text-base leading-relaxed text-muted-foreground"><p>Talvez você organize um cômodo inteiro e, alguns dias depois, pareça que precisa começar tudo novamente.</p><p>Você tenta criar uma rotina, mas os imprevistos aparecem. E mesmo quando você se organiza, outras pessoas da casa nem sempre acompanham.</p><p>Isso não significa que você precise organizar mais. Talvez você precise aprender a organizar de um jeito que funcione melhor para a sua vida.</p></div></div><div className="grid gap-3 sm:grid-cols-2">{thoughts.map((text,index) => <article key={text} className="border-t-2 border-primary bg-card p-5 shadow-card"><span className="font-display text-3xl text-primary/40">0{index+1}</span><p className="mt-3 text-lg font-semibold leading-snug">“{text}”</p></article>)}</div></div><p className="mt-9 text-center text-xl font-semibold">É exatamente sobre isso que vamos conversar durante dois dias.</p>{campaign && <div className="mt-7 text-center"><CTA>QUERO VIVER ESSA EXPERIÊNCIA</CTA></div>}</Section>;
}

function Presentation({ campaign }: { campaign: boolean }) {
  return <Section className="nrnb-nova-presentation"><div className="mx-auto max-w-4xl text-center"><Eyebrow>Não Repara na Bagunça 2026</Eyebrow><h2 className="mt-4 text-balance text-3xl leading-tight sm:text-5xl">Organização não é sobre ter uma casa perfeita. É sobre ter uma vida que funciona melhor.</h2><p className="mx-auto mt-6 max-w-3xl leading-relaxed text-muted-foreground">O Não Repara na Bagunça chega à sua 4ª edição para mostrar, na prática, como a organização pode transformar não apenas os seus espaços, mas também sua rotina, seu tempo e diferentes áreas da sua vida.</p>{campaign && <div className="mt-8"><TwoForOneCallout context="E essa experiência fica ainda melhor quando é compartilhada." compact /></div>}<div className="mt-8"><CTA>QUERO PARTICIPAR DO NRNB 2026</CTA></div></div></Section>;
}

function Benefits() {
  return <Section><div className="text-center"><Eyebrow>O que você vai levar para a sua vida</Eyebrow><h2 className="mx-auto mt-4 max-w-4xl text-balance text-3xl leading-tight sm:text-5xl">Leve para a sua vida práticas que continuam fazendo sentido depois que o evento termina.</h2></div><div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{BENEFITS.map(({icon:Icon,title,text}) => <article key={title} className="bg-card p-6"><Icon className="h-7 w-7 text-primary"/><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div></Section>;
}

function Topics({ campaign }: { campaign: boolean }) {
  return <Section className="surface-rose"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><Eyebrow>Uma experiência completa</Eyebrow><h2 className="mt-4 text-4xl leading-tight sm:text-6xl">Organizar a casa é só o começo.</h2><p className="mt-5 leading-relaxed text-muted-foreground">Durante o NRNB, a organização será abordada de diferentes perspectivas para mostrar como pequenas mudanças podem transformar a forma como você vive sua rotina.</p></div><div className="flex flex-wrap content-center gap-2">{TOPICS.map(topic => <span key={topic} className="border border-border bg-card px-4 py-2 text-sm font-semibold">{topic}</span>)}</div></div><p className="mx-auto mt-9 max-w-3xl text-center text-lg font-semibold">Porque quando a vida está mais organizada, você consegue direcionar melhor seu tempo e sua energia para aquilo que realmente importa.</p>{campaign && <div className="nrnb-nova-topic-offer mx-auto mt-8 max-w-3xl border p-5 text-center"><p className="text-lg font-semibold">E você não precisa viver tudo isso sozinha.</p><p className="mt-2 text-xl font-extrabold uppercase text-event-magenta">Leve uma amiga com você:<br/>compre 1 e ganhe +1</p><p className="mt-2 text-sm text-muted-foreground">Oferta especial nos ingressos Compromisso e VIP.</p><div className="mt-5"><CTA>VER INGRESSOS</CTA></div></div>}</Section>;
}

function EventExperience() {
  return <Section><div className="text-center"><Eyebrow>Experiência NRNB</Eyebrow><h2 className="mt-4 text-3xl sm:text-5xl">Você não vai apenas assistir. Vai viver o NRNB.</h2></div><div className="mt-8 grid auto-rows-[150px] grid-cols-2 gap-2 sm:auto-rows-[220px] sm:grid-cols-4">{GALLERY.map((img,index) => <div key={img.src} className={`overflow-hidden ${index===0 ? "col-span-2 row-span-2" : ""} ${index===3 ? "sm:row-span-2" : ""}`}><img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" /></div>)}</div><div className="mt-6 flex flex-wrap justify-center gap-2">{EXPERIENCE_TAGS.map(tag => <span key={tag} className="rounded-full bg-sky-tint px-4 py-2 text-sm font-bold text-primary">{tag}</span>)}</div><p className="mx-auto mt-7 max-w-3xl text-center text-lg leading-relaxed">Do momento em que você chega até o encerramento do segundo dia, queremos que cada detalhe faça parte da experiência.</p></Section>;
}

function SpeakerCard({ speaker }: { speaker: (typeof SPEAKERS)[number] }) {
  const [open,setOpen]=useState(false);
  return <article className="nrnb-nova-speaker-card flex h-full flex-col border border-border bg-card p-4 shadow-card"><div className="aspect-[4/3] overflow-hidden bg-sky-tint"><img src={speaker.photo} alt={`Foto de ${speaker.name}`} loading="lazy" className="h-full w-full object-contain object-bottom" /></div><h3 className="mt-4 text-xl font-bold">{speaker.name}</h3><p className="mt-3 text-lg font-bold leading-snug text-primary">{speaker.topic}</p>{open && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{speaker.bio}</p>}<Button type="button" variant="ghost" size="sm" onClick={() => setOpen(v=>!v)} aria-expanded={open} className="mt-auto self-start px-0 pt-4 font-bold text-primary hover:text-primary">{open ? "Ver menos ↑" : "Saiba mais →"}</Button></article>;
}

function Speakers() {
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{const e=ref.current;if(!e)return;const o=new IntersectionObserver(([x])=>{if(x?.isIntersecting){track("view_speakers",{variant:VARIANT});o.disconnect();}},{threshold:.2});o.observe(e);return()=>o.disconnect();},[]);
  return <section ref={ref} id="palestrantes" className="scroll-mt-20 bg-sky-tint px-5 py-14 sm:px-6 sm:py-20"><div className="mx-auto max-w-6xl"><div className="text-center"><Eyebrow>Quem vai estar no palco</Eyebrow><h2 className="mx-auto mt-4 max-w-4xl text-balance text-3xl sm:text-5xl">Aprenda com mulheres e especialistas que entendem que organização vai muito além da casa.</h2></div><div className="mt-9 grid items-center gap-7 border-y border-border py-7 md:grid-cols-[38%_1fr]"><img src={suelenPhoto.url} alt="Suelen Gubeisse, idealizadora e anfitriã" loading="lazy" className="aspect-[4/3] w-full object-cover md:aspect-[4/5]"/><div><span className="inline-flex rounded-full bg-primary px-3 py-1 text-sm font-bold uppercase text-primary-foreground">Idealizadora e anfitriã</span><h3 className="mt-4 text-4xl sm:text-5xl">Suelen Gubeisse</h3><p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">Criadora do Não Repara na Bagunça, Suelen leva a organização para a vida real de quem trabalha, cuida da casa, da família e precisa de soluções possíveis de manter.</p></div></div><div className="mt-9"><CarouselRow ariaLabel="Palestrantes confirmados" hint="Deslize para conhecer →" itemClassName="w-[82%] sm:w-[46%] lg:w-[31%]" items={SPEAKERS.map(s=><SpeakerCard key={s.name} speaker={s}/>)}/></div></div></section>;
}

function Schedule() {
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{const e=ref.current;if(!e)return;const o=new IntersectionObserver(([x])=>{if(x?.isIntersecting){track("view_schedule",{variant:VARIANT});o.disconnect();}},{threshold:.25});o.observe(e);return()=>o.disconnect();},[]);
  const day=(date:string)=> <div className="border border-border bg-card p-6"><p className="text-sm font-bold uppercase text-primary">Das 09h às 18h30</p><h3 className="mt-3 text-2xl">{date}</h3><p className="mt-4 leading-relaxed text-muted-foreground">A programação detalhada de palestras e experiências será divulgada em breve.</p></div>;
  return <section ref={ref} id="programacao" className="scroll-mt-20 surface-cream px-5 py-14 sm:px-6 sm:py-20"><div className="mx-auto max-w-4xl text-center"><Eyebrow>Programação</Eyebrow><h2 className="mt-4 text-3xl sm:text-5xl">Dois dias para olhar para diferentes áreas da sua vida.</h2><Tabs defaultValue="dia1" className="mt-8"><TabsList className="grid h-auto w-full grid-cols-2"><TabsTrigger value="dia1" className="py-3">DIA 24 - SÁB</TabsTrigger><TabsTrigger value="dia2" className="py-3">DIA 25 - DOM</TabsTrigger></TabsList><TabsContent value="dia1" className="mt-4 text-left">{day("Sábado, 24 de outubro")}</TabsContent><TabsContent value="dia2" className="mt-4 text-left">{day("Domingo, 25 de outubro")}</TabsContent></Tabs><div className="mt-8"><CTA>VER INGRESSOS</CTA></div></div></section>;
}

function SocialProof() {
  const [playing,setPlaying]=useState(false);
  return <Section className="surface-dark"><div className="text-center"><Eyebrow>Prova social</Eyebrow><h2 className="mx-auto mt-4 max-w-3xl text-3xl sm:text-5xl">Quem vive o NRNB entende por que essa experiência é diferente.</h2></div><div className="mt-9 grid gap-7 lg:grid-cols-[.7fr_1.3fr]"><div className="mx-auto w-full max-w-xs"><div className="relative aspect-[9/16] overflow-hidden bg-card">{playing?<video src={testimonialVideo.url} poster={testimonialPoster.url} controls autoPlay playsInline className="h-full w-full object-cover"/>:<Button type="button" variant="ghost" aria-label="Assistir depoimento" onClick={()=>{setPlaying(true);track("testimonial_video_play",{variant:VARIANT});}} className="absolute inset-0 h-full w-full rounded-none p-0"><img src={testimonialPoster.url} alt="Depoimento de participante do NRNB" loading="lazy" className="h-full w-full object-cover"/><span className="absolute inset-0 grid place-items-center bg-foreground/20"><span className="grid h-16 w-16 place-items-center rounded-full bg-primary"><Play className="text-primary-foreground" fill="currentColor"/></span></span></Button>}</div></div><div className="grid content-center gap-4">{TESTIMONIALS.map(t=><figure key={t.author} className="border-l-2 border-primary bg-card p-5"><Quote className="h-5 w-5 text-primary"/><blockquote className="mt-3 leading-relaxed">“{t.text}”</blockquote><figcaption className="mt-3 text-sm font-bold text-muted-foreground"><Star className="mr-1 inline h-4 w-4 text-primary"/>{t.author}</figcaption></figure>)}</div></div></Section>;
}

function Fair() {
  return <Section><div className="grid items-center gap-9 lg:grid-cols-2"><div><Eyebrow>Tem muito mais acontecendo</Eyebrow><h2 className="mt-4 text-3xl sm:text-5xl">Entre uma palestra e outra, continue vivendo o NRNB.</h2><p className="mt-5 leading-relaxed text-muted-foreground">Além do conteúdo no palco, o evento terá uma área de experiências com marcas, produtos, novidades e soluções para tornar casa e rotina mais práticas.</p><div className="mt-6 grid gap-2">{FAIR_ITEMS.map(item=><div key={item} className="flex items-center gap-3 border-b border-border py-3"><Check className="h-5 w-5 shrink-0 text-primary"/><span className="font-semibold">{item}</span></div>)}</div></div><div className="grid grid-cols-2 gap-2"><img src={nova1.url} alt="Espaço de marcas do NRNB" loading="lazy" className="col-span-2 aspect-[2/1] w-full object-cover"/><img src={palco1.url} alt="Experiência no palco do NRNB" loading="lazy" className="aspect-square w-full object-cover"/><img src={palco2.url} alt="Conteúdo e plateia do NRNB" loading="lazy" className="aspect-square w-full object-cover"/></div></div></Section>;
}

function Tickets({ campaign }: { campaign: boolean }) {
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{const e=ref.current;if(!e)return;const o=new IntersectionObserver(([x])=>{if(x?.isIntersecting){track("view_tickets",{variant:VARIANT});track("ticket_section_view",{variant:VARIANT});o.disconnect();}},{threshold:.15});o.observe(e);return()=>o.disconnect();},[]);
  return <section ref={ref} id="ingressos" className="scroll-mt-20 surface-ink px-5 py-14 sm:px-6 sm:py-20"><div className="mx-auto max-w-6xl"><div className="text-center"><Eyebrow>Escolha como você quer viver o NRNB</Eyebrow><h2 className="mt-4 text-3xl text-sky-highlight sm:text-5xl">Seu lugar nos dias 24 e 25 de outubro.</h2>{campaign && <div className="mx-auto mt-7 max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.14em] text-sky-highlight">Oferta especial 2 por 1</p><p className="mt-2 text-2xl font-extrabold uppercase text-foreground sm:text-3xl">Compre 1 ingresso e ganhe +1<br/>para levar uma amiga</p><p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Escolha entre os ingressos Compromisso ou VIP e viva os dois dias do NRNB ao lado de quem você gostaria de trazer para essa experiência.</p><p className="mt-2 text-sm text-muted-foreground">{"\n"}</p></div>}</div><div className="mt-9 grid items-start gap-5 lg:grid-cols-3">{TICKETS.map(t=>{const participates=campaign&&t.id!=="platinum";const checkout=participates?"https://payfast.greenn.com.br/pre-checkout/xa37xct":t.checkout;return <article key={t.id} className={`card-light flex flex-col border bg-card p-6 text-center ${t.id==="vip"?"border-primary shadow-glow lg:-mt-3":"border-border shadow-card"}`}>{participates&&<span className="mx-auto mb-3 rounded-full bg-primary px-4 py-1 text-sm font-extrabold uppercase text-primary-foreground">2 por 1</span>}{t.badge&&<span className="mx-auto mb-4 rounded-full bg-primary px-3 py-1 text-sm font-bold uppercase text-primary-foreground">{t.badge}</span>}<h3 className="text-3xl font-semibold">{t.name}</h3><span className="mx-auto mt-4 rounded-full bg-magenta-soft px-4 py-1 text-sm font-bold uppercase text-primary">2º lote</span>{participates&&<div className="mt-4 border-y border-primary/20 py-3"><p className="font-extrabold uppercase text-primary">1 ingresso = 2 pessoas</p><p className="mt-1 text-sm text-muted-foreground">Compre seu ingresso {t.name} e ganhe +1 ingresso para levar uma amiga.</p></div>}<p className="mt-5 text-sm font-semibold text-muted-foreground">12x de</p><p className="mt-1 font-display text-5xl font-semibold leading-none text-primary">R$ {t.installment}</p><p className="mt-2 text-sm text-muted-foreground">ou R$ {t.price} à vista</p><div className="my-5 h-px bg-border"/>{t.includesFrom&&<p className="bg-magenta-soft px-3 py-2 text-sm font-bold uppercase text-primary">{t.includesFrom}</p>}<ul className="mt-4 flex-1 space-y-3 text-left">{t.benefits.map(b=><li key={b} className="flex items-start gap-2 text-sm"><Check className="mt-1 h-4 w-4 shrink-0 text-primary"/><span>{b}</span></li>)}</ul><Button asChild size="lg" className="mt-6 h-auto min-h-12 w-full bg-primary px-5 py-3.5 font-bold uppercase text-primary-foreground"><a suppressHydrationWarning href={checkout} target="_blank" rel="noopener noreferrer" onClick={()=>{track(t.event,{ticket:t.id,variant:VARIANT});track("checkout_click",{ticket:t.id,variant:VARIANT});track("checkout_start",{ticket:t.id,variant:VARIANT});}}>{t.cta}<ArrowRight/></a></Button><p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground"><Lock className="h-4 w-4 text-primary"/>Compra protegida</p></article>})}</div><div className="mt-7 text-center text-sky-highlight"><p className="font-semibold">Ingresso válido para os dois dias do evento.</p><p className="mt-1 text-sm">Compra protegida • Garantia de 7 dias</p><Button asChild variant="outline" className="mt-5 border-sky text-sky-highlight hover:bg-sky-tint"><a suppressHydrationWarning href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={()=>track("whatsapp_tickets_click",{variant:VARIANT})}><MessageCircle/>Falar no WhatsApp</a></Button></div></div></section>;
}

function AboutSuelen() {
  return <Section><div className="grid items-center gap-8 lg:grid-cols-2"><img src={suelenPhoto.url} alt="Suelen Gubeisse" loading="lazy" className="aspect-[4/5] w-full object-cover object-center"/><div><Eyebrow>Quem criou tudo isso</Eyebrow><h2 className="mt-4 text-4xl sm:text-6xl">Prazer, eu sou a Suelen.</h2><div className="mt-5 space-y-4 leading-relaxed text-muted-foreground"><p>A organização transformou a forma como eu enxergo a minha casa, a minha rotina e as escolhas que fazemos todos os dias.</p><p>Criei o Não Repara na Bagunça para reunir mulheres e especialistas em torno de uma organização possível, prática e conectada à vida real.</p><p>Na 4ª edição, meu propósito é ampliar essa conversa e fazer com que cada participante volte para casa com novas ferramentas e vontade de colocá-las em prática.</p></div></div></div></Section>;
}

function Closing() {
  return <><Section className="bg-sky-tint"><div className="mx-auto max-w-4xl text-center"><Eyebrow>Imagine sair daqui…</Eyebrow><h2 className="mt-4 text-balance text-3xl sm:text-5xl">Imagine terminar outubro sentindo que finalmente encontrou uma forma mais leve de organizar sua vida.</h2><p className="mt-6 text-lg">Não porque tudo estará perfeito.</p><p className="mx-auto mt-3 max-w-3xl leading-relaxed text-muted-foreground">Mas porque você terá novas ferramentas para decidir o que fica, onde fica, como cuidar da sua rotina e como fazer a organização trabalhar a favor da sua vida, e não o contrário.</p><p className="mt-6 text-xl font-bold text-primary">Você não precisa esperar o próximo ano para começar a viver de um jeito diferente.</p><div className="mt-8"><CTA>QUERO ESTAR NO NRNB</CTA></div></div></Section><Section><div className="grid items-center gap-8 lg:grid-cols-2"><div><Eyebrow>Informações práticas</Eyebrow><h2 className="mt-4 text-3xl sm:text-5xl">Tudo o que você precisa para se programar.</h2><ul className="mt-6 space-y-4"><li className="flex gap-3"><Calendar className="text-primary"/>24 e 25 de outubro de 2026</li><li className="flex gap-3"><MapPin className="text-primary"/>PIT — Parque Tecnológico de São José dos Campos — SP</li><li className="flex gap-3"><Clock className="text-primary"/>Das 09h às 18h30</li><li className="flex gap-3"><Users className="text-primary"/>Evento presencial • ingresso válido para os dois dias</li></ul><div className="mt-8"><CTA>GARANTIR MEU INGRESSO</CTA></div></div><img src={event2} alt="Local do evento em São José dos Campos" loading="lazy" className="aspect-[4/3] w-full object-cover"/></div></Section></>;
}

function Faq() {
  return <Section id="faq" className="surface-cream"><div className="mx-auto max-w-3xl text-center"><Eyebrow>Dúvidas</Eyebrow><h2 className="mt-4 text-3xl sm:text-5xl">Perguntas frequentes</h2></div><Accordion type="single" collapsible className="mx-auto mt-8 max-w-3xl" onValueChange={value=>{if(value)track("faq_open",{variant:VARIANT,question:value});}}>{FAQS.map(item=><AccordionItem key={item.q} value={item.q}><AccordionTrigger className="text-left">{item.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{item.a}</AccordionContent></AccordionItem>)}</Accordion></Section>;
}

function FinalCTA() {
  return <section className="surface-dark relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28"><img src={event4} alt="Plateia do Não Repara na Bagunça" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30"/><div className="absolute inset-0 bg-background/75"/><div className="relative mx-auto max-w-4xl text-center"><h2 className="text-balance text-4xl sm:text-6xl">Sua casa não precisa estar perfeita para sua vida ficar mais leve.</h2><p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">Venha descobrir novas formas de organizar sua casa, sua rotina e o seu tempo no Não Repara na Bagunça 2026.</p><p className="mt-5 font-bold text-sky-highlight">24 e 25 de outubro • São José dos Campos</p><div className="mt-8"><CTA event="final_cta_click">QUERO VIVER O NRNB 2026</CTA></div></div></section>;
}

function Footer() { return <footer className="bg-foreground px-5 py-10 text-background"><div className="mx-auto grid max-w-6xl gap-7 text-center sm:grid-cols-[1fr_auto] sm:text-left"><div><img src={logoNrnb.url} alt="Não Repara na Bagunça" className="mx-auto w-80 max-w-full sm:mx-0"/><p className="mt-3 text-sm text-background/70">Não Repara na Bagunça 2026</p></div><div className="flex flex-wrap items-center justify-center gap-5 text-sm"><a suppressHydrationWarning href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Contato</a></div></div><p className="mx-auto mt-7 max-w-6xl border-t border-background/20 pt-5 text-center text-sm text-background/60">© 2026 Não Repara na Bagunça. Todos os direitos reservados.</p></footer>; }
function StickyCTA() { const [show,setShow]=useState(false);useEffect(()=>{const f=()=>setShow(window.scrollY>window.innerHeight*.75);f();window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f);},[]);return <div className={`fixed inset-x-0 bottom-0 z-50 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border bg-surface/95 px-4 py-2 backdrop-blur transition-transform lg:hidden ${show?"translate-y-0":"translate-y-full"}`}><p className="min-w-0 truncate text-sm font-bold">NRNB • 24 E 25 OUT</p><Button type="button" size="sm" onClick={()=>{track("sticky_cta_click",{variant:VARIANT});goTo("ingressos");}} className="bg-primary text-primary-foreground">VER INGRESSOS</Button></div>; }
function WhatsApp() { return <a suppressHydrationWarning href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" onClick={()=>track("whatsapp_floating_click",{variant:VARIANT})} className="fixed bottom-20 right-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-card lg:bottom-6 lg:right-6"><MessageCircle/></a>; }

export function NewNrnbLanding({ page = "/nrnb2026-nova" }: { page?: string }) {
  const campaign = page === "/";
  useEffect(()=>{track("page_view",{variant:VARIANT,page});},[page]);
  return <main className="nrnb2026-nova-page min-h-screen overflow-x-clip bg-background pb-16 lg:pb-0"><Ticker/>{campaign&&<Navigation/>}<Hero campaign={campaign}/>{!campaign&&<Navigation/>}<Identification campaign={campaign}/><Presentation campaign={campaign}/><LogoDivider/><Benefits/><Topics campaign={campaign}/><EventExperience/><LogoDivider/><Speakers/><Schedule/><SocialProof/><Fair/><Tickets campaign={campaign}/><AboutSuelen/><LogoDivider/><Closing/><Faq/><FinalCTA/><Footer/><StickyCTA/><WhatsApp/></main>;
}
