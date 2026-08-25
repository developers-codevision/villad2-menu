import { Badge } from "@/components/ui/badge";
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
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border/50 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{displayName}</span>
          {featured && (
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
          )}
        </div>
        {desc && (
          <p className="text-xs text-muted-foreground/70 mt-1 leading-relaxed">
            {desc}
          </p>
        )}
      </div>
      {!hidePrice && (
        <div className="shrink-0 text-right">
          <Badge variant="secondary" className="text-xs font-mono bg-yellow-400 text-yellow-900">
            ${parsePrice(price)}
          </Badge>
        </div>
      )}
    </div>
  );
}
