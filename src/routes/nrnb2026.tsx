import { createFileRoute } from "@tanstack/react-router";

import heroBg from "@/assets/hero-bg.jpg";
import { LandingPage } from "./index";

export const Route = createFileRoute("/nrnb2026")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "NRNB 2026 — O encontro que muda tudo" },
      {
        name: "description",
        content:
          "2 dias para deixar sua casa, sua rotina e sua vida mais leves e organizadas. 24 e 25 de outubro de 2026, São José dos Campos/SP.",
      },
      { property: "og:title", content: "NRNB 2026 — O encontro que muda tudo" },
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