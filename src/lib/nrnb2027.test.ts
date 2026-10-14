import { describe, expect, test } from "vitest";
import { NRNB_2027 } from "./nrnb2027";

describe("NRNB 2027 commercial rules", () => {
  test("uses the confirmed event date", () => {
    expect(NRNB_2027.dateUpper).toBe("17 E 18 DE ABRIL DE 2027");
  });

  test.each([
    ["compromisso", "97,00"],
    ["vip", "147,00"],
    ["platinum", "347,00"],
  ] as const)("sets %s price", (ticket, price) => {
    expect(NRNB_2027.tickets[ticket].price).toBe(price);
  });

  test.each(["compromisso", "vip", "platinum"] as const)(
    "keeps %s checkout unavailable until confirmation",
    (ticket) => {
      expect(NRNB_2027.tickets[ticket].checkout).toBeNull();
    },
  );
});