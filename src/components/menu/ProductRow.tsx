import { parseLang, parsePrice } from "@/lib/bilingual";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star } from "lucide-react";

interface ProductRowProps {
  name: string;
  description: string | null;
  price: string | null;
  featured: boolean;
  categoryPrice?: string | null;
}

export default function ProductRow({ name, description, price, featured, categoryPrice }: ProductRowProps) {
  const { language } = useLanguage();
  const displayName = parseLang(name, language);
  const desc = description ? parseLang(description, language) : null;

  const hidePrice = !parsePrice(price) || (categoryPrice && (price === "0" || price === "0.00"));

  return (
    <div className="flex items-start justify-between gap-3 py-2.5">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[0.82rem] leading-snug">{displayName}</span>
          {featured && (
            <span className="inline-flex items-center gap-0.5 bg-primary/15 text-primary text-[0.55rem] px-1.5 py-0.5 rounded-md font-semibold shrink-0">
              <Star className="h-2.5 w-2.5 fill-primary text-primary" />
            </span>
          )}
        </div>
        {desc && (
          <p className="text-[0.68rem] text-muted-foreground mt-0.5 leading-relaxed">
            {desc}
          </p>
        )}
      </div>
      {!hidePrice && (
        <span className="shrink-0 text-[0.82rem] font-semibold">
          ${parsePrice(price)}
        </span>
      )}
    </div>
  );
}
