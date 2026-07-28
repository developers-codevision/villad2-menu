import { Badge } from "@/components/ui/badge";
import { parseBilingual, parsePrice } from "@/lib/bilingual";
import { Star } from "lucide-react";

interface ProductRowProps {
  name: string;
  description: string | null;
  price: string;
  featured: boolean;
}

export default function ProductRow({ name, description, price, featured }: ProductRowProps) {
  const { es, en } = parseBilingual(name);
  const desc = description ? parseBilingual(description) : null;

  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border/50 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{es}</span>
          {featured && (
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
          )}
        </div>
        {en !== es && (
          <p className="text-xs text-muted-foreground mt-0.5">{en}</p>
        )}
        {desc && (
          <p className="text-xs text-muted-foreground/70 mt-1 leading-relaxed">
            {desc.es}
          </p>
        )}
      </div>
      <div className="shrink-0 text-right">
        <Badge variant="secondary" className="text-xs font-mono">
          ${parsePrice(price)}
        </Badge>
      </div>
    </div>
  );
}
