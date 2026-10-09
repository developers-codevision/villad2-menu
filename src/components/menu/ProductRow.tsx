import { useEffect, useRef } from "react";
import { parseLang, parsePrice } from "@/lib/bilingual";
import { useLanguage } from "@/contexts/LanguageContext";
import { mediaUrl } from "@/lib/api";
import { useInView } from "@/hooks/useInView";
import MenuVideo from "./MenuVideo";
import { Star } from "lucide-react";

interface ProductRowProps {
  name: string;
  description: string | null;
  price: string | null;
  featured: boolean;
  video?: string | null;
  images?: string | null;
  categoryPrice?: string | null;
}

function parseImages(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export default function ProductRow({ name, description, price, featured, video, images, categoryPrice }: ProductRowProps) {
  const { language } = useLanguage();
  const displayName = parseLang(name, language);
  const desc = description ? parseLang(description, language) : null;
  const gallery = parseImages(images);
  const { ref, inView } = useInView<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  const hidePrice = !parsePrice(price) || (categoryPrice && (price === "0" || price === "0.00"));

  return (
    <div
      ref={ref}
      className="group overflow-hidden rounded-2xl bg-card border border-border/60 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
    >
      {video && (
        <MenuVideo
          src={video}
          videoRef={videoRef}
          wrapperClassName="aspect-square bg-black"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
      {gallery.length > 0 && (
        <div className="flex gap-2 overflow-x-auto snap-x px-3 pt-3">
          {gallery.map((src) => (
            <img
              key={src}
              src={mediaUrl(src)}
              alt={displayName}
              loading="lazy"
              className="w-44 shrink-0 aspect-square object-cover rounded-xl snap-start bg-black/5"
            />
          ))}
        </div>
      )}
      <div className="flex items-start justify-between gap-3 p-3">
        <div className="flex-1 min-w-0">
          {displayName && (
            <div className="flex items-center gap-1.5">
              <span className="text-[0.84rem] font-semibold leading-snug">{displayName}</span>
              {featured && (
                <span className="inline-flex items-center gap-0.5 bg-primary/20 text-foreground text-[0.55rem] px-1.5 py-0.5 rounded-full font-bold shrink-0 border border-primary/40">
                  <Star className="h-2.5 w-2.5 fill-primary text-primary" />
                  TOP
                </span>
              )}
            </div>
          )}
          {desc && (
            <p className="text-[0.68rem] text-muted-foreground mt-1 leading-relaxed">
              {desc}
            </p>
          )}
        </div>
        {!hidePrice && (
          <span className="shrink-0 bg-primary text-primary-foreground text-[0.78rem] font-bold px-2.5 py-1 rounded-full shadow-sm tabular-nums">
            ${parsePrice(price)}
          </span>
        )}
      </div>
    </div>
  );
}
