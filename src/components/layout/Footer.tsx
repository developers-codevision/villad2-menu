import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="text-center py-6 px-4">
      <p className="text-xs text-muted-foreground">
        {language === "es"
          ? "Precios en USD + 10% Servicio · Hostal Boutique Villa D2"
          : "Prices in USD + 10% Service · Hostal Boutique Villa D2"}
      </p>
      <p className="text-xs text-muted-foreground/70 mt-1">
        +53 78820045 / +53 50970588
      </p>
    </footer>
  );
}
