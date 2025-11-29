import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface QuizIntroProps {
  title: string;
  description: string;
  icon: string;
  emoji: string;
  onStart: () => void;
}

export const QuizIntro = ({ title, description, icon, emoji, onStart }: QuizIntroProps) => {
  const Icon = (Icons[icon as keyof typeof Icons] as LucideIcon) || Icons.HelpCircle;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh] text-center px-4 animate-fade-in">
      <div className="mb-6 sm:mb-8 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-secondary flex items-center justify-center text-white shadow-lg text-5xl sm:text-6xl">
        {emoji}
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white px-2">
        {title}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-12 max-w-2xl px-2">
        {description}
      </p>
      <Button
        size="lg"
        onClick={onStart}
        className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-secondary hover:bg-secondary/90 text-white w-full sm:w-auto max-w-xs"
      >
        Teste Başla
      </Button>
    </div>
  );
};
