export function parseBilingual(text: string): { es: string; en: string } {
  const parts = text.split(" / ");
  if (parts.length >= 2) {
    return { es: parts[0].trim(), en: parts[1].trim() };
  }
  return { es: text, en: text };
}

export function parsePrice(price: string | number): string {
  const num = typeof price === "string" ? Number(price) : price;
  return num.toFixed(2);
}
