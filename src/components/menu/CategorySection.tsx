import type { Category } from "@/lib/api";
import { parseBilingual } from "@/lib/bilingual";
import ProductRow from "./ProductRow";

interface CategorySectionProps {
  category: Category;
}

export default function CategorySection({ category }: CategorySectionProps) {
  const { es, en } = parseBilingual(category.name);
  const activeProducts = category.categoryProducts.filter(
    (cp) => cp.product.active
  );

  if (activeProducts.length === 0) return null;

  return (
    <section className="mb-8">
      <h3 className="text-lg font-bold mb-1">{es}</h3>
      {en !== es && (
        <p className="text-xs text-muted-foreground mb-3">{en}</p>
      )}
      {category.description && (
        <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
      )}
      <div className="bg-card rounded-xl border divide-y divide-border/50">
        {activeProducts.map((cp) => (
          <div key={cp.productId} className="px-4">
            <ProductRow
              name={cp.product.name}
              description={cp.product.description}
              price={cp.product.price}
              featured={cp.product.featured}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
