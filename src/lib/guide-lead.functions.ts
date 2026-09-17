import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1HpTNmhCSdolKWMNgfhFSmrAgD2lfsCTseEfdjZA_7ms";
const SHEET_RANGE = "Leads!A:K";

const guideLeadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  whatsapp: z.string().trim().min(10).max(24),
  pageUrl: z.string().url().max(2048),
  utm_source: z.string().max(300).default(""),
  utm_medium: z.string().max(300).default(""),
  utm_campaign: z.string().max(300).default(""),
  utm_content: z.string().max(300).default(""),
  utm_term: z.string().max(300).default(""),
});

export const submitGuideLead = createServerFn({ method: "POST" })
  .inputValidator((data) => guideLeadSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableApiKey = process.env["LOVABLE_API_KEY"];
    const sheetsApiKey = process.env["GOOGLE_SHEETS_API_KEY"];

    if (!lovableApiKey || !sheetsApiKey) {
      throw new Error("A conexão com a planilha não está disponível.");
    }

    const response = await fetch(
      `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableApiKey}`,
          "X-Connection-Api-Key": sheetsApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          majorDimension: "ROWS",
          values: [[
            new Date().toISOString(),
            data.name,
            data.whatsapp,
            "Landing Page NRNB 2026",
            "Guia Rotina Noturna",
            data.pageUrl,
            data.utm_source,
            data.utm_medium,
            data.utm_campaign,
            data.utm_content,
            data.utm_term,
          ]],
        }),
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Google Sheets request failed [${response.status}]: ${errorBody}`);
      throw new Error("Não foi possível registrar o contato agora.");
    }

    return { success: true };
  });