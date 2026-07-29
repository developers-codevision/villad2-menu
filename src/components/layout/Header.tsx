import { Utensils, Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  onToggleMenu?: () => void;
  isMenuOpen?: boolean;
}

export default function Header({ onToggleMenu, isMenuOpen }: HeaderProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-full p-2">
            <Utensils className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Villa D2</h1>
            <p className="text-xs text-muted-foreground">
              {language === "es" ? "Menú Digital" : "Digital Menu"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5"
            aria-label="Cambiar idioma"
          >
            <Languages className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase">{language}</span>
          </Button>
          {onToggleMenu && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleMenu}
              className="lg:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
