import { useMenus } from "@/hooks/useMenus";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { parseLang } from "@/lib/bilingual";

export default function MenuPills() {
  const { language } = useLanguage();
  const { data: menus, isLoading } = useMenus();

  if (isLoading || !menus || menus.length === 0) return null;

  return (
    <nav className="flex gap-2 flex-wrap justify-center px-4 py-3">
      {menus.map((menu) => (
        <NavLink
          key={menu.id}
          to={`/${menu.id}`}
          className={({ isActive }) =>
            `px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-foreground border-primary/50 hover:bg-primary/10"
            }`
          }
        >
          {parseLang(menu.name, language)}
        </NavLink>
      ))}
    </nav>
  );
}
