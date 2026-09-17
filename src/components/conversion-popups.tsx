import { useEffect, useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { BookOpen, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitGuideLead } from "@/lib/guide-lead.functions";
import { track } from "@/lib/tracking";

const HELP_SEEN = "nrnb-help-popup-seen";
const EXIT_SEEN = "nrnb-exit-popup-seen";
const CONVERTED = "nrnb-popup-converted";
const GUIDE_URL = "https://www.youtube.com/shorts/1ybCY7NmHUI";
const HELP_MESSAGE =
  "Olá! Estou no site do Não Repara na Bagunça e gostaria de tirar uma dúvida sobre o evento.";

type Popup = "help" | "exit" | null;
type Utms = Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term", string>;

const emptyUtms: Utms = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
};

function readUtms() {
  const params = new URLSearchParams(window.location.search);
  const stored = sessionStorage.getItem("nrnb-session-utms");
  const previous = stored ? (JSON.parse(stored) as Partial<Utms>) : {};
  const utms = { ...emptyUtms };
  (Object.keys(utms) as Array<keyof Utms>).forEach((key) => {
    utms[key] = params.get(key) ?? previous[key] ?? "";
  });
  sessionStorage.setItem("nrnb-session-utms", JSON.stringify(utms));
  return utms;
}

function formatWhatsApp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function ConversionPopups({ whatsappNumber }: { whatsappNumber: string }) {
  const [popup, setPopup] = useState<Popup>(null);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const submitLead = useServerFn(submitGuideLead);
  const popupRef = useRef<Popup>(null);

  useEffect(() => {
    popupRef.current = popup;
  }, [popup]);

  useEffect(() => {
    readUtms();
    let idleTimer: number | undefined;
    const startedAt = Date.now();
    let maxScroll = 0;
    let lastScrollY = window.scrollY;
    let lastScrollAt = Date.now();

    const isConverted = () => sessionStorage.getItem(CONVERTED) === "1";
    const canShow = () => !popupRef.current && !isConverted();
    const armHelp = () => {
      window.clearTimeout(idleTimer);
      if (sessionStorage.getItem(HELP_SEEN) === "1" || isConverted()) return;
      idleTimer = window.setTimeout(() => {
        if (!canShow()) return;
        setPopup("help");
        track("nrnb_help_popup_view");
      }, 20_000);
    };
    const noteActivity = () => armHelp();
    const onScroll = () => {
      const now = Date.now();
      const y = window.scrollY;
      const pageHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      maxScroll = Math.max(maxScroll, y / pageHeight);

      if (
        window.matchMedia("(max-width: 767px)").matches &&
        Date.now() - startedAt > 25_000 &&
        maxScroll > 0.35 &&
        lastScrollY - y > 220 &&
        now - lastScrollAt < 1_500 &&
        y / pageHeight < 0.15 &&
        sessionStorage.getItem(EXIT_SEEN) !== "1" &&
        canShow()
      ) {
        sessionStorage.setItem(EXIT_SEEN, "1");
        setPopup("exit");
        track("nrnb_exit_popup_view");
      }
      lastScrollY = y;
      lastScrollAt = now;
      armHelp();
    };
    const onMouseOut = (event: MouseEvent) => {
      if (
        !window.matchMedia("(min-width: 768px)").matches ||
        event.clientY > 8 ||
        event.relatedTarget ||
        Date.now() - startedAt < 15_000 ||
        sessionStorage.getItem(EXIT_SEEN) === "1" ||
        !canShow()
      ) return;
      sessionStorage.setItem(EXIT_SEEN, "1");
      setPopup("exit");
      track("nrnb_exit_popup_view");
    };
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a") : null;
      const href = target?.getAttribute("href") ?? "";
      if (href.includes("payfast.greenn.com.br") || href.includes("wa.me/")) {
        sessionStorage.setItem(CONVERTED, "1");
        window.clearTimeout(idleTimer);
      } else {
        noteActivity();
      }
    };

    armHelp();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("pointerdown", onDocumentClick);
    document.addEventListener("keydown", noteActivity);
    document.addEventListener("input", noteActivity);
    document.addEventListener("play", noteActivity, true);
    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("pointerdown", onDocumentClick);
      document.removeEventListener("keydown", noteActivity);
      document.removeEventListener("input", noteActivity);
      document.removeEventListener("play", noteActivity, true);
    };
  }, []);

  const closePopup = (reason: "close" | "continue") => {
    if (popup === "help") {
      sessionStorage.setItem(HELP_SEEN, "1");
      track(reason === "close" ? "nrnb_help_popup_close" : "nrnb_help_popup_continue");
    } else if (popup === "exit") {
      sessionStorage.setItem(EXIT_SEEN, "1");
      track(reason === "close" ? "nrnb_exit_popup_close" : "nrnb_exit_popup_continue");
    }
    setPopup(null);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim().length < 2 || whatsapp.replace(/\D/g, "").length < 10) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    track("nrnb_exit_popup_submit");
    try {
      await submitLead({
        data: {
          name,
          whatsapp,
          pageUrl: window.location.href,
          ...readUtms(),
        },
      });
      sessionStorage.setItem(CONVERTED, "1");
      setStatus("success");
      track("nrnb_exit_popup_success");
    } catch {
      setStatus("error");
    }
  };

  const helpUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(HELP_MESSAGE)}`;

  return (
    <>
      <Dialog open={popup === "help"} onOpenChange={(open) => !open && closePopup("close")}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] gap-0 rounded-lg border-border bg-card p-6 text-center shadow-card sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-magenta-soft text-primary">
            <MessageCircle className="h-6 w-6" />
          </div>
          <DialogTitle className="mt-5 text-balance font-display text-2xl font-medium leading-tight text-foreground sm:text-3xl">
            Precisa de ajuda para participar do Não Repara na Bagunça?
          </DialogTitle>
          <DialogDescription className="mt-4 text-base leading-relaxed text-muted-foreground">
            Se ficou com alguma dúvida sobre o evento, ingressos ou qual experiência escolher, fale com a nossa equipe pelo WhatsApp.
          </DialogDescription>
          <Button asChild size="lg" className="mt-6 h-auto min-h-12 w-full whitespace-normal rounded-full px-4 py-3 text-center text-xs font-bold uppercase leading-tight sm:px-5 sm:text-sm">
            <a
              href={helpUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                sessionStorage.setItem(CONVERTED, "1");
                sessionStorage.setItem(HELP_SEEN, "1");
                track("nrnb_help_popup_whatsapp_click");
              }}
            >
              <MessageCircle /> Falar com a equipe no WhatsApp
            </a>
          </Button>
          <Button variant="ghost" className="mt-2 h-auto min-h-10 w-full whitespace-normal text-muted-foreground" onClick={() => closePopup("continue")}>
            Continuar conhecendo o evento
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={popup === "exit"} onOpenChange={(open) => !open && closePopup("close")}>
        <DialogContent className="max-h-[92vh] w-[calc(100%-1.5rem)] max-w-3xl overflow-y-auto rounded-lg border-border bg-card p-0 shadow-card">
          {status === "success" ? (
            <div className="p-6 text-center sm:p-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-magenta-soft text-primary"><Check className="h-7 w-7" /></div>
              <DialogTitle className="mt-5 font-display text-3xl font-medium leading-tight text-foreground">Pronto! Seu guia está liberado.</DialogTitle>
              <DialogDescription className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Assista agora ao Guia Prático da Rotina Noturna e aprenda uma rotina de 15 minutos para ajudar a deixar a casa em ordem antes de dormir.
              </DialogDescription>
              <Button asChild size="lg" className="mt-7 h-auto min-h-12 w-full rounded-full px-6 py-3 font-bold uppercase sm:w-auto">
                <a href={GUIDE_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("nrnb_guide_access_click")}>
                  Assistir ao guia agora
                </a>
              </Button>
              <Button variant="ghost" className="mt-2 w-full text-muted-foreground" onClick={() => closePopup("continue")}>
                Continuar conhecendo o evento
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              <div className="order-2 flex min-h-28 items-center justify-center border-y border-border bg-sky-tint p-4 md:order-1 md:row-span-2 md:min-h-[480px] md:border-y-0 md:border-r md:p-5">
                <div className="flex max-w-48 flex-col items-center text-center text-primary">
                  <BookOpen className="h-8 w-8 md:h-10 md:w-10" />
                  <span className="mt-3 text-xs font-semibold uppercase tracking-[0.18em]">Espaço para a capa do guia</span>
                </div>
              </div>
              <div className="order-1 px-6 pb-5 pt-6 sm:px-8 sm:pt-8 md:order-2 md:pb-0">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Um presente para você</span>
                <DialogTitle className="mt-3 text-balance font-display text-3xl font-medium leading-tight text-foreground">
                  Ainda não vá. Leve uma rotina mais leve com você.
                </DialogTitle>
                <DialogDescription className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Deixe seu contato e receba gratuitamente o Guia Prático da Rotina Noturna: uma rotina de 15 minutos para ajudar a deixar a casa em ordem antes de dormir.
                </DialogDescription>
              </div>
              <div className="order-3 px-6 pb-6 pt-5 sm:px-8 sm:pb-8 md:order-3 md:pt-5">
                <form className="space-y-4" onSubmit={submit} noValidate>
                  <div className="space-y-1.5">
                    <Label htmlFor="guide-name">Nome</Label>
                    <Input id="guide-name" name="name" autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); setStatus("idle"); }} className="h-11 bg-background" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="guide-whatsapp">WhatsApp</Label>
                    <Input id="guide-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" value={whatsapp} onChange={(e) => { setWhatsapp(formatWhatsApp(e.target.value)); setStatus("idle"); }} className="h-11 bg-background" required />
                  </div>
                  {status === "error" && <p role="alert" className="text-sm font-medium text-destructive">Não foi possível enviar. Confira os dados e tente novamente.</p>}
                  <Button type="submit" size="lg" disabled={status === "sending"} className="h-auto min-h-12 w-full whitespace-normal rounded-full px-5 py-3 font-bold uppercase">
                    {status === "sending" ? "Enviando..." : "Quero receber o guia gratuito"}
                  </Button>
                </form>
                <Button variant="ghost" className="mt-2 h-auto min-h-10 w-full whitespace-normal text-muted-foreground" onClick={() => closePopup("continue")}>
                  Prefiro continuar sem o guia
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}