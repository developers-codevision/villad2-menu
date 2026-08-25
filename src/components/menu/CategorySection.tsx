import type { Category } from "@/lib/api";
import { parseLang, parsePrice } from "@/lib/bilingual";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductRow from "./ProductRow";

interface CategorySectionProps {
  category: Category;
}

export default function CategorySection({ category }: CategorySectionProps) {
  const { language } = useLanguage();
  const name = parseLang(category.name, language);
  const description = category.description ? parseLang(category.description, language) : null;
  const categoryPriceFormatted = parsePrice(category.price);
  const isGeneral = name.trim().toLowerCase() === "general";
  const activeProducts = category.categoryProducts.filter(
    (cp) => cp.product.active
  );

  if (activeProducts.length === 0) return null;

  return (
    <section className="mb-8">
      {!isGeneral && (
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold">{name}</h3>
          {categoryPriceFormatted && (
            <Badge variant="secondary" className="text-xs font-mono bg-yellow-400 text-yellow-900">
              ${categoryPriceFormatted}
            </Badge>
          )}
        </div>
      )}
      {!isGeneral && description && (
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
      )}
      <div className="bg-card rounded-xl border divide-y divide-border/50">
        {activeProducts.map((cp) => (
          <div key={cp.productId} className="px-4">
            <ProductRow
              name={cp.product.name}
              description={cp.product.description}
              price={cp.product.price}
              featured={cp.product.featured}
              categoryPrice={category.price}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
