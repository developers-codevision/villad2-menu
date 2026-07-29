import type { Language } from "@/contexts/LanguageContext";

export function parseBilingual(text: string): { es: string; en: string } {
  const parts = text.split(" / ");
  if (parts.length >= 2) {
    return { es: parts[0].trim(), en: parts[1].trim() };
  }
  return { es: text, en: text };
}

export function parseLang(text: string, language: Language): string {
  const { es, en } = parseBilingual(text);
  return language === "es" ? es : en;
}

export function parsePrice(price: string | number): string {
  const num = typeof price === "string" ? Number(price) : price;
  return num.toFixed(2);
}
