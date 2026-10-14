import { describe, expect, test } from "vitest";
import { NRNB_2027 } from "./nrnb2027";

describe("NRNB 2027 commercial rules", () => {
  test("uses the confirmed event date", () => {
    expect(NRNB_2027.dateUpper).toBe("17 E 18 DE ABRIL DE 2027");
  });

  test.each([
    ["compromisso", "97,00", "9,97", "https://payfast.greenn.com.br/168687?batch=13831_RugVFv"],
    ["vip", "147,00", "15,11", "https://payfast.greenn.com.br/168687?batch=13832_Drsg4t"],
    ["platinum", "347,00", "35,68", "https://payfast.greenn.com.br/168687?batch=13834_ERwt5D"],
  ] as const)("sets confirmed %s sales details", (ticket, price, installment, checkout) => {
    expect(NRNB_2027.tickets[ticket].price).toBe(price);
    expect(NRNB_2027.tickets[ticket].installment).toBe(installment);
    expect(NRNB_2027.tickets[ticket].checkout).toBe(checkout);
  });
});