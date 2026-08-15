import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselRowProps = {
  items: ReactNode[];
  /** largura de cada card (mobile mostra 1 + parte do próximo) */
  itemClassName?: string;
  hint?: string;
  showDots?: boolean;
  ariaLabel?: string;
};

export function CarouselRow({
  items,
  itemClassName = "w-[82%] sm:w-[46%] lg:w-[32%]",
  hint,
  showDots = true,
  ariaLabel,
}: CarouselRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 12 : el.clientWidth;
    setActive(Math.round(el.scrollLeft / step));
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
  }, [update, items.length]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 12 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 12 : el.clientWidth;
    el.scrollTo({ left: i * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={update}
        aria-label={ariaLabel}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0"
      >
        {items.map((item, i) => (
          <div key={i} className={`shrink-0 snap-start ${itemClassName}`}>
            {item}
          </div>
        ))}
      </div>

      {/* setas (desktop) */}
      <button
        type="button"
        aria-label="Anterior"
        onClick={() => scrollBy(-1)}
        disabled={atStart}
        className="absolute -left-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-card p-2 shadow-card transition disabled:opacity-30 hover:border-primary/50 hover:text-primary md:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Próximo"
        onClick={() => scrollBy(1)}
        disabled={atEnd}
        className="absolute -right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-card p-2 shadow-card transition disabled:opacity-30 hover:border-primary/50 hover:text-primary md:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {hint && (
        <p className="mt-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground md:hidden">
          {hint}
        </p>
      )}

      {showDots && items.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para o item ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-primary" : "w-1.5 bg-primary/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
