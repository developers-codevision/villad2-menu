import { Utensils, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onToggleMenu?: () => void;
  isMenuOpen?: boolean;
}

export default function Header({ onToggleMenu, isMenuOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-full p-2">
            <Utensils className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Villa D2</h1>
            <p className="text-xs text-muted-foreground">Menú Digital</p>
          </div>
        </div>
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
    </header>
  );
}
