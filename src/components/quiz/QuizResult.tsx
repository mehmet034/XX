import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, RotateCcw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface QuizResultProps {
  character: string;
  description: string;
  quizTitle: string;
  onRetake: () => void;
}

export const QuizResult = ({ character, description, quizTitle, onRetake }: QuizResultProps) => {
  const navigate = useNavigate();

  const shareToTwitter = () => {
    const text = `${quizTitle} testini yaptım ve sonucum: ${character}! Sen de dene!`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareToWhatsApp = () => {
    const text = `${quizTitle} testini yaptım ve sonucum: ${character}! Sen de dene: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link kopyalandı!");
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-8 animate-fade-in">
      <Card className="p-5 sm:p-8 md:p-12 text-center border border-white/20 shadow-xl bg-white/95 backdrop-blur-lg">
        <div className="mb-4 sm:mb-6">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary text-white rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            Sonucun Hazır! 🎉
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-primary">
          {character}
        </h2>

        <p className="text-base sm:text-lg text-primary/80 mb-6 sm:mb-8 leading-relaxed">{description}</p>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center">
          <Button
            onClick={shareToTwitter}
            className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 w-full sm:w-auto text-sm sm:text-base py-2 sm:py-2.5"
          >
            <Share2 className="w-4 h-4" />
            <span className="whitespace-nowrap">X'te Paylaş</span>
          </Button>
          <Button
            onClick={shareToWhatsApp}
            className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 w-full sm:w-auto text-sm sm:text-base py-2 sm:py-2.5"
          >
            <Share2 className="w-4 h-4" />
            <span className="whitespace-nowrap">WhatsApp'ta Paylaş</span>
          </Button>
          <Button
            onClick={copyLink}
            className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 w-full sm:w-auto text-sm sm:text-base py-2 sm:py-2.5"
          >
            <Share2 className="w-4 h-4" />
            <span className="whitespace-nowrap">Linki Kopyala</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center pt-4 sm:pt-6 border-t border-primary/20">
          <Button onClick={onRetake} className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 w-full sm:w-auto text-sm sm:text-base py-2 sm:py-2.5">
            <RotateCcw className="w-4 h-4" />
            <span className="whitespace-nowrap">Testi Tekrar Yap</span>
          </Button>
          <Button onClick={() => navigate("/")} className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white w-full sm:w-auto text-sm sm:text-base py-2 sm:py-2.5">
            <Home className="w-4 h-4" />
            <span className="whitespace-nowrap">Ana Sayfaya Dön</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};
