import { useParams } from "react-router-dom";
import { useMenu } from "@/hooks/useMenu";
import { useMenus } from "@/hooks/useMenus";
import Sidebar from "@/components/layout/Sidebar";
import CategorySection from "@/components/menu/CategorySection";
import SubtitleBar from "@/components/menu/SubtitleBar";
import { Skeleton } from "@/components/ui/skeleton";
import { UtensilsCrossed } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { parseLang } from "@/lib/bilingual";

interface HomePageProps {
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
}

export default function HomePage({ sidebarOpen, onCloseSidebar }: HomePageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const menuId = id ? Number(id) : null;
  const { data: menu, isLoading, error } = useMenu(menuId);
  const { data: menus, isLoading: menusLoading } = useMenus();

  useEffect(() => {
    if (!menusLoading && menus && menus.length > 0 && !menuId) {
      navigate(`/${menus[0].id}`, { replace: true });
    }
  }, [menus, menusLoading, menuId, navigate]);

  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseSidebar}
        />
      )}
      <Sidebar isOpen={sidebarOpen} onMenuClick={onCloseSidebar} />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {!menuId && !isLoading && (
          <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
            <div className="text-center">
              <UtensilsCrossed className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">Selecciona un menú del panel lateral</p>
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
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">{parseLang(menu.name, language)}</h2>
              {menu.description && (
                <p className="text-muted-foreground mt-1">{menu.description}</p>
              )}
              {menu.schedule && (
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Horario: {menu.schedule}
                </p>
              )}
            </div>
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
    </div>
  );
}
