import type { Language } from "@/contexts/LanguageContext";

const ESCAPE_SENTINEL = '\u0000';

export function parseBilingual(text: string): { es: string; en: string } {
  const protectedText = text.replace(/&\//g, ESCAPE_SENTINEL);
  const parts = protectedText.split(" / ");
  const restore = (s: string) => s.split(ESCAPE_SENTINEL).join('/');
  if (parts.length >= 2) {
    return { es: restore(parts[0]).trim(), en: restore(parts[1]).trim() };
  }
  return { es: restore(protectedText).trim(), en: restore(protectedText).trim() };
}

export function parseLang(text: string, language: Language): string {
  const { es, en } = parseBilingual(text);
  return language === "es" ? es : en;
}

export function parsePrice(price: string | number | null | undefined): string {
  if (price == null || price === "") return "";
  const num = typeof price === "string" ? Number(price) : price;
  return num == null || Number.isNaN(num) ? "" : num.toFixed(2);
}
