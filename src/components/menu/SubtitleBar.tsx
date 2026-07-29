import type { Subtitle } from "@/lib/api";
import { useLanguage } from "@/contexts/LanguageContext";
import { parseLang } from "@/lib/bilingual";

interface SubtitleBarProps {
  subtitles: Subtitle[];
}

export default function SubtitleBar({ subtitles }: SubtitleBarProps) {
  const { language } = useLanguage();

  if (subtitles.length === 0) return null;

  return (
    <div className="mt-8 space-y-2 border-t pt-4">
      {subtitles.map((sub) => (
        <p key={sub.id} className="text-xs text-muted-foreground text-center">
          {parseLang(sub.text, language)}
        </p>
      ))}
    </div>
  );
}
