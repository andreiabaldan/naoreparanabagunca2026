import { createFileRoute } from "@tanstack/react-router";
import { NewNrnbLanding } from "./nrnb2026-nova";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Não Repara na Bagunça 2026 — Organização para a vida real" },
      {
        name: "description",
        content:
          "Dois dias para aprender práticas de organização que tornam sua casa mais funcional e sua rotina mais leve. 24 e 25 de outubro, em São José dos Campos.",
      },
      {
        property: "og:title",
        content: "Não Repara na Bagunça 2026 — Organização para a vida real",
      },
      {
        property: "og:description",
        content:
          "Viva dois dias de conteúdo, experiências e conexões para organizar casa, rotina e vida de um jeito possível de manter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://naoreparanabagunca.com.br/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return <NewNrnbLanding page="/" />;
}