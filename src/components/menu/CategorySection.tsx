import type { Category } from "@/lib/api";
import { parseLang, parsePrice } from "@/lib/bilingual";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { useEffect, useRef } from "react";
import MenuVideo from "./MenuVideo";
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
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const bannerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  return (
    <section id={`cat-${category.id}`} className="mb-4 scroll-mt-20">
      <div ref={ref} className="bg-gradient-to-br from-amber-50 to-card rounded-2xl shadow-md p-4 border border-amber-100/50">
        {!isGeneral && (
          <div className="flex items-center justify-between gap-3 mb-1">
            <h3 className="text-sm font-semibold">{name}</h3>
            {categoryPriceFormatted && (
              <span className="text-xs font-semibold text-primary-foreground bg-primary px-2.5 py-0.5 rounded-full shrink-0">
                ${categoryPriceFormatted}
              </span>
            )}
          </div>
        )}
        {!isGeneral && description && (
          <p className="text-xs text-muted-foreground mb-2">{description}</p>
        )}
        {category.video && (
          <MenuVideo
            src={category.video}
            videoRef={bannerRef}
            wrapperClassName="w-full max-w-64 aspect-square mx-auto mb-3 rounded-2xl bg-black shadow-md ring-1 ring-black/10"
            className="w-full h-full object-cover"
          />
        )}
        {activeProducts.length > 0 && (
          <div className="space-y-3">
            {activeProducts.map((cp) => (
              <ProductRow
                key={cp.productId}
                name={cp.product.name}
                description={cp.product.description}
                price={cp.product.price}
                featured={cp.product.featured}
                video={cp.product.video}
                images={cp.product.images}
                categoryPrice={category.price}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
