import { useMenus } from "@/hooks/useMenus";
import { NavLink } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface SidebarProps {
  isOpen?: boolean;
  onMenuClick?: () => void;
}

export default function Sidebar({ isOpen, onMenuClick }: SidebarProps) {
  const { language } = useLanguage();
  const { data: menus, isLoading, error } = useMenus();

  return (
    <>
      <aside
        className={cn(
          "bg-card border-r flex flex-col shrink-0 transition-transform duration-300 ease-in-out",
          "fixed inset-y-0 left-0 z-50 w-72",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:static lg:translate-x-0 lg:w-72"
        )}
      >
        <div className="p-4 border-b">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {language === "es" ? "Menús" : "Menus"}
          </h2>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          {error && (
            <p className="text-sm text-destructive px-3">
              {language === "es"
                ? "Error al cargar los menús"
                : "Error loading menus"}
            </p>
          )}
          {menus?.map((menu) => (
            <NavLink
              key={menu.id}
              to={`/${menu.id}`}
              onClick={onMenuClick}
              className={({ isActive }) =>
                `flex flex-col gap-0.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:bg-accent"
                }`
              }
            >
              <span>{menu.name}</span>
              {menu.schedule && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {menu.schedule}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
