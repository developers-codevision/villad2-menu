import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="relative">
      <div className="bg-gradient-to-b from-primary to-amber-500 pt-5 pb-12 px-6 text-center">
        <button
          onClick={toggleLanguage}
          className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/30 transition-colors"
          aria-label="Cambiar idioma"
        >
          <Languages className="h-3.5 w-3.5" />
          {language.toUpperCase()}
        </button>

        <div className="relative w-32 h-32 mx-auto mb-2">
          <span className="absolute inset-0 rounded-full bg-white/40 animate-ring" />
          <span className="absolute inset-0 rounded-full bg-white/40 animate-ring [animation-delay:1s]" />
          <div className="relative w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center animate-float">
            <img
              src="/logo.png"
              alt="Hostal Boutique Villa D2"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white drop-shadow-sm">
          {language === "es" ? "Menú Digital" : "Digital Menu"}
        </h1>
        <p className="text-white/80 text-xs mt-1 font-light">
          Hostal Boutique Villa D2 · La Habana
        </p>
      </div>

      {/* Curva */}
      <div className="h-5 bg-background rounded-t-[50%] -mt-5 relative z-10" />
    </header>
  );
}
