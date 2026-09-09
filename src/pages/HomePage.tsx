import { useParams } from "react-router-dom";
import { useMenu } from "@/hooks/useMenu";
import { useMenus } from "@/hooks/useMenus";
import CategorySection from "@/components/menu/CategorySection";
import SubtitleBar from "@/components/menu/SubtitleBar";
import { Skeleton } from "@/components/ui/skeleton";
import { UtensilsCrossed } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { parseLang } from "@/lib/bilingual";

export default function HomePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const menuId = id ? Number(id) : null;
  const { data: menu, isLoading, error } = useMenu(menuId);
  const { data: menus, isLoading: menusLoading } = useMenus();

  useEffect(() => {
    const menuName = menu ? parseLang(menu.name, language) : null;
    const siteTitle = "Hostal Boutique Villa D2";
    const title = menuName
      ? `${menuName} | ${siteTitle}`
      : `Menú Digital | ${siteTitle}`;
    document.title = title;

    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", menuName
      ? `${menuName} del Hostal Boutique Villa D2. Horario, productos y precios.`
      : "Explora los menús digitales del Hostal Boutique Villa D2 en La Habana, Cuba.");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", menuName
      ? `${menuName} del Hostal Boutique Villa D2.`
      : "Explora los menús digitales del Hostal Boutique Villa D2 en La Habana, Cuba.");
    setMeta("property", "og:url", menuId
      ? `https://menu.villad2.com/${menuId}`
      : "https://menu.villad2.com");
  }, [menu, language, menuId]);

  useEffect(() => {
    if (!menusLoading && menus && menus.length > 0 && !menuId) {
      navigate(`/${menus[0].id}`, { replace: true });
    }
  }, [menus, menusLoading, menuId, navigate]);

  return (
    <main className="max-w-lg mx-auto w-full px-4 py-4">
      {!menuId && !isLoading && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <UtensilsCrossed className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground">Selecciona un menú</p>
          </div>
        </div>
      )}
      {!menuId && isLoading && (
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
          <div className="space-y-3 mt-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </div>
      )}
      {menu && (
        <>
          {menu.categories
            .filter((c) => c.active)
            .map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          <SubtitleBar subtitles={menu.subtitulos} />
        </>
      )}
      {error && (
        <div className="text-center py-12">
          <p className="text-destructive font-medium">Error al cargar el menú</p>
          <p className="text-sm text-muted-foreground mt-1">
            {(error as Error).message}
          </p>
        </div>
      )}
    </main>
  );
}
